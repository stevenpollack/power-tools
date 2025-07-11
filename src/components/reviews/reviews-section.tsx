import { useState, useMemo, useEffect, useCallback } from "react";
import { RatingSnapshot } from "./rating-snapshot";
import { ReviewFilters } from "./review-filters";
import { ReviewCard } from "./review-card";
import { cn } from "@/lib/utils";
import type { ReviewForUI } from "@/lib/types";

interface ReviewsSectionProps {
  reviews: ReviewForUI[];
  totalReviews: number;
  averageRating: number;
  ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
  className?: string;
}

// URL state management utilities (memoized)
const getFilterFromURL = (): number | null => {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const rating = params.get("rating");
  return rating &&
    !isNaN(Number(rating)) &&
    Number(rating) >= 1 &&
    Number(rating) <= 5
    ? Number(rating)
    : null;
};

const getReviewFromURL = (): string | null => {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("review");
};

const updateURL = (rating: number | null) => {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  if (rating) {
    url.searchParams.set("rating", rating.toString());
  } else {
    url.searchParams.delete("rating");
  }

  // Update URL without triggering a page reload
  window.history.replaceState({}, "", url.toString());
};

export function ReviewsSection({
  reviews,
  totalReviews,
  averageRating,
  ratingDistribution,
  className,
}: ReviewsSectionProps) {
  // Initialize rating filter from URL on mount
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  // Load rating filter from URL on component mount
  useEffect(() => {
    const urlRating = getFilterFromURL();
    setSelectedRating(urlRating);
  }, []);

  // Handle review query parameter for direct review links
  useEffect(() => {
    const reviewSlug = getReviewFromURL();
    if (!reviewSlug) return;

    // Find the review with matching slug
    const targetReview = reviews.find((review) => review.id === reviewSlug);
    if (!targetReview) return;

    // Clear any rating filter to ensure the target review is visible
    setSelectedRating(null);

    // Calculate how many reviews we need to show to include the target review
    const reviewIndex = reviews.findIndex((review) => review.id === reviewSlug);
    if (reviewIndex >= 0) {
      const minVisibleCount = Math.max(3, reviewIndex + 1);
      setVisibleCount(minVisibleCount);

      // Scroll to the review after a brief delay to ensure rendering
      setTimeout(() => {
        const reviewElement = document.getElementById(`review-${reviewSlug}`);
        if (reviewElement) {
          reviewElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          // Optional: Add a temporary highlight effect
          reviewElement.style.backgroundColor = "#fef3cd";
        }
      }, 100);
    }
  }, [reviews]);

  // Memoized rating change handler to prevent unnecessary re-renders
  const handleRatingChange = useCallback((rating: number | null) => {
    setSelectedRating(rating);
    setVisibleCount(3); // Reset pagination when filter changes
    updateURL(rating);
  }, []);

  // Memoized load more handler
  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + 3);
  }, []);

  // Performance-optimized review filtering with memoization
  const filteredReviews = useMemo(() => {
    // Early return for no filter case (most common)
    if (!selectedRating) return reviews;

    // Use a more efficient filter for large datasets
    const filtered: ReviewForUI[] = []; 
    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      if (review && review.rating === selectedRating) {
        filtered.push(review);
      }
    }
    return filtered;
  }, [reviews, selectedRating]);

  // Memoized visible reviews calculation
  const visibleReviews = useMemo(() => {
    return filteredReviews.slice(0, visibleCount);
  }, [filteredReviews, visibleCount]);

  // Memoized calculations for UI state
  const reviewStats = useMemo(
    () => ({
      hasMoreReviews: visibleCount < filteredReviews.length,
      remainingCount: filteredReviews.length - visibleCount,
      isEmpty: filteredReviews.length === 0 && selectedRating !== null,
    }),
    [visibleCount, filteredReviews.length, selectedRating],
  );

  // Memoized clear filter handler
  const handleClearFilter = useCallback(() => {
    handleRatingChange(null);
  }, [handleRatingChange]);

  return (
    <section className={cn("space-y-8", className)}>
      {/* Rating Snapshot */}
      <RatingSnapshot
        averageRating={averageRating}
        totalReviews={totalReviews}
        ratingDistribution={ratingDistribution}
      />

      {/* Review Filters */}
      <ReviewFilters
        totalReviews={filteredReviews.length}
        visibleReviews={visibleReviews.length}
        selectedRating={selectedRating}
        onRatingChange={handleRatingChange}
      />

      {/* Reviews Grid */}
      <div className="space-y-6">
        {visibleReviews.map((review, index) => (
          <div key={index} id={review.id ? `review-${review.id}` : undefined}>
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {reviewStats.hasMoreReviews && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="bg-bunnings-secondary-green hover:bg-bunnings-secondary-green/80 text-bunnings-sm rounded p-4 text-white transition-colors"
          >
            Load More Reviews ({reviewStats.remainingCount} remaining)
          </button>
        </div>
      )}

      {/* No Reviews Message */}
      {reviewStats.isEmpty && (
        <div className="py-8 text-center">
          <p className="text-bunnings-neutral-dark-gray text-lg">
            No {selectedRating}-star reviews found.
          </p>
          <button
            onClick={handleClearFilter}
            className="text-bunnings-primary-orange hover:text-bunnings-primary-orange/80 mt-4 transition-colors"
          >
            Show all reviews
          </button>
        </div>
      )}
    </section>
  );
}

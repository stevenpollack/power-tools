import React, { useMemo, useCallback } from "react";
import { FloatingCard } from "./FloatingCard";
import { FilterControls } from "./FilterControls";
import { useStore } from "@nanostores/react";
import { activeFilters } from "@/stores/filterStore";
import { selectedCard } from "@/stores/cardStore";
import type { Review } from "@/lib/types";

interface FloatingCardWallProps {
  reviews: Review[];
}

export const FloatingCardWall: React.FC<FloatingCardWallProps> = ({
  reviews,
}) => {
  const $filters = useStore(activeFilters);

  // Filter reviews based on active filters
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      // Search term filter
      if ($filters.searchTerm) {
        const searchLower = $filters.searchTerm.toLowerCase();
        const matchesSearch =
          review.authorName.toLowerCase().includes(searchLower) ||
          review.toolName.toLowerCase().includes(searchLower) ||
          review.excerpt.toLowerCase().includes(searchLower) ||
          review.content.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Author filter
      if ($filters.author && review.authorName !== $filters.author) {
        return false;
      }

      // Mood filter
      if ($filters.mood && review.mood !== $filters.mood) {
        return false;
      }

      // Category filter
      if ($filters.category && review.category !== $filters.category) {
        return false;
      }

      // Brand filter
      if ($filters.brand && review.brand !== $filters.brand) {
        return false;
      }

      return true;
    });
  }, [reviews, $filters]);

  // Smart arrangement algorithm - featured and popular content gets better positioning
  const arrangedReviews = useMemo(() => {
    return [...filteredReviews].sort((a, b) => {
      // Featured reviews first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      // Then by share count (popularity)
      if (a.shareCount !== b.shareCount) {
        return b.shareCount - a.shareCount;
      }

      // Then by reading time (shorter first for better engagement)
      if (a.readingTime !== b.readingTime) {
        return a.readingTime - b.readingTime;
      }

      // Finally by date (newer first)
      return (
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      );
    });
  }, [filteredReviews]);

  // Handle card click - set selected card for modal
  const handleCardClick = useCallback((reviewId: string) => {
    selectedCard.set(reviewId);
  }, []);

  // Extract unique values for filter controls
  const availableAuthors = useMemo(
    () => [...new Set(reviews.map((r) => r.authorName))].sort(),
    [reviews],
  );

  const availableCategories = useMemo(
    () =>
      [
        ...new Set(
          reviews
            .map((r) => r.category)
            .filter((cat): cat is string => Boolean(cat)),
        ),
      ].sort(),
    [reviews],
  );

  const availableBrands = useMemo(
    () =>
      [
        ...new Set(
          reviews
            .map((r) => r.brand)
            .filter((brand): brand is string => Boolean(brand)),
        ),
      ].sort(),
    [reviews],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <FilterControls
        availableAuthors={availableAuthors}
        availableCategories={availableCategories}
        availableBrands={availableBrands}
      />

      {/* Results count */}
      <div className="mx-auto max-w-7xl px-6 py-2">
        <p className="text-sm text-gray-600">
          Showing {arrangedReviews.length} of {reviews.length} reviews
          {arrangedReviews.length !== reviews.length && " (filtered)"}
        </p>
      </div>

      {/* Cards display */}
      {arrangedReviews.length === 0 ? (
        <div className="flex min-h-96 items-center justify-center">
          <div className="text-center">
            <p className="mb-2 text-lg text-gray-500">
              No reviews match your filters
            </p>
            <p className="text-sm text-gray-400">
              Try adjusting your search criteria
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl p-6">
          <div className="columns-1 gap-6 space-y-6 sm:columns-2 xl:columns-3">
            {arrangedReviews.map((review) => (
              <div key={review.id} className="mb-6 break-inside-avoid">
                <FloatingCard review={review} onCardClick={handleCardClick} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

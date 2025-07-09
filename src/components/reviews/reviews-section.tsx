import { useState, useMemo } from "react";
import { RatingSnapshot } from "./rating-snapshot";
import { ReviewFilters } from "./review-filters";
import { ReviewCard } from "./review-card";
import { cn } from "@/lib/utils";

interface Review {
  rating: number;
  recommendsProduct: boolean;
  helpfulVotes: number;
  unhelpfulVotes: number;
  verifiedPurchaser: boolean;
  displayName: string;
  useCase: string;
  userCategory: string;
  content: string;
  dateCreated: string;
  qualityRating: number;
  valueRating: number;
}

interface ReviewsSectionProps {
  reviews: Review[];
  totalReviews: number;
  averageRating: number;
  ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
  averageQualityRating: number;
  averageValueRating: number;
  className?: string;
}

export function ReviewsSection({
  reviews,
  totalReviews,
  averageRating,
  ratingDistribution,
  averageQualityRating,
  averageValueRating,
  className,
}: ReviewsSectionProps) {
  const REVIEWS_PER_PAGE = 3;
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);

  const visibleReviews = useMemo(
    () => reviews.slice(0, visibleCount),
    [reviews, visibleCount]
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + REVIEWS_PER_PAGE);
  };

  const handleShare = (review: Review) => {
    // Share functionality - could open dialog or copy link
    console.log("Share review:", review);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Mobile-first layout: Stack vertically on mobile, side-by-side on larger screens */}
      <div className="grid grid-cols-1 gap-6 lg:gap-8">
        {/* Rating snapshot - full width on mobile, 1/3 on desktop */}
        <RatingSnapshot
          averageRating={averageRating}
          totalReviews={totalReviews}
          ratingDistribution={ratingDistribution}
          qualityRating={averageQualityRating}
          valueRating={averageValueRating}
        />

        {/* Reviews content - full width on mobile, 2/3 on desktop */}
        <div className="space-y-6">
          {/* Filters */}
          <ReviewFilters
            totalReviews={totalReviews}
            currentPage={1}
            reviewsPerPage={REVIEWS_PER_PAGE}
          />

          {/* Reviews list */}
          <div className="divide-bunnings-neutral-medium-gray space-y-0 divide-y">
            {visibleReviews.map((review, index) => (
              <ReviewCard
                key={index}
                review={review}
                onShare={() => handleShare(review)}
                className="mt-6"
              />
            ))}
          </div>

          {/* View more button */}
          {visibleCount < reviews.length && (
            <div className="pt-6">
              <button 
                onClick={handleLoadMore}
                className="bg-bunnings-secondary-green hover:bg-bunnings-secondary-green/90 focus:ring-bunnings-primary-orange w-full rounded-md px-6 py-3 font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                View More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import * as React from "react";
import { StarRating } from "@/components/ui/star-rating";
import { cn } from "@/lib/utils";

interface RatingSnapshotProps {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
  qualityRating?: number;
  valueRating?: number;
  className?: string;
}

export function RatingSnapshot({
  averageRating,
  totalReviews,
  ratingDistribution,
  qualityRating,
  valueRating,
  className,
}: RatingSnapshotProps) {
  const maxCount = Math.max(...Object.values(ratingDistribution));

  return (
    <div className={cn("space-y-6", className)}>
      {/* Rating Snapshot Header */}
      <div>
        <h3 className="font-bunnings-heading text-bunnings-xl text-bunnings-neutral-dark-gray mb-3 font-medium">
          Rating Snapshot
        </h3>
        <p className="text-bunnings-sm text-bunnings-neutral-dark-gray">
          Select a row below to filter reviews.
        </p>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count =
            ratingDistribution[rating as keyof typeof ratingDistribution] || 0;
          const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

          return (
            <button
              key={rating}
              className="group hover:bg-bunnings-neutral-light-gray flex w-full items-center gap-3 rounded p-2 transition-colors"
            >
              <span className="text-bunnings-sm text-bunnings-neutral-dark-gray w-12">
                {rating} star{rating !== 1 ? "s" : ""}
              </span>

              <div className="bg-bunnings-neutral-medium-gray h-2 flex-1 overflow-hidden rounded-full">
                <div
                  className="bg-bunnings-rating-progress-bar h-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <span className="text-bunnings-sm text-bunnings-neutral-dark-gray w-8 text-right">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Overall Rating */}
      <div className="border-bunnings-neutral-medium-gray border-t pt-4">
        <h4 className="font-bunnings text-bunnings-base text-bunnings-neutral-dark-gray mb-2 font-medium">
          Overall Rating
        </h4>
        <div className="flex items-center gap-3">
          <span className="text-bunnings-neutral-dark-gray text-3xl font-bold">
            {averageRating.toFixed(1)}
          </span>
          <div className="space-y-1">
            <StarRating rating={averageRating} size="md" />
            <p className="text-bunnings-sm text-bunnings-neutral-dark-gray">
              {totalReviews} Review{totalReviews !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Review this Product */}
      <div className="border-bunnings-neutral-medium-gray border-t pt-4">
        <h4 className="font-bunnings text-bunnings-base text-bunnings-neutral-dark-gray mb-3 font-medium">
          Review this Product
        </h4>
        <div className="mb-3 flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="border-bunnings-rating-star-yellow hover:bg-bunnings-neutral-light-gray rounded border p-1 transition-colors"
            >
              <StarRating rating={0} readonly={false} size="md" />
            </button>
          ))}
        </div>
        <p className="text-bunnings-sm text-bunnings-neutral-dark-gray">
          Adding a review will require a valid email for verification
        </p>
      </div>

      {/* Average Customer Ratings */}
      {(qualityRating || valueRating) && (
        <div className="border-bunnings-neutral-medium-gray border-t pt-4">
          <h4 className="font-bunnings text-bunnings-base text-bunnings-neutral-dark-gray mb-3 font-medium">
            Average Customer Ratings
          </h4>
          <div className="space-y-3">
            {qualityRating && (
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-bunnings-sm text-bunnings-neutral-dark-gray">
                    Quality of Product
                  </span>
                  <span className="text-bunnings-sm text-bunnings-neutral-dark-gray font-medium">
                    {qualityRating.toFixed(1)}
                  </span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className={cn(
                        "h-2 flex-1 rounded-sm",
                        star <= qualityRating
                          ? "bg-bunnings-rating-progress-bar"
                          : "bg-bunnings-neutral-medium-gray",
                      )}
                    />
                  ))}
                </div>
              </div>
            )}

            {valueRating && (
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-bunnings-sm text-bunnings-neutral-dark-gray">
                    Value of Product
                  </span>
                  <span className="text-bunnings-sm text-bunnings-neutral-dark-gray font-medium">
                    {valueRating.toFixed(1)}
                  </span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className={cn(
                        "h-2 flex-1 rounded-sm",
                        star <= valueRating
                          ? "bg-bunnings-rating-progress-bar"
                          : "bg-bunnings-neutral-medium-gray",
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import { StarRating } from "@/components/ui/star-rating";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Rating Snapshot Header */}
      <div>
        <h3 className="mb-3 text-lg font-medium text-gray-900">
          Rating Snapshot
        </h3>
        <p className="text-sm text-gray-600">
          Select a row below to filter reviews.
        </p>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count =
            ratingDistribution[rating as keyof typeof ratingDistribution] || 0;
          const percentage =
            totalReviews > 0 ? (count / totalReviews) * 100 : 0;

          return (
            <button
              key={rating}
              className="group flex w-full items-center gap-3 rounded p-2 transition-colors hover:bg-gray-50"
            >
              <span className="w-12 text-sm text-gray-700">
                {rating} star{rating !== 1 ? "s" : ""}
              </span>

              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-yellow-500 transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <span className="w-8 text-right text-sm text-gray-700">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Overall Rating */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="mb-2 text-base font-medium text-gray-900">
          Overall Rating
        </h4>
        <div className="flex items-center gap-3">
          <span
            className="font-bold text-gray-900"
            style={{ fontSize: "45px" }}
          >
            {averageRating.toFixed(1)}
          </span>
          <div className="flex flex-col justify-center">
            <StarRating rating={averageRating} size="md" />
            <p className="mt-1 text-sm text-gray-600">
              {totalReviews} Review{totalReviews !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Review this Product */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="mb-3 text-base font-medium text-gray-900">
          Review this Product
        </h4>
        <div
          className="mb-3 flex gap-2"
          onMouseLeave={() => setHoveredStar(null)}
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const isHighlighted = hoveredStar !== null && star <= hoveredStar;
            return (
              <button
                key={star}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded border border-yellow-500 p-3 transition-colors",
                  isHighlighted
                    ? "bg-yellow-500"
                    : "bg-white hover:bg-yellow-500",
                )}
                onMouseEnter={() => setHoveredStar(star)}
              >
                <svg
                  className={cn(
                    "h-5 w-5 transition-colors",
                    // isHighlighted ? "text-white" : "text-yellow-500",
                    "text-yellow-500",
                  )}
                  fill="none"
                  fillRule="evenodd"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#FFF"
                    stroke="#FFAB00"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-gray-600">
          Adding a review will require a valid email for verification
        </p>
      </div>

      {/* Average Customer Ratings */}
      {(qualityRating || valueRating) && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="mb-3 text-base font-medium text-gray-900">
            Average Customer Ratings
          </h4>
          <div className="space-y-3">
            {qualityRating && (
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Quality of Product
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {qualityRating.toFixed(1)}
                  </span>
                </div>
                <div className="relative flex h-3 bg-gray-200">
                  {/* Yellow fill based on actual rating */}
                  <div
                    className="bg-yellow-500"
                    style={{ width: `${(qualityRating / 5) * 100}%` }}
                  />
                  {/* White separators overlay */}
                  <div className="absolute inset-0 flex">
                    {[1, 2, 3, 4].map((separator) => (
                      <div
                        key={separator}
                        className="flex-1"
                        style={{
                          borderRight: "1px solid white",
                        }}
                      />
                    ))}
                    <div className="flex-1" />
                  </div>
                </div>
              </div>
            )}

            {valueRating && (
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Value of Product
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {valueRating.toFixed(1)}
                  </span>
                </div>
                <div className="relative flex h-3 bg-gray-200">
                  {/* Yellow fill based on actual rating */}
                  <div
                    className="bg-yellow-500"
                    style={{ width: `${(valueRating / 5) * 100}%` }}
                  />
                  {/* White separators overlay */}
                  <div className="absolute inset-0 flex">
                    {[1, 2, 3, 4].map((separator) => (
                      <div
                        key={separator}
                        className="flex-1"
                        style={{
                          borderRight: "1px solid white",
                        }}
                      />
                    ))}
                    <div className="flex-1" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import * as React from "react";
import { ChevronDown, X, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewFiltersProps {
  totalReviews: number;
  visibleReviews: number;
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
  className?: string;
}

export function ReviewFilters({
  totalReviews,
  visibleReviews,
  selectedRating,
  onRatingChange,
  className,
}: ReviewFiltersProps) {
  const startReview = 1;
  const endReview = visibleReviews;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Filter Controls */}
      <div className="space-y-3">
        <div className="flex flex-row items-center justify-between gap-2">
          <h3 className="font-bunnings sm:text-bunnings-base text-bunnings-neutral-dark-gray flex items-center gap-2 text-base font-medium">
            Filter Reviews
          </h3>

          {/* Clear Filter Button */}
          {selectedRating && (
            <button
              onClick={() => onRatingChange(null)}
              className="text-bunnings-rating-star-yellow hover:text-bunnings-rating-progress-bar flex items-center gap-1 self-start text-sm transition-colors hover:cursor-pointer sm:self-auto"
            >
              <X className="h-3 w-3" />
              Clear Filter
            </button>
          )}
        </div>

        <div className="space-y-3">
          {/* Rating Filter */}
          <div className="relative">
            <select
              className={cn(
                "sm:text-bunnings-base text-bunnings-neutral-dark-gray w-full appearance-none rounded-md border bg-white px-3 py-3 text-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none sm:px-4",
                selectedRating
                  ? "border-bunnings-primary-orange focus:border-bunnings-primary-orange focus:ring-bunnings-primary-orange/20 bg-orange-50/30"
                  : "border-bunnings-neutral-medium-gray focus:border-bunnings-primary-orange focus:ring-bunnings-primary-orange/20",
              )}
              value={selectedRating || ""}
              onChange={(e) =>
                onRatingChange(e.target.value ? Number(e.target.value) : null)
              }
            >
              <option value="">All Ratings</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
            <ChevronDown className="text-bunnings-neutral-dark-gray pointer-events-none absolute top-1/2 right-3 h-4 w-4 flex-shrink-0 -translate-y-1/2" />
          </div>

          {/* Active Filter Display */}
          {selectedRating && (
            <div className="bg-bunnings-primary-orange/10 border-bunnings-primary-orange/20 rounded-md border px-3 py-2">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-bunnings-neutral-dark-gray text-sm">
                  Showing {selectedRating}-star reviews only
                </span>
                <div className="flex items-center gap-1 self-start sm:self-auto">
                  {Array.from({ length: selectedRating }, (_, i) => (
                    <Star
                      key={i}
                      className="fill-bunnings-primary-orange text-bunnings-primary-orange h-3 w-3 flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Count */}
      <div className="border-bunnings-neutral-medium-gray border-t pt-4">
        <p className="sm:text-bunnings-base text-bunnings-neutral-dark-gray text-sm">
          {startReview} – {endReview} of {totalReviews} Review
          {totalReviews !== 1 ? "s" : ""}
          {selectedRating && (
            <span className="text-bunnings-primary-orange font-medium">
              {" "}
              ({selectedRating}-star)
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

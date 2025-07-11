import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewFiltersProps {
  totalReviews: number;
  visibleReviews: number;
  className?: string;
}

export function ReviewFilters({
  totalReviews,
  visibleReviews,
  className,
}: ReviewFiltersProps) {
  const startReview = 1;
  const endReview = visibleReviews;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Filter Controls */}
      <div className="space-y-3">
        <h3 className="font-bunnings text-bunnings-base text-bunnings-neutral-dark-gray font-medium">
          Filter Reviews
        </h3>

        <div className="space-y-3">
          {/* Rating Filter */}
          <div className="relative">
            <select className="border-bunnings-neutral-medium-gray text-bunnings-base text-bunnings-neutral-dark-gray focus:border-bunnings-primary-orange focus:ring-bunnings-primary-orange w-full appearance-none rounded-md border bg-white px-4 py-3 focus:ring-2 focus:ring-offset-2 focus:outline-none">
              <option value="">Rating</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
            <ChevronDown className="text-bunnings-neutral-dark-gray pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
          </div>

          {/* Sort Filter - TODO: add this back in later */}
          {/* 
          <div className="relative">
            <select className="border-bunnings-neutral-medium-gray text-bunnings-base text-bunnings-neutral-dark-gray focus:border-bunnings-primary-orange focus:ring-bunnings-primary-orange w-full appearance-none rounded-md border bg-white px-4 py-3 focus:ring-2 focus:ring-offset-2 focus:outline-none">
              <option value="helpful">Sort by Most Helpful</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="rating-high">Highest Rating</option>
              <option value="rating-low">Lowest Rating</option>
            </select>
            <ChevronDown className="text-bunnings-neutral-dark-gray pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
          </div> */}
        </div>
      </div>

      {/* Review Count */}
      <div className="border-bunnings-neutral-medium-gray border-t pt-4">
        <p className="text-bunnings-base text-bunnings-neutral-dark-gray">
          {startReview} – {endReview} of {totalReviews} Review
          {totalReviews !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}

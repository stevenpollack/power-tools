import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { findFirstSentence, getMoodColors } from "@/lib/helpers";
import type { Review } from "@/lib/types";

interface FloatingCardProps {
  review: Review;
  onCardClick?: (reviewId: string) => void;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  review,
  onCardClick,
}) => {
  const handleClick = () => {
    onCardClick?.(review.id);
  };

  const firstSentence = findFirstSentence(review.content);
  const isTruncated = firstSentence.length < review.content.length;
  const truncatedText = firstSentence + "...";

  return (
    <Card
      onClick={handleClick}
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300",
        "w-full hover:scale-[1.02] hover:shadow-xl",
        // Override shadcn Card defaults for natural height
        "h-auto flex-none gap-0 py-0",
      )}
    >
      <CardContent className="relative flex flex-col p-4">
        {/* Tool name header - clean and prominent */}
        <div className="mb-3 flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {review.toolName}
            </h3>
          </div>

          {/* Featured indicator */}
          {review.featured && (
            <div className="ml-2 flex-shrink-0">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
            </div>
          )}
        </div>

        {/* Review content - truncated with styling */}
        <div className="mb-4">
          <p
            className={cn(
              "text-sm leading-relaxed",
              isTruncated ? "text-gray-600 italic" : "text-gray-700",
            )}
          >
            {truncatedText}
          </p>
        </div>

        {/* Consolidated metadata footer */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-2">
          <div className="flex items-center gap-2">
            <span
              className="truncate text-xs font-medium text-gray-700"
              title={review.authorName}
            >
              {review.authorName}
            </span>
            <Badge
              variant="outline"
              className={cn("text-xs", getMoodColors(review.mood).variant)}
            >
              {review.mood}
            </Badge>
          </div>
          <span className="flex-shrink-0 text-xs text-gray-400">
            {review.readingTime}m read
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

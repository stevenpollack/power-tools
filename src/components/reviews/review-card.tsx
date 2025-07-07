import * as React from "react";
import { Check, X, Share2 } from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";
import { VotingButtons } from "@/components/ui/voting-buttons";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: {
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
  };
  className?: string;
  onShare?: () => void;
}

export function ReviewCard({ review, className, onShare }: ReviewCardProps) {
  // Format the date to be relative (e.g., "2 years ago")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div
      className={cn(
        "border-bunnings-neutral-medium-gray space-y-3 border-b pb-6 last:border-b-0",
        "mobile-first: p-4",
        "sm:p-0 sm:pb-6",
        className,
      )}
    >
      {/* Rating and title */}
      <div className="space-y-2">
        <StarRating rating={review.rating} size="sm" />
        <h3 className="font-bunnings text-bunnings-base text-bunnings-neutral-dark-gray font-medium">
          {/* Extract title from use case or content */}
          {review.useCase}
        </h3>
      </div>

      {/* User info */}
      <div className="text-bunnings-sm text-bunnings-neutral-dark-gray flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{review.displayName}</span>
          {review.verifiedPurchaser && (
            <div className="bg-bunnings-primary-green flex items-center gap-1 rounded-full px-2 py-0.5 text-xs text-white">
              <Check className="h-3 w-3" />
              <span>VERIFIED PURCHASER</span>
            </div>
          )}
        </div>
        <div className="text-bunnings-neutral-dark-gray flex items-center gap-2">
          <span>{formatDate(review.dateCreated)}</span>
          <span>•</span>
          <span>{review.userCategory}</span>
        </div>
      </div>

      {/* Review content */}
      <div className="text-bunnings-base text-bunnings-neutral-dark-gray leading-relaxed">
        {review.content}
      </div>

      {/* Recommendation status */}
      <div className="flex items-center gap-2">
        {review.recommendsProduct ? (
          <>
            <Check className="text-bunnings-primary-green h-4 w-4" />
            <span className="text-bunnings-sm text-bunnings-neutral-dark-gray">
              Yes, I recommend this product.
            </span>
          </>
        ) : (
          <>
            <X className="text-bunnings-primary-red h-4 w-4" />
            <span className="text-bunnings-sm text-bunnings-neutral-dark-gray">
              No, I do not recommend this product.
            </span>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <VotingButtons
          helpfulCount={review.helpfulVotes}
          unhelpfulCount={review.unhelpfulVotes}
        />

        <button
          onClick={onShare}
          className={cn(
            "text-bunnings-sm text-bunnings-primary-green flex items-center gap-1 self-start transition-colors",
            "focus:ring-bunnings-primary-orange rounded hover:underline focus:ring-2 focus:ring-offset-2 focus:outline-none",
          )}
        >
          <Share2 className="h-3 w-3" />
          Share
        </button>
      </div>
    </div>
  );
}

import * as React from "react";
import { useState } from "react";
import { Check, X, Share2, ThumbsUp, ThumbsDown } from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";
import { ReviewShareModal } from "@/components/ReviewShareModal";
import { cn } from "@/lib/utils";
import type { ReviewForUI } from "@/lib/types";

interface ReviewCardProps {
  review: ReviewForUI;
  className?: string;
  onShare?: () => void;
  id?: string;
}

export function ReviewCard({
  review,
  className,
  onShare,
  id,
}: ReviewCardProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
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
      id={id}
      className={cn(
        "border-bunnings-neutral-medium-gray space-y-3 border-b pb-6 last:border-b-0",
        "p-4 sm:p-6",
        // Add extra padding when highlighted (detected by background color)
        className?.includes("bg-orange") && "p-6 sm:p-8",
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
        <div className="flex flex-col gap-1">
          <span className="text-bunnings-base">{review.displayName}</span>
          <div className="text-bunnings-neutral-dark-gray flex items-center gap-2">
            <span>{formatDate(review.dateCreated)}</span>
            <span>•</span>
            <span>{review.userCategory}</span>
          </div>
          {review.verifiedPurchaser && (
            <div className="flex items-center gap-1">
              <Check className="h-5 w-5 rounded-full bg-[#00A651] p-0.5 text-white" />
              <span className="text-bunnings-xs text-bunnings-neutral-medium-gray uppercase">
                Verified Purchaser
              </span>
            </div>
          )}
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
            <Check className="h-4 w-4 rounded-full bg-black p-0.5 text-white" />
            <span className="text-bunnings-sm text-bunnings-neutral-dark-gray">
              Yes, I recommend this product.
            </span>
          </>
        ) : (
          <>
            <X className="h-4 w-4 rounded-full border border-black bg-black stroke-2 p-0 text-white" />
            <span className="text-bunnings-sm text-bunnings-neutral-dark-gray">
              No, I do not recommend this product.
            </span>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <span className="text-bunnings-sm text-bunnings-neutral-dark-gray">
          Helpful?
        </span>
        <div className="flex items-center gap-2">
          <button
            className={cn(
              "text-bunnings-sm flex items-center gap-1 rounded-md px-3 py-1 transition-colors",
              "hover:bg-bunnings-neutral-light-gray",
              "focus:ring-bunnings-primary-orange focus:ring-2 focus:ring-offset-2 focus:outline-none",
            )}
          >
            <ThumbsUp className="stroke-bunnings-secondary-green h-5 w-5 stroke-1" />
            <span>({review.helpfulVotes})</span>
          </button>
          <button
            className={cn(
              "text-bunnings-sm flex items-center gap-1 rounded-md px-3 py-1 transition-colors",
              "hover:bg-bunnings-neutral-light-gray",
              "focus:ring-bunnings-primary-orange focus:ring-2 focus:ring-offset-2 focus:outline-none",
            )}
          >
            <ThumbsDown className="stroke-bunnings-secondary-green h-5 w-5 stroke-1" />
            <span>({review.unhelpfulVotes})</span>
          </button>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className={cn(
              "text-bunnings-sm flex items-center gap-1 rounded-md px-3 py-1 transition-colors",
              "hover:bg-bunnings-neutral-light-gray",
              "focus:ring-bunnings-primary-orange focus:ring-2 focus:ring-offset-2 focus:outline-none",
            )}
          >
            <Share2 className="h-5 w-5 stroke-1" />
            Share
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {review.authorName && review.toolName && review.id && (
        <ReviewShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          reviewData={{
            slug: review.id,
            content: review.content,
          }}
          authorName={review.authorName}
          toolName={review.toolName}
        />
      )}
    </div>
  );
}

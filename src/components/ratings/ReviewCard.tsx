import React from "react";
import type { ReviewData } from "@/lib/types";
import { StarRating } from "./StarRating";
import { BarRating } from "./BarRating";
import { HelpfulButtonGroup } from "./HelpfulButtonGroup";

interface ReviewCardProps {
  review: ReviewData;
  onShare: (review: ReviewData) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, onShare }) => {
  return (
    <div className="flex flex-col gap-2 rounded bg-white p-4 shadow">
      <StarRating rating={review.rating ?? 0} />
      <BarRating label="Quality" value={review.qualityRating ?? 0} />
      <BarRating label="Value" value={review.valueRating ?? 0} />
      <HelpfulButtonGroup />
      <button
        onClick={() => onShare(review)}
        className="flex items-center gap-1 rounded bg-blue-100 px-3 py-1 text-blue-700 hover:bg-blue-200"
        aria-label="Share"
      >
        <span role="img" aria-label="share">
          🔗
        </span>{" "}
        Share
      </button>
    </div>
  );
};

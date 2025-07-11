import { type FC } from "react";
import type { ReviewData } from "@/lib/types";
import { ReviewCard } from "./ReviewCard";

interface ReviewsListProps {
  reviews: ReviewData[];
  onShare: (review: ReviewData) => void;
}

export const ReviewsList: FC<ReviewsListProps> = ({ reviews, onShare }) => {
  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => (
        <ReviewCard key={review.slug} review={review} onShare={onShare} />
      ))}
    </div>
  );
};

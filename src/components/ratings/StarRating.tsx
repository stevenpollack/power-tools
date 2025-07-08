import { type FC } from "react";

interface StarRatingProps {
  rating: number;
}

export const StarRating: FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= Math.round(rating)
              ? "text-bunnings-rating-star-yellow"
              : "text-gray-200"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
};

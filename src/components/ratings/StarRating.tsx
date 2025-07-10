import { cn } from "@/lib/utils";
import { StarHalf, Star } from "lucide-react";
import { type FC } from "react";

interface StarRatingProps {
  rating: number;
  className?: string;
}

export const StarRating: FC<StarRatingProps> = ({ rating, className }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {/* Render full stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star
          key={`full-${index}`}
          className={cn("text-bunnings-rating-star-yellow h-4 w-4", className)}
          fill="currentColor"
        />
      ))}

      {/* Render half star if needed */}
      {hasHalfStar && (
        <StarHalf
          key="half"
          className={cn("text-bunnings-rating-star-yellow h-4 w-4", className)}
          fill="currentColor"
        />
      )}

      {/* Render empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star
          key={`empty-${index}`}
          className={cn("h-4 w-4 text-gray-200", className)}
          fill="currentColor"
        />
      ))}
    </div>
  );
};

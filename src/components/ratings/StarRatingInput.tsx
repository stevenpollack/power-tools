import { Star } from "lucide-react";
import { type FC, useState } from "react";

export const StarRatingInput: FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            (hovered !== null && star <= hovered
              ? "bunnings-rating-star-yellow"
              : "text-gray-200") + " cursor-pointer text-2xl transition-colors"
          }
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
        >
          <Star />
        </span>
      ))}
    </div>
  );
};

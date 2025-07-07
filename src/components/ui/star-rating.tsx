import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({
  rating,
  size = "md",
  className,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const stars = Array.from({ length: 5 }, (_, i) => {
    const starRating = i + 1;
    const isFilled = starRating <= rating;
    const isHalfFilled = starRating - 0.5 <= rating && rating < starRating;

    return (
      <Star
        key={i}
        className={cn(
          sizeClasses[size],
          "transition-colors",
          isFilled || isHalfFilled
            ? "fill-bunnings-rating-star-yellow text-bunnings-rating-star-yellow"
            : "fill-bunnings-neutral-medium-gray text-bunnings-neutral-medium-gray",
        )}
      />
    );
  });

  return (
    <div className={cn("flex items-center gap-0.5", className)}>{stars}</div>
  );
}

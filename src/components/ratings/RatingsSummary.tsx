import { type FC } from "react";
import { StarRating } from "./StarRating";

interface RatingsSummaryProps {
  averageRating: number;
  reviewCount: number;
}

export const RatingsSummary: FC<RatingsSummaryProps> = ({
  averageRating,
  reviewCount,
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-bunnings-neutral-charcoal text-3xl font-bold">
        {averageRating.toFixed(1)}
      </span>
      <div className="flex flex-col">
        <StarRating rating={averageRating} />
        <span className="text-xs text-gray-500">({reviewCount} reviews)</span>
      </div>
    </div>
  );
};

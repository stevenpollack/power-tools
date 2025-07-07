import React from "react";

interface RatingsSummaryProps {
  averageRating: number;
  reviewCount: number;
}

export const RatingsSummary: React.FC<RatingsSummaryProps> = ({
  averageRating,
  reviewCount,
}) => {
  // Render stars (filled to averageRating, rounded to nearest half)
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i + 1 <= Math.round(averageRating);
    return (
      <span key={i} className={filled ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    );
  });

  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl font-bold text-gray-900">
        {averageRating.toFixed(1)}
      </span>
      <div className="flex items-center text-lg">{stars}</div>
      <span className="text-sm text-gray-600">({reviewCount} reviews)</span>
    </div>
  );
};

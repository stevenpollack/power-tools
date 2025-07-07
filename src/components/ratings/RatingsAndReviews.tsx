import { type FC, useState } from "react";
import type { ToolData, ReviewData } from "@/lib/types";
import { RatingsSnapshot } from "./RatingsSnapshot";
import { RatingsSummary } from "./RatingsSummary";
import { AverageCustomerRatings } from "./AverageCustomerRatings";
import { ReviewThisProduct } from "./ReviewThisProduct";
import { ReviewsList } from "./ReviewsList";
import { ShareModal } from "./ShareModal";

// TODO: Implement data loading logic for tool and reviews based on toolSlug
// import { getToolBySlug, getReviewsForTool } from "@/lib/data";

interface RatingsAndReviewsProps {
  tool: ToolData;
  reviews: ReviewData[];
  authorNames: Record<string, string>; // author slug to display name
}

export const RatingsAndReviews: FC<RatingsAndReviewsProps> = ({
  tool,
  reviews,
  authorNames,
}) => {
  // Ratings calculations
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let qualitySum = 0,
    valueSum = 0,
    ratingSum = 0,
    ratingCount = 0;
  reviews.forEach((r) => {
    if (r.rating) {
      counts[r.rating as keyof typeof counts]++;
      ratingSum += r.rating;
      ratingCount++;
    }
    if (r.qualityRating) qualitySum += r.qualityRating;
    if (r.valueRating) valueSum += r.valueRating;
  });
  const averageRating = ratingCount ? ratingSum / ratingCount : 0;
  const averageQuality = reviews.length ? qualitySum / reviews.length : 0;
  const averageValue = reviews.length ? valueSum / reviews.length : 0;

  // Share modal state
  const [shareOpen, setShareOpen] = useState(false);
  const [shareReview, setShareReview] = useState<ReviewData | null>(null);

  const handleShare = (review: ReviewData) => {
    setShareReview(review);
    setShareOpen(true);
  };

  return (
    <section className="mx-auto w-full max-w-xl p-4">
      <RatingsSnapshot counts={counts} />
      <div className="my-4">
        <RatingsSummary
          averageRating={averageRating}
          reviewCount={reviews.length}
        />
      </div>
      <div className="my-4">
        <AverageCustomerRatings quality={averageQuality} value={averageValue} />
      </div>
      <div className="my-4">
        <ReviewThisProduct />
      </div>
      <ReviewsList reviews={reviews} onShare={handleShare} />
      {shareReview && (
        <ShareModal
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          review={shareReview}
          toolName={tool.name}
          authorName={authorNames[String(shareReview.author)] || ""}
        />
      )}
    </section>
  );
};

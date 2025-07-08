import { type FC, useState } from "react";
import type { ReviewData, ReviewWithData } from "@/lib/types";
import { RatingsSnapshot } from "./RatingsSnapshot";
import { RatingsSummary } from "./RatingsSummary";
import { AverageCustomerRatings } from "./AverageCustomerRatings";
import { ReviewThisProduct } from "./ReviewThisProduct";
import { ReviewsList } from "./ReviewsList";
import { ShareModal } from "./ShareModal";

interface RatingsAndReviewsProps {
  reviews: ReviewWithData[];
}

export const RatingsAndReviews: FC<RatingsAndReviewsProps> = ({ reviews }) => {
  // Ratings calculations
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let qualitySum = 0,
    valueSum = 0,
    ratingSum = 0,
    ratingCount = 0;
  reviews.forEach(({ review }) => {
    if (review.data.rating) {
      counts[review.data.rating as keyof typeof counts]++;
      ratingSum += review.data.rating;
      ratingCount++;
    }
    if (review.data.qualityRating) {
      qualitySum += review.data.qualityRating;
    }
    if (review.data.valueRating) {
      valueSum += review.data.valueRating;
    }
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
      <hr className="my-6 border-gray-200" />
      <div className="my-4">
        <ReviewThisProduct />
      </div>
      <hr className="my-6 border-gray-200" />
      <ReviewsList
        reviews={reviews.map(({ review }) => review.data)}
        onShare={handleShare}
      />
      {shareReview && (
        <ShareModal
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          review={shareReview}
          toolName={reviews[0]?.tool.data.name ?? ""}
          authorName={reviews[0]?.author.data.name ?? ""}
        />
      )}
    </section>
  );
};

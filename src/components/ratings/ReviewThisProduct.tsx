import { type FC } from "react";
import { StarRatingInput } from "./StarRatingInput";

export const ReviewThisProduct: FC = () => {
  return (
    <div className="flex flex-col items-center gap-2 rounded border border-gray-200 bg-gray-50 p-4">
      <StarRatingInput />
      <div className="text-xs text-gray-500">
        Adding a review will require a valid email for verification.
      </div>
    </div>
  );
};

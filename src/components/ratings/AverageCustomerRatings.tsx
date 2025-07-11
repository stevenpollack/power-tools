import { type FC } from "react";
import { BarRating } from "./BarRating";

interface AverageCustomerRatingsProps {
  quality: number;
  value: number;
}

export const AverageCustomerRatings: FC<AverageCustomerRatingsProps> = ({
  quality,
  value,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <BarRating label="Quality" value={quality} />
      <BarRating label="Value" value={value} />
    </div>
  );
};

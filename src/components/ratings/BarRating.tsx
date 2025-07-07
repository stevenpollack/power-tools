import { type FC } from "react";

interface BarRatingProps {
  label: string;
  value: number;
  max?: number;
}

export const BarRating: FC<BarRatingProps> = ({ label, value, max = 5 }) => {
  const percent = Math.max(0, Math.min(1, value / max)) * 100;
  return (
    <div className="flex items-center gap-2">
      <span className="w-16 text-sm text-gray-700">{label}</span>
      <div className="relative h-3 flex-1 rounded bg-gray-200">
        <div
          className="absolute top-0 left-0 h-3 rounded bg-green-600"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-8 text-right text-sm text-gray-700">
        {value.toFixed(1)}
      </span>
    </div>
  );
};

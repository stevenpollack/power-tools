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
      <span className="text-bunnings-neutral-charcoal w-16 text-sm">
        {label}
      </span>
      <div className="relative h-3 flex-1 rounded bg-gray-200">
        <div
          className="bg-bunnings-primary-orange absolute top-0 left-0 h-3 rounded"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-bunnings-neutral-charcoal w-8 text-right text-sm">
        {value.toFixed(1)}
      </span>
    </div>
  );
};

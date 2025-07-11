import { type FC } from "react";

interface RatingsSnapshotProps {
  counts: { 5: number; 4: number; 3: number; 2: number; 1: number };
}

export const RatingsSnapshot: FC<RatingsSnapshotProps> = ({ counts }) => {
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="flex flex-col-reverse gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const count = counts[star as keyof typeof counts] || 0;
        const percent = total > 0 ? (count / total) * 100 : 0;
        return (
          <div key={star} className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-right">
              <span className="font-bold">{star}</span>
              <span className="text-gray-500">stars</span>
            </div>
            <div className="relative h-2 flex-1 rounded-full bg-gray-200">
              <div
                className="absolute top-0 left-0 h-2 rounded-full bg-gray-400"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="w-4 text-right">{count}</span>
          </div>
        );
      })}
    </div>
  );
};

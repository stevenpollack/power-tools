import React from "react";

interface RatingsSnapshotProps {
  counts: { 5: number; 4: number; 3: number; 2: number; 1: number };
}

export const RatingsSnapshot: React.FC<RatingsSnapshotProps> = ({ counts }) => {
  return (
    <div className="flex flex-col gap-2">
      {[5, 4, 3, 2, 1].map((star) => (
        <div key={star} className="flex items-center gap-2">
          <span className="w-6 text-right font-medium">{star}★</span>
          {/* TODO: Replace with actual bar visualization */}
          <div className="mx-2 h-2 flex-1 rounded bg-gray-200" />
          <span className="w-8 text-right text-sm text-gray-600">
            {counts[star as keyof RatingsSnapshotProps["counts"]]}
          </span>
        </div>
      ))}
    </div>
  );
};

import { type FC } from "react";
import type { ReviewData } from "@/lib/types";
// TODO: Replace with actual ShareButtons and Dialog imports

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  review: ReviewData;
}

export const ShareModal: FC<ShareModalProps> = ({ open, onClose, review }) => {
  // TODO: Replace with actual Dialog and ShareButtons usage
  return open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded bg-white p-6">
        <div className="mb-2 font-bold">Share this review</div>
        <div className="mb-4">ShareButtons goes here</div>
        <button
          onClick={onClose}
          className="mt-2 rounded bg-gray-200 px-3 py-1"
        >
          Close
        </button>
      </div>
    </div>
  ) : null;
};

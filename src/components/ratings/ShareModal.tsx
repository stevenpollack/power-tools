import { type FC } from "react";
import type { ReviewData } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ShareButtons } from "@/components/ShareButtons";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  review: ReviewData;
  toolName: string;
  authorName: string;
}

export const ShareModal: FC<ShareModalProps> = ({
  open,
  onClose,
  review,
  toolName,
  authorName,
}) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Share this review</DialogTitle>
        </DialogHeader>
        <ShareButtons toolName={toolName} authorName={authorName} />
        <DialogClose asChild>
          <button className="mt-4 w-full rounded bg-gray-200 px-3 py-2">
            Close
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

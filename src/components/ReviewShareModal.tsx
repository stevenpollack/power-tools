import { useState, useEffect } from "react";
import { Twitter, ClipboardCopy } from "lucide-react";
import { Reddit } from "@/components/icons/Reddit";
import { Bluesky } from "@/components/icons/Bluesky";
import { Threads } from "@/components/icons/Threads";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ReviewShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewData: {
    slug: string;
    content: string; // For excerpt version
  };
  authorName: string; // Passed separately from parent
  toolName: string; // Passed separately from parent
}

const icons = {
  twitter: <Twitter className="h-5 w-5" />,
  reddit: <Reddit className="h-5 w-5" />,
  bluesky: <Bluesky className="h-5 w-5" />,
  threads: <Threads className="h-5 w-5" />,
  copy: <ClipboardCopy className="h-5 w-5" />,
};

const platformLabels = {
  twitter: "Twitter",
  reddit: "Reddit",
  bluesky: "Bluesky",
  threads: "Threads",
  copy: "Copy Link",
};

export function ReviewShareModal({
  isOpen,
  onClose,
  reviewData,
  authorName,
  toolName,
}: ReviewShareModalProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [copyText, setCopyText] = useState("Copy Link");

  useEffect(() => {
    if (isOpen) {
      // Construct the shareable URL with review parameter
      const baseUrl = `${window.location.origin}${window.location.pathname}`;
      const url = `${baseUrl}?review=${reviewData.slug}`;
      setShareUrl(url);
    }
  }, [isOpen, reviewData.slug]);

  // Simple share text version - can be easily switched to excerpt version
  const shareText = `What if ${authorName} reviewed a ${toolName}?`;

  // Excerpt version (for future use):
  // const getExcerptText = () => {
  //   const excerpt = reviewData.content.slice(0, 50);
  //   return `${authorName}'s review of ${toolName}: "${excerpt}..." Read more:`;
  // };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy Link"), 2000);
    } catch (err) {
      console.error("Could not copy text: ", err);
      // Fallback for older browsers
      alert("Link copied to clipboard!");
    }
  };

  const shareActions: Record<keyof typeof icons, () => void> = {
    twitter: () => {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
        "_blank",
        "width=600,height=400",
      );
    },
    reddit: () => {
      window.open(
        `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`,
        "_blank",
        "width=600,height=600",
      );
    },
    bluesky: () => {
      window.open(
        `https://bsky.app/intent/compose?text=${encodedText} ${encodedUrl}`,
        "_blank",
        "width=600,height=400",
      );
    },
    threads: () => {
      window.open(
        `https://www.threads.net/share?text=${encodedText}&url=${encodedUrl}`,
        "_blank",
        "width=600,height=400",
      );
    },
    copy: handleCopyToClipboard,
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-bunnings-xl font-bunnings text-bunnings-secondary-green font-bold">
            Share this review
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-bunnings-base text-bunnings-neutral-dark-gray">
            Share {authorName}'s review of the {toolName} with your network:
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
            {(Object.keys(icons) as Array<keyof typeof icons>).map(
              (platform) => (
                <button
                  key={platform}
                  onClick={shareActions[platform]}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-2xl px-4 py-3 transition-colors",
                    "text-bunnings-sm font-medium",
                    "bg-bunnings-primary-orange",
                    "hover:bg-bunnings-secondary-green/90 hover:text-white",
                    "focus:ring-bunnings-primary-orange focus:ring-2 focus:ring-offset-2 focus:outline-none",
                  )}
                  aria-label={`Share on ${platformLabels[platform]}`}
                >
                  {icons[platform]}
                  <span className="sm:hidden">
                    {platform === "copy" ? copyText : platformLabels[platform]}
                  </span>
                </button>
              ),
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

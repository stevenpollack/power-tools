import React, { useState, useEffect } from "react";
import { Twitter, ClipboardCopy } from "lucide-react";
import { Reddit } from "@/components/icons/Reddit";
import { Bluesky } from "@/components/icons/Bluesky";
import { Threads } from "@/components/icons/Threads";

interface ShareButtonsProps {
  toolName: string;
  authorName: string;
}

const icons = {
  twitter: <Twitter className="h-5 w-5" />,
  reddit: <Reddit className="h-5 w-5" />,
  bluesky: <Bluesky className="h-5 w-5" />,
  threads: <Threads className="h-5 w-5" />,
  copy: <ClipboardCopy className="h-5 w-5" />,
};

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  toolName,
  authorName,
}) => {
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const shareText = `What if ${authorName} reviewed a ${toolName}? Come along for the ride:`;
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedText = encodeURIComponent(shareText);

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
    copy: () => {
      navigator.clipboard.writeText(`${shareText} ${pageUrl}`).then(
        () => alert("Link copied to clipboard!"),
        (err) => console.error("Could not copy text: ", err),
      );
    },
  };

  return (
    <div className="flex items-center gap-2">
      {(Object.keys(icons) as Array<keyof typeof icons>).map((key) => (
        <button
          key={key}
          onClick={shareActions[key]}
          className="share-btn flex h-10 w-10 items-center justify-center rounded-full border bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-800"
          aria-label={`Share on ${key}`}
        >
          {icons[key]}
        </button>
      ))}
    </div>
  );
};

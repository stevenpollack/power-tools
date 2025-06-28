import { type FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { selectedCard } from "@/stores/cardStore";
import { cn } from "@/lib/utils";
import { Share2, Heart, Clock, Wrench, ExternalLink } from "lucide-react";
import type { Review } from "@/lib/types";
import { AuthorImage } from "./AuthorImage";
import { ToolImage } from "./ToolImage";

interface CardDetailsSheetProps {
  review: Review | null;
}

// Helper function to get author lifespan
const getAuthorLifespan = (authorId: string): string => {
  const lifespanMap: Record<string, string> = {
    "ernest-hemingway": "1899-1961",
    "oscar-wilde": "1854-1900",
    "virginia-woolf": "1882-1941",
    "franz-kafka": "1883-1924",
    "mark-twain": "1835-1910",
    "hp-lovecraft": "1890-1937",
    "jane-austen": "1775-1817",
    "charles-dickens": "1812-1870",
    "george-orwell": "1903-1950",
    "jack-kerouac": "1922-1969",
    "edgar-allan-poe": "1809-1849",
    "ayn-rand": "1905-1982",
  };

  return lifespanMap[authorId] || "...";
};



export const CardDetailsSheet: FC<CardDetailsSheetProps> = ({
  review,
}) => {
  const isOpen = !!review;

  const handleClose = () => {
    selectedCard.set(null);
  };

  const handleShare = async () => {
    if (!review) return;

    const shareData = {
      title: `${review.toolName} - Reviewed by ${review.authorName}`,
      text: review.excerpt,
      url: `${window.location.origin}/reviews/${review.id}`,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy URL to clipboard
        await navigator.clipboard.writeText(shareData.url);
        alert("URL copied to clipboard!");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };

  const handleLike = () => {
    // TODO: Implement like functionality
    console.log("Like clicked for review:", review?.id);
  };

  if (!review) return null;

  // Format reading time
  const readingTimeText =
    review.readingTime === 1
      ? "1 minute read"
      : `${review.readingTime} minutes read`;

  // Format date
  const formattedDate = new Date(review.dateCreated).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="flex h-full w-full max-w-2xl flex-col p-0 lg:max-w-3xl"
      >
        <SheetHeader>
          <div className="flex flex-shrink-0 items-center justify-between border-b bg-white p-6">
            <SheetTitle className="truncate text-2xl font-bold text-gray-900">
              {review.toolName}
            </SheetTitle>

            {/* Action Buttons */}
            <div className="flex flex-shrink-0 items-center gap-3">
              <Button
                variant="outline"
                size="default"
                onClick={handleShare}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={handleLike}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Heart className="h-4 w-4" />
                {review.shareCount || 0}
              </Button>
            </div>
          </div>
        </SheetHeader>

        {/* Scrollable Content */}
        <ScrollArea className="h-0 flex-1">
          <div className="space-y-6 p-6">
            {/* Author & Tool Info Section */}
            <div className="flex items-start gap-6 rounded-lg bg-gray-50 p-4">
              {/* Tool Image with Fallback */}
              <div className="flex-shrink-0">
                <ToolImage toolId={review.toolId} toolName={review.toolName} />
              </div>

              {/* Author Info */}
              <div className="min-w-0 flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <AuthorImage
                    authorId={review.authorId}
                    authorName={review.authorName}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold text-gray-900">
                      {review.authorName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {getAuthorLifespan(review.authorId)}
                    </p>
                  </div>
                </div>

                {/* All Content Badges - Consolidated */}
                <div className="flex flex-wrap gap-2">
                  {/* Mood Badge */}
                  <Badge
                    variant="outline"
                    className={cn(
                      "flex items-center gap-1",
                      review.mood === "technical" &&
                      "border-blue-500 bg-blue-50 text-blue-700",
                      review.mood === "humorous" &&
                      "border-amber-500 bg-amber-50 text-amber-700",
                      review.mood === "dramatic" &&
                      "border-red-500 bg-red-50 text-red-700",
                      review.mood === "philosophical" &&
                      "border-purple-500 bg-purple-50 text-purple-700",
                    )}
                  >
                    {review.mood}
                  </Badge>

                  {/* Reading Time Badge */}
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Clock className="h-3 w-3" />
                    {readingTimeText}
                  </Badge>

                  {/* Category Badge */}
                  {review.category && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Wrench className="h-3 w-3" />
                      {review.category}
                    </Badge>
                  )}

                  {/* Brand Badge */}
                  {review.brand && (
                    <Badge variant="outline">{review.brand}</Badge>
                  )}

                  {/* Featured Badge */}
                  {review.featured && (
                    <Badge className="bg-blue-600 text-white">Featured</Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="prose prose-lg prose-gray max-w-none">
              {review.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed text-gray-800">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Footer Metadata */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col items-start justify-between gap-3 text-sm text-gray-500 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <span>Published {formattedDate}</span>
                  <span>{review.shareCount || 0} shares</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">ID: {review.id}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() =>
                      window.open(`/reviews/${review.id}`, "_blank")
                    }
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

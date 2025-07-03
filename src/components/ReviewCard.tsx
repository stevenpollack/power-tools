import { formatRelativeTime } from "@/lib/helpers";
import type { ReviewData, AuthorData, ToolData, Review } from "@/lib/types";
import { cn } from "@/lib/utils";
import {type FC} from "react";
import { getBrandColor, getBrandInitials, getMoodColor, getToneColor } from "@/lib/constants";

type Props = {
  reviewId: Review["id"];
  dateCreated: ReviewData["dateCreated"];
  excerpt: ReviewData["excerpt"];
  toolBrand: ToolData["brand"];
  toolName: ToolData["name"];
  toolImage: ToolData["thumbnailUrl"];
  authorName: AuthorData["name"];
  mood: ReviewData["mood"];
  tone: ReviewData["tone"];
  readingTime: ReviewData["readingTime"];
}

export const ReviewCard: FC<Props> = ({
  reviewId,
  dateCreated,
  excerpt,
  toolBrand,
  toolName,
  toolImage,
  authorName,
  mood,
  tone,
  readingTime,
}) => {
  const relativeTime = formatRelativeTime(dateCreated);
  const reviewUrl = `/review/${reviewId}`;

  return (
    <a href={reviewUrl} className="review-card block group w-full text-left">
      <div className="bg-white border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 h-full flex flex-col">
        {/* Tool Image */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden border flex-shrink-0">
            {toolImage ? (
              <img
                src={toolImage.src}
                alt={`${toolBrand} ${toolName}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={cn("w-full h-full flex items-center justify-center text-white font-bold text-sm", getBrandColor(toolBrand))}
              >
                {getBrandInitials(toolBrand)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {toolName}
            </h3>
            <p className="text-sm text-gray-600">{toolBrand}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className={cn("inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border", getMoodColor(mood))}
          >
            {mood}
          </span>
          <span
            className={cn("inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border", getToneColor(tone))}
          >
            {tone}
          </span>
        </div>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 flex-1 text-sm leading-relaxed">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3 mt-auto">
          <div className="flex items-center gap-3">
            <span>by {authorName}</span>
            <span>{readingTime} min read</span>
          </div>
          <span>{relativeTime}</span>
        </div>
      </div>
    </a>
  );
}; 

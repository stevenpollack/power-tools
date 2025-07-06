import { formatRelativeTime } from "@/lib/helpers";
import type { ReviewData, AuthorData, ToolData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { type FC } from "react";
import {
  getBrandColor,
  getBrandInitials,
  getMoodColor,
  getToneColor,
} from "@/lib/constants";

type Props = Pick<
  ReviewData,
  "slug" | "dateCreated" | "excerpt" | "mood" | "tone" | "llm"
> & {
  toolBrand: ToolData["brand"];
  toolName: ToolData["name"];
  toolImage: ToolData["thumbnailUrl"];
  authorName: AuthorData["name"];
  variant?: "default" | "fixedHeight";
};

export const ReviewCard: FC<Props> = ({
  slug,
  dateCreated,
  excerpt,
  toolBrand,
  toolName,
  toolImage,
  authorName,
  mood,
  tone,
  llm,
  variant = "default",
}) => {
  const relativeTime = formatRelativeTime(dateCreated);
  const reviewUrl = `/review/${slug}`;

  return (
    <a
      href={reviewUrl}
      className={cn("review-card group block w-full text-left", {
        "h-90": variant === "fixedHeight",
      })}
    >
      <div className="flex h-full flex-col rounded-xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Tool Image */}
        <div className="mb-4 flex items-center gap-4">
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border">
            {toolImage ? (
              <img
                src={toolImage.src}
                alt={`${toolBrand} ${toolName}`}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className={cn(
                  "flex h-full w-full items-center justify-center text-sm font-bold text-white",
                  getBrandColor(toolBrand),
                )}
              >
                {getBrandInitials(toolBrand)}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
              {toolName}
            </h3>
            <p className="text-sm text-gray-600">{toolBrand}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-3 flex flex-wrap gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
              getMoodColor(mood),
            )}
          >
            {mood}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
              getToneColor(tone),
            )}
          >
            {tone}
          </span>
        </div>

        {/* Excerpt */}
        <p
          className={cn("mb-4 flex-1 text-sm leading-relaxed text-gray-600", {
            "line-clamp-4": variant === "fixedHeight",
          })}
        >
          {excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t pt-3 text-xs text-gray-500">
          <span>by {authorName}</span>
          <span className="font-mono">{llm}</span>
          <span>{relativeTime}</span>
        </div>
      </div>
    </a>
  );
};

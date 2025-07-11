import { Eye } from "lucide-react";
import { StarRating } from "./star-rating";
import type { Tool } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
  optimizedImageUrl: string;
  className?: string;
}

export function ToolCard({
  tool,
  optimizedImageUrl,
  className,
}: ToolCardProps) {
  const { id, data } = tool;
  const { name, popularity, pricing } = data;

  return (
    <div
      className={cn(
        "card flex h-full flex-col bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md",
        className,
      )}
    >
      {/* Mobile: Horizontal layout | Tablet+: Vertical layout */}
      <div className="flex flex-grow gap-4 md:flex-col md:gap-3">
        {/* Image section */}
        <div className="flex flex-shrink-0 items-center md:w-full md:justify-center">
          <img
            src={optimizedImageUrl}
            alt={name}
            className="h-30 w-30 rounded-lg object-cover"
            width={120}
            height={120}
          />
        </div>

        {/* Content section (mobile) / Tool name section (tablet+) */}
        <div className="flex flex-1 flex-col gap-2 md:flex-none">
          <p className="text-bunnings-sm text-bunnings-neutral-charcoal leading-tight">
            {name}
          </p>

          {/* Rating section (visible on mobile, hidden on tablet+ to be moved below) */}
          <div className="flex gap-2 md:hidden">
            <StarRating rating={popularity.averageRating} />
            <span className="text-bunnings-2xs text-bunnings-neutral-charcoal">
              {popularity.averageRating.toFixed(1)}&nbsp;(
              {popularity.reviewCount})
            </span>
          </div>
        </div>
      </div>

      {/* Bottom section (tablet+ only) - Rating + Price/Button grouped together */}
      <div className="hidden md:mt-auto md:flex md:flex-col md:gap-3">
        {/* Rating section */}
        <div className="flex justify-start gap-4">
          <StarRating rating={popularity.averageRating} />
          <span className="text-bunnings-2xs text-bunnings-neutral-charcoal">
            {popularity.averageRating.toFixed(1)}&nbsp;({popularity.reviewCount}
            )
          </span>
        </div>

        {/* Price & Button section */}
        <div className="flex items-center justify-between gap-5">
          {/* Price */}
          <div className="flex-1">
            <span className="font-bunnings-price text-right text-2xl font-bold text-gray-900">
              ${pricing.currentPrice}
            </span>
          </div>

          {/* Action Button */}
          <a
            href={`/tool/v2/${id}`}
            className="btn btn-square bg-bunnings-primary-orange hover:bg-bunnings-primary-orange border-0 text-black shadow-sm transition-all duration-200 hover:shadow-md"
            aria-label={`View details for ${name}`}
          >
            <Eye className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Price & Button section (mobile only) */}
      <div className="mt-4 flex items-center justify-between gap-5 md:hidden">
        {/* Price */}
        <div className="flex-1">
          <span className="font-bunnings-price text-right text-2xl font-bold text-gray-900">
            ${pricing.currentPrice}
          </span>
        </div>

        {/* Action Button */}
        <a
          href={`/tool/v2/${id}`}
          className="btn btn-square bg-bunnings-primary-orange hover:bg-bunnings-primary-orange border-0 text-black shadow-sm transition-all duration-200 hover:shadow-md"
          aria-label={`View details for ${name}`}
        >
          <Eye className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

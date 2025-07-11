import React from "react";

interface Props {
  slug: string;
  toolId: string;
  toolBrand: string;
  toolName: string;
  toolImage: { src: string; width: number; height: number; format: string };
  authorName: string;
  excerpt: string;
}

export function ReviewCardV2React({
  slug,
  toolId,
  toolBrand,
  toolName,
  toolImage,
  authorName,
  excerpt,
}: Props) {
  // Link to tool page with review anchor for deep linking
  const reviewUrl = `/tool/${toolId}?review=${slug}`;

  return (
    <a href={reviewUrl} className="review-card-v2 group block w-full text-left">
      <div className="border-bunnings-neutral-medium-gray hover:border-bunnings-secondary-green rounded-lg border-2 bg-white p-6 transition-all duration-300 hover:shadow-xl">
        {/* Tool Image - Centered, prominent */}
        <div className="mb-4 flex justify-center">
          <img
            src={toolImage.src}
            alt={`${toolBrand} ${toolName}`}
            className="border-bunnings-neutral-light-gray h-20 w-20 rounded-lg border object-cover"
            width="80"
            height="80"
            loading="lazy"
          />
        </div>

        {/* Tool Identification */}
        <div className="mb-4 text-center">
          <h3 className="text-bunnings-neutral-charcoal mb-1 line-clamp-2 text-lg font-semibold">
            {toolName}
          </h3>
          <p className="text-bunnings-neutral-medium-gray text-sm">
            {toolBrand}
          </p>
        </div>

        {/* Review Preview */}
        <p className="text-bunnings-neutral-dark-gray mb-4 text-sm leading-relaxed">
          {excerpt}
        </p>

        {/* Author Credit */}
        <div className="border-bunnings-neutral-light-gray border-t pt-3 text-center">
          <span className="text-bunnings-neutral-medium-gray text-sm">
            by {authorName}
          </span>
        </div>
      </div>
    </a>
  );
} 

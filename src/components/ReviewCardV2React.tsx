import React from "react";

interface Props {
  slug: string;
  toolId: string;
  toolBrand: string;
  toolName: string;
  toolImage: { src: string; width: number; height: number; format: string };
  authorName: string;
  authorSlug: string;
  authorHeadshot: string | null;
  excerpt: string;
}

export function ReviewCardV2React({
  slug,
  toolId,
  toolBrand,
  toolName,
  toolImage,
  authorName,
  authorSlug,
  authorHeadshot,
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
        </div>

        {/* Review Preview */}
        <p className="text-bunnings-neutral-dark-gray mb-4 text-sm leading-relaxed">
          {excerpt}
        </p>

        {/* Author Credit */}
        <div className="border-bunnings-neutral-light-gray border-t pt-3 text-center">
          <div className="flex items-center justify-between gap-2">
            <a
              href={`/author/${authorSlug}`}
              className="text-bunnings-neutral-medium-gray hover:text-bunnings-secondary-green text-sm"
            >
              by {authorName}
            </a>
            {authorHeadshot ? (
              <img
                src={authorHeadshot}
                alt={authorName}
                className="h-12 w-12 rounded-full bg-amber-100 object-cover"
                loading="lazy"
              />
            ) : (
              <div className="bg-bunnings-neutral-medium-gray flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
                {authorName.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

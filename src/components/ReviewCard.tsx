import type { ReviewData, AuthorData, ToolData, Review } from "@/lib/types";
import {type FC} from "react";

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
  // Brand color mapping
  const brandColors: Record<string, string> = {
    milwaukee: "#E31E24",
    ryobi: "#6ABE45",
    dewalt: "#FFD320",
    dremel: "#0066CC",
    paslode: "#FF4500",
    ozito: "#FF6600",
    makita: "#00B2CC",
    bosch: "#007BC1",
  };

  const brandColor = brandColors[toolBrand.toLowerCase()] || "#6B7280";

  // Mood/Tone badge styling
  const moodStyles: Record<string, string> = {
    philosophical: "bg-indigo-100 text-indigo-800 border-indigo-200",
    technical: "bg-green-100 text-green-800 border-green-200",
    humorous: "bg-yellow-100 text-yellow-800 border-yellow-200",
    dramatic: "bg-red-100 text-red-800 border-red-200",
  };

  const toneStyles: Record<string, string> = {
    formal: "bg-slate-100 text-slate-700 border-slate-200",
    casual: "bg-emerald-100 text-emerald-700 border-emerald-200",
    satirical: "bg-orange-100 text-orange-700 border-orange-200",
    earnest: "bg-purple-100 text-purple-700 border-purple-200",
  };

  // Format date to relative time
  function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 14) return "1 week ago";
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 60) return "1 month ago";
    return `${Math.floor(diffInDays / 30)} months ago`;
  }

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
                className="w-full h-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: brandColor }}
              >
                {toolBrand.slice(0, 2).toUpperCase()}
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
            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${moodStyles[mood]}`}
          >
            {mood}
          </span>
          <span
            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${toneStyles[tone]}`}
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

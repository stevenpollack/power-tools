import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Review } from "@/lib/types";

interface FloatingCardProps {
  review: Review;
  onCardClick?: (reviewId: string) => void;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({ 
  review,
  onCardClick 
}) => {
  const handleClick = () => {
    onCardClick?.(review.id);
  };

  // Truncate after first sentence for better intrigue
  const findFirstSentence = (text: string) => {
    // Look for sentence endings: period, exclamation, question mark
    const sentenceEnders = /[.!?]/;
    const match = text.match(sentenceEnders);
    
    if (match && match.index !== undefined) {
      // Include the punctuation mark and stop there
      return text.substring(0, match.index + 1);
    }
    
    // Fallback: if no sentence ending found, truncate at 120 chars
    return text.length > 120 ? text.substring(0, 120) + "..." : text;
  };

  const firstSentence = findFirstSentence(review.content);
  const isTruncated = firstSentence.length < review.content.length;
  const truncatedText = firstSentence;

  // Generate author initials (e.g., "Ernest Hemingway" -> "EH")
  const authorInitials = review.authorName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <Card
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden rounded-lg shadow-md transition-all duration-300 cursor-pointer",
        "w-full hover:shadow-xl hover:scale-[1.02]",
        // Override shadcn Card defaults for natural height
        "flex-none h-auto gap-0 py-0"
      )}
          >
      <CardContent className="p-4 relative flex flex-col">
        {/* Tool name and mood in header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {review.toolName}
            </h3>
            <Badge variant="outline" className={cn(
              "text-xs mt-1",
              review.mood === "technical" && "border-blue-600 text-blue-800 bg-blue-50",
              review.mood === "humorous" && "border-amber-600 text-amber-800 bg-amber-50",
              review.mood === "dramatic" && "border-red-600 text-red-800 bg-red-50",
              review.mood === "philosophical" && "border-purple-600 text-purple-800 bg-purple-50"
            )}>
              {review.mood}
            </Badge>
          </div>
          
          {/* Featured indicator */}
          {review.featured && (
            <div className="flex-shrink-0 ml-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
          )}
        </div>

        {/* Review content - truncated with styling */}
        <div className="mb-4">
          <p className={cn(
            "text-sm leading-relaxed",
            isTruncated ? "italic text-gray-600" : "text-gray-700"
          )}>
            {truncatedText}
          </p>
          {isTruncated && (
            <span className="text-xs text-blue-600 font-medium mt-1 block">
              Click to read more →
            </span>
          )}
        </div>

        {/* Author attribution in footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs font-mono">
              {authorInitials}
            </Badge>
            <span className="text-xs text-gray-500 truncate" title={review.authorName}>
              {review.authorName}
            </span>
          </div>
          <span className="text-xs text-gray-400 flex-shrink-0">
            {review.readingTime}m read
          </span>
        </div>
      </CardContent>
    </Card>
  );
}; 
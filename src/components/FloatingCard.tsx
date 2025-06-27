import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@nanostores/react";
import { cardInteractions } from "@/stores/cardStore";
import { useCardInteractions } from "@/hooks/useCardInteractions";
import { cn } from "@/lib/utils";
import type { Review, CardSize } from "@/lib/types";

interface FloatingCardProps {
  review: Review;
  size?: CardSize;
  onCardClick?: (reviewId: string) => void;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({ 
  review, 
  size = "medium",
  onCardClick 
}) => {
  const $cardInteractions = useStore(cardInteractions);
  const isHovered = $cardInteractions.hoveredCard === review.id;
  const isExpanded = $cardInteractions.expandedCard === review.id;

  const { 
    isMobile, 
    handleCardInteraction, 
    handleCardHover,
    handleLongPress 
  } = useCardInteractions({
    onCardSelect: onCardClick
  });

  const handleMouseEnter = () => {
    handleCardHover(review.id);
  };

  const handleMouseLeave = () => {
    handleCardHover(null);
  };

  const handleClick = (e: React.MouseEvent) => {
    handleCardInteraction(review.id, e);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Handle long press for mobile context menu
    const longPressTimer = setTimeout(() => {
      handleLongPress(review.id);
    }, 800);

    const cleanup = () => {
      clearTimeout(longPressTimer);
      e.currentTarget.removeEventListener('touchend', cleanup);
      e.currentTarget.removeEventListener('touchmove', cleanup);
    };

    e.currentTarget.addEventListener('touchend', cleanup);
    e.currentTarget.addEventListener('touchmove', cleanup);
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer group",
        "animate-[float_3s_ease-in-out_infinite] hover:scale-[1.02]",
        size === "small" && "h-40 w-48",
        size === "medium" && "h-52 w-64", 
        size === "large" && "h-64 w-80",
        isHovered && "scale-105 shadow-2xl",
        isExpanded && "ring-2 ring-blue-500"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <CardContent className="p-4 h-full relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />
        
        {/* Author and mood badges */}
        <div className="flex gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {review.authorName}
          </Badge>
          <Badge variant="outline" className={cn(
            "text-xs",
            review.mood === "technical" && "border-blue-200 text-blue-700",
            review.mood === "humorous" && "border-yellow-200 text-yellow-700",
            review.mood === "dramatic" && "border-red-200 text-red-700",
            review.mood === "philosophical" && "border-purple-200 text-purple-700"
          )}>
            {review.mood}
          </Badge>
        </div>

        {/* Review excerpt with blur effect */}
        <div className={cn(
          "mb-4 overflow-hidden transition-all duration-300",
          !isHovered && "blur-sm",
          isHovered && "blur-none"
        )}>
          <p className="text-sm text-gray-700 line-clamp-4 leading-relaxed">
            {review.excerpt}
          </p>
        </div>

        {/* Tool name and reading time - always visible */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs font-medium text-gray-900 mb-1 truncate">
            {review.toolName}
          </p>
          <p className="text-xs text-gray-500">
            {review.readingTime} min read
          </p>
        </div>

        {/* Featured indicator */}
        {review.featured && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from "@nanostores/react";
import { cardInteractions, selectedCard } from "@/stores/cardStore";
import { uiState } from "@/stores/uiStore";
import { cn } from "@/lib/utils";
import { X, Share2, Heart, Clock, User, Wrench } from "lucide-react";
import type { Review } from "@/lib/types";

interface CardDetailsProps {
  review: Review | null;
}

export const CardDetails: React.FC<CardDetailsProps> = ({ review }) => {
  const $cardInteractions = useStore(cardInteractions);
  const $selectedCard = useStore(selectedCard);
  
  const isOpen = $cardInteractions.isCardDetailsOpen && !!review;

  const handleClose = () => {
    cardInteractions.setKey("isCardDetailsOpen", false);
    cardInteractions.setKey("expandedCard", null);
    selectedCard.set(null);
  };

  const handleShare = () => {
    uiState.setKey("isShareModalOpen", true);
  };

  const handleLike = () => {
    // TODO: Implement like functionality
    console.log("Like clicked for review:", review?.id);
  };

  if (!review) return null;

  // Format reading time
  const readingTimeText = review.readingTime === 1 
    ? "1 minute read" 
    : `${review.readingTime} minutes read`;

  // Format date
  const formattedDate = new Date(review.dateCreated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <DialogTitle className="text-2xl font-bold mb-2 leading-tight">
                {review.toolName}
              </DialogTitle>
              <DialogDescription className="text-base">
                Reviewed by {review.authorName} in their distinctive style
              </DialogDescription>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className="flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                {review.shareCount || 0}
              </Button>
            </div>
          </div>

          {/* Metadata badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {review.authorName}
            </Badge>
            
            <Badge 
              variant="outline" 
              className={cn(
                "flex items-center gap-1",
                review.mood === "technical" && "border-blue-200 text-blue-700",
                review.mood === "humorous" && "border-yellow-200 text-yellow-700",
                review.mood === "dramatic" && "border-red-200 text-red-700",
                review.mood === "philosophical" && "border-purple-200 text-purple-700"
              )}
            >
              {review.mood}
            </Badge>

            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readingTimeText}
            </Badge>

            {review.category && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Wrench className="h-3 w-3" />
                {review.category}
              </Badge>
            )}

            {review.featured && (
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                Featured
              </Badge>
            )}
          </div>
        </DialogHeader>

        {/* Content */}
        <ScrollArea className="flex-1 px-6 pb-6">
          <div className="prose prose-gray max-w-none">
            {/* Author portrait and tool image section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 not-prose">
              <div className="text-center">
                <img
                  src={`/images/authors/${review.authorId}.jpg`}
                  alt={review.authorName}
                  className="w-32 h-32 rounded-full mx-auto mb-3 object-cover shadow-lg"
                />
                <p className="text-sm text-gray-600 font-medium">{review.authorName}</p>
                <p className="text-xs text-gray-500">Literary Reviewer</p>
              </div>
              
              <div className="text-center">
                <img
                  src={`/images/tools/${review.toolId}.svg`}
                  alt={review.toolName}
                  className="w-32 h-32 mx-auto mb-3 object-contain"
                />
                <p className="text-sm text-gray-600 font-medium">{review.toolName}</p>
                {review.brand && (
                  <p className="text-xs text-gray-500">{review.brand}</p>
                )}
              </div>
            </div>

            {/* Review content */}
            <div className="text-lg leading-relaxed">
              {review.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Footer metadata */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  Published on {formattedDate}
                </div>
                <div className="flex items-center gap-4">
                  <span>{review.shareCount || 0} shares</span>
                  <span>ID: {review.id}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}; 
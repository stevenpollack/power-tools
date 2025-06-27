import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { FloatingCard } from './FloatingCard';
import { FilterControls } from './FilterControls';
import { useStore } from "@nanostores/react";
import { activeFilters } from "@/stores/filterStore";
import { cardArrangement, selectedCard } from "@/stores/cardStore";
import { uiState } from "@/stores/uiStore";
import type { Review } from "@/lib/types";

interface FloatingCardWallProps {
  reviews: Review[];
}

export const FloatingCardWall: React.FC<FloatingCardWallProps> = ({ reviews }) => {
  const $filters = useStore(activeFilters);
  const $arrangement = useStore(cardArrangement);
  const $uiState = useStore(uiState);
  
  const [viewportWidth, setViewportWidth] = useState(0);

  // Handle viewport resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      uiState.setKey("viewportWidth", width);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate responsive columns
  const getColumnCount = useCallback(() => {
    if (viewportWidth >= 1536) return 5; // 2xl
    if (viewportWidth >= 1280) return 4; // xl
    if (viewportWidth >= 1024) return 3; // lg
    if (viewportWidth >= 768) return 2;  // md
    return 1; // sm
  }, [viewportWidth]);

  // Filter reviews based on active filters
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      // Search term filter
      if ($filters.searchTerm) {
        const searchLower = $filters.searchTerm.toLowerCase();
        const matchesSearch = 
          review.authorName.toLowerCase().includes(searchLower) ||
          review.toolName.toLowerCase().includes(searchLower) ||
          review.excerpt.toLowerCase().includes(searchLower) ||
          review.content.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Author filter
      if ($filters.author && review.authorName !== $filters.author) {
        return false;
      }

      // Mood filter
      if ($filters.mood && review.mood !== $filters.mood) {
        return false;
      }

      // Category filter
      if ($filters.category && review.category !== $filters.category) {
        return false;
      }

      // Brand filter
      if ($filters.brand && review.brand !== $filters.brand) {
        return false;
      }

      return true;
    });
  }, [reviews, $filters]);

  // Smart arrangement algorithm - featured and popular content gets better positioning
  const arrangedReviews = useMemo(() => {
    return [...filteredReviews].sort((a, b) => {
      // Featured reviews first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then by share count (popularity)
      if (a.shareCount !== b.shareCount) {
        return b.shareCount - a.shareCount;
      }
      
      // Then by reading time (shorter first for better engagement)
      if (a.readingTime !== b.readingTime) {
        return a.readingTime - b.readingTime;
      }
      
      // Finally by date (newer first)
      return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
    });
  }, [filteredReviews]);

  // Get card size based on position and content (smart arrangement)
  const getCardSize = useCallback((index: number, review: Review) => {
    // Featured reviews get larger size
    if (review.featured) return "large";
    
    // Every 7th card gets medium size for visual variety
    if (index % 7 === 0) return "medium";
    
    // Longer reading time content gets larger cards
    if (review.readingTime >= 4) return "medium";
    
    // Default to small for better density
    return "small";
  }, []);

  // Handle card click
  const handleCardClick = useCallback((reviewId: string) => {
    selectedCard.set(reviewId);
  }, []);

  // Extract unique values for filter controls
  const availableAuthors = useMemo(() => 
    [...new Set(reviews.map(r => r.authorName))].sort()
  , [reviews]);

  const availableCategories = useMemo(() => 
    [...new Set(reviews.map(r => r.category).filter((cat): cat is string => Boolean(cat)))].sort()
  , [reviews]);

  const availableBrands = useMemo(() => 
    [...new Set(reviews.map(r => r.brand).filter((brand): brand is string => Boolean(brand)))].sort()
  , [reviews]);

  // Render masonry layout
  const renderMasonryLayout = () => {
    const columns = getColumnCount();
    const columnArrays: Review[][] = Array.from({ length: columns }, () => []);
    
    // Distribute cards across columns for masonry effect
    arrangedReviews.forEach((review, index) => {
      const columnIndex = index % columns;
      columnArrays[columnIndex].push(review);
    });

    const getGridColsClass = (cols: number): string => {
      switch (cols) {
        case 1: return 'grid-cols-1';
        case 2: return 'grid-cols-2';
        case 3: return 'grid-cols-3';
        case 4: return 'grid-cols-4';
        case 5: return 'grid-cols-5';
        default: return 'grid-cols-1';
      }
    };

    const gridColsClass = getGridColsClass(columns);

    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className={`grid gap-6 ${gridColsClass}`}>
          {columnArrays.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-6">
              {column.map((review, cardIndex) => {
                const globalIndex = columnIndex + (cardIndex * columns);
                return (
                  <FloatingCard
                    key={review.id}
                    review={review}
                    size={getCardSize(globalIndex, review)}
                    onCardClick={handleCardClick}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render grid layout (fallback)
  const renderGridLayout = () => (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {arrangedReviews.map((review, index) => (
          <FloatingCard
            key={review.id}
            review={review}
            size={getCardSize(index, review)}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <FilterControls
        availableAuthors={availableAuthors}
        availableCategories={availableCategories}
        availableBrands={availableBrands}
      />
      
      {/* Results count */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <p className="text-sm text-gray-600">
          Showing {arrangedReviews.length} of {reviews.length} reviews
          {arrangedReviews.length !== reviews.length && " (filtered)"}
        </p>
      </div>

      {/* Cards display */}
      {arrangedReviews.length === 0 ? (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <p className="text-lg text-gray-500 mb-2">No reviews match your filters</p>
            <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
          </div>
        </div>
      ) : (
        $arrangement === "masonry" ? renderMasonryLayout() : renderGridLayout()
      )}
    </div>
  );
}; 
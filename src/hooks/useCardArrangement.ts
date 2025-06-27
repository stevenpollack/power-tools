import { useMemo, useEffect, useState, useCallback, useRef } from 'react';
import type { Review } from '@/lib/types';

interface VirtualScrollOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  enabled?: boolean;
}

interface UseCardArrangementOptions {
  reviews: Review[];
  columns: number;
  virtualScroll?: VirtualScrollOptions;
}

interface VirtualItem {
  index: number;
  offsetTop: number;
  height: number;
}

export const useCardArrangement = ({
  reviews,
  columns,
  virtualScroll
}: UseCardArrangementOptions) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate item heights for virtual scrolling
  const getItemHeight = useCallback((review: Review, columnIndex: number) => {
    // Base height varies by card size
    let baseHeight = 208; // Default medium card height

    if (review.featured) baseHeight = 256; // Large cards
    else if (review.readingTime >= 4) baseHeight = 230; // Medium for longer content
    else baseHeight = 180; // Small cards

    // Add variation for masonry effect
    const variation = Math.sin(columnIndex * 0.5) * 20;
    return Math.max(150, baseHeight + variation);
  }, []);

  // Create column arrays for masonry layout
  const columnArrays = useMemo(() => {
    const arrays: Review[][] = Array.from({ length: columns }, () => []);
    const columnHeights = new Array(columns).fill(0);

    // Smart distribution: place items in shortest column
    reviews.forEach((review) => {
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      arrays[shortestColumnIndex].push(review);
      columnHeights[shortestColumnIndex] += getItemHeight(review, shortestColumnIndex);
    });

    return arrays;
  }, [reviews, columns, getItemHeight]);

  // Calculate virtual items for each column
  const virtualColumns = useMemo(() => {
    if (!virtualScroll?.enabled) return columnArrays;

    const { itemHeight, containerHeight, overscan = 5 } = virtualScroll;

    return columnArrays.map((column, columnIndex) => {
      // Calculate visible range
      const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
      const endIndex = Math.min(
        column.length - 1,
        Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
      );

      // Create virtual items
      const virtualItems: VirtualItem[] = [];
      let currentTop = 0;

      for (let i = 0; i < column.length; i++) {
        const height = getItemHeight(column[i], columnIndex);
        
        if (i >= startIndex && i <= endIndex) {
          virtualItems.push({
            index: i,
            offsetTop: currentTop,
            height
          });
        }
        
        currentTop += height;
      }

      return {
        items: virtualItems,
        totalHeight: currentTop,
        visibleItems: column.slice(startIndex, endIndex + 1)
      };
    });
  }, [columnArrays, virtualScroll, scrollTop, getItemHeight]);

  // Handle scroll events
  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLDivElement;
    setScrollTop(target.scrollTop);
  }, []);

  // Set up scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !virtualScroll?.enabled) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll, virtualScroll?.enabled]);

  // Measure container height
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  // Performance optimization: Intersection Observer for cards
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  const intersectionObserver = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    intersectionObserver.current = new IntersectionObserver(
      (entries) => {
        const newVisibleCards = new Set(visibleCards);
        
        entries.forEach((entry) => {
          const cardId = entry.target.getAttribute('data-card-id');
          if (!cardId) return;

          if (entry.isIntersecting) {
            newVisibleCards.add(cardId);
          } else {
            newVisibleCards.delete(cardId);
          }
        });

        setVisibleCards(newVisibleCards);
      },
      {
        rootMargin: '50px', // Load cards slightly before they're visible
        threshold: 0.1
      }
    );

    return () => {
      intersectionObserver.current?.disconnect();
    };
  }, [visibleCards]);

  // Register card for intersection observation
  const registerCard = useCallback((element: HTMLElement, cardId: string) => {
    if (!element) return;
    
    element.setAttribute('data-card-id', cardId);
    intersectionObserver.current?.observe(element);

    return () => {
      intersectionObserver.current?.unobserve(element);
    };
  }, []);

  // Calculate total heights for virtual scrolling
  const totalHeights = useMemo(() => {
    if (virtualScroll?.enabled && virtualColumns) {
      return virtualColumns.map(col => col.totalHeight || 0);
    }
    return [];
  }, [virtualColumns, virtualScroll?.enabled]);

  // Smart arrangement algorithm
  const arrangeReviews = useCallback((inputReviews: Review[]) => {
    return [...inputReviews].sort((a, b) => {
      // Featured reviews first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      // Then by share count (popularity)
      if (a.shareCount !== b.shareCount) {
        return b.shareCount - a.shareCount;
      }

      // Distribute long and short reads for better visual balance
      const aScore = a.readingTime * (a.featured ? 2 : 1);
      const bScore = b.readingTime * (b.featured ? 2 : 1);

      // Finally by date (newer first)
      return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
    });
  }, []);

  return {
    containerRef,
    columnArrays: virtualScroll?.enabled ? virtualColumns : columnArrays,
    totalHeights,
    scrollTop,
    visibleCards,
    registerCard,
    arrangeReviews,
    isVirtualScrollEnabled: virtualScroll?.enabled || false
  };
}; 
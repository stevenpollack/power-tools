import { useEffect, useCallback, useRef, useState } from 'react';
import { cardInteractions, selectedCard } from '@/stores/cardStore';
import { uiState } from '@/stores/uiStore';

interface TouchPosition {
  x: number;
  y: number;
  timestamp: number;
}

interface UseCardInteractionsOptions {
  onCardSelect?: (cardId: string) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  enableSwipeNavigation?: boolean;
  swipeThreshold?: number;
}

export const useCardInteractions = (options: UseCardInteractionsOptions = {}) => {
  const {
    onCardSelect,
    onSwipeLeft,
    onSwipeRight,
    enableSwipeNavigation = true,
    swipeThreshold = 50
  } = options;

  const touchStartRef = useRef<TouchPosition | null>(null);
  const touchEndRef = useRef<TouchPosition | null>(null);
  const isSwipingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
      uiState.setKey('isMobile', mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle touch start
  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now()
    };
    touchEndRef.current = null;
    isSwipingRef.current = false;
  }, []);

  // Handle touch move
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.touches[0];
    if (!touch) return;
    
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

    // If horizontal movement is greater than vertical, it's likely a swipe
    if (deltaX > deltaY && deltaX > 10) {
      isSwipingRef.current = true;
      // Prevent scrolling during horizontal swipe
      e.preventDefault();
    }
  }, []);

  // Handle touch end
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    if (!touch) return;
    
    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now()
    };

    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = Math.abs(touchEndRef.current.y - touchStartRef.current.y);
    const timeDelta = touchEndRef.current.timestamp - touchStartRef.current.timestamp;

    // Check for swipe gesture
    if (
      enableSwipeNavigation &&
      Math.abs(deltaX) > swipeThreshold &&
      deltaY < 100 && // Limit vertical movement
      timeDelta < 500 && // Quick gesture
      isSwipingRef.current
    ) {
      if (deltaX > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    }

    // Reset refs
    touchStartRef.current = null;
    touchEndRef.current = null;
    isSwipingRef.current = false;
  }, [enableSwipeNavigation, swipeThreshold, onSwipeLeft, onSwipeRight]);

  // Handle card tap (mobile) or click (desktop)
  const handleCardInteraction = useCallback((
    cardId: string,
    event: React.MouseEvent | React.TouchEvent
  ) => {
    // Prevent interaction if swiping
    if (isSwipingRef.current) {
      event.preventDefault();
      return;
    }

    if (isMobile) {
      // On mobile, first tap shows hover state, second tap opens
      const currentHovered = cardInteractions.get().hoveredCard;
      
      if (currentHovered === cardId) {
        // Second tap - open card
        selectedCard.set(cardId);
        cardInteractions.setKey('expandedCard', cardId);
        cardInteractions.setKey('isCardDetailsOpen', true);
        onCardSelect?.(cardId);
      } else {
        // First tap - show hover state
        cardInteractions.setKey('hoveredCard', cardId);
        
        // Auto-hide hover state after 3 seconds
        setTimeout(() => {
          const current = cardInteractions.get().hoveredCard;
          if (current === cardId) {
            cardInteractions.setKey('hoveredCard', null);
          }
        }, 3000);
      }
    } else {
      // Desktop behavior - direct click opens
      selectedCard.set(cardId);
      cardInteractions.setKey('expandedCard', cardId);
      cardInteractions.setKey('isCardDetailsOpen', true);
      onCardSelect?.(cardId);
    }
  }, [isMobile, onCardSelect]);

  // Handle card hover (desktop only)
  const handleCardHover = useCallback((cardId: string | null) => {
    if (!isMobile) {
      cardInteractions.setKey('hoveredCard', cardId);
    }
  }, [isMobile]);

  // Handle long press for mobile context menu
  const handleLongPress = useCallback((cardId: string) => {
    if (isMobile) {
      // Show context menu or additional options
      navigator.vibrate?.(50); // Haptic feedback if supported
      
      // Could trigger share menu or favorites
      uiState.setKey('contextMenuCard', cardId);
    }
  }, [isMobile]);

  // Keyboard navigation support
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const currentExpanded = cardInteractions.get().expandedCard;
    
    switch (e.key) {
      case 'Escape':
        if (currentExpanded) {
          cardInteractions.setKey('isCardDetailsOpen', false);
          cardInteractions.setKey('expandedCard', null);
          selectedCard.set(null);
        }
        break;
      case 'ArrowLeft':
        if (enableSwipeNavigation) {
          onSwipeLeft?.();
        }
        break;
      case 'ArrowRight':
        if (enableSwipeNavigation) {
          onSwipeRight?.();
        }
        break;
    }
  }, [enableSwipeNavigation, onSwipeLeft, onSwipeRight]);

  // Set up event listeners
  useEffect(() => {
    if (isMobile) {
      document.addEventListener('touchstart', handleTouchStart, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobile, handleTouchStart, handleTouchMove, handleTouchEnd, handleKeyDown]);

  // Pinch-to-zoom detection for mobile
  const handlePinchZoom = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      // Disable default zoom behavior for custom handling
      e.preventDefault();
      
      // Could implement custom zoom logic here
      // For now, just prevent default browser zoom
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.addEventListener('touchstart', handlePinchZoom, { passive: false });
      return () => document.removeEventListener('touchstart', handlePinchZoom);
    }
  }, [isMobile, handlePinchZoom]);

  return {
    isMobile,
    handleCardInteraction,
    handleCardHover,
    handleLongPress,
    isSwipingRef
  };
}; 
import { useState, useEffect, useMemo } from "react";
import type { ReviewWithData } from "@/lib/types";

export type SortOrder =
  | "balanced"
  | "newest"
  | "oldest"
  | "author-asc"
  | "author-desc"
  | "brand-asc"
  | "brand-desc"
  | "time-asc"
  | "time-desc";

export interface UseMasonryWallOptions {
  reviewsWithData: ReviewWithData[];
  initialCount?: number;
  enableTimeSort?: boolean; // For MasonryWall v1 compatibility
}

export interface UseMasonryWallReturn {
  // Filter state
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedAuthor: string;
  setSelectedAuthor: (author: string) => void;
  selectedMood: string;
  setSelectedMood: (mood: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;

  // Computed results
  filteredReviews: ReviewWithData[];
  visibleReviews: ReviewWithData[];
  availableAuthors: string[];
  availableMoods: string[];
  availableBrands: string[];

  // Pagination
  visibleCount: number;
  handleLoadMore: () => void;

  // Utility actions
  clearSearch: () => void;
  clearFilters: () => void;
}

/**
 * Custom hook for MasonryWall components that provides shared filtering, sorting,
 * pagination, and URL state management functionality.
 *
 * @param options Configuration options for the hook
 * @returns Object containing all state, computed values, and actions
 */
export function useMasonryWall({
  reviewsWithData,
  initialCount = 24,
  enableTimeSort = false,
}: UseMasonryWallOptions): UseMasonryWallReturn {
  // Initialize state from URL search params on component mount
  const [searchTerm, setSearchTerm] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("search") || "";
    }
    return "";
  });

  const [selectedAuthor, setSelectedAuthor] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("author") || "";
    }
    return "";
  });

  const [selectedMood, setSelectedMood] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("mood") || "";
    }
    return "";
  });

  const [selectedBrand, setSelectedBrand] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("brand") || "";
    }
    return "";
  });

  const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
    if (typeof window !== "undefined") {
      const urlSort = new URLSearchParams(window.location.search).get(
        "sort",
      ) as SortOrder;
      return urlSort || "balanced";
    }
    return "balanced";
  });

  const [visibleCount, setVisibleCount] = useState(initialCount);

  // Effect to update URL when filters or sort order change
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedAuthor) params.set("author", selectedAuthor);
    if (selectedMood) params.set("mood", selectedMood);
    if (selectedBrand) params.set("brand", selectedBrand);
    if (sortOrder && sortOrder !== "balanced") params.set("sort", sortOrder);

    const queryString = params.toString();
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.pushState({}, "", newUrl);
  }, [searchTerm, selectedAuthor, selectedMood, selectedBrand, sortOrder]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(initialCount);
  }, [
    searchTerm,
    selectedAuthor,
    selectedMood,
    selectedBrand,
    sortOrder,
    initialCount,
  ]);

  // Extract unique values for filter options
  const availableAuthors = useMemo(
    () => [...new Set(reviewsWithData.map((r) => r.author.data.name))].sort(),
    [reviewsWithData],
  );

  const availableMoods = useMemo(
    () => [...new Set(reviewsWithData.map((r) => r.review.data.mood))].sort(),
    [reviewsWithData],
  );

  const availableBrands = useMemo(
    () => [...new Set(reviewsWithData.map((r) => r.tool.data.brand))].sort(),
    [reviewsWithData],
  );

  // Filter and sort reviews based on active filters
  const filteredReviews = useMemo(() => {
    // First, filter the reviews
    const filtered = reviewsWithData.filter((item) => {
      const { review, author, tool } = item;

      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const searchableText =
          `${author.data.name} ${tool.data.name} ${tool.data.brand} ${review.data.excerpt}`.toLowerCase();
        if (!searchableText.includes(searchLower)) {
          return false;
        }
      }

      // Author filter
      if (selectedAuthor && author.data.name !== selectedAuthor) {
        return false;
      }

      // Mood filter
      if (selectedMood && review.data.mood !== selectedMood) {
        return false;
      }

      // Brand filter
      if (selectedBrand && tool.data.brand !== selectedBrand) {
        return false;
      }

      return true;
    });

    // Then, sort the filtered results
    const sortable = [...filtered];
    switch (sortOrder) {
      case "balanced":
        // Maintain original distribution - no additional sorting
        break;
      case "newest":
        sortable.sort(
          (a, b) =>
            new Date(b.review.data.dateCreated).getTime() -
            new Date(a.review.data.dateCreated).getTime(),
        );
        break;
      case "oldest":
        sortable.sort(
          (a, b) =>
            new Date(a.review.data.dateCreated).getTime() -
            new Date(b.review.data.dateCreated).getTime(),
        );
        break;
      case "author-asc":
        sortable.sort((a, b) =>
          a.author.data.name.localeCompare(b.author.data.name),
        );
        break;
      case "author-desc":
        sortable.sort((a, b) =>
          b.author.data.name.localeCompare(a.author.data.name),
        );
        break;
      case "brand-asc":
        sortable.sort((a, b) =>
          a.tool.data.brand.localeCompare(b.tool.data.brand),
        );
        break;
      case "brand-desc":
        sortable.sort((a, b) =>
          b.tool.data.brand.localeCompare(a.tool.data.brand),
        );
        break;
      case "time-asc":
        if (enableTimeSort) {
          sortable.sort(
            (a, b) => a.review.data.readingTime - b.review.data.readingTime,
          );
        }
        break;
      case "time-desc":
        if (enableTimeSort) {
          sortable.sort(
            (a, b) => b.review.data.readingTime - a.review.data.readingTime,
          );
        }
        break;
    }

    return sortable;
  }, [
    reviewsWithData,
    searchTerm,
    selectedAuthor,
    selectedMood,
    selectedBrand,
    sortOrder,
    enableTimeSort,
  ]);

  // Get visible reviews based on pagination
  const visibleReviews = useMemo(
    () => filteredReviews.slice(0, visibleCount),
    [filteredReviews, visibleCount],
  );

  // Pagination handler
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + initialCount);
  };

  // Utility functions
  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedAuthor("");
    setSelectedMood("");
    setSelectedBrand("");
    setSortOrder("balanced");
  };

  return {
    // Filter state
    searchTerm,
    setSearchTerm,
    selectedAuthor,
    setSelectedAuthor,
    selectedMood,
    setSelectedMood,
    selectedBrand,
    setSelectedBrand,
    sortOrder,
    setSortOrder,

    // Computed results
    filteredReviews,
    visibleReviews,
    availableAuthors,
    availableMoods,
    availableBrands,

    // Pagination
    visibleCount,
    handleLoadMore,

    // Utility actions
    clearSearch,
    clearFilters,
  };
}

import React, { useMemo, useState, useEffect } from "react";
import { ReviewCard } from "@/components/ReviewCard";
import type { ReviewWithData } from "@/lib/types";

const REVIEWS_PER_PAGE = 12;

type SortOrder =
  | "newest"
  | "oldest"
  | "author-asc"
  | "author-desc"
  | "brand-asc"
  | "brand-desc"
  | "time-asc"
  | "time-desc";

interface MasonryWallProps {
  reviewsWithData: ReviewWithData[];
}

export const MasonryWall: React.FC<MasonryWallProps> = ({
  reviewsWithData,
}) => {
  // Initialize state from URL search params on component mount
  const [searchTerm, setSearchTerm] = useState(
    () => new URLSearchParams(window.location.search).get("search") || "",
  );
  const [selectedAuthor, setSelectedAuthor] = useState(
    () => new URLSearchParams(window.location.search).get("author") || "",
  );
  const [selectedMood, setSelectedMood] = useState(
    () => new URLSearchParams(window.location.search).get("mood") || "",
  );
  const [selectedBrand, setSelectedBrand] = useState(
    () => new URLSearchParams(window.location.search).get("brand") || "",
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    () =>
      (new URLSearchParams(window.location.search).get("sort") as SortOrder) ||
      "newest",
  );
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);

  // Effect to update URL when filters or sort order change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedAuthor) params.set("author", selectedAuthor);
    if (selectedMood) params.set("mood", selectedMood);
    if (selectedBrand) params.set("brand", selectedBrand);
    if (sortOrder) params.set("sort", sortOrder);

    const queryString = params.toString();
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.pushState({}, "", newUrl);
  }, [searchTerm, selectedAuthor, selectedMood, selectedBrand, sortOrder]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(REVIEWS_PER_PAGE);
  }, [searchTerm, selectedAuthor, selectedMood, selectedBrand]);

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

  // Filter reviews based on active filters
  const filteredReviews = useMemo(() => {
    const filtered = reviewsWithData.filter((item) => {
      const { review, author, tool } = item;

      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          author.data.name.toLowerCase().includes(searchLower) ||
          tool.data.name.toLowerCase().includes(searchLower) ||
          tool.data.brand.toLowerCase().includes(searchLower) ||
          review.data.excerpt.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
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

    // Create a new array to avoid mutating the original, then sort it
    const sortable = [...filtered];
    switch (sortOrder) {
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
        sortable.sort(
          (a, b) => a.review.data.readingTime - b.review.data.readingTime,
        );
        break;
      case "time-desc":
        sortable.sort(
          (a, b) => b.review.data.readingTime - a.review.data.readingTime,
        );
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
  ]);

  const visibleReviews = useMemo(
    () => filteredReviews.slice(0, visibleCount),
    [filteredReviews, visibleCount],
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + REVIEWS_PER_PAGE);
  };

  return (
    <>
      {/* Filter Controls */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 py-4 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <input
                type="text"
                placeholder="Search reviews, authors, or tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  {/* this might be better served as an imported icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Authors</option>
                {availableAuthors.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>

              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Moods</option>
                {availableMoods.map((mood) => (
                  <option key={mood} value={mood}>
                    {mood.charAt(0).toUpperCase() + mood.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Brands</option>
                {availableBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="newest">Sort by: Newest</option>
                <option value="oldest">Sort by: Oldest</option>
                <option value="author-asc">Sort by: Author (A-Z)</option>
                <option value="author-desc">Sort by: Author (Z-A)</option>
                <option value="brand-asc">Sort by: Brand (A-Z)</option>
                <option value="brand-desc">Sort by: Brand (Z-A)</option>
                <option value="time-asc">
                  Sort by: Reading Time (Shortest)
                </option>
                <option value="time-desc">
                  Sort by: Reading Time (Longest)
                </option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Showing {visibleReviews.length} of {filteredReviews.length}{" "}
              reviews
              {filteredReviews.length !== reviewsWithData.length &&
                " (filtered)"}
            </p>
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {filteredReviews.length === 0 ? (
          <div className="flex min-h-96 items-center justify-center">
            <div className="text-center">
              <p className="mb-2 text-lg text-gray-500">
                No reviews match your filters
              </p>
              <p className="text-sm text-gray-400">
                Try adjusting your search criteria
              </p>
            </div>
          </div>
        ) : (
          <div className="columns-1 gap-6 lg:columns-3 xl:columns-4">
            {visibleReviews.map(({ review, author, tool }) => (
              <div key={review.id} className="mb-6 block break-inside-avoid">
                <ReviewCard
                  slug={review.id}
                  dateCreated={review.data.dateCreated}
                  excerpt={review.data.excerpt}
                  toolBrand={tool.data.brand}
                  toolName={tool.data.name}
                  toolImage={tool.data.thumbnailUrl}
                  authorName={author.data.name}
                  mood={review.data.mood}
                  tone={review.data.tone}
                  readingTime={review.data.readingTime}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredReviews.length && (
        <div className="pb-16 text-center">
          <button
            onClick={handleLoadMore}
            className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Load More Reviews
          </button>
        </div>
      )}
    </>
  );
};

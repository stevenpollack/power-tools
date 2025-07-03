import React, { useMemo, useState, useEffect } from "react";
import { ReviewCard } from "@/components/ReviewCard";
import type { ReviewWithData } from "@/lib/types";

const REVIEWS_PER_PAGE = 12;

interface MasonryWallProps {
  reviewsWithData: ReviewWithData[];
}

export const MasonryWall: React.FC<MasonryWallProps> = ({ reviewsWithData }) => {
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
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);

  // Effect to update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedAuthor) params.set("author", selectedAuthor);
    if (selectedMood) params.set("mood", selectedMood);
    if (selectedBrand) params.set("brand", selectedBrand);

    const queryString = params.toString();
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.pushState({}, "", newUrl);
  }, [searchTerm, selectedAuthor, selectedMood, selectedBrand]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(REVIEWS_PER_PAGE);
  }, [searchTerm, selectedAuthor, selectedMood, selectedBrand]);

  // Extract unique values for filter options
  const availableAuthors = useMemo(
    () => [...new Set(reviewsWithData.map((r) => r.author.data.name))].sort(),
    [reviewsWithData]
  );

  const availableMoods = useMemo(
    () => [...new Set(reviewsWithData.map((r) => r.review.data.mood))].sort(),
    [reviewsWithData]
  );

  const availableBrands = useMemo(
    () => [...new Set(reviewsWithData.map((r) => r.tool.data.brand))].sort(),
    [reviewsWithData]
  );

  // Filter reviews based on active filters
  const filteredReviews = useMemo(() => {
    return reviewsWithData.filter((item) => {
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
  }, [reviewsWithData, searchTerm, selectedAuthor, selectedMood, selectedBrand]);

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
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search reviews, authors, or tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Showing {visibleReviews.length} of {filteredReviews.length} reviews
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
          <div className="columns-1 lg:columns-3 xl:columns-4 gap-6">
            {visibleReviews.map(({ review, author, tool }) => (
              <div key={review.id} className="break-inside-avoid block mb-6">
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
        <div className="text-center pb-16">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Load More Reviews
          </button>
        </div>
      )}
    </>
  );
}; 

import React, { useState, useMemo, useEffect } from "react";
import { ReviewCardV2React } from "./ReviewCardV2React";
import type { ReviewWithData } from "@/lib/types";

interface Props {
  reviewsWithData: ReviewWithData[];
  initialCount?: number;
}

export function MasonryWallV2({ reviewsWithData, initialCount = 24 }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState("balanced");
  const [visibleCount, setVisibleCount] = useState(initialCount);

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

  // Filter and sort logic
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviewsWithData.filter((item) => {
      const { review, author, tool } = item;

      // Search filter
      if (searchTerm) {
        const searchableText = `${author.data.name} ${tool.data.name} ${tool.data.brand} ${review.data.excerpt}`.toLowerCase();
        if (!searchableText.includes(searchTerm.toLowerCase())) return false;
      }

      // Other filters
      if (selectedAuthor && author.data.name !== selectedAuthor) return false;
      if (selectedMood && review.data.mood !== selectedMood) return false;
      if (selectedBrand && tool.data.brand !== selectedBrand) return false;

      return true;
    });

    // Sort reviews
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.review.data.dateCreated).getTime() - new Date(a.review.data.dateCreated).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.review.data.dateCreated).getTime() - new Date(b.review.data.dateCreated).getTime());
        break;
      case "author-asc":
        filtered.sort((a, b) => a.author.data.name.localeCompare(b.author.data.name));
        break;
      case "author-desc":
        filtered.sort((a, b) => b.author.data.name.localeCompare(a.author.data.name));
        break;
      case "brand-asc":
        filtered.sort((a, b) => a.tool.data.brand.localeCompare(b.tool.data.brand));
        break;
      case "brand-desc":
        filtered.sort((a, b) => b.tool.data.brand.localeCompare(a.tool.data.brand));
        break;
      // 'balanced' maintains original order
    }

    return filtered;
  }, [reviewsWithData, searchTerm, selectedAuthor, selectedMood, selectedBrand, sortBy]);

  const visibleReviews = useMemo(
    () => filteredAndSortedReviews.slice(0, visibleCount),
    [filteredAndSortedReviews, visibleCount]
  );

  // URL state management
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedAuthor) params.set("author", selectedAuthor);
    if (selectedMood) params.set("mood", selectedMood);
    if (selectedBrand) params.set("brand", selectedBrand);
    if (sortBy && sortBy !== "balanced") params.set("sort", sortBy);

    const queryString = params.toString();
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
    window.history.pushState({}, "", newUrl);
  }, [searchTerm, selectedAuthor, selectedMood, selectedBrand, sortBy]);

  // Initialize from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchTerm(params.get("search") || "");
    setSelectedAuthor(params.get("author") || "");
    setSelectedMood(params.get("mood") || "");
    setSelectedBrand(params.get("brand") || "");
    setSortBy(params.get("sort") || "balanced");
  }, []);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(initialCount);
  }, [searchTerm, selectedAuthor, selectedMood, selectedBrand, sortBy, initialCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 24);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div id="masonry-wall-v2">
      {/* Filter Controls */}
      <div className="sticky top-0 z-10 border-b border-bunnings-neutral-light-gray bg-white/80 py-4 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reviews, authors, or tools..."
                className="w-full rounded-lg border border-bunnings-neutral-medium-gray px-4 py-2 text-sm focus:border-bunnings-secondary-green focus:ring-1 focus:ring-bunnings-secondary-green focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-bunnings-neutral-medium-gray hover:text-bunnings-neutral-charcoal"
                  aria-label="Clear search"
                >
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
                className="rounded-md border border-bunnings-neutral-medium-gray px-3 py-1 text-sm focus:border-bunnings-secondary-green focus:outline-none"
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
                className="rounded-md border border-bunnings-neutral-medium-gray px-3 py-1 text-sm focus:border-bunnings-secondary-green focus:outline-none"
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
                className="rounded-md border border-bunnings-neutral-medium-gray px-3 py-1 text-sm focus:border-bunnings-secondary-green focus:outline-none"
              >
                <option value="">All Brands</option>
                {availableBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border border-bunnings-neutral-medium-gray px-3 py-1 text-sm focus:border-bunnings-secondary-green focus:outline-none"
              >
                <option value="balanced">Sort by: Balanced Mix</option>
                <option value="newest">Sort by: Newest</option>
                <option value="oldest">Sort by: Oldest</option>
                <option value="author-asc">Sort by: Author (A-Z)</option>
                <option value="author-desc">Sort by: Author (Z-A)</option>
                <option value="brand-asc">Sort by: Brand (A-Z)</option>
                <option value="brand-desc">Sort by: Brand (Z-A)</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-2">
            <p className="text-sm text-bunnings-neutral-medium-gray">
              Showing {visibleReviews.length} of {filteredAndSortedReviews.length} reviews
              {filteredAndSortedReviews.length !== reviewsWithData.length && " (filtered)"}
            </p>
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {filteredAndSortedReviews.length === 0 ? (
          <div className="min-h-96 flex items-center justify-center">
            <div className="text-center">
              <p className="mb-2 text-lg text-bunnings-neutral-medium-gray">
                No reviews match your filters
              </p>
              <p className="text-sm text-bunnings-neutral-light-gray">
                Try adjusting your search criteria
              </p>
            </div>
          </div>
        ) : (
          <div className="columns-1 gap-6 lg:columns-3 xl:columns-4">
            {visibleReviews.map(({ review, author, tool }) => (
              <div
                key={review.data.slug}
                className="review-item mb-6 block break-inside-avoid"
              >
                <ReviewCardV2React
                  slug={review.data.slug}
                  toolId={tool.id}
                  toolBrand={tool.data.brand}
                  toolName={tool.data.name}
                  toolImage={tool.data.thumbnailUrl}
                  authorName={author.data.name}
                  excerpt={review.data.excerpt}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredAndSortedReviews.length && (
        <div className="pb-16 text-center">
          <button
            onClick={handleLoadMore}
            className="bg-bunnings-primary-orange hover:bg-bunnings-secondary-green text-black hover:text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
} 

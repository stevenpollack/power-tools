import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ReviewCard } from "./ReviewCard";
import type { ReviewWithData } from "@/lib/types";

interface RelatedReviewsProps {
  reviews: ReviewWithData[];
}

export const RelatedReviews: React.FC<RelatedReviewsProps> = ({ reviews }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container py-4">
          {reviews.map(({ review, author, tool }) => (
            <div key={review.data.slug} className="embla__slide">
              <ReviewCard
                variant="fixedHeight"
                slug={review.data.slug}
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
      </div>
      <button
        className="embla__button embla__button--prev"
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
      >
        <svg
          className="embla__button__svg"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <button
        className="embla__button embla__button--next"
        onClick={scrollNext}
        disabled={nextBtnDisabled}
      >
        <svg
          className="embla__button__svg"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
        </svg>
      </button>
    </div>
  );
};

import type { Review } from "./types";
import {
  MOOD_COLORS,
  AUTHOR_DATA,
  type AuthorId,
  type MoodType,
} from "./constants";

/**
 * Get mood-specific styling classes
 */
export function getMoodColors(mood: MoodType) {
  return MOOD_COLORS[mood];
}

/**
 * Get author information by ID
 */
export function getAuthorData(authorId: string) {
  return (
    AUTHOR_DATA[authorId as AuthorId] || {
      name: "Unknown Author",
      lifespan: "...",
      image: `${authorId}.jpg`,
    }
  );
}

/**
 * Get author image path
 */
export function getAuthorImagePath(authorId: string): string {
  return getAuthorData(authorId).image;
}

/**
 * Get author lifespan
 */
export function getAuthorLifespan(authorId: string): string {
  return getAuthorData(authorId).lifespan;
}

/**
 * Extract first sentence from text for preview
 */
export function findFirstSentence(text: string): string {
  const sentenceEnders = /[.!?]/;
  const match = text.match(sentenceEnders);

  if (match && match.index !== undefined) {
    return text.substring(0, match.index + 1);
  }

  // Fallback: if no sentence ending found, truncate at 120 chars
  return text.length > 120 ? text.substring(0, 120) + "..." : text;
}

/**
 * Format reading time text
 */
export function formatReadingTime(minutes: number): string {
  return minutes === 1 ? "1 minute read" : `${minutes} minutes read`;
}

/**
 * Format date for display
 */
export function formatDateForDisplay(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Generate author initials for fallback display
 */
export function getAuthorInitials(authorName: string): string {
  return authorName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

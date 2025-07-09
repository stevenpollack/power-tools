import type { CollectionEntry } from "astro:content";

export type Author = CollectionEntry<"authors">;
export type AuthorData = Author["data"];

export type Review = CollectionEntry<"reviews">;
export type ReviewData = Review["data"];

export type ReviewV2 = CollectionEntry<"reviewsV2">;
export type ReviewV2Data = ReviewV2["data"];

export type Tool = CollectionEntry<"tools">;
export type ToolData = Tool["data"];

export type ReviewWithData = {
  review: Review;
  author: Author;
  tool: Tool;
};

export type ReviewV2WithData = {
  review: ReviewV2;
  author: Author;
  tool: Tool;
};

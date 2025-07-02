import type { CollectionEntry } from "astro:content";

export type Author = CollectionEntry<"authors">;
export type AuthorData = Author["data"];

export type Review = CollectionEntry<"reviews">;
export type ReviewData = Review["data"];

type Tool = CollectionEntry<"tools">;
export type ToolData = Tool["data"];

export type ReviewWithData = {
  review: Review;
  author: Author;
  tool: Tool;
};

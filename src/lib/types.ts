export interface Review {
  id: string;
  authorId: string;
  authorName: string;
  toolId: string;
  toolName: string;
  featured: boolean;
  mood: "technical" | "humorous" | "dramatic" | "philosophical";
  tone: string;
  readingTime: number;
  shareCount: number;
  dateCreated: string;
  lastUpdated: string;
  excerpt: string;
  content: string;
  category?: string;
  brand?: string;
}

export interface Author {
  id: string;
  name: string;
  style: string;
  description: string;
  portraitUrl: string;
}

export interface Tool {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  specifications: Record<string, any>;
}

export type CardSize = "small" | "medium" | "large";
export type ViewMode = "masonry" | "grid" | "list";
export type FilterType = "author" | "category" | "mood" | "brand";

export interface FilterState {
  author: string | null;
  category: string | null;
  mood: string | null;
  brand: string | null;
  searchTerm: string;
}

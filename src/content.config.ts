import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const authors = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/authors" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    lifespan: z.string(),
    nationality: z.string(),
    primaryWorks: z.array(z.string()),
    styleKeywords: z.array(z.string()),
    literaryMovement: z.string(),
    portrait: z.object({
      filename: z.string(),
      source: z.string(),
      license: z.string(),
    }),
    styleAnalysis: z.object({
      summary: z.string(),
      detailed: z.string(),
      vocabulary: z.string(),
      sentenceStructure: z.string(),
      themes: z.array(z.string()),
      quirks: z.array(z.string()),
    }),
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/tools" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    brand: z.string(),
    category: z.string(),
    subcategory: z.string().optional(),
    homeDepotSku: z.string(),
    homeDepotUrl: z.string(),
    image: z.object({
      filename: z.string(),
      originalUrl: z.string(),
      license: z.string(),
    }),
    specifications: z.object({
      power: z.string(),
      weight: z.string(),
      dimensions: z.string(),
      keyFeatures: z.array(z.string()),
      batteryLife: z.string().optional(),
      cordless: z.boolean(),
    }),
    pricing: z.object({
      currentPrice: z.number(),
      msrp: z.number().optional(),
      onSale: z.boolean(),
    }),
    popularity: z.object({
      reviewCount: z.number(),
      averageRating: z.number(),
      homeDepotRank: z.number().optional(),
    }),
  }),
});

const reviews = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/reviews" }),
  schema: z.object({
    authorId: z.string(),
    toolId: z.string(),
    featured: z.boolean().default(false),
    mood: z.enum(["humorous", "dramatic", "technical", "philosophical"]),
    tone: z.enum(["formal", "casual", "satirical", "earnest"]),
    readingTime: z.number(),
    shareCount: z.number().default(0),
    dateCreated: z.string(),
    lastUpdated: z.string(),
  }),
});

export const collections = { authors, tools, reviews };

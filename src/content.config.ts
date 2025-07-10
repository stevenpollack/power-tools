import { defineCollection, reference, z } from "astro:content";
import { file, glob } from "astro/loaders";

const authors = defineCollection({
  loader: glob({ pattern: "*.json", base: "authors" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      slug: z.string(),
      lifespan: z.string(),
      nationality: z.string(),
      primaryWorks: z.array(z.string()),
      styleKeywords: z.array(z.string()),
      literaryMovement: z.string(),
      portrait: z.object({
        filename: image(),
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
      // Bunnings review display settings
      displayName: z.string(),
      ratingBias: z.number().min(-1).max(1).default(0),
      userCategory: z.enum([
        "Advanced DIYer",
        "Construction Professional",
        "Intermediate",
        "Beginner",
        "Hobbyist",
        "Weekend Warrior",
      ]),
    }),
});

const tools = defineCollection({
  loader: glob({ pattern: "*.json", base: "tools" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      slug: z.string(),
      brand: z.string(),
      category: z.string(),
      subcategory: z.string().optional(),
      homeDepotSku: z.string().optional(),
      homeDepotUrl: z.string().optional(),
      bunningsSku: z.string().optional(),
      bunningsUrl: z.string().optional(),
      thumbnailUrl: image(),
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
        currency: z.string().optional(),
        onSale: z.boolean(),
      }),
      popularity: z.object({
        reviewCount: z.number(),
        averageRating: z.number(),
        homeDepotRank: z.number().optional(),
        bunningsRank: z.number().optional(),
      }),
      // Review analysis data from Bunnings scraping
      reviewAnalysis: z
        .object({
          scrapedFrom: z.string(),
          actualProduct: z.string(),
          urlMismatch: z.boolean(),
          reviewsScrapped: z.number(),
          averageReviewLength: z.number(),
          commonUseCases: z.array(z.string()),
          positivePatterns: z.array(z.string()),
          negativePatterns: z.array(z.string()),
          humanFlourishes: z.array(z.string()),
          experienceContext: z.array(z.string()),
          bunningsSpecificDetails: z.array(z.string()),
          ratingDistribution: z.object({
            "1star": z.number(),
            "2star": z.number(),
            "3star": z.number(),
            "4star": z.number(),
            "5star": z.number(),
          }),
          averageRating: z.number(),
        })
        .optional(),
    }),
});

const reviews = defineCollection({
  loader: glob({ pattern: "*.md", base: "reviews/v1" }),
  schema: z.object({
    slug: z.string().min(1, "Slug is required"),
    author: reference("authors"),
    tool: reference("tools"),
    excerpt: z.string(),
    llm: z.string(),
    mood: z.string(),
    tone: z.string(),
    readingTime: z.number(),
    shareCount: z.number().default(0),
    dateCreated: z.string(),
    lastUpdated: z.string(),

    // Bunnings-style review fields (optional for backward compatibility)
    rating: z.number().min(1).max(5).optional(),
    recommendsProduct: z.boolean().optional(),
    helpfulVotes: z.number().default(0),
    unhelpfulVotes: z.number().default(0),
    verifiedPurchaser: z.boolean().default(true),
    displayName: z.string().optional(),
    useCase: z.string().optional(),
    qualityRating: z.number().min(1).max(5).optional(),
    valueRating: z.number().min(1).max(5).optional(),
    userCategory: z.string().optional(),
  }),
});

const reviewsV2 = defineCollection({
  loader: glob({ pattern: "*.md", base: "reviews/v2" }),
  schema: z
    .object({
      slug: z.string().min(1, "Slug is required"),
      author: reference("authors"),
      tool: reference("tools"),
      excerpt: z.string(),
      llm: z.string(),
      mood: z.string(),
      tone: z.string(),
      readingTime: z.number(),
      shareCount: z.number().default(0),
      dateCreated: z.string(),
      lastUpdated: z.string(),

      // Bunnings-style review fields (optional for backward compatibility)
      rating: z.number().min(1).max(5).optional(),
      recommendsProduct: z.boolean().optional(),
      helpfulVotes: z.number().default(0),
      unhelpfulVotes: z.number().default(0),
      verifiedPurchaser: z.boolean().default(true),
      displayName: z.string().optional(),
      useCase: z.string().optional(),
      qualityRating: z.number().min(1).max(5).optional(),
      valueRating: z.number().min(1).max(5).optional(),
      userCategory: z.string().optional(),
    })
    .refine(
      (data) => {
        // Validate rating/recommendation consistency
        const rating = data.rating;
        const recommends = data.recommendsProduct;

        // Only validate if both fields are present
        if (rating !== undefined && recommends !== undefined) {
          return (rating >= 3 && recommends) || (rating < 3 && !recommends);
        }
        return true; // Skip validation if either field is missing
      },
      {
        message:
          "Rating and recommendsProduct must be consistent: 1-2 stars should not recommend (false), 3+ stars should recommend (true)",
      },
    ),
});

const cartoons = defineCollection({
  loader: file("src/images/cartoons/manifest.json"),
  schema: ({ image }) =>
    z.object({
      id: image(),
      prompt: z.string(),
      model: z.string(),
      generationDate: z.string(),
    }),
});

export const collections = { authors, tools, reviews, reviewsV2, cartoons };

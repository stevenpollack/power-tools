// NOTE: Author display names and rating biases are now stored in the author schema
// See authors/*.json files for displayName and ratingBias fields

// User categories for reviews
export const userCategories = [
  "Construction Professional",
  "Advanced DIYer",
  "Weekend Warrior",
  "Home Improvement Enthusiast",
  "Woodworking Hobbyist",
  "Craft Enthusiast",
  "Literary Professional",
  "Professional Reviewer",
];

// Common use cases for tools
export const commonUseCases = [
  "Home renovation project",
  "Building a deck",
  "Furniture repair",
  "Garden maintenance",
  "Craft project",
  "Professional construction",
  "Hobby woodworking",
  "Emergency repairs",
  "Seasonal projects",
  "Custom builds",
];

export function getRandomUserCategory(): string {
  return userCategories[Math.floor(Math.random() * userCategories.length)]!;
}

export function getRandomUseCase(): string {
  return commonUseCases[Math.floor(Math.random() * commonUseCases.length)]!;
}

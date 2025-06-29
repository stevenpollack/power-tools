// Centralized constants for the Floating Wall UI

export const MOOD_COLORS = {
  technical: {
    border: "border-blue-600",
    bg: "bg-blue-50", 
    text: "text-blue-800",
    variant: "border-blue-600 bg-blue-50 text-blue-800",
  },
  humorous: {
    border: "border-amber-600",
    bg: "bg-amber-50",
    text: "text-amber-800", 
    variant: "border-amber-600 bg-amber-50 text-amber-800",
  },
  dramatic: {
    border: "border-red-600",
    bg: "bg-red-50",
    text: "text-red-800",
    variant: "border-red-600 bg-red-50 text-red-800",
  },
  philosophical: {
    border: "border-purple-600", 
    bg: "bg-purple-50",
    text: "text-purple-800",
    variant: "border-purple-600 bg-purple-50 text-purple-800",
  },
} as const;

export const MOOD_OPTIONS = [
  {
    value: "technical" as const,
    label: "Technical",
    color: MOOD_COLORS.technical.variant,
  },
  {
    value: "humorous" as const,
    label: "Humorous", 
    color: MOOD_COLORS.humorous.variant,
  },
  {
    value: "dramatic" as const,
    label: "Dramatic",
    color: MOOD_COLORS.dramatic.variant,
  },
  {
    value: "philosophical" as const,
    label: "Philosophical",
    color: MOOD_COLORS.philosophical.variant,
  },
];

export const AUTHOR_DATA = {
  "ernest-hemingway": {
    name: "Ernest Hemingway",
    lifespan: "1899-1961",
    image: "hemingway.jpg",
  },
  "oscar-wilde": {
    name: "Oscar Wilde", 
    lifespan: "1854-1900",
    image: "wilde.jpg",
  },
  "virginia-woolf": {
    name: "Virginia Woolf",
    lifespan: "1882-1941",
    image: "woolf.jpg",
  },
  "franz-kafka": {
    name: "Franz Kafka",
    lifespan: "1883-1924", 
    image: "kafka.jpg",
  },
  "mark-twain": {
    name: "Mark Twain",
    lifespan: "1835-1910",
    image: "twain.jpg",
  },
  "hp-lovecraft": {
    name: "H.P. Lovecraft",
    lifespan: "1890-1937",
    image: "lovecraft.jpg",
  },
  "jane-austen": {
    name: "Jane Austen",
    lifespan: "1775-1817", 
    image: "austen.jpg",
  },
  "charles-dickens": {
    name: "Charles Dickens",
    lifespan: "1812-1870",
    image: "dickens.jpg",
  },
  "george-orwell": {
    name: "George Orwell",
    lifespan: "1903-1950",
    image: "orwell.jpg",
  },
  "jack-kerouac": {
    name: "Jack Kerouac",
    lifespan: "1922-1969",
    image: "kerouac.jpg",
  },
  "edgar-allan-poe": {
    name: "Edgar Allan Poe",
    lifespan: "1809-1849",
    image: "poe.jpg",
  },
  "ayn-rand": {
    name: "Ayn Rand",
    lifespan: "1905-1982",
    image: "rand.jpg",
  },
} as const;

export type MoodType = keyof typeof MOOD_COLORS;
export type AuthorId = keyof typeof AUTHOR_DATA; 
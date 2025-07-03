// Brand color mapping
export function getBrandColor(brand: string) {
  const brandColors: Record<string, string> = {
    milwaukee: "#E31E24",
    ryobi: "#6ABE45",
    dewalt: "#FFD320",
    dremel: "#0066CC",
    paslode: "#FF4500",
    ozito: "#FF6600",
    makita: "#00B2CC",
    bosch: "#007BC1",
  };

  return brandColors[brand.toLowerCase()] || "#6B7280";
}

export function getBrandInitials(brand: string) {
  return brand.slice(0, 2).toUpperCase();
}

export function getMoodColor(mood: string) {
  return moodStyles[mood] || "bg-gray-100 text-gray-800 border-gray-200";
}

export function getToneColor(tone: string) {
  return toneStyles[tone] || "bg-gray-100 text-gray-800 border-gray-200";
}

  // Mood/Tone badge styling
  const moodStyles: Record<string, string> = {
    philosophical: "bg-indigo-100 text-indigo-800 border-indigo-200",
    technical: "bg-green-100 text-green-800 border-green-200",
    humorous: "bg-yellow-100 text-yellow-800 border-yellow-200",
    dramatic: "bg-red-100 text-red-800 border-red-200",
  };

  const toneStyles: Record<string, string> = {
    formal: "bg-slate-100 text-slate-700 border-slate-200",
    casual: "bg-emerald-100 text-emerald-700 border-emerald-200",
    satirical: "bg-orange-100 text-orange-700 border-orange-200",
    earnest: "bg-purple-100 text-purple-700 border-purple-200",
  };

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

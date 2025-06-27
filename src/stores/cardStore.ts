import { map, atom } from "nanostores";

export type CardArrangement = "masonry" | "grid" | "list";

export const cardArrangement = atom<CardArrangement>("masonry");
export const selectedCard = atom<string | null>(null);

export const cardInteractions = map({
  hoveredCard: null as string | null,
  expandedCard: null as string | null,
  isCardDetailsOpen: false,
}); 
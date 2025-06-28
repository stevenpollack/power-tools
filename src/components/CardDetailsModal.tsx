import React from "react";
import { useStore } from "@nanostores/react";
import { selectedCard } from "@/stores/cardStore";
import { CardDetailsSheet } from "./CardDetailsSheet";
import type { Review } from "@/lib/types";

interface CardDetailsModalProps {
  reviews: Review[];
}

export const CardDetailsModal: React.FC<CardDetailsModalProps> = ({
  reviews,
}) => {
  const $selectedCard = useStore(selectedCard);

  // Find the selected review
  const selectedReview = $selectedCard
    ? reviews.find((review) => review.id === $selectedCard) || null
    : null;

  return <CardDetailsSheet review={selectedReview} />;
};

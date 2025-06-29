import React from "react";
import { useStore } from "@nanostores/react";
import { selectedCard } from "@/stores/cardStore";
import { CardDetailsSheet } from "./CardDetailsSheet";
import type { Review } from "@/lib/types";

interface CardDetailsProviderProps {
    reviews: Review[];
}

/**
 * Provides card details functionality by listening to selectedCard store
 * and rendering the appropriate sheet with the selected review data.
 */
export const CardDetailsProvider: React.FC<CardDetailsProviderProps> = ({
    reviews,
}) => {
    const $selectedCard = useStore(selectedCard);

    // Find the selected review
    const selectedReview = $selectedCard
        ? reviews.find((review) => review.id === $selectedCard) || null
        : null;

    return <CardDetailsSheet review={selectedReview} />;
}; 
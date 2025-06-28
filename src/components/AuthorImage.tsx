import { type FC, useState } from "react";

// Helper function to map authorId to image filename
const getAuthorImagePath = (authorId: string): string => {
    const authorImageMap: Record<string, string> = {
        "ernest-hemingway": "hemingway.jpg",
        "oscar-wilde": "wilde.jpg",
        "virginia-woolf": "woolf.jpg",
        "franz-kafka": "kafka.jpg",
        "mark-twain": "twain.jpg",
        "hp-lovecraft": "lovecraft.jpg",
        "jane-austen": "austen.jpg",
        "charles-dickens": "dickens.jpg",
        "george-orwell": "orwell.jpg",
        "jack-kerouac": "kerouac.jpg",
        "edgar-allan-poe": "poe.jpg",
        "ayn-rand": "rand.jpg",
    };

    return authorImageMap[authorId] || `${authorId}.jpg`;
};
// Author Image with Fallback
export const AuthorImage: FC<{ authorId: string; authorName: string; }> = ({
    authorId, authorName,
}) => {
    const [imageError, setImageError] = useState(false);

    if (imageError) {
        // Fallback: Author initials in a circle
        const initials = authorName
            .split(" ")
            .map((name) => name.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2);

        return (
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-300 text-sm font-semibold text-gray-700">
                {initials}
            </div>
        );
    }

    return (
        <img
            src={`/images/authors/${getAuthorImagePath(authorId)}`}
            alt={authorName}
            className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
            onError={() => setImageError(true)} />
    );
};

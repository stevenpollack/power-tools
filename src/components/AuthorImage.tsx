import { type FC, useState } from "react";
import { getAuthorImagePath, getAuthorInitials } from "@/lib/helpers";
// Author Image with Fallback
export const AuthorImage: FC<{ authorId: string; authorName: string }> = ({
  authorId,
  authorName,
}) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    // Fallback: Author initials in a circle
    const initials = getAuthorInitials(authorName);

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
      onError={() => setImageError(true)}
    />
  );
};

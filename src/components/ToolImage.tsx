import { type FC, useState } from "react";
import { Wrench } from "lucide-react";

// Tool Image with Fallback
export const ToolImage: FC<{ toolId: string; toolName: string }> = ({
  toolId,
  toolName,
}) => {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    // Fallback: Tool icon with wrench
    return (
      <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200">
        <Wrench className="h-8 w-8 text-gray-500" />
      </div>
    );
  }

  return (
    <img
      src={`/images/tools/${toolId}.svg`}
      alt={toolName}
      className="h-20 w-20 object-contain"
      onError={() => setImageError(true)}
    />
  );
};

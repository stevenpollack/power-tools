import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface VotingButtonsProps {
  helpfulCount: number;
  unhelpfulCount: number;
  disabled?: boolean;
  className?: string;
  onHelpfulClick?: () => void;
  onUnhelpfulClick?: () => void;
}

export function VotingButtons({
  helpfulCount,
  unhelpfulCount,
  disabled = false,
  className,
  onHelpfulClick,
  onUnhelpfulClick,
}: VotingButtonsProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="text-bunnings-sm text-bunnings-neutral-dark-gray">
        Helpful?
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={onHelpfulClick}
          disabled={disabled}
          className={cn(
            "border-bunnings-neutral-medium-gray text-bunnings-sm flex items-center gap-1 rounded-md border px-3 py-1 transition-colors",
            "hover:bg-bunnings-neutral-light-gray disabled:cursor-not-allowed disabled:opacity-50",
            "focus:ring-bunnings-primary-orange focus:ring-2 focus:ring-offset-2 focus:outline-none",
          )}
        >
          <ThumbsUp className="h-3 w-3" />
          <span>({helpfulCount})</span>
        </button>
        <button
          onClick={onUnhelpfulClick}
          disabled={disabled}
          className={cn(
            "border-bunnings-neutral-medium-gray text-bunnings-sm flex items-center gap-1 rounded-md border px-3 py-1 transition-colors",
            "hover:bg-bunnings-neutral-light-gray disabled:cursor-not-allowed disabled:opacity-50",
            "focus:ring-bunnings-primary-orange focus:ring-2 focus:ring-offset-2 focus:outline-none",
          )}
        >
          <ThumbsDown className="h-3 w-3" />
          <span>({unhelpfulCount})</span>
        </button>
      </div>
    </div>
  );
}

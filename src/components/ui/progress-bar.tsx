import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { type FC } from "react";

interface ProgressBarProps {
  width: number; // 0-100
  variant?: "rounded" | "notched";
  className?: string;
}

const progressBarVariants = cva("relative w-full bg-gray-200 h-4", {
  variants: {
    variant: {
      rounded: "rounded-full border-gray-300 border-1",
      notched: "rounded-none",
    },
  },
});

export const ProgressBar: FC<ProgressBarProps> = ({
  width,
  variant = "rounded",
  className,
}) => {
  const baseClasses = progressBarVariants({ variant });
  return (
    <div className={cn(baseClasses, className)}>
      <div
        className={cn(
          baseClasses,
          `bg-bunnings-rating-progress-bar border-bunnings-rating-progress-bar absolute`,
          width === 0 ? "hidden" : "block",
          variant === "rounded"
            ? "top-[-1px] left-[-1px] border-1"
            : "top-0 left-0 border-0",
        )}
        style={{ width: `${width}%` }}
      />
      {variant === "notched" && (
        <div className="absolute inset-0 flex">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex-1"
              style={{ borderRight: "1px solid white" }}
            />
          ))}
          <div className="flex-1" />
        </div>
      )}
    </div>
  );
};

import React from "react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

interface FilterOption {
    value: string;
    label: string;
    color?: string;
}

interface FilterBadgeGroupProps {
    title: string;
    options: FilterOption[];
    activeValue: string | null;
    onValueChange: (value: string | null) => void;
    className?: string;
}

export const FilterBadgeGroup: React.FC<FilterBadgeGroupProps> = ({
    title,
    options,
    activeValue,
    onValueChange,
    className,
}) => {
    const handleBadgeClick = (value: string) => {
        onValueChange(activeValue === value ? null : value);
    };

    return (
        <div className={className}>
            <span className="mb-3 block text-sm font-medium text-gray-700">
                {title}
            </span>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <Badge
                        key={option.value}
                        variant={activeValue === option.value ? "default" : "outline"}
                        className={cn(
                            "cursor-pointer transition-all hover:scale-105",
                            activeValue === option.value
                                ? "border-gray-900 bg-gray-900 text-white"
                                : option.color,
                        )}
                        onClick={() => handleBadgeClick(option.value)}
                    >
                        {option.label}
                    </Badge>
                ))}
            </div>
        </div>
    );
}; 
"use client";

import { forwardRef, useId } from "react";
import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  hideLabel?: boolean;
  uiSize?: "sm" | "md";
}

const sizeClasses = {
  sm: "py-2 pl-3 pr-8 text-xs",
  md: "px-4 py-3 pr-10 text-sm",
};

const chevronSizeClasses = {
  sm: { size: 14, className: "right-2.5" },
  md: { size: 16, className: "right-3" },
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, hideLabel = false, uiSize = "md", id, className = "", ...props },
  ref
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const chevron = chevronSizeClasses[uiSize];

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={selectId}
        className={hideLabel ? "sr-only" : "text-sm font-medium text-foreground/70"}
      >
        {label}
      </label>
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={`
            w-full appearance-none rounded-xl border border-white/10 bg-background
            text-foreground outline-none transition
            focus:border-primary
            ${sizeClasses[uiSize]}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={chevron.size}
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-foreground/40 ${chevron.className}`}
        />
      </div>
    </div>
  );
});

export default Select;

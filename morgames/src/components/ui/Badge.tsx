import type { HTMLAttributes } from "react";

type BadgeTone = "neutral" | "primary" | "secondary" | "accent" | "warning" | "error";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-foreground/10 text-foreground/60",
  primary: "bg-primary/15 text-primary",
  secondary: "bg-secondary/15 text-secondary",
  accent: "bg-accent/15 text-accent",
  warning: "bg-warning/15 text-warning",
  error: "bg-error/15 text-error",
};

export default function Badge({ tone = "neutral", className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full px-2.5 py-1
        text-xs font-medium
        ${toneClasses[tone]}
        ${className}
      `}
      {...props}
    />
  );
}

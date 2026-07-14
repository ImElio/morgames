import { Joystick, Map, Mountain, Puzzle, Square } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TemplateId } from "@/types/project";

export const TEMPLATE_ICONS: Record<TemplateId, LucideIcon> = {
  "blank-2d": Square,
  platformer: Mountain,
  "top-down": Map,
  puzzle: Puzzle,
  arcade: Joystick,
};

const TEMPLATE_BACKGROUNDS: Record<TemplateId, string> = {
  "blank-2d": "bg-background",
  platformer: "bg-secondary/8",
  "top-down": "bg-accent/8",
  puzzle: "bg-primary/8",
  arcade: "bg-warning/8",
};

const TEMPLATE_ICON_COLORS: Record<TemplateId, string> = {
  "blank-2d": "text-foreground/25",
  platformer: "text-secondary/60",
  "top-down": "text-accent/60",
  puzzle: "text-primary/60",
  arcade: "text-warning/60",
};

interface ProjectThumbnailProps {
  template: TemplateId;
  className?: string;
  iconSize?: number;
}

export default function ProjectThumbnail({
  template,
  className = "",
  iconSize = 28,
}: ProjectThumbnailProps) {
  const Icon = TEMPLATE_ICONS[template];

  return (
    <div
      className={`flex items-center justify-center ${TEMPLATE_BACKGROUNDS[template]} ${className}`}
    >
      <Icon size={iconSize} strokeWidth={1.5} className={TEMPLATE_ICON_COLORS[template]} />
    </div>
  );
}

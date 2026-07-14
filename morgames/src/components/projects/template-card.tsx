"use client";

import { Check } from "lucide-react";
import ProjectThumbnail from "@/components/projects/project-thumbnail";
import Badge from "@/components/ui/Badge";
import type { ProjectTemplate } from "@/types/project";

interface TemplateCardProps {
  template: ProjectTemplate;
  selected: boolean;
  onSelect: () => void;
}

export default function TemplateCard({ template, selected, onSelect }: TemplateCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`
        flex w-full items-center gap-2.5 rounded-lg border p-2 text-left transition-colors
        outline-none focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-primary
        ${
          selected
            ? "border-primary bg-primary/5"
            : "border-white/10 hover:border-white/20 hover:bg-white/5"
        }
      `}
    >
      <ProjectThumbnail
        template={template.id}
        iconSize={15}
        className="h-8 w-8 shrink-0 rounded-md"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-semibold text-foreground">{template.name}</span>
          {selected && <Check size={13} className="shrink-0 text-primary" />}
          {template.recommended && <Badge tone="primary">Recommended</Badge>}
        </div>
        <p className="mt-0.5 truncate text-xs text-foreground/50">{template.description}</p>
      </div>
    </button>
  );
}

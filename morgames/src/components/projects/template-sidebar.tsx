"use client";

import { useMemo, useState } from "react";
import TemplateCard from "@/components/projects/template-card";
import TemplateSearch from "@/components/projects/template-search";
import { TEMPLATE_CATEGORIES } from "@/lib/project-utils";
import type { ProjectTemplate, TemplateCategory, TemplateId } from "@/types/project";

interface TemplateSidebarProps {
  templates: ProjectTemplate[];
  selectedId: TemplateId;
  onSelect: (id: TemplateId) => void;
}

export default function TemplateSidebar({ templates, selectedId, onSelect }: TemplateSidebarProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<TemplateCategory | "All">("All");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return templates.filter((template) => {
      if (category !== "All" && template.category !== category) return false;
      if (query && !template.name.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [templates, search, category]);

  return (
    <div className="flex flex-col gap-4">
      <TemplateSearch value={search} onChange={setSearch} />

      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter templates by category">
        {TEMPLATE_CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            className={`
              rounded-full px-3 py-1.5 text-xs font-medium transition-colors
              ${
                category === item
                  ? "bg-primary/15 text-primary"
                  : "bg-white/5 text-foreground/55 hover:text-foreground"
              }
            `}
          >
            {item}
          </button>
        ))}
      </div>

      <div role="radiogroup" aria-label="Project template" className="flex flex-col gap-2">
        {filtered.length > 0 ? (
          filtered.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              selected={template.id === selectedId}
              onSelect={() => onSelect(template.id)}
            />
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-foreground/15 px-4 py-8 text-center text-sm text-foreground/50">
            No templates found.
          </p>
        )}
      </div>
    </div>
  );
}

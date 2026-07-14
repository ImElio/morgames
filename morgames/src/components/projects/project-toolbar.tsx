"use client";

import { Search } from "lucide-react";
import Select from "@/components/ui/Select";
import { projectTemplates } from "@/data/mock-projects";
import { PROJECT_STATUSES, PROJECT_STATUS_LABELS } from "@/lib/project-utils";
import type { ProjectStatusFilter, ProjectTemplateFilter } from "@/types/project";

interface ProjectToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: ProjectStatusFilter;
  onStatusChange: (value: ProjectStatusFilter) => void;
  template: ProjectTemplateFilter;
  onTemplateChange: (value: ProjectTemplateFilter) => void;
}

export default function ProjectToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  template,
  onTemplateChange,
}: ProjectToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative w-full max-w-xs">
        <Search
          size={14}
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground/40"
        />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search projects"
          aria-label="Search projects"
          className="
            h-9 w-full rounded-lg border border-white/10 bg-background
            pl-8 pr-3 text-xs text-foreground outline-none
            transition placeholder:text-foreground/30 focus:border-primary
          "
        />
      </div>

      <Select
        label="Status"
        hideLabel
        uiSize="sm"
        value={status}
        onChange={(event) => onStatusChange(event.target.value as ProjectStatusFilter)}
        className="w-32"
        options={[
          { value: "all", label: "All statuses" },
          ...PROJECT_STATUSES.map((value) => ({ value, label: PROJECT_STATUS_LABELS[value] })),
        ]}
      />

      <Select
        label="Template"
        hideLabel
        uiSize="sm"
        value={template}
        onChange={(event) => onTemplateChange(event.target.value as ProjectTemplateFilter)}
        className="w-32"
        options={[
          { value: "all", label: "All templates" },
          ...projectTemplates.map((item) => ({ value: item.id, label: item.name })),
        ]}
      />
    </div>
  );
}

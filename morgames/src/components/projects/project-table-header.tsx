"use client";

import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import type { ProjectSort, ProjectSortColumn, ProjectSortDirection } from "@/types/project";

interface ProjectTableHeaderProps {
  sort: ProjectSort;
  onSortChange: (sort: ProjectSort) => void;
}

const STICKY_CELL = "sticky top-0 z-10 bg-surface";

interface SortableHeaderProps {
  column: ProjectSortColumn;
  label: string;
  sort: ProjectSort;
  onSortChange: (sort: ProjectSort) => void;
  className?: string;
}

function defaultDirectionFor(column: ProjectSortColumn): ProjectSortDirection {
  return column === "updatedAt" || column === "createdAt" ? "desc" : "asc";
}

function SortableHeader({ column, label, sort, onSortChange, className = "" }: SortableHeaderProps) {
  const active = sort.column === column;

  function handleClick() {
    if (active) {
      onSortChange({ column, direction: sort.direction === "asc" ? "desc" : "asc" });
    } else {
      onSortChange({ column, direction: defaultDirectionFor(column) });
    }
  }

  return (
    <th
      scope="col"
      aria-sort={active ? (sort.direction === "asc" ? "ascending" : "descending") : "none"}
      className={`${STICKY_CELL} whitespace-nowrap px-2 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-foreground/50 ${className}`}
    >
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-1 truncate transition-colors hover:text-foreground"
      >
        {label}
        {active ? (
          sort.direction === "asc" ? (
            <ChevronUp size={13} />
          ) : (
            <ChevronDown size={13} />
          )
        ) : (
          <ArrowUpDown size={12} className="text-foreground/25" />
        )}
      </button>
    </th>
  );
}

export default function ProjectTableHeader({ sort, onSortChange }: ProjectTableHeaderProps) {
  return (
    <thead>
      <tr className="border-b border-foreground/8">
        <th scope="col" className={`${STICKY_CELL} w-8 px-1.5 py-2.5`}>
          <span className="sr-only">Favorite</span>
        </th>
        <SortableHeader column="name" label="Name" sort={sort} onSortChange={onSortChange} />
        <SortableHeader
          column="status"
          label="Status"
          sort={sort}
          onSortChange={onSortChange}
          className="w-20"
        />
        <SortableHeader
          column="template"
          label="Template"
          sort={sort}
          onSortChange={onSortChange}
          className="hidden w-28 md:table-cell"
        />
        <SortableHeader
          column="updatedAt"
          label="Last modified"
          sort={sort}
          onSortChange={onSortChange}
          className="w-16"
        />
        <SortableHeader
          column="createdAt"
          label="Created"
          sort={sort}
          onSortChange={onSortChange}
          className="hidden w-24 xl:table-cell"
        />
        <SortableHeader
          column="engineVersion"
          label="Engine version"
          sort={sort}
          onSortChange={onSortChange}
          className="hidden w-24 xl:table-cell"
        />
        <th scope="col" className={`${STICKY_CELL} w-10 px-1.5 py-2.5`}>
          <span className="sr-only">Actions</span>
        </th>
      </tr>
    </thead>
  );
}

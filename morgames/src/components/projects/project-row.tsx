"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import ProjectActionsMenu from "@/components/projects/project-actions-menu";
import { TEMPLATE_ICONS } from "@/components/projects/project-thumbnail";
import StatusBadge from "@/components/projects/status-badge";
import {
  formatAbsoluteDate,
  formatRelativeDate,
  formatRelativeDateCompact,
  getTemplateById,
} from "@/lib/project-utils";
import type { GameProject } from "@/types/project";

interface ProjectRowProps {
  project: GameProject;
  onToggleFavorite: (project: GameProject) => void;
  onRename: (project: GameProject) => void;
  onDuplicate: (project: GameProject) => void;
  onExport: (project: GameProject) => void;
  onRemoveFromList: (project: GameProject) => void;
  onDelete: (project: GameProject) => void;
}

export default function ProjectRow({
  project,
  onToggleFavorite,
  onRename,
  onDuplicate,
  onExport,
  onRemoveFromList,
  onDelete,
}: ProjectRowProps) {
  const router = useRouter();
  const href = `/dashboard/projects/${project.id}`;
  const template = getTemplateById(project.template);
  const templateName = template?.name ?? project.template;
  const Icon = TEMPLATE_ICONS[project.template];

  function handleRowClick(event: MouseEvent<HTMLTableRowElement>) {
    if ((event.target as HTMLElement).closest("a, button")) return;
    router.push(href);
  }

  return (
    <tr
      onClick={handleRowClick}
      className="
        cursor-pointer border-b border-foreground/6 transition-colors
        last:border-0 hover:bg-white/3 focus-within:bg-white/3
      "
    >
      <td className="px-1.5 py-2.5">
        <button
          type="button"
          aria-pressed={Boolean(project.favorite)}
          aria-label={
            project.favorite ? `Remove ${project.name} from favorites` : `Add ${project.name} to favorites`
          }
          onClick={() => onToggleFavorite(project)}
          className="
            flex h-7 w-7 items-center justify-center rounded-md text-foreground/30
            transition-colors hover:text-warning
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
          "
        >
          <Star
            size={15}
            fill={project.favorite ? "currentColor" : "none"}
            className={project.favorite ? "text-warning" : ""}
          />
        </button>
      </td>

      <td className="px-2 py-2.5">
        <Link
          href={href}
          className="
            flex items-center gap-2.5 rounded-md outline-none
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
          "
        >
          <Icon size={16} className="shrink-0 text-foreground/40" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-foreground">{project.name}</span>
            <span className="block truncate text-xs text-foreground/50">
              {project.description ? `${project.description} · ` : ""}
              {templateName}
            </span>
          </span>
        </Link>
      </td>

      <td className="px-2 py-2.5">
        <StatusBadge status={project.status} />
      </td>

      <td className="hidden truncate whitespace-nowrap px-2 py-2.5 text-sm text-foreground/70 md:table-cell">
        {templateName}
      </td>

      <td
        className="whitespace-nowrap px-2 py-2.5 text-sm text-foreground/70"
        title={formatRelativeDate(project.updatedAt)}
      >
        <span aria-hidden="true">{formatRelativeDateCompact(project.updatedAt)}</span>
        <span className="sr-only">{formatRelativeDate(project.updatedAt)}</span>
      </td>

      <td className="hidden truncate whitespace-nowrap px-2 py-2.5 text-sm text-foreground/70 xl:table-cell">
        {formatAbsoluteDate(project.createdAt)}
      </td>

      <td className="hidden truncate whitespace-nowrap px-2 py-2.5 text-sm text-foreground/70 xl:table-cell">
        {project.engineVersion ?? "—"}
      </td>

      <td className="px-1.5 py-2.5 text-right">
        <ProjectActionsMenu
          project={project}
          onOpen={() => router.push(href)}
          onRename={() => onRename(project)}
          onDuplicate={() => onDuplicate(project)}
          onExport={() => onExport(project)}
          onRemoveFromList={() => onRemoveFromList(project)}
          onDelete={() => onDelete(project)}
        />
      </td>
    </tr>
  );
}

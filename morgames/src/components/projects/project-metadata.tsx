import type { ReactNode } from "react";
import StatusBadge from "@/components/projects/status-badge";
import { formatAbsoluteDate, formatRelativeDate } from "@/lib/project-utils";
import type { GameProject } from "@/types/project";

interface ProjectMetadataProps {
  project: GameProject;
  templateName: string;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function ProjectMetadata({ project, templateName }: ProjectMetadataProps) {
  const rows: { label: string; value: ReactNode }[] = [
    { label: "Template", value: templateName },
    { label: "Status", value: <StatusBadge status={project.status} /> },
    { label: "Engine version", value: project.engineVersion ?? "—" },
    {
      label: "Canvas",
      value: project.canvasSize
        ? `${project.canvasSize.width} × ${project.canvasSize.height}`
        : "—",
    },
    {
      label: "Orientation",
      value: project.orientation ? capitalize(project.orientation) : "—",
    },
    { label: "Created", value: formatAbsoluteDate(project.createdAt) },
    { label: "Last modified", value: formatRelativeDate(project.updatedAt) },
  ];

  return (
    <div>
      <h2 className="border-b border-foreground/8 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-foreground/60">
        Project information
      </h2>
      <dl className="grid grid-cols-2 gap-px bg-background sm:grid-cols-4">
        {rows.map((row) => (
          <div key={row.label} className="bg-surface px-4 py-3">
            <dt className="text-xs text-foreground/60">{row.label}</dt>
            <dd className="mt-1 truncate text-sm font-medium text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

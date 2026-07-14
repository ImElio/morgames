import { projectTemplates } from "@/data/mock-projects";
import type {
  CanvasOrientation,
  CanvasSize,
  GameProject,
  ProjectSort,
  ProjectStatus,
  ProjectStatusFilter,
  ProjectTemplateFilter,
  TemplateCategory,
  TemplateId,
} from "@/types/project";

export const PROJECT_NAME_MIN_LENGTH = 2;
export const PROJECT_NAME_MAX_LENGTH = 60;
export const PROJECT_ENGINE_VERSION = "0.9.4";

export const PROJECT_STATUSES: ProjectStatus[] = [
  "draft",
  "prototype",
  "published",
];

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: "Draft",
  prototype: "Prototype",
  published: "Published",
};

export const DEFAULT_PROJECT_SORT: ProjectSort = {
  column: "updatedAt",
  direction: "desc",
};

export const TEMPLATE_CATEGORIES: Array<TemplateCategory | "All"> = [
  "All",
  "Blank",
  "Platformer",
  "Top-down",
  "Puzzle",
  "Arcade",
  "Learning",
];

export const CANVAS_PRESETS: Record<
  CanvasOrientation,
  { value: string; label: string; size: CanvasSize }[]
> = {
  landscape: [
    { value: "1280x720", label: "1280 × 720", size: { width: 1280, height: 720 } },
    { value: "1920x1080", label: "1920 × 1080", size: { width: 1920, height: 1080 } },
    { value: "800x600", label: "800 × 600", size: { width: 800, height: 600 } },
  ],
  portrait: [
    { value: "720x1280", label: "720 × 1280", size: { width: 720, height: 1280 } },
    { value: "1080x1920", label: "1080 × 1920", size: { width: 1080, height: 1920 } },
  ],
};

export function getTemplateById(id: TemplateId) {
  return projectTemplates.find((template) => template.id === id);
}

export function validateProjectName(
  rawName: string,
  existingNames: string[],
  currentName?: string
): string | null {
  const name = rawName.trim();

  if (!name) return "Project name is required.";
  if (name.length < PROJECT_NAME_MIN_LENGTH) {
    return `Name must be at least ${PROJECT_NAME_MIN_LENGTH} characters.`;
  }
  if (name.length > PROJECT_NAME_MAX_LENGTH) {
    return `Name must be ${PROJECT_NAME_MAX_LENGTH} characters or fewer.`;
  }

  const normalizedCurrent = currentName?.trim().toLowerCase();
  const isDuplicate = existingNames.some((existing) => {
    const normalizedExisting = existing.trim().toLowerCase();
    return (
      normalizedExisting === name.toLowerCase() &&
      normalizedExisting !== normalizedCurrent
    );
  });

  if (isDuplicate) return "A project with this name already exists.";

  return null;
}

export function generateDuplicateName(
  baseName: string,
  existingNames: string[]
): string {
  const existingLower = new Set(
    existingNames.map((name) => name.trim().toLowerCase())
  );
  const base = `${baseName} copy`;
  if (!existingLower.has(base.toLowerCase())) return base;

  let counter = 2;
  while (existingLower.has(`${base} ${counter}`.toLowerCase())) {
    counter += 1;
  }
  return `${base} ${counter}`;
}

export function generateProjectId(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const suffix = Math.random().toString(36).slice(2, 7);
  return slug ? `${slug}-${suffix}` : `project-${suffix}`;
}

function compareVersions(a?: string, b?: string): number {
  const toParts = (version?: string) =>
    (version ?? "0.0.0").split(".").map((part) => Number.parseInt(part, 10) || 0);

  const partsA = toParts(a);
  const partsB = toParts(b);
  const length = Math.max(partsA.length, partsB.length);

  for (let index = 0; index < length; index += 1) {
    const diff = (partsA[index] ?? 0) - (partsB[index] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function getTemplateName(id: TemplateId): string {
  return getTemplateById(id)?.name ?? id;
}

export function sortProjects(projects: GameProject[], sort: ProjectSort): GameProject[] {
  const sorted = [...projects];
  const direction = sort.direction === "asc" ? 1 : -1;

  sorted.sort((a, b) => {
    switch (sort.column) {
      case "name":
        return direction * a.name.localeCompare(b.name);
      case "status":
        return direction * a.status.localeCompare(b.status);
      case "template":
        return direction * getTemplateName(a.template).localeCompare(getTemplateName(b.template));
      case "createdAt":
        return direction * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case "engineVersion":
        return direction * compareVersions(a.engineVersion, b.engineVersion);
      case "updatedAt":
      default:
        return direction * (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
    }
  });

  return sorted;
}

type ProjectFilters = {
  search: string;
  status: ProjectStatusFilter;
  template: ProjectTemplateFilter;
};

export function filterProjects(
  projects: GameProject[],
  filters: ProjectFilters
): GameProject[] {
  const query = filters.search.trim().toLowerCase();

  return projects.filter((project) => {
    if (filters.status !== "all" && project.status !== filters.status) {
      return false;
    }
    if (filters.template !== "all" && project.template !== filters.template) {
      return false;
    }
    if (query && !project.name.toLowerCase().includes(query)) {
      return false;
    }
    return true;
  });
}

export function formatRelativeDate(iso: string, now: Date = new Date()): string {
  const date = new Date(iso);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.round(diffMs / 60000);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  const diffDays = Math.round(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  const diffWeeks = Math.round(diffDays / 7);
  if (diffDays < 30) {
    return `${diffWeeks} week${diffWeeks === 1 ? "" : "s"} ago`;
  }

  return formatAbsoluteDate(iso);
}

export function formatAbsoluteDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelativeDateCompact(iso: string, now: Date = new Date()): string {
  const date = new Date(iso);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.round(diffMs / 60000);

  if (diffMinutes < 1) return "now";
  if (diffMinutes < 60) return `${diffMinutes}m`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h`;

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d`;

  const diffWeeks = Math.round(diffDays / 7);
  if (diffDays < 30) return `${diffWeeks}w`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function exportProjectAsJson(project: GameProject): void {
  const payload = JSON.stringify(project, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${project.id}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

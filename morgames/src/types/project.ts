export type ProjectStatus = "draft" | "prototype" | "published";

export type TemplateId =
  | "blank-2d"
  | "platformer"
  | "top-down"
  | "puzzle"
  | "arcade";

export type CanvasOrientation = "landscape" | "portrait";

export type CanvasSize = {
  width: number;
  height: number;
};

export type GameProject = {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  template: TemplateId;
  updatedAt: string;
  createdAt: string;
  status: ProjectStatus;
  engineVersion?: string;
  orientation?: CanvasOrientation;
  canvasSize?: CanvasSize;
  favorite?: boolean;
};

export type TemplateCategory =
  | "Blank"
  | "Platformer"
  | "Top-down"
  | "Puzzle"
  | "Arcade"
  | "Learning";

export type ProjectTemplate = {
  id: TemplateId;
  name: string;
  description: string;
  category: TemplateCategory;
  features: string[];
  recommended?: boolean;
  allowsSampleScene?: boolean;
};

export type SceneSummary = {
  id: string;
  name: string;
  objectCount: number;
  updatedAt: string;
};

export type AssetKind = "Image" | "Audio" | "Other";

export type AssetSummary = {
  id: string;
  name: string;
  kind: AssetKind;
  size: string;
  updatedAt: string;
};

export type ActivityKind = "edit" | "import" | "change";

export type ActivityEntry = {
  id: string;
  kind: ActivityKind;
  description: string;
  occurredAt: string;
};

export type ProjectSortColumn =
  | "name"
  | "status"
  | "template"
  | "updatedAt"
  | "createdAt"
  | "engineVersion";

export type ProjectSortDirection = "asc" | "desc";

export type ProjectSort = {
  column: ProjectSortColumn;
  direction: ProjectSortDirection;
};

export type ProjectStatusFilter = "all" | ProjectStatus;

export type ProjectTemplateFilter = "all" | TemplateId;

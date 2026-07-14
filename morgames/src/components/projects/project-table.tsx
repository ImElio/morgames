import ProjectEmptyState from "@/components/projects/project-empty-state";
import ProjectRow from "@/components/projects/project-row";
import ProjectTableHeader from "@/components/projects/project-table-header";
import type { GameProject, ProjectSort } from "@/types/project";

interface ProjectTableActions {
  onToggleFavorite: (project: GameProject) => void;
  onRename: (project: GameProject) => void;
  onDuplicate: (project: GameProject) => void;
  onExport: (project: GameProject) => void;
  onRemoveFromList: (project: GameProject) => void;
  onDelete: (project: GameProject) => void;
}

interface ProjectTableProps extends ProjectTableActions {
  projects: GameProject[];
  sort: ProjectSort;
  onSortChange: (sort: ProjectSort) => void;
  hasActiveFilters: boolean;
  searchQuery: string;
  onClearFilters: () => void;
  onCreateProject: () => void;
}

export default function ProjectTable({
  projects,
  sort,
  onSortChange,
  hasActiveFilters,
  searchQuery,
  onClearFilters,
  onCreateProject,
  ...actions
}: ProjectTableProps) {
  if (projects.length === 0) {
    return hasActiveFilters ? (
      <ProjectEmptyState variant="no-results" searchQuery={searchQuery} onClearFilters={onClearFilters} />
    ) : (
      <ProjectEmptyState variant="no-projects" onCreateProject={onCreateProject} />
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-foreground/8 bg-surface">
      <table className="w-full table-fixed border-collapse text-sm">
        <ProjectTableHeader sort={sort} onSortChange={onSortChange} />
        <tbody>
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} {...actions} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { FolderPlus, SearchX } from "lucide-react";
import Button from "@/components/ui/Button";

interface ProjectEmptyStateProps {
  variant: "no-projects" | "no-results";
  searchQuery?: string;
  onCreateProject?: () => void;
  onClearFilters?: () => void;
}

export default function ProjectEmptyState({
  variant,
  searchQuery,
  onCreateProject,
  onClearFilters,
}: ProjectEmptyStateProps) {
  if (variant === "no-results") {
    const trimmedQuery = searchQuery?.trim();

    return (
      <div
        className="
          flex flex-col items-center justify-center gap-3 rounded-lg
          border border-dashed border-foreground/15 px-6 py-10 text-center
        "
      >
        <SearchX size={20} className="text-foreground/30" />
        <p className="text-sm text-foreground/60">
          {trimmedQuery
            ? `No projects match "${trimmedQuery}".`
            : "No projects match the current filters."}
        </p>
        {onClearFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            {trimmedQuery ? "Clear search" : "Clear filters"}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      className="
        flex flex-col items-center justify-center gap-3 rounded-lg
        border border-dashed border-foreground/15 px-6 py-12 text-center
      "
    >
      <FolderPlus size={20} className="text-foreground/30" />
      <p className="text-sm text-foreground/60">
        No projects yet. Create a project to start building your first 2D game.
      </p>
      {onCreateProject && (
        <Button size="sm" onClick={onCreateProject}>
          New project
        </Button>
      )}
    </div>
  );
}

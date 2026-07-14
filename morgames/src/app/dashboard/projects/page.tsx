"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import DashboardLayout from "@/app/DashboardLayout";
import { useToast } from "@/components/ui/Toast";
import DeleteProjectDialog from "@/components/projects/delete-project-dialog";
import { useProjects } from "@/components/projects/projects-provider";
import ProjectTable from "@/components/projects/project-table";
import ProjectToolbar from "@/components/projects/project-toolbar";
import RenameProjectDialog from "@/components/projects/rename-project-dialog";
import { exportProjectAsJson, filterProjects, sortProjects, DEFAULT_PROJECT_SORT } from "@/lib/project-utils";
import type {
  GameProject,
  ProjectSort,
  ProjectStatusFilter,
  ProjectTemplateFilter,
} from "@/types/project";

export default function ProjectsPage() {
  const router = useRouter();
  const {
    projects,
    renameProject,
    duplicateProject,
    deleteProject,
    removeFromList,
    restoreToList,
    toggleFavorite,
  } = useProjects();
  const { showToast } = useToast();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProjectStatusFilter>("all");
  const [template, setTemplate] = useState<ProjectTemplateFilter>("all");
  const [sort, setSort] = useState<ProjectSort>(DEFAULT_PROJECT_SORT);

  const [renameTarget, setRenameTarget] = useState<GameProject | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GameProject | null>(null);

  const hasActiveFilters = search.trim() !== "" || status !== "all" || template !== "all";

  const visibleProjects = useMemo(
    () => sortProjects(filterProjects(projects, { search, status, template }), sort),
    [projects, search, status, template, sort]
  );

  function handleClearFilters() {
    setSearch("");
    setStatus("all");
    setTemplate("all");
  }

  function handleDuplicate(project: GameProject) {
    const duplicated = duplicateProject(project.id);
    if (!duplicated) return;
    showToast({ message: `"${duplicated.name}" created.` });
  }

  function handleExport(project: GameProject) {
    exportProjectAsJson(project);
    showToast({ message: `"${project.name}" exported.` });
  }

  function handleRemoveFromList(project: GameProject) {
    removeFromList(project.id);
    showToast({
      message: `Removed "${project.name}" from this list.`,
      action: { label: "Undo", onClick: () => restoreToList(project.id) },
    });
  }

  function handleRenameConfirm(name: string) {
    if (!renameTarget) return;
    renameProject(renameTarget.id, name);
    showToast({ message: `Renamed to "${name}".` });
    setRenameTarget(null);
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) return;
    deleteProject(deleteTarget.id);
    showToast({ message: `"${deleteTarget.name}" deleted.` });
    setDeleteTarget(null);
  }

  return (
    <DashboardLayout pageKey="projects">
      <div className="p-5 lg:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Projects
              <span className="ml-2 text-base font-normal text-foreground/40">
                {visibleProjects.length}
              </span>
            </h1>
            <p className="mt-1 text-sm text-foreground/60">
              Manage and open your 2D game projects.
            </p>
          </div>
          <Link
            href="/dashboard/projects/new"
            className="
              inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4
              text-sm font-medium text-white transition-colors
              hover:bg-primary/90 outline-none focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-primary
            "
          >
            <Plus size={15} />
            New project
          </Link>
        </div>

        <div className="mt-4">
          <ProjectToolbar
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            template={template}
            onTemplateChange={setTemplate}
          />
        </div>

        <div className="mt-4">
          <ProjectTable
            projects={visibleProjects}
            sort={sort}
            onSortChange={setSort}
            hasActiveFilters={hasActiveFilters}
            searchQuery={search}
            onClearFilters={handleClearFilters}
            onCreateProject={() => router.push("/dashboard/projects/new")}
            onToggleFavorite={(project) => toggleFavorite(project.id)}
            onRename={(project) => setRenameTarget(project)}
            onDuplicate={handleDuplicate}
            onExport={handleExport}
            onRemoveFromList={handleRemoveFromList}
            onDelete={(project) => setDeleteTarget(project)}
          />
        </div>
      </div>

      <RenameProjectDialog
        project={renameTarget}
        existingNames={projects.map((project) => project.name)}
        onClose={() => setRenameTarget(null)}
        onConfirm={handleRenameConfirm}
      />
      <DeleteProjectDialog
        project={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </DashboardLayout>
  );
}

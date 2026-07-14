"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Copy, Download, Pencil, Play, Settings2, Trash2, X } from "lucide-react";
import ActivityList from "@/components/projects/activity-list";
import DeleteProjectDialog from "@/components/projects/delete-project-dialog";
import ProjectMetadata from "@/components/projects/project-metadata";
import { TEMPLATE_ICONS } from "@/components/projects/project-thumbnail";
import { useProjects } from "@/components/projects/projects-provider";
import RenameProjectDialog from "@/components/projects/rename-project-dialog";
import StatusBadge from "@/components/projects/status-badge";
import Button from "@/components/ui/Button";
import DropdownMenu from "@/components/ui/DropdownMenu";
import { useToast } from "@/components/ui/Toast";
import { templateActivity } from "@/data/mock-projects";
import { exportProjectAsJson, getTemplateById } from "@/lib/project-utils";
import type { GameProject } from "@/types/project";

interface ProjectDetailContentProps {
  projectId: string;
}

export default function ProjectDetailContent({ projectId }: ProjectDetailContentProps) {
  const { getProject } = useProjects();
  const project = getProject(projectId);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-16 text-center">
        <h1 className="text-xl font-semibold text-foreground">Project not found</h1>
        <p className="max-w-sm text-sm text-foreground/60">
          This project may have been deleted, or the link is no longer valid.
        </p>
        <Link
          href="/dashboard/projects"
          className="text-sm font-medium text-primary hover:text-primary/80"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  return <ProjectWorkspace project={project} />;
}

function ProjectWorkspace({ project }: { project: GameProject }) {
  const router = useRouter();
  const { projects, renameProject, duplicateProject, deleteProject, removeFromList, restoreToList } =
    useProjects();
  const { showToast } = useToast();

  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const template = getTemplateById(project.template);
  const templateName = template?.name ?? project.template;
  const Icon = TEMPLATE_ICONS[project.template];
  const activity = templateActivity[project.template];

  function handleDuplicate() {
    const duplicated = duplicateProject(project.id);
    if (!duplicated) return;
    showToast({
      message: `"${duplicated.name}" created.`,
      action: { label: "Open", onClick: () => router.push(`/dashboard/projects/${duplicated.id}`) },
    });
  }

  function handleExport() {
    exportProjectAsJson(project);
    showToast({ message: `"${project.name}" exported.` });
  }

  function handleRemoveFromList() {
    removeFromList(project.id);
    showToast({
      message: `Removed "${project.name}" from this list.`,
      action: { label: "Undo", onClick: () => restoreToList(project.id) },
    });
  }

  function handleRenameConfirm(name: string) {
    renameProject(project.id, name);
    showToast({ message: `Renamed to "${name}".` });
    setRenameOpen(false);
  }

  function handleDeleteConfirm() {
    deleteProject(project.id);
    showToast({ message: `"${project.name}" deleted.` });
    setDeleteOpen(false);
    router.push("/dashboard/projects");
  }

  return (
    <div className="p-5 lg:p-6">
      <div className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
          <Link
            href="/dashboard/projects"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            Projects
          </Link>
          <span aria-hidden="true" className="text-foreground/30">
            /
          </span>
          <span aria-current="page" className="text-foreground/80">
            {project.name}
          </span>
        </nav>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Icon size={20} className="shrink-0 text-foreground/40" />
            <h1 className="text-xl font-bold text-foreground">{project.name}</h1>
            <StatusBadge status={project.status} />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button disabled title="The editor isn't available yet.">
              Open editor
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                showToast({ message: "Preview playback will be available in a future milestone." })
              }
            >
              <Play size={16} />
              Play preview
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                showToast({ message: "Project settings will be available in a future milestone." })
              }
            >
              <Settings2 size={16} />
              Project settings
            </Button>
            <DropdownMenu
              label={`More actions for ${project.name}`}
              trigger={
                <>
                  More
                  <ChevronDown size={15} />
                </>
              }
              triggerClassName="
                inline-flex h-11 items-center gap-2 rounded-xl border border-foreground/15
                px-5 text-sm font-medium text-foreground/80 transition-colors duration-150
                hover:bg-white/5 hover:text-foreground
                outline-none focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-primary
              "
              items={[
                { label: "Rename", icon: Pencil, onSelect: () => setRenameOpen(true) },
                { label: "Duplicate", icon: Copy, onSelect: handleDuplicate },
                { label: "Export", icon: Download, onSelect: handleExport },
                { type: "separator" },
                { label: "Remove from list", icon: X, onSelect: handleRemoveFromList },
                { label: "Delete project", icon: Trash2, onSelect: () => setDeleteOpen(true), destructive: true },
              ]}
            />
          </div>
        </div>

        {project.description && (
          <p className="mt-1.5 max-w-2xl text-sm text-foreground/60">{project.description}</p>
        )}

        <div className="mt-5 rounded-lg border border-foreground/8 bg-surface">
          <ProjectMetadata project={project} templateName={templateName} />
          <ActivityList activity={activity} />
        </div>
      </div>

      <RenameProjectDialog
        project={renameOpen ? project : null}
        existingNames={projects.map((item) => item.name)}
        onClose={() => setRenameOpen(false)}
        onConfirm={handleRenameConfirm}
      />
      <DeleteProjectDialog
        project={deleteOpen ? project : null}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

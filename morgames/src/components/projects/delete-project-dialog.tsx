"use client";

import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import type { GameProject } from "@/types/project";

interface DeleteProjectDialogProps {
  project: GameProject | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteProjectDialog({
  project,
  onClose,
  onConfirm,
}: DeleteProjectDialogProps) {
  return (
    <Dialog
      open={Boolean(project)}
      onClose={onClose}
      title="Delete project"
      footer={
        <>
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete project
          </Button>
        </>
      }
    >
      {project && (
        <p className="text-sm text-foreground/70">
          Delete &ldquo;{project.name}&rdquo;? This action cannot be undone.
        </p>
      )}
    </Dialog>
  );
}

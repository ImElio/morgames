"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import Input from "@/components/ui/Input";
import { PROJECT_NAME_MAX_LENGTH, validateProjectName } from "@/lib/project-utils";
import type { GameProject } from "@/types/project";

interface RenameProjectDialogProps {
  project: GameProject | null;
  existingNames: string[];
  onClose: () => void;
  onConfirm: (name: string) => void;
}

export default function RenameProjectDialog({
  project,
  existingNames,
  onClose,
  onConfirm,
}: RenameProjectDialogProps) {
  const formId = useId();

  return (
    <Dialog
      open={Boolean(project)}
      onClose={onClose}
      title="Rename project"
      footer={
        <>
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form={formId}>
            Save
          </Button>
        </>
      }
    >
      {project && (
        <RenameProjectForm
          key={project.id}
          formId={formId}
          project={project}
          existingNames={existingNames}
          onConfirm={onConfirm}
        />
      )}
    </Dialog>
  );
}

function RenameProjectForm({
  formId,
  project,
  existingNames,
  onConfirm,
}: {
  formId: string;
  project: GameProject;
  existingNames: string[];
  onConfirm: (name: string) => void;
}) {
  const [name, setName] = useState(project.name);
  const [touched, setTouched] = useState(false);
  const error = validateProjectName(name, existingNames, project.name);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (error) return;
    onConfirm(name.trim());
  }

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <Input
        label="Project name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        onBlur={() => setTouched(true)}
        error={touched ? error : null}
        maxLength={PROJECT_NAME_MAX_LENGTH}
        required
      />
    </form>
  );
}

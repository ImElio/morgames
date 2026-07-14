"use client";

import { Copy, Download, ExternalLink, FolderOpen, Pencil, Trash2, X } from "lucide-react";
import DropdownMenu from "@/components/ui/DropdownMenu";
import type { GameProject } from "@/types/project";

interface ProjectActionsMenuProps {
  project: GameProject;
  onOpen: () => void;
  onRename: () => void;
  onDuplicate: () => void;
  onExport: () => void;
  onRemoveFromList: () => void;
  onDelete: () => void;
}

export default function ProjectActionsMenu({
  project,
  onOpen,
  onRename,
  onDuplicate,
  onExport,
  onRemoveFromList,
  onDelete,
}: ProjectActionsMenuProps) {
  return (
    <DropdownMenu
      label={`Actions for ${project.name}`}
      items={[
        { label: "Open project", icon: FolderOpen, onSelect: onOpen },
        {
          label: "Open editor",
          icon: ExternalLink,
          onSelect: () => {},
          disabled: true,
        },
        { label: "Rename", icon: Pencil, onSelect: onRename },
        { label: "Duplicate", icon: Copy, onSelect: onDuplicate },
        { label: "Export", icon: Download, onSelect: onExport },
        { type: "separator" },
        { label: "Remove from list", icon: X, onSelect: onRemoveFromList },
        { label: "Delete project", icon: Trash2, onSelect: onDelete, destructive: true },
      ]}
    />
  );
}

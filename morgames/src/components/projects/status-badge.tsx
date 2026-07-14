import Badge from "@/components/ui/Badge";
import type { ProjectStatus } from "@/types/project";

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; tone: "neutral" | "secondary" | "accent" }
> = {
  draft: { label: "Draft", tone: "neutral" },
  prototype: { label: "Prototype", tone: "secondary" },
  published: { label: "Published", tone: "accent" },
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = STATUS_CONFIG[status];
  return <Badge tone={config.tone}>{config.label}</Badge>;
}

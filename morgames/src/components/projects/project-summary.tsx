import { Check } from "lucide-react";
import { TEMPLATE_ICONS } from "@/components/projects/project-thumbnail";
import type { ProjectTemplate } from "@/types/project";

interface ProjectSummaryProps {
  template: ProjectTemplate;
}

export default function ProjectSummary({ template }: ProjectSummaryProps) {
  const Icon = TEMPLATE_ICONS[template.id];

  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground/50">
        Selected template
      </h2>

      <div className="mt-2 flex items-center gap-2">
        <Icon size={18} className="shrink-0 text-foreground/40" />
        <h3 className="text-base font-semibold text-foreground">{template.name}</h3>
      </div>
      <p className="mt-1 text-sm text-foreground/60">{template.description}</p>

      <div className="mt-3">
        <p className="text-xs font-medium text-foreground/40">Includes</p>
        <ul className="mt-1.5 space-y-1">
          {template.features.map((feature) => (
            <li key={feature} className="flex items-center gap-1.5 text-sm text-foreground/70">
              <Check size={13} className="shrink-0 text-accent" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

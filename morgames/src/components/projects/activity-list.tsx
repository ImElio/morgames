import { Download, Pencil, SlidersHorizontal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatRelativeDate } from "@/lib/project-utils";
import type { ActivityEntry, ActivityKind } from "@/types/project";

interface ActivityListProps {
  activity: ActivityEntry[];
}

const ACTIVITY_ICONS: Record<ActivityKind, LucideIcon> = {
  edit: Pencil,
  import: Download,
  change: SlidersHorizontal,
};

export default function ActivityList({ activity }: ActivityListProps) {
  return (
    <div className="border-t border-foreground/8">
      <div className="px-4 py-2.5">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground/60">
          Recent activity
        </h2>
      </div>
      {activity.length > 0 ? (
        <div className="divide-y divide-foreground/6">
          {activity.map((entry) => {
            const Icon = ACTIVITY_ICONS[entry.kind];
            return (
              <div key={entry.id} className="flex items-center gap-3 px-4 py-2.5 text-sm">
                <Icon size={14} className="shrink-0 text-foreground/40" />
                <span className="min-w-0 flex-1 truncate text-foreground/80">{entry.description}</span>
                <span className="shrink-0 text-xs text-foreground/60">
                  {formatRelativeDate(entry.occurredAt)}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="px-4 py-6 text-center text-sm text-foreground/60">No recent activity.</p>
      )}
    </div>
  );
}

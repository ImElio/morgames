import type { ReactNode } from "react";
import { ProjectsProvider } from "@/components/projects/projects-provider";
import { ToastProvider } from "@/components/ui/Toast";

export default function ProjectsSectionLayout({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <ProjectsProvider>{children}</ProjectsProvider>
    </ToastProvider>
  );
}

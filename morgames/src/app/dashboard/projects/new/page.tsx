"use client";

import { useId, useMemo, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import DashboardLayout from "@/app/DashboardLayout";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import ProjectConfiguration from "@/components/projects/project-configuration";
import ProjectSummary from "@/components/projects/project-summary";
import { useProjects } from "@/components/projects/projects-provider";
import TemplateSidebar from "@/components/projects/template-sidebar";
import { projectTemplates } from "@/data/mock-projects";
import { CANVAS_PRESETS, PROJECT_ENGINE_VERSION, validateProjectName } from "@/lib/project-utils";
import type { CanvasOrientation, CanvasSize, TemplateId } from "@/types/project";

const DEFAULT_TEMPLATE_ID: TemplateId = "blank-2d";
const DEFAULT_ORIENTATION: CanvasOrientation = "landscape";
const DEFAULT_PRESET = CANVAS_PRESETS[DEFAULT_ORIENTATION][0];

export default function NewProjectPage() {
  const router = useRouter();
  const { projects, createProject } = useProjects();
  const { showToast } = useToast();
  const formId = useId();

  const [templateId, setTemplateId] = useState<TemplateId>(DEFAULT_TEMPLATE_ID);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [orientation, setOrientation] = useState<CanvasOrientation>(DEFAULT_ORIENTATION);
  const [canvasSizeValue, setCanvasSizeValue] = useState(DEFAULT_PRESET.value);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>(DEFAULT_PRESET.size);
  const [createSampleScene, setCreateSampleScene] = useState(true);
  const [includeStarterAssets, setIncludeStarterAssets] = useState(true);
  const [touched, setTouched] = useState(false);

  const selectedTemplate = useMemo(
    () => projectTemplates.find((template) => template.id === templateId) ?? projectTemplates[0],
    [templateId]
  );

  const existingNames = projects.map((project) => project.name);
  const nameError = validateProjectName(name, existingNames);

  function handleCanvasSizeChange(value: string, size: CanvasSize) {
    setCanvasSizeValue(value);
    setCanvasSize(size);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (nameError) return;

    const trimmedName = name.trim();
    const project = createProject({
      name: trimmedName,
      description: description.trim() || undefined,
      template: templateId,
      status: "draft",
      orientation,
      canvasSize,
      engineVersion: PROJECT_ENGINE_VERSION,
    });

    showToast({ message: `"${trimmedName}" created.` });
    router.push(`/dashboard/projects/${project.id}`);
  }

  return (
    <DashboardLayout pageKey="projects-new">
      <div className="flex flex-col">
        <div className="border-b border-foreground/8 px-6 py-6 lg:px-8">
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center gap-1.5 text-sm text-foreground/50 transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Projects
          </Link>
          <h1 className="mt-3 text-2xl font-bold text-foreground lg:text-3xl">New project</h1>
          <p className="mt-1 text-sm text-foreground/60">
            Choose a template and configure your new game.
          </p>
        </div>

        <form id={formId} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8 lg:p-8">
            <TemplateSidebar
              templates={projectTemplates}
              selectedId={templateId}
              onSelect={setTemplateId}
            />

            <div className="flex flex-col divide-y divide-foreground/8 lg:border-l lg:border-foreground/8 lg:pl-8">
              <div className="pb-6">
                <ProjectSummary template={selectedTemplate} />
              </div>
              <div className="pt-6">
                <ProjectConfiguration
                  name={name}
                  onNameChange={setName}
                  onNameBlur={() => setTouched(true)}
                  nameError={touched ? nameError : null}
                  description={description}
                  onDescriptionChange={setDescription}
                  orientation={orientation}
                  onOrientationChange={setOrientation}
                  canvasSizeValue={canvasSizeValue}
                  onCanvasSizeChange={handleCanvasSizeChange}
                  showSampleSceneOption={Boolean(selectedTemplate.allowsSampleScene)}
                  createSampleScene={createSampleScene}
                  onCreateSampleSceneChange={setCreateSampleScene}
                  includeStarterAssets={includeStarterAssets}
                  onIncludeStarterAssetsChange={setIncludeStarterAssets}
                />
              </div>
            </div>
          </div>
        </form>

        <div
          className="
            sticky bottom-0 z-10 flex items-center justify-between gap-4
            border-t border-foreground/8 bg-background/95 px-6 py-4
            backdrop-blur lg:px-8
          "
        >
          <Link
            href="/dashboard/projects"
            className="
              inline-flex h-11 items-center rounded-xl px-5 text-sm font-medium
              text-foreground/60 transition-colors hover:bg-white/5 hover:text-foreground
            "
          >
            Cancel
          </Link>
          <Button type="submit" form={formId} disabled={Boolean(nameError)}>
            Create project
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

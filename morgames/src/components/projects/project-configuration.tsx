"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { CANVAS_PRESETS, PROJECT_NAME_MAX_LENGTH } from "@/lib/project-utils";
import type { CanvasOrientation, CanvasSize } from "@/types/project";

interface ProjectConfigurationProps {
  name: string;
  onNameChange: (value: string) => void;
  onNameBlur: () => void;
  nameError: string | null;
  description: string;
  onDescriptionChange: (value: string) => void;
  orientation: CanvasOrientation;
  onOrientationChange: (value: CanvasOrientation) => void;
  canvasSizeValue: string;
  onCanvasSizeChange: (value: string, size: CanvasSize) => void;
  showSampleSceneOption: boolean;
  createSampleScene: boolean;
  onCreateSampleSceneChange: (value: boolean) => void;
  includeStarterAssets: boolean;
  onIncludeStarterAssetsChange: (value: boolean) => void;
}

export default function ProjectConfiguration({
  name,
  onNameChange,
  onNameBlur,
  nameError,
  description,
  onDescriptionChange,
  orientation,
  onOrientationChange,
  canvasSizeValue,
  onCanvasSizeChange,
  showSampleSceneOption,
  createSampleScene,
  onCreateSampleSceneChange,
  includeStarterAssets,
  onIncludeStarterAssetsChange,
}: ProjectConfigurationProps) {
  const presets = CANVAS_PRESETS[orientation];

  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground/50">
        Project configuration
      </h2>

      <div className="mt-3 flex flex-col gap-5">
        <Input
          label="Project name"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          onBlur={onNameBlur}
          error={nameError}
          placeholder="e.g. Neon Runner"
          maxLength={PROJECT_NAME_MAX_LENGTH}
          required
        />

        <Textarea
          label="Description"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="What is this game about? (optional)"
          rows={3}
          maxLength={200}
          hint="Optional. Helps you remember the project's scope."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground/70">Orientation</span>
            <div className="flex overflow-hidden rounded-xl border border-white/10">
              {(["landscape", "portrait"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={orientation === option}
                  onClick={() => {
                    const nextPreset = CANVAS_PRESETS[option][0];
                    onOrientationChange(option);
                    onCanvasSizeChange(nextPreset.value, nextPreset.size);
                  }}
                  className={`
                    flex-1 px-4 py-3 text-sm font-medium capitalize transition-colors
                    ${
                      orientation === option
                        ? "bg-primary text-white"
                        : "bg-background text-foreground/60 hover:text-foreground"
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <Select
            label="Canvas size"
            value={canvasSizeValue}
            onChange={(event) => {
              const preset = presets.find((item) => item.value === event.target.value);
              if (preset) onCanvasSizeChange(preset.value, preset.size);
            }}
            options={presets.map((item) => ({ value: item.value, label: item.label }))}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label
            className="
              flex flex-1 items-center gap-3 rounded-xl border border-white/10
              bg-background px-4 py-3 text-sm text-foreground/80
            "
          >
            <input
              type="checkbox"
              checked={includeStarterAssets}
              onChange={(event) => onIncludeStarterAssetsChange(event.target.checked)}
              className="h-4 w-4 rounded border-white/20 accent-primary"
            />
            Starter assets
          </label>

          {showSampleSceneOption && (
            <label
              className="
                flex flex-1 items-center gap-3 rounded-xl border border-white/10
                bg-background px-4 py-3 text-sm text-foreground/80
              "
            >
              <input
                type="checkbox"
                checked={createSampleScene}
                onChange={(event) => onCreateSampleSceneChange(event.target.checked)}
                className="h-4 w-4 rounded border-white/20 accent-primary"
              />
              Create sample scene
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

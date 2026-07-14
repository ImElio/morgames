"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { mockProjects } from "@/data/mock-projects";
import { generateDuplicateName, generateProjectId } from "@/lib/project-utils";
import type { GameProject } from "@/types/project";

export type CreateProjectInput = Omit<GameProject, "id" | "createdAt" | "updatedAt">;

interface ProjectsContextValue {
  projects: GameProject[];
  createProject: (input: CreateProjectInput) => GameProject;
  renameProject: (id: string, name: string) => void;
  duplicateProject: (id: string) => GameProject | null;
  deleteProject: (id: string) => void;
  removeFromList: (id: string) => void;
  restoreToList: (id: string) => void;
  toggleFavorite: (id: string) => void;
  getProject: (id: string) => GameProject | undefined;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<GameProject[]>(mockProjects);
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());

  const createProject = useCallback((input: CreateProjectInput): GameProject => {
    const now = new Date().toISOString();
    const project: GameProject = {
      ...input,
      id: generateProjectId(input.name),
      createdAt: now,
      updatedAt: now,
    };
    setProjects((current) => [project, ...current]);
    return project;
  }, []);

  const renameProject = useCallback((id: string, name: string) => {
    const trimmed = name.trim();
    setProjects((current) =>
      current.map((project) =>
        project.id === id
          ? { ...project, name: trimmed, updatedAt: new Date().toISOString() }
          : project
      )
    );
  }, []);

  const duplicateProject = useCallback(
    (id: string): GameProject | null => {
      const source = projects.find((project) => project.id === id);
      if (!source) return null;

      const now = new Date().toISOString();
      const duplicated: GameProject = {
        ...source,
        id: generateProjectId(source.name),
        name: generateDuplicateName(
          source.name,
          projects.map((project) => project.name)
        ),
        createdAt: now,
        updatedAt: now,
      };

      setProjects((current) => [duplicated, ...current]);
      return duplicated;
    },
    [projects]
  );

  const deleteProject = useCallback((id: string) => {
    setProjects((current) => current.filter((project) => project.id !== id));
    setHiddenIds((current) => {
      if (!current.has(id)) return current;
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }, []);

  const removeFromList = useCallback((id: string) => {
    setHiddenIds((current) => new Set(current).add(id));
  }, []);

  const restoreToList = useCallback((id: string) => {
    setHiddenIds((current) => {
      if (!current.has(id)) return current;
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setProjects((current) =>
      current.map((project) =>
        project.id === id ? { ...project, favorite: !project.favorite } : project
      )
    );
  }, []);

  const getProject = useCallback(
    (id: string) => projects.find((project) => project.id === id),
    [projects]
  );

  const visibleProjects = useMemo(
    () => projects.filter((project) => !hiddenIds.has(project.id)),
    [projects, hiddenIds]
  );

  const value = useMemo<ProjectsContextValue>(
    () => ({
      projects: visibleProjects,
      createProject,
      renameProject,
      duplicateProject,
      deleteProject,
      removeFromList,
      restoreToList,
      toggleFavorite,
      getProject,
    }),
    [
      visibleProjects,
      createProject,
      renameProject,
      duplicateProject,
      deleteProject,
      removeFromList,
      restoreToList,
      toggleFavorite,
      getProject,
    ]
  );

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}

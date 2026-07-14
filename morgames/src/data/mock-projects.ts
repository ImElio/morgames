import type {
  ActivityEntry,
  AssetSummary,
  GameProject,
  ProjectTemplate,
  SceneSummary,
  TemplateId,
} from "@/types/project";

export const projectTemplates: ProjectTemplate[] = [
  {
    id: "blank-2d",
    name: "Blank 2D",
    description:
      "Start from an empty scene with only the essential project structure.",
    category: "Blank",
    features: ["Empty Scene", "Main Camera", "Default Input Map"],
    allowsSampleScene: true,
  },
  {
    id: "platformer",
    name: "Platformer",
    description:
      "A starter project with player movement, platforms, collisions, and a basic camera.",
    category: "Platformer",
    features: ["Camera", "Scene", "Player", "Physics", "UI", "Sample Assets"],
    recommended: true,
  },
  {
    id: "top-down",
    name: "Top-down",
    description:
      "A top-down scene prepared for movement, interactions, and exploration.",
    category: "Top-down",
    features: ["Camera", "Scene", "Player", "Movement", "Interactions"],
  },
  {
    id: "puzzle",
    name: "Puzzle",
    description:
      "A structured starting point for grid-based or logic-driven puzzle games.",
    category: "Puzzle",
    features: ["Scene", "Grid System", "UI", "Level Logic"],
  },
  {
    id: "arcade",
    name: "Arcade",
    description:
      "A compact setup for score-based games, waves, and quick gameplay loops.",
    category: "Arcade",
    features: ["Camera", "Scene", "UI", "Score System", "Spawner"],
  },
];

export const mockProjects: GameProject[] = [
  {
    id: "neon-runner",
    name: "Neon Runner",
    description: "Endless arcade runner with speed-based scoring.",
    template: "arcade",
    status: "prototype",
    createdAt: "2026-06-02T09:15:00.000Z",
    updatedAt: "2026-07-13T16:40:00.000Z",
    engineVersion: "0.9.4",
    orientation: "landscape",
    canvasSize: { width: 1280, height: 720 },
    favorite: true,
  },
  {
    id: "dungeon-prototype",
    name: "Dungeon Prototype",
    description: "Grid-based dungeon crawl testing puzzle mechanics.",
    template: "puzzle",
    status: "prototype",
    createdAt: "2026-06-25T11:00:00.000Z",
    updatedAt: "2026-07-10T14:20:00.000Z",
    engineVersion: "0.9.4",
    orientation: "portrait",
    canvasSize: { width: 720, height: 1280 },
  },
  {
    id: "space-courier",
    name: "Space Courier",
    description: "Side-scrolling delivery platformer, current published build.",
    template: "platformer",
    status: "published",
    createdAt: "2026-04-10T08:30:00.000Z",
    updatedAt: "2026-07-05T10:05:00.000Z",
    engineVersion: "1.0.0",
    orientation: "landscape",
    canvasSize: { width: 1920, height: 1080 },
    favorite: true,
  },
  {
    id: "forest-keeper",
    name: "Forest Keeper",
    description: "Top-down exploration prototype set in a forest biome.",
    template: "top-down",
    status: "draft",
    createdAt: "2026-05-20T13:45:00.000Z",
    updatedAt: "2026-06-30T09:10:00.000Z",
    engineVersion: "0.9.2",
    orientation: "landscape",
    canvasSize: { width: 1280, height: 720 },
  },
  {
    id: "tiny-tactics",
    name: "Tiny Tactics",
    description: "Early concept for a turn-based tactics puzzle.",
    template: "puzzle",
    status: "draft",
    createdAt: "2026-07-08T17:25:00.000Z",
    updatedAt: "2026-07-08T17:25:00.000Z",
    engineVersion: "0.9.4",
    orientation: "portrait",
    canvasSize: { width: 1080, height: 1920 },
  },
  {
    id: "platformer-test",
    name: "Platformer Test",
    description: "Movement and collision test bed, not actively developed.",
    template: "platformer",
    status: "draft",
    createdAt: "2026-03-15T10:00:00.000Z",
    updatedAt: "2026-05-01T12:30:00.000Z",
    engineVersion: "0.9.0",
    orientation: "landscape",
    canvasSize: { width: 1280, height: 720 },
  },
];

export const templateScenes: Record<TemplateId, SceneSummary[]> = {
  "blank-2d": [
    { id: "main-scene", name: "Main Scene", objectCount: 2, updatedAt: "2026-07-08T17:25:00.000Z" },
  ],
  platformer: [
    { id: "main-menu", name: "Main Menu", objectCount: 5, updatedAt: "2026-07-02T09:00:00.000Z" },
    { id: "level-1", name: "Level 1", objectCount: 18, updatedAt: "2026-07-04T11:30:00.000Z" },
    { id: "level-2", name: "Level 2", objectCount: 24, updatedAt: "2026-07-11T15:45:00.000Z" },
  ],
  "top-down": [
    { id: "overworld", name: "Overworld", objectCount: 32, updatedAt: "2026-06-27T10:00:00.000Z" },
    { id: "village-interior", name: "Village Interior", objectCount: 14, updatedAt: "2026-06-29T14:20:00.000Z" },
  ],
  puzzle: [
    { id: "level-select", name: "Level Select", objectCount: 6, updatedAt: "2026-07-06T09:15:00.000Z" },
    { id: "level-1", name: "Level 1", objectCount: 12, updatedAt: "2026-07-08T13:00:00.000Z" },
    { id: "level-2", name: "Level 2", objectCount: 12, updatedAt: "2026-07-10T14:10:00.000Z" },
  ],
  arcade: [
    { id: "title-screen", name: "Title Screen", objectCount: 4, updatedAt: "2026-07-09T08:40:00.000Z" },
    { id: "arcade-mode", name: "Arcade Mode", objectCount: 20, updatedAt: "2026-07-13T16:00:00.000Z" },
  ],
};

export const templateAssets: Record<TemplateId, AssetSummary[]> = {
  "blank-2d": [],
  platformer: [
    { id: "player-idle", name: "player-idle.png", kind: "Image", size: "48 KB", updatedAt: "2026-07-01T09:00:00.000Z" },
    { id: "tileset-forest", name: "tileset-forest.png", kind: "Image", size: "210 KB", updatedAt: "2026-07-03T10:30:00.000Z" },
    { id: "jump", name: "jump.wav", kind: "Audio", size: "64 KB", updatedAt: "2026-07-04T12:00:00.000Z" },
  ],
  "top-down": [
    { id: "hero-walk", name: "hero-walk.png", kind: "Image", size: "56 KB", updatedAt: "2026-06-26T09:00:00.000Z" },
    { id: "tileset-village", name: "tileset-village.png", kind: "Image", size: "180 KB", updatedAt: "2026-06-28T11:00:00.000Z" },
    { id: "ambient-forest", name: "ambient-forest.mp3", kind: "Audio", size: "1.2 MB", updatedAt: "2026-06-29T13:30:00.000Z" },
  ],
  puzzle: [
    { id: "tile-block", name: "tile-block.png", kind: "Image", size: "24 KB", updatedAt: "2026-07-06T08:00:00.000Z" },
    { id: "grid-bg", name: "grid-bg.png", kind: "Image", size: "83 KB", updatedAt: "2026-07-07T09:45:00.000Z" },
    { id: "match", name: "match.wav", kind: "Audio", size: "41 KB", updatedAt: "2026-07-09T10:20:00.000Z" },
  ],
  arcade: [
    { id: "ship", name: "ship.png", kind: "Image", size: "32 KB", updatedAt: "2026-07-08T09:00:00.000Z" },
    { id: "explosion-sheet", name: "explosion-sheet.png", kind: "Image", size: "96 KB", updatedAt: "2026-07-10T11:15:00.000Z" },
    { id: "hit", name: "hit.wav", kind: "Audio", size: "28 KB", updatedAt: "2026-07-11T14:00:00.000Z" },
  ],
};

export const templateActivity: Record<TemplateId, ActivityEntry[]> = {
  "blank-2d": [
    { id: "created", kind: "edit", description: "Created project", occurredAt: "2026-07-08T17:25:00.000Z" },
    { id: "added-main-scene", kind: "edit", description: "Added Main Scene", occurredAt: "2026-07-08T17:26:00.000Z" },
  ],
  platformer: [
    { id: "edited-level-2", kind: "edit", description: "Edited Level 2", occurredAt: "2026-07-11T15:45:00.000Z" },
    { id: "imported-tileset", kind: "import", description: "Imported tileset-forest.png", occurredAt: "2026-07-03T10:30:00.000Z" },
    { id: "changed-canvas", kind: "change", description: "Changed canvas to 1280 × 720", occurredAt: "2026-07-01T09:00:00.000Z" },
  ],
  "top-down": [
    { id: "edited-overworld", kind: "edit", description: "Edited Overworld", occurredAt: "2026-06-27T10:00:00.000Z" },
    { id: "imported-ambient", kind: "import", description: "Imported ambient-forest.mp3", occurredAt: "2026-06-29T13:30:00.000Z" },
    { id: "renamed-scene", kind: "change", description: "Renamed scene to Village Interior", occurredAt: "2026-06-26T09:30:00.000Z" },
  ],
  puzzle: [
    { id: "edited-level-2", kind: "edit", description: "Edited Level 2", occurredAt: "2026-07-10T14:10:00.000Z" },
    { id: "imported-tile-block", kind: "import", description: "Imported tile-block.png", occurredAt: "2026-07-06T08:00:00.000Z" },
    { id: "changed-canvas", kind: "change", description: "Changed canvas to 1280 × 720", occurredAt: "2026-07-05T09:00:00.000Z" },
  ],
  arcade: [
    { id: "edited-arcade-mode", kind: "edit", description: "Edited Arcade Mode", occurredAt: "2026-07-13T16:00:00.000Z" },
    { id: "imported-explosion", kind: "import", description: "Imported explosion-sheet.png", occurredAt: "2026-07-10T11:15:00.000Z" },
    { id: "increased-spawn-rate", kind: "change", description: "Increased spawn rate", occurredAt: "2026-07-09T08:40:00.000Z" },
  ],
};

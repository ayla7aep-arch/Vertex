import { CategoryInfo, Resource, Creator } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'audio',
    name: 'Audios',
    description: 'Music tracks and audio clips for your projects',
    icon: 'Music',
    count: 0,
    color: 'lavender',
  },
  {
    id: 'sfx',
    name: 'Sound Effects',
    description: 'Professional sound effects and audio elements',
    icon: 'Volume2',
    count: 0,
    color: 'babyblue',
  },
  {
    id: 'overlay',
    name: 'Overlays',
    description: 'Video overlays, transitions, and effects',
    icon: 'Layers',
    count: 0,
    color: 'softpink',
  },
  {
    id: 'preset',
    name: 'Presets',
    description: 'Color grading presets and filter packs',
    icon: 'Palette',
    count: 0,
    color: 'peach',
  },
  {
    id: 'project',
    name: 'Project Files',
    description: 'Complete project templates and templates',
    icon: 'FolderOpen',
    count: 0,
    color: 'lightpurple',
  },
  {
    id: 'font',
    name: 'Fonts',
    description: 'Typography collections for titles and graphics',
    icon: 'Type',
    count: 0,
    color: 'lavender',
  },
  {
    id: 'tutorial',
    name: 'Tutorials',
    description: 'Learn new techniques and workflows',
    icon: 'PlayCircle',
    count: 0,
    color: 'babyblue',
  },
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: "1",
    title: "Whoosh SFX Pack",
    description: "A collection of clean whoosh sound effects for video edits.",
    category: "sfx",
    creator: "Vertex",
    creatorId: "vertex",
    tags: ["whoosh", "transition", "sound effects"],
    downloads: 0,
    likes: 0,
    featured: false,
    thumbnailUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Other SFX",
    description: "Powerful impact sounds for cinematic edits.",
    category: "sfx",
    creator: "Vertex",
    creatorId: "vertex",
    tags: ["impact", "cinematic", "sound effects"],
    downloads: 0,
    likes: 0,
    featured: false,
    thumbnailUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const MOCK_CREATORS: Creator[] = [];

export const TRENDING_TAGS: string[] = [];

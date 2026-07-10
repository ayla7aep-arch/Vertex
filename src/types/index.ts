export type ResourceCategory =
  | 'audio'
  | 'sfx'
  | 'overlay'
  | 'preset'
  | 'project'
  | 'font'
  | 'tutorial';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  creator: string;
  creatorId: string;
  tags: string[];
  downloads: number;
  likes: number;
  featured: boolean;
  thumbnailUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Creator {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
  resourcesCount: number;
  followers: number;
  verified: boolean;
}

export interface CategoryInfo {
  id: ResourceCategory;
  name: string;
  description: string;
  icon: string;
  count: number;
  color: string;
}

export interface SearchFilters {
  query: string;
  category: ResourceCategory | 'all';
  sortBy: 'popular' | 'recent' | 'downloads';
}

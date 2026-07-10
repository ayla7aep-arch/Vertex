import { Link } from 'react-router-dom';
import { Download, Heart, Play } from 'lucide-react';
import { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
  size?: 'small' | 'medium' | 'large';
}

const categoryBadgeClasses: Record<string, string> = {
  audio: 'category-badge-audio',
  sfx: 'category-badge-sfx',
  overlay: 'category-badge-overlay',
  preset: 'category-badge-preset',
  project: 'category-badge-project',
  font: 'category-badge-font',
  tutorial: 'category-badge-tutorial',
};

const categoryLabels: Record<string, string> = {
  audio: 'Audio',
  sfx: 'Sound FX',
  overlay: 'Overlay',
  preset: 'Preset',
  project: 'Project',
  font: 'Font',
  tutorial: 'Tutorial',
};

const categoryIcon: Record<string, string> = {
  audio: '♪',
  sfx: '🔊',
  overlay: '◈',
  preset: '◐',
  project: '📁',
  font: 'Aa',
  tutorial: '▶',
};

function formatNumber(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export function ResourceCard({ resource, size = 'medium' }: ResourceCardProps) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  return (
    <div
      className={`glass-card overflow-hidden group ${
        isLarge ? 'col-span-2 row-span-2' : isSmall ? '' : ''
      }`}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <div className="relative aspect-video">
          <img
            src={resource.thumbnailUrl}
            alt={resource.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span
              className={`category-badge ${categoryBadgeClasses[resource.category]} flex items-center gap-1.5`}
            >
              <span className="text-xs">{categoryIcon[resource.category]}</span>
              {categoryLabels[resource.category]}
            </span>
            {resource.featured && (
              <span className="category-badge bg-lavender-100/80 text-lavender-600 border-lavender-200/50">
                Featured
              </span>
            )}
          </div>

          {/* Play Button on Hover */}
          {resource.category === 'tutorial' && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full glass-button flex items-center justify-center">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
            </div>
          )}

          {/* Creator Info Overlay */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2">
              <span className="text-white text-sm font-medium drop-shadow-lg">
                {resource.creator}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className={`font-semibold text-gray-800 mb-2 group-hover:text-lavender-600 transition-colors duration-300 ${
        isLarge ? 'text-xl' : 'text-base'
          }`}
        >
          {resource.title}
        </h3>

        {!isSmall && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{resource.description}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {resource.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-lg bg-gray-100/60 text-gray-500 hover:bg-lavender-100/60 hover:text-lavender-600 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              {formatNumber(resource.downloads)}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {formatNumber(resource.likes)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/resource/${resource.id}`}
              className="glass-button px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-lavender-600"
            >
              View
            </Link>
            <button className="glass-button-primary px-3 py-1.5 text-sm flex items-center gap-1">
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

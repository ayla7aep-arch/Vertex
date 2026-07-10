import { Link } from 'react-router-dom';
import {
  Music,
  Volume2,
  Layers,
  Palette,
  FolderOpen,
  Type,
  PlayCircle,
  ArrowRight,
} from 'lucide-react';
import { CATEGORIES } from '../constants';

const categoryIcons = {
  Music,
  Volume2,
  Layers,
  Palette,
  FolderOpen,
  Type,
  PlayCircle,
};

const categoryGradients: Record<string, string> = {
  lavender: 'from-lavender-400/20 to-lavender-500/10',
  babyblue: 'from-babyblue-400/20 to-babyblue-500/10',
  softpink: 'from-softpink-400/20 to-softpink-500/10',
  peach: 'from-peach-400/20 to-peach-500/10',
  lightpurple: 'from-lightpurple-400/20 to-lightpurple-500/10',
};

export function Categories() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Browse by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Find exactly what you need with our comprehensive collection of creative resources
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category, index) => {
            const IconComponent = categoryIcons[category.icon as keyof typeof categoryIcons];
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={`glass-card p-6 group relative overflow-hidden bg-gradient-to-br ${
                  categoryGradients[category.color]
                } animate-fade-in`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Background Pattern */}
                <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/20 blur-2xl group-hover:scale-150 transition-transform duration-700" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 flex items-center justify-center shadow-soft">
                      {IconComponent && (
                        <IconComponent className="w-6 h-6 text-lavender-500" />
                      )}
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-lavender-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{category.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-300">{category.count}</span>
                    <span className="text-sm text-gray-400">resources</span>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Layers } from 'lucide-react';
import { ResourceCard } from './ResourceCard';
import { MOCK_RESOURCES, CATEGORIES } from '../constants';
import { ResourceCategory } from '../types';

export function AllResources() {
  const [activeTab, setActiveTab] = useState<ResourceCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'downloads' | 'likes'>('downloads');

  const filteredResources =
    activeTab === 'all'
      ? MOCK_RESOURCES
      : MOCK_RESOURCES.filter((r) => r.category === activeTab);

  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'downloads') return b.downloads - a.downloads;
    if (sortBy === 'likes') return b.likes - a.likes;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Explore <span className="text-gradient">Resources</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Browse our complete collection of premium creative resources
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'all'
                ? 'glass-button-primary'
                : 'glass-button text-gray-600 hover:text-lavender-600'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeTab === category.id
                  ? 'glass-button-primary'
                  : 'glass-button text-gray-600 hover:text-lavender-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        {sortedResources.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-700">{sortedResources.length}</span>{' '}
              resources
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <div className="flex gap-1">
                {[
                  { value: 'downloads', label: 'Popular' },
                  { value: 'recent', label: 'Recent' },
                  { value: 'likes', label: 'Liked' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value as typeof sortBy)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      sortBy === option.value
                        ? 'bg-lavender-100/60 text-lavender-600'
                        : 'text-gray-500 hover:bg-gray-100/50 hover:text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Resources Grid or Empty State */}
        {sortedResources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedResources.map((resource, index) => (
              <div
                key={resource.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ResourceCard resource={resource} />
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-lavender-100/60 flex items-center justify-center mx-auto mb-4">
              <Layers className="w-8 h-8 text-lavender-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No resources yet</h3>
            <p className="text-gray-500 mb-6">
              Resources will appear here once creators start sharing their work.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

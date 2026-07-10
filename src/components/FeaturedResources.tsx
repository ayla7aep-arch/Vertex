import { Sparkles } from 'lucide-react';
import { MOCK_RESOURCES } from '../constants';

export function FeaturedResources() {
  const featuredResources = MOCK_RESOURCES.filter((r) => r.featured);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
              Featured <span className="text-gradient">Resources</span>
            </h2>
            <p className="text-gray-500">
              Hand-picked premium resources chosen by our team
            </p>
          </div>
        </div>

        {/* Featured Grid or Empty State */}
        {featuredResources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.slice(0, 6).map((resource, index) => (
              <div
                key={resource.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* ResourceCard would go here */}
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-lavender-100/60 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-lavender-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No featured resources yet</h3>
            <p className="text-gray-500 mb-6">
              Check back soon for hand-picked premium resources from our team.
            </p>
          </div>
        )}

        {/* Trending Tags Bar - Empty State */}
        <div className="mt-12 glass-card p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-4">Trending Tags</h3>
          <p className="text-sm text-gray-400">Trending tags will appear here once resources are added.</p>
        </div>
      </div>
    </section>
  );
}

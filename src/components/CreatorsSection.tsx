import { Users } from 'lucide-react';
import { MOCK_CREATORS } from '../constants';

export function CreatorsSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Top <span className="text-gradient">Creators</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Meet the talented creators behind our amazing resources
          </p>
        </div>

        {/* Creators Grid or Empty State */}
        {MOCK_CREATORS.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_CREATORS.map((creator, index) => (
              <div
                key={creator.id}
                className="glass-card p-6 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Creator card content would go here */}
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-lavender-100/60 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-lavender-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No creators yet</h3>
            <p className="text-gray-500 mb-6">
              Creators will be showcased here once they start sharing their resources.
            </p>
          </div>
        )}

        {/* Join CTA */}
        <div className="mt-12 glass-card p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Become a <span className="text-gradient">Creator</span>
          </h3>
          <p className="text-gray-500 mb-6">
            Share your resources with millions of editors and build your audience
          </p>
          <button className="glass-button-primary px-8 py-3 text-base font-semibold">
            Start Creating
          </button>
        </div>
      </div>
    </section>
  );
}

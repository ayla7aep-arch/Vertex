import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Layers } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MOCK_RESOURCES, CATEGORIES } from '../constants';

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const categoryInfo = CATEGORIES.find((c) => c.id === category);
  const categoryResources = MOCK_RESOURCES.filter((r) => r.category === category);
console.log(categoryResources);
  if (!categoryInfo) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 px-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <Link to="/" className="glass-button-primary px-6 py-3 inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-lavender-500 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Category Header */}
          <div className="glass-card p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lavender-400/30 to-lavender-500/20 flex items-center justify-center">
                <span className="text-3xl">
                  {categoryInfo.id === 'audio' && '♪'}
                  {categoryInfo.id === 'sfx' && '🔊'}
                  {categoryInfo.id === 'overlay' && '◈'}
                  {categoryInfo.id === 'preset' && '◐'}
                  {categoryInfo.id === 'project' && '📁'}
                  {categoryInfo.id === 'font' && 'Aa'}
                  {categoryInfo.id === 'tutorial' && '▶'}
                </span>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                  {categoryInfo.name}
                </h1>
                <p className="text-gray-500">{categoryInfo.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-4xl font-bold text-gray-300">{categoryInfo.count}</div>
                <div className="text-sm text-gray-400">resources available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Showing {categoryResources.length} resources
            </h2>
          </div>

          {categoryResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryResources.map((resource, index) => (
                <div
                  key={resource.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* ResourceCard would go here */}
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-lavender-100/60 flex items-center justify-center mx-auto mb-4">
                <Layers className="w-8 h-8 text-lavender-400" />
              </div>
              <p className="text-gray-500 mb-6">
                No resources in this category yet. Check back soon for new additions!
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

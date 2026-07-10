import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, X, Filter, ArrowLeft, Layers } from 'lucide-react';
import { ResourceCard } from '../components/ResourceCard';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MOCK_RESOURCES, CATEGORIES, TRENDING_TAGS } from '../constants';
import { ResourceCategory } from '../types';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all'>(
    (searchParams.get('category') as ResourceCategory) || 'all'
  );
  const [sortBy, setSortBy] = useState<'recent' | 'downloads' | 'likes'>('downloads');

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    setSearchParams(params);
  }, [query, selectedCategory, setSearchParams]);

  const filteredResources = MOCK_RESOURCES.filter((resource) => {
    const matchesSearch =
      !query ||
      resource.title.toLowerCase().includes(query.toLowerCase()) ||
      resource.description.toLowerCase().includes(query.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
      resource.creator.toLowerCase().includes(query.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'downloads') return b.downloads - a.downloads;
    if (sortBy === 'likes') return b.likes - a.likes;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleClearSearch = () => {
    setQuery('');
    setSelectedCategory('all');
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Search Header */}
      <div className="pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-lavender-500 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Search Box */}
          <div className="glass-card p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search resources by name, tags, or creator..."
                  className="w-full glass-input pl-12 pr-12 py-3.5 text-gray-700 placeholder-gray-400"
                />
                {query && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as ResourceCategory | 'all')}
                    className="glass-input py-3.5 px-4 text-gray-700 appearance-none cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            {TRENDING_TAGS.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Quick filters:</span>
                {TRENDING_TAGS.slice(0, 6).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-lg bg-white/40 border border-white/50 text-sm text-gray-600 hover:bg-lavender-100/60 hover:text-lavender-600 hover:border-lavender-200/50 transition-all duration-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              {query ? (
                <h2 className="text-xl font-semibold text-gray-800">
                  Found{' '}
                  <span className="text-gradient">{sortedResources.length} resources</span> for "
                  {query}"
                </h2>
              ) : (
                <h2 className="text-xl font-semibold text-gray-800">
                  All <span className="text-gradient">{sortedResources.length} resources</span>
                </h2>
              )}
            </div>

            {sortedResources.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort:</span>
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
            )}
          </div>

          {/* Results Grid or Empty State */}
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
              <div className="w-16 h-16 rounded-full bg-gray-100/60 flex items-center justify-center mx-auto mb-4">
                <Layers className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No resources available</h3>
              <p className="text-gray-500 mb-6">
                Resources will appear here once creators start sharing their work.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

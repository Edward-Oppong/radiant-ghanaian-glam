import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid, X, ChevronDown, Loader2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { cn } from '@/lib/utils';

type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const priceRanges = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-50', label: 'Under GH₵50', min: 0, max: 50 },
  { id: '50-100', label: 'GH₵50 - GH₵100', min: 50, max: 100 },
  { id: '100-200', label: 'GH₵100 - GH₵200', min: 100, max: 200 },
  { id: 'over-200', label: 'Over GH₵200', min: 200, max: Infinity },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3>(2);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categorySlug = searchParams.get('category') || undefined;
  
  const { data: products = [], isLoading: productsLoading } = useProducts(categorySlug);
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  
  const currentCategory = categorySlug 
    ? categories.find(c => c.slug === categorySlug) 
    : null;

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by price
    const range = priceRanges.find((r) => r.id === priceRange);
    if (range && range.id !== 'all') {
      filtered = filtered.filter((p) => p.price >= range.min && p.price < range.max);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered.reverse();
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [products, priceRange, searchQuery, sortBy]);

  const handleCategoryChange = (slug: string | null) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
    setIsFilterOpen(false);
  };

  const isLoading = productsLoading || categoriesLoading;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-pink py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {currentCategory ? currentCategory.name : 'Shop All Products'}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {currentCategory
              ? currentCategory.description
              : 'Discover our curated collection of premium beauty and fashion products.'}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                      !categorySlug
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-secondary'
                    )}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                        categorySlug === cat.slug
                          ? 'bg-accent text-accent-foreground'
                          : 'hover:bg-secondary'
                      )}
                    >
                      {cat.name}
                      <span className="text-muted-foreground ml-2">({cat.productCount})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setPriceRange(range.id)}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                        priceRange === range.id
                          ? 'bg-accent text-accent-foreground'
                          : 'hover:bg-secondary'
                      )}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>

                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 w-48 md:w-64 pl-4 pr-10 bg-secondary rounded-lg border-0 focus:ring-2 focus:ring-accent outline-none text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="h-10 pl-4 pr-10 bg-secondary rounded-lg border-0 focus:ring-2 focus:ring-accent outline-none text-sm appearance-none cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>

                {/* Grid Toggle */}
                <div className="hidden md:flex items-center gap-1 bg-secondary rounded-lg p-1">
                  <button
                    onClick={() => setGridCols(2)}
                    className={cn(
                      'p-2 rounded-md transition-colors',
                      gridCols === 2 ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                    )}
                    aria-label="2 columns"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(3)}
                    className={cn(
                      'p-2 rounded-md transition-colors',
                      gridCols === 3 ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                    )}
                    aria-label="3 columns"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredProducts.length} products
            </p>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div
                className={cn(
                  'grid gap-4 md:gap-6',
                  gridCols === 2
                    ? 'grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                )}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <SlidersHorizontal className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange('all');
                    setSearchQuery('');
                    setSearchParams({});
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden transition-opacity duration-300',
          isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="absolute inset-0 bg-foreground/50" onClick={() => setIsFilterOpen(false)} />
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto transition-transform duration-300',
            isFilterOpen ? 'translate-y-0' : 'translate-y-full'
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl font-semibold">Filters</h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Categories</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange(null)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm transition-colors',
                  !categorySlug
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary hover:bg-accent/20'
                )}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm transition-colors',
                    categorySlug === cat.slug
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary hover:bg-accent/20'
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Price Range</h4>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setPriceRange(range.id)}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-xl text-sm transition-colors',
                    priceRange === range.id
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary'
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <Button variant="gold" className="w-full" onClick={() => setIsFilterOpen(false)}>
            Show {filteredProducts.length} Products
          </Button>
        </div>
      </div>
    </Layout>
  );
}

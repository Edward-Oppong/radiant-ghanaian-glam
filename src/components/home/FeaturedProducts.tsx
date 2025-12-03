import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts, getBestsellerProducts, Product } from '@/data/mockData';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type Tab = 'featured' | 'bestseller';

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<Tab>('featured');
  
  const featuredProducts = getFeaturedProducts();
  const bestsellerProducts = getBestsellerProducts();
  
  const products = activeTab === 'featured' ? featuredProducts : bestsellerProducts;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-accent text-sm font-medium tracking-wide uppercase">
              Curated For You
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
              Our Top Picks
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-secondary rounded-xl">
            <button
              onClick={() => setActiveTab('featured')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                activeTab === 'featured'
                  ? 'bg-accent text-accent-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab('bestseller')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                activeTab === 'bestseller'
                  ? 'bg-accent text-accent-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Bestsellers
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 8).map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              className="animate-fade-up"
              // @ts-ignore
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/shop" className="group">
              View All Products
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

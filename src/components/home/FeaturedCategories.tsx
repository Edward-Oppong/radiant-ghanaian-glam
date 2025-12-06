import { categories } from '@/data/mockData';
import { CategoryCard } from '@/components/product/CategoryCard';

export function FeaturedCategories() {
  const displayCategories = categories.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-accent text-sm font-medium tracking-wide uppercase">
            Explore Our Collections
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From stunning wigs to luxurious skincare, find everything you need to look and feel your best.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {displayCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              variant={index === 0 || index === 5 ? 'large' : 'default'}
              className={
                index === 0
                  ? 'md:row-span-2'
                  : index === 5
                  ? 'md:row-span-2'
                  : ''
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

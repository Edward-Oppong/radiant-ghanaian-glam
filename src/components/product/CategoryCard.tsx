import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
  className?: string;
  variant?: 'default' | 'large';
}

export function CategoryCard({ category, className, variant = 'default' }: CategoryCardProps) {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className={cn(
        'group relative block overflow-hidden rounded-2xl',
        variant === 'large' ? 'aspect-[4/5]' : 'aspect-square',
        className
      )}
    >
      {/* Background Image */}
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
        <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
          <h3 className={cn(
            'font-display font-bold text-background mb-1',
            variant === 'large' ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
          )}>
            {category.name}
          </h3>
          <p className="text-background/70 text-sm mb-3 line-clamp-2">
            {category.description}
          </p>
          <div className="flex items-center gap-2 text-gold text-sm font-medium">
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* Product Count Badge */}
      <div className="absolute top-4 right-4 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full">
        <span className="text-xs font-medium text-foreground">{category.productCount} items</span>
      </div>
    </Link>
  );
}

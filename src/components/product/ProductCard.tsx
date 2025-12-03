import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/data/mockData';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const formatPrice = (price: number) => `GH₵${price.toFixed(0)}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success('Added to cart', {
      description: product.name,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className={cn('group block', className)}
    >
      <div className="card-product">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {hasDiscount && (
              <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded-md">
                -{discountPercent}%
              </span>
            )}
            {product.bestseller && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-md">
                Bestseller
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={cn(
              'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300',
              inWishlist
                ? 'bg-destructive text-destructive-foreground'
                : 'bg-background/80 backdrop-blur-sm hover:bg-background text-foreground'
            )}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={cn('w-4 h-4', inWishlist && 'fill-current')} />
          </button>

          {/* Quick Add Button */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <Button
              variant="gold"
              className="w-full"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3.5 h-3.5 text-gold fill-gold" />
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-accent">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice!)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

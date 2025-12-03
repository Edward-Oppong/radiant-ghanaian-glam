import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/store/wishlistStore';

export default function Wishlist() {
  const { items, clearWishlist } = useWishlistStore();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Your wishlist is empty
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Save items you love by clicking the heart icon on any product.
          </p>
          <Button variant="gold" size="lg" asChild>
            <Link to="/shop">
              Start Shopping
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold">
            My Wishlist ({items.length})
          </h1>
          <Button variant="ghost" onClick={clearWishlist}>
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

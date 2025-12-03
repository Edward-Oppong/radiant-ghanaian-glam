import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function PromoBanner() {
  return (
    <section className="py-16 md:py-24 bg-gradient-pink relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
              Limited Time Offer
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Get 20% Off Your First Order
            </h2>
            <p className="text-foreground/80 text-lg mb-8 max-w-md mx-auto md:mx-0">
              Join our community of beautiful women and enjoy exclusive discounts on premium beauty products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button variant="gold" size="xl" asChild>
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-large">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400"
                  alt="Beauty products"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-large">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400"
                  alt="Jewelry"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-large">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400"
                  alt="Wigs"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-large">
                <img
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400"
                  alt="Bags"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

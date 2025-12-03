import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Star, Truck, Shield } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200"
          alt="About Lumière"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative text-center text-background">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-lg text-background/80 max-w-2xl mx-auto px-4">
            Celebrating African beauty with premium products crafted for melanin-rich skin.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-medium">Our Mission</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-6">
                Beauty Without Compromise
              </h2>
              <p className="text-muted-foreground mb-4">
                Founded in Accra, Ghana, Lumière Beauty was born from a simple belief: every African woman deserves access to premium beauty products that celebrate her unique beauty.
              </p>
              <p className="text-muted-foreground mb-6">
                We curate the finest wigs, makeup, skincare, and accessories from around the world, ensuring each product meets our exacting standards for quality and performance on melanin-rich skin.
              </p>
              <Button variant="gold" asChild>
                <Link to="/shop">Shop Now</Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600"
                alt="Our mission"
                className="rounded-2xl shadow-large"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-2xl shadow-large">
                <p className="text-3xl font-bold">5000+</p>
                <p className="text-sm">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent font-medium">Our Values</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
              Why Choose Lumière
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: 'Curated Selection', description: 'Every product is carefully chosen for quality and effectiveness.' },
              { icon: Star, title: 'Premium Quality', description: 'We partner with top brands to bring you the best.' },
              { icon: Truck, title: 'Fast Delivery', description: 'Swift nationwide delivery to your doorstep.' },
              { icon: Shield, title: '100% Authentic', description: 'Guaranteed genuine products, always.' },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-gold">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
            Ready to Glow?
          </h2>
          <p className="text-accent-foreground/80 mb-8 max-w-md mx-auto">
            Discover our curated collection and find your new beauty favorites.
          </p>
          <Button variant="soft" size="xl" asChild>
            <Link to="/shop">Explore Collection</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}

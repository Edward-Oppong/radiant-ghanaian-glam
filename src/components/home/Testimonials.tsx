import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  content: string;
  product: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ama Koranteng',
    location: 'Accra, Ghana',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150',
    rating: 5,
    content: 'The Brazilian body wave wig is absolutely stunning! The quality is unmatched and it blends so naturally with my hairline. I\'ve received so many compliments!',
    product: 'Brazilian Body Wave Wig',
  },
  {
    id: '2',
    name: 'Efua Mensah',
    location: 'Kumasi, Ghana',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    rating: 5,
    content: 'The lipstick shades are perfect for African skin tones. Long-lasting and doesn\'t dry my lips. Lumière has become my go-to beauty store!',
    product: 'Velvet Matte Lipstick Set',
  },
  {
    id: '3',
    name: 'Nana Asante',
    location: 'Takoradi, Ghana',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    rating: 5,
    content: 'Fast delivery and excellent customer service. The Empress perfume is now my signature scent - it lasts all day and I always get asked what I\'m wearing!',
    product: 'Empress Eau de Parfum',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-accent text-sm font-medium tracking-wide uppercase">
            What Our Customers Say
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
            Loved by Thousands
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Quote Icon */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-accent rounded-full flex items-center justify-center z-10">
            <Quote className="w-8 h-8 text-accent-foreground" />
          </div>

          {/* Testimonials */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-background rounded-3xl p-8 md:p-12 shadow-soft text-center">
                    {/* Rating */}
                    <div className="flex justify-center gap-1 mb-6 pt-8">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'w-5 h-5',
                            i < testimonial.rating
                              ? 'text-gold fill-gold'
                              : 'text-muted'
                          )}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-lg md:text-xl text-foreground/90 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    {/* Product */}
                    <p className="text-sm text-accent font-medium mb-6">
                      Purchased: {testimonial.product}
                    </p>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-accent"
                      />
                      <div className="text-left">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-background shadow-soft flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    index === currentIndex
                      ? 'w-6 bg-accent'
                      : 'bg-border hover:bg-muted-foreground'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-background shadow-soft flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

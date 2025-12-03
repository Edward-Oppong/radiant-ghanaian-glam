import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: { text: string; href: string };
  gradient: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Luxurious Wigs',
    subtitle: 'New Collection',
    description: 'Premium human hair wigs that transform your look instantly. Undetectable, natural, and stunning.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200',
    cta: { text: 'Shop Wigs', href: '/shop?category=wigs-hair' },
    gradient: 'from-pink-soft/90 via-pink-soft/50 to-transparent',
  },
  {
    id: '2',
    title: 'Beauty Essentials',
    subtitle: 'Glow Up',
    description: 'Discover makeup and skincare crafted for melanin-rich skin. Your beauty, elevated.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200',
    cta: { text: 'Shop Beauty', href: '/shop?category=beauty-makeup' },
    gradient: 'from-nude/90 via-nude/50 to-transparent',
  },
  {
    id: '3',
    title: 'Signature Scents',
    subtitle: 'Fragrance Collection',
    description: 'Long-lasting, captivating perfumes that leave an unforgettable impression.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200',
    cta: { text: 'Shop Perfumes', href: '/shop?category=perfumes' },
    gradient: 'from-secondary/90 via-secondary/50 to-transparent',
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => goToSlide((currentSlide + 1) % heroSlides.length);

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-all duration-700 ease-out',
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          )}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className={cn('absolute inset-0 bg-gradient-to-r', slide.gradient)} />

          {/* Content */}
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-xl">
              <span
                className={cn(
                  'inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4 transition-all duration-500 delay-100',
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                )}
              >
                {slide.subtitle}
              </span>
              <h1
                className={cn(
                  'font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 transition-all duration-500 delay-200',
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                )}
              >
                {slide.title}
              </h1>
              <p
                className={cn(
                  'text-foreground/80 text-lg md:text-xl mb-8 max-w-md transition-all duration-500 delay-300',
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                )}
              >
                {slide.description}
              </p>
              <Button
                variant="hero"
                size="xl"
                asChild
                className={cn(
                  'transition-all duration-500 delay-400',
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                )}
              >
                <Link to={slide.cta.href}>{slide.cta.text}</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors z-10 hidden md:flex"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors z-10 hidden md:flex"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              index === currentSlide
                ? 'w-8 bg-accent'
                : 'w-2 bg-foreground/30 hover:bg-foreground/50'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

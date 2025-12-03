import { Layout } from '@/components/layout/Layout';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { FeaturedCategories } from '@/components/home/FeaturedCategories';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { PromoBanner } from '@/components/home/PromoBanner';
import { Testimonials } from '@/components/home/Testimonials';

const Index = () => {
  return (
    <Layout>
      <HeroCarousel />
      <FeaturedCategories />
      <FeaturedProducts />
      <PromoBanner />
      <Testimonials />
    </Layout>
  );
};

export default Index;

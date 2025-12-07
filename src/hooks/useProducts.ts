import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product, Category, transformDbProduct, transformDbCategory } from '@/types/database';

export function useProducts(categorySlug?: string) {
  return useQuery({
    queryKey: ['products', categorySlug],
    queryFn: async (): Promise<Product[]> => {
      if (categorySlug) {
        // When filtering by category, use inner join
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            categories!inner(slug)
          `)
          .eq('categories.slug', categorySlug);

        if (error) {
          console.error('Error fetching products:', error);
          throw error;
        }

        return (data || []).map((p) => {
          const categoryData = p.categories as unknown as { slug: string } | null;
          return transformDbProduct(p, categoryData?.slug || '');
        });
      } else {
        // When fetching all products, use left join
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            categories(slug)
          `);

        if (error) {
          console.error('Error fetching products:', error);
          throw error;
        }

        return (data || []).map((p) => {
          const categoryData = p.categories as unknown as { slug: string } | null;
          return transformDbProduct(p, categoryData?.slug || '');
        });
      }
    },
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(slug)
        `)
        .eq('slug', slug)
        .maybeSingle();

      if (error) {
        console.error('Error fetching product:', error);
        throw error;
      }

      if (!data) return null;

      const categoryData = data.categories as unknown as { slug: string } | null;
      return transformDbProduct(data, categoryData?.slug || '');
    },
    enabled: !!slug,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(slug)
        `)
        .eq('is_featured', true)
        .limit(8);

      if (error) {
        console.error('Error fetching featured products:', error);
        throw error;
      }

      return (data || []).map((p) => {
        const categoryData = p.categories as unknown as { slug: string } | null;
        return transformDbProduct(p, categoryData?.slug || '');
      });
    },
  });
}

export function useBestsellerProducts() {
  return useQuery({
    queryKey: ['products', 'bestseller'],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(slug)
        `)
        .eq('is_bestseller', true)
        .limit(8);

      if (error) {
        console.error('Error fetching bestseller products:', error);
        throw error;
      }

      return (data || []).map((p) => {
        const categoryData = p.categories as unknown as { slug: string } | null;
        return transformDbProduct(p, categoryData?.slug || '');
      });
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      // Fetch categories with product counts
      const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('*');

      if (catError) {
        console.error('Error fetching categories:', catError);
        throw catError;
      }

      // Get product counts for each category
      const categoriesWithCounts = await Promise.all(
        (categories || []).map(async (cat) => {
          const { count } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', cat.id);

          return transformDbCategory(cat, count || 0);
        })
      );

      return categoriesWithCounts;
    },
  });
}

export function useRelatedProducts(categorySlug: string, excludeProductId: string) {
  return useQuery({
    queryKey: ['products', 'related', categorySlug, excludeProductId],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories!inner(slug)
        `)
        .eq('categories.slug', categorySlug)
        .neq('id', excludeProductId)
        .limit(4);

      if (error) {
        console.error('Error fetching related products:', error);
        throw error;
      }

      return (data || []).map((p) => {
        const categoryData = p.categories as unknown as { slug: string } | null;
        return transformDbProduct(p, categoryData?.slug || '');
      });
    },
    enabled: !!categorySlug && !!excludeProductId,
  });
}

// Mock Data for Lumière Beauty E-commerce

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  variants?: ProductVariant[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
  featured?: boolean;
  bestseller?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'size' | 'length';
  value: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  variant?: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Address {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  region: string;
  country: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  variant?: string;
  quantity: number;
}

// Categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Wigs & Hair',
    slug: 'wigs-hair',
    description: 'Premium quality wigs, bundles, and closures for every style',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600',
    productCount: 48,
  },
  {
    id: '2',
    name: 'Beauty & Makeup',
    slug: 'beauty-makeup',
    description: 'Luxurious makeup and skincare for radiant beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600',
    productCount: 72,
  },
  {
    id: '3',
    name: 'Skincare',
    slug: 'skincare',
    description: 'Nourishing skincare for healthy, glowing skin',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600',
    productCount: 36,
  },
  {
    id: '4',
    name: 'Perfumes',
    slug: 'perfumes',
    description: 'Captivating fragrances for every occasion',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600',
    productCount: 24,
  },
  {
    id: '5',
    name: 'Bags & Purses',
    slug: 'bags-purses',
    description: 'Elegant bags and purses to complete your look',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600',
    productCount: 42,
  },
  {
    id: '6',
    name: 'Jewelry',
    slug: 'jewelry',
    description: 'Stunning jewelry pieces for every occasion',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
    productCount: 56,
  },
];

// Products
export const products: Product[] = [
  // Wigs & Hair
  {
    id: 'p1',
    name: 'Brazilian Body Wave Wig',
    slug: 'brazilian-body-wave-wig',
    category: 'wigs-hair',
    subcategory: 'wigs',
    price: 450,
    originalPrice: 550,
    description: 'Premium Brazilian body wave human hair wig with natural hairline. HD lace frontal for seamless blend. Pre-plucked with baby hair for a natural look.',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600',
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600',
    ],
    variants: [
      { id: 'v1', name: '14 inches', type: 'length', value: '14"', inStock: true },
      { id: 'v2', name: '18 inches', type: 'length', value: '18"', inStock: true },
      { id: 'v3', name: '22 inches', type: 'length', value: '22"', inStock: true },
      { id: 'v4', name: '26 inches', type: 'length', value: '26"', inStock: false },
    ],
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    tags: ['bestseller', 'human-hair', 'lace-front'],
    featured: true,
    bestseller: true,
  },
  {
    id: 'p2',
    name: 'Deep Curl Bundles (3pcs)',
    slug: 'deep-curl-bundles',
    category: 'wigs-hair',
    subcategory: 'bundles',
    price: 280,
    description: 'Premium deep curl virgin hair bundles. Tangle-free and can be dyed, bleached, and styled. Includes 3 bundles.',
    images: [
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600',
    ],
    variants: [
      { id: 'v1', name: '12-14-16', type: 'length', value: '12-14-16"', inStock: true },
      { id: 'v2', name: '16-18-20', type: 'length', value: '16-18-20"', inStock: true },
      { id: 'v3', name: '20-22-24', type: 'length', value: '20-22-24"', inStock: true },
    ],
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    tags: ['virgin-hair', 'bundles'],
    featured: true,
  },
  {
    id: 'p3',
    name: 'HD Lace Closure',
    slug: 'hd-lace-closure',
    category: 'wigs-hair',
    subcategory: 'closures',
    price: 120,
    originalPrice: 150,
    description: 'Invisible HD lace closure for flawless blending. 4x4 size with natural parting space.',
    images: [
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600',
    ],
    variants: [
      { id: 'v1', name: '12 inches', type: 'length', value: '12"', inStock: true },
      { id: 'v2', name: '14 inches', type: 'length', value: '14"', inStock: true },
      { id: 'v3', name: '16 inches', type: 'length', value: '16"', inStock: true },
    ],
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
    tags: ['hd-lace', 'closure'],
  },
  // Beauty & Makeup
  {
    id: 'p4',
    name: 'Velvet Matte Lipstick Set',
    slug: 'velvet-matte-lipstick-set',
    category: 'beauty-makeup',
    subcategory: 'lips',
    price: 85,
    description: 'Luxurious matte lipstick collection featuring 6 stunning shades perfect for African skin tones. Long-lasting, non-drying formula.',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600',
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600',
    ],
    variants: [
      { id: 'v1', name: 'Berry Queen', type: 'color', value: '#8B2252', inStock: true },
      { id: 'v2', name: 'Nude Goddess', type: 'color', value: '#C4A77D', inStock: true },
      { id: 'v3', name: 'Brown Sugar', type: 'color', value: '#8B4513', inStock: true },
      { id: 'v4', name: 'Red Carpet', type: 'color', value: '#C41E3A', inStock: true },
    ],
    rating: 4.6,
    reviewCount: 203,
    inStock: true,
    tags: ['lipstick', 'matte', 'bestseller'],
    featured: true,
    bestseller: true,
  },
  {
    id: 'p5',
    name: 'Glow Foundation',
    slug: 'glow-foundation',
    category: 'beauty-makeup',
    subcategory: 'face',
    price: 65,
    description: 'Buildable coverage foundation with a luminous finish. Formulated with hyaluronic acid for all-day hydration.',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600',
    ],
    variants: [
      { id: 'v1', name: 'Cocoa', type: 'color', value: '#3D2314', inStock: true },
      { id: 'v2', name: 'Caramel', type: 'color', value: '#6B4423', inStock: true },
      { id: 'v3', name: 'Honey', type: 'color', value: '#8B6914', inStock: true },
      { id: 'v4', name: 'Espresso', type: 'color', value: '#2D1810', inStock: true },
    ],
    rating: 4.5,
    reviewCount: 167,
    inStock: true,
    tags: ['foundation', 'glow'],
  },
  {
    id: 'p6',
    name: 'Eyeshadow Palette - African Sunset',
    slug: 'eyeshadow-palette-african-sunset',
    category: 'beauty-makeup',
    subcategory: 'eyes',
    price: 75,
    originalPrice: 95,
    description: '18-shade eyeshadow palette inspired by African sunsets. Rich pigments with matte, shimmer, and metallic finishes.',
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600',
    ],
    rating: 4.8,
    reviewCount: 312,
    inStock: true,
    tags: ['eyeshadow', 'palette', 'pigmented'],
    featured: true,
  },
  // Skincare
  {
    id: 'p7',
    name: 'Vitamin C Brightening Serum',
    slug: 'vitamin-c-brightening-serum',
    category: 'skincare',
    subcategory: 'serums',
    price: 55,
    description: 'Potent vitamin C serum for bright, even-toned skin. Reduces dark spots and hyperpigmentation.',
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600',
    ],
    rating: 4.7,
    reviewCount: 189,
    inStock: true,
    tags: ['serum', 'brightening', 'vitamin-c'],
    bestseller: true,
  },
  {
    id: 'p8',
    name: 'Shea Butter Body Cream',
    slug: 'shea-butter-body-cream',
    category: 'skincare',
    subcategory: 'body',
    price: 35,
    description: 'Rich, nourishing body cream with pure Ghanaian shea butter. Deep moisturization for soft, supple skin.',
    images: [
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600',
    ],
    rating: 4.9,
    reviewCount: 278,
    inStock: true,
    tags: ['body', 'moisturizer', 'shea-butter'],
    featured: true,
  },
  // Perfumes
  {
    id: 'p9',
    name: 'Empress Eau de Parfum',
    slug: 'empress-eau-de-parfum',
    category: 'perfumes',
    subcategory: 'women',
    price: 180,
    originalPrice: 220,
    description: 'A captivating blend of jasmine, sandalwood, and vanilla. Long-lasting luxury fragrance for the modern queen.',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600',
    ],
    variants: [
      { id: 'v1', name: '30ml', type: 'size', value: '30ml', inStock: true },
      { id: 'v2', name: '50ml', type: 'size', value: '50ml', inStock: true },
      { id: 'v3', name: '100ml', type: 'size', value: '100ml', inStock: true },
    ],
    rating: 4.8,
    reviewCount: 94,
    inStock: true,
    tags: ['perfume', 'luxury', 'floral'],
    featured: true,
    bestseller: true,
  },
  // Bags
  {
    id: 'p10',
    name: 'Quilted Shoulder Bag',
    slug: 'quilted-shoulder-bag',
    category: 'bags-purses',
    subcategory: 'shoulder-bags',
    price: 145,
    description: 'Elegant quilted leather shoulder bag with gold chain strap. Perfect for day to night transition.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600',
    ],
    variants: [
      { id: 'v1', name: 'Black', type: 'color', value: '#000000', inStock: true },
      { id: 'v2', name: 'Nude', type: 'color', value: '#E8D5C4', inStock: true },
      { id: 'v3', name: 'Burgundy', type: 'color', value: '#722F37', inStock: true },
    ],
    rating: 4.6,
    reviewCount: 78,
    inStock: true,
    tags: ['bag', 'leather', 'elegant'],
    featured: true,
  },
  {
    id: 'p11',
    name: 'Straw Tote Bag',
    slug: 'straw-tote-bag',
    category: 'bags-purses',
    subcategory: 'tote-bags',
    price: 85,
    description: 'Handwoven straw tote with leather handles. Perfect for beach days and casual outings.',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600',
    ],
    rating: 4.4,
    reviewCount: 45,
    inStock: true,
    tags: ['bag', 'straw', 'summer'],
  },
  // Jewelry
  {
    id: 'p12',
    name: 'Gold Statement Earrings',
    slug: 'gold-statement-earrings',
    category: 'jewelry',
    subcategory: 'earrings',
    price: 65,
    originalPrice: 80,
    description: 'Bold gold-plated statement earrings with African-inspired design. Lightweight and hypoallergenic.',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
    ],
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    tags: ['earrings', 'gold', 'statement'],
    featured: true,
    bestseller: true,
  },
  {
    id: 'p13',
    name: 'Layered Chain Necklace',
    slug: 'layered-chain-necklace',
    category: 'jewelry',
    subcategory: 'necklaces',
    price: 95,
    description: 'Delicate layered gold chain necklace set. Includes 3 chains of varying lengths for a trendy look.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
    ],
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    tags: ['necklace', 'gold', 'layered'],
  },
  {
    id: 'p14',
    name: 'Crystal Hair Pins Set',
    slug: 'crystal-hair-pins-set',
    category: 'jewelry',
    subcategory: 'hair-accessories',
    price: 45,
    description: 'Sparkling crystal hair pins set of 6. Add glamour to any hairstyle.',
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600',
    ],
    rating: 4.6,
    reviewCount: 67,
    inStock: true,
    tags: ['hair', 'crystal', 'accessories'],
  },
];

// Reviews
export const reviews: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    userId: 'u1',
    userName: 'Ama K.',
    rating: 5,
    title: 'Best wig I\'ve ever owned!',
    content: 'The quality is amazing! The hair is so soft and the lace is truly invisible. I\'ve gotten so many compliments. Will definitely buy again!',
    date: '2024-01-15',
    verified: true,
  },
  {
    id: 'r2',
    productId: 'p1',
    userId: 'u2',
    userName: 'Nana A.',
    rating: 5,
    title: 'Worth every cedi!',
    content: 'Fast delivery to Accra and the wig looks exactly like the pictures. The body wave pattern is beautiful and holds up well.',
    date: '2024-01-10',
    verified: true,
  },
  {
    id: 'r3',
    productId: 'p4',
    userId: 'u3',
    userName: 'Efua M.',
    rating: 4,
    title: 'Beautiful colors',
    content: 'Love the shade range! Perfect for my skin tone. Only giving 4 stars because the packaging could be better.',
    date: '2024-01-08',
    verified: true,
  },
  {
    id: 'r4',
    productId: 'p9',
    userId: 'u4',
    userName: 'Akosua B.',
    rating: 5,
    title: 'My signature scent!',
    content: 'This perfume lasts all day and I always get compliments. The scent is sophisticated and feminine. Already on my second bottle!',
    date: '2024-01-05',
    verified: true,
  },
];

// Users
export const users: User[] = [
  {
    id: 'u1',
    firstName: 'Ama',
    lastName: 'Koranteng',
    email: 'ama.k@email.com',
    phone: '+233 24 123 4567',
  },
  {
    id: 'u2',
    firstName: 'Nana',
    lastName: 'Asante',
    email: 'nana.a@email.com',
    phone: '+233 20 987 6543',
  },
];

// Orders
export const orders: Order[] = [
  {
    id: 'ORD-001',
    userId: 'u1',
    items: [
      {
        productId: 'p1',
        productName: 'Brazilian Body Wave Wig',
        variant: '18 inches',
        quantity: 1,
        price: 450,
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600',
      },
      {
        productId: 'p4',
        productName: 'Velvet Matte Lipstick Set',
        variant: 'Berry Queen',
        quantity: 2,
        price: 85,
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600',
      },
    ],
    status: 'delivered',
    total: 620,
    shippingAddress: {
      fullName: 'Ama Koranteng',
      phone: '+233 24 123 4567',
      street: '15 Independence Avenue',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
    },
    paymentMethod: 'Mobile Money',
    createdAt: '2024-01-10T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
  },
  {
    id: 'ORD-002',
    userId: 'u1',
    items: [
      {
        productId: 'p9',
        productName: 'Empress Eau de Parfum',
        variant: '50ml',
        quantity: 1,
        price: 180,
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600',
      },
    ],
    status: 'shipped',
    total: 195,
    shippingAddress: {
      fullName: 'Ama Koranteng',
      phone: '+233 24 123 4567',
      street: '15 Independence Avenue',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
    },
    paymentMethod: 'Visa',
    createdAt: '2024-01-18T09:15:00Z',
    updatedAt: '2024-01-19T11:30:00Z',
  },
  {
    id: 'ORD-003',
    userId: 'u2',
    items: [
      {
        productId: 'p12',
        productName: 'Gold Statement Earrings',
        quantity: 1,
        price: 65,
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
      },
      {
        productId: 'p7',
        productName: 'Vitamin C Brightening Serum',
        quantity: 2,
        price: 55,
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600',
      },
    ],
    status: 'processing',
    total: 190,
    shippingAddress: {
      fullName: 'Nana Asante',
      phone: '+233 20 987 6543',
      street: '42 Cantonments Road',
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
    },
    paymentMethod: 'Cash on Delivery',
    createdAt: '2024-01-20T16:45:00Z',
    updatedAt: '2024-01-20T16:45:00Z',
  },
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(p => p.category === categorySlug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const getBestsellerProducts = (): Product[] => {
  return products.filter(p => p.bestseller);
};

export const getReviewsByProduct = (productId: string): Review[] => {
  return reviews.filter(r => r.productId === productId);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(c => c.slug === slug);
};

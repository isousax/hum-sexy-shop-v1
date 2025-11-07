import type {
  Product,
  Category,
  Review,
  FAQ,
  CEPData,
  ShippingCalculation,
  ShippingOption,
  SearchSuggestion,
  ProductFilters,
  SortOption,
  BlogPost,
  BlogCategory,
} from '@/types';
import { products } from '@/mocks/products';
import { categories } from '@/mocks/categories';
import { reviews } from '@/mocks/reviews';
import { faqs } from '@/mocks/faqs';
import { blogPosts, blogCategories } from '@/mocks/blog';

/**
 * Simula delay de rede para tornar mais realista
 */
const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Products API
 */
export const productsApi = {
  async getAll(filters?: ProductFilters, sort?: SortOption): Promise<Product[]> {
    await delay();
    let filtered = [...products];

    // Apply filters
    if (filters) {
      if (filters.categories?.length) {
        filtered = filtered.filter((p) => filters.categories?.includes(p.category.id));
      }
      if (filters.priceMin !== undefined) {
        filtered = filtered.filter((p) => p.price >= filters.priceMin!);
      }
      if (filters.priceMax !== undefined) {
        filtered = filtered.filter((p) => p.price <= filters.priceMax!);
      }
      if (filters.materials?.length) {
        filtered = filtered.filter((p) =>
          p.materials.some((m: string) => filters.materials?.includes(m))
        );
      }
      if (filters.waterproof !== undefined) {
        filtered = filtered.filter((p) =>
          p.features.some((f) => f.label.includes('prova d\'água') && f.value === true)
        );
      }
      if (filters.rating !== undefined) {
        filtered = filtered.filter((p) => p.rating >= filters.rating!);
      }
      if (filters.inStock) {
        filtered = filtered.filter((p) => p.inStock);
      }
    }

    // Apply sorting
    if (sort) {
      switch (sort) {
        case 'price_asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'popular':
          filtered.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
      }
    }

    return filtered;
  },

  async getById(id: string): Promise<Product | null> {
    await delay();
    return products.find((p) => p.id === id) || null;
  },

  async getBySlug(slug: string): Promise<Product | null> {
    await delay();
    return products.find((p) => p.slug === slug) || null;
  },

  async getByCategory(categorySlug: string): Promise<Product[]> {
    await delay();
    const category = categories.find((c) => c.slug === categorySlug);
    if (!category) return [];

    return products.filter((p) => p.category.id === category.id);
  },

  async getFeatured(limit: number = 4): Promise<Product[]> {
    await delay();
    return products
      .filter((p) => p.tags.includes('bestseller'))
      .slice(0, limit);
  },

  async getRelated(productId: string, limit: number = 4): Promise<Product[]> {
    await delay();
    const product = products.find((p) => p.id === productId);
    if (!product) return [];

    return products
      .filter((p) => p.id !== productId && p.category.id === product.category.id)
      .slice(0, limit);
  },
};

/**
 * Categories API
 */
export const categoriesApi = {
  async getAll(): Promise<Category[]> {
    await delay();
    return categories;
  },

  async getById(id: string): Promise<Category | null> {
    await delay();
    return categories.find((c) => c.id === id) || null;
  },

  async getBySlug(slug: string): Promise<Category | null> {
    await delay();
    return categories.find((c) => c.slug === slug) || null;
  },
};

/**
 * Reviews API
 */
export const reviewsApi = {
  async getByProductId(productId: string): Promise<Review[]> {
    await delay();
    return reviews.filter((r) => r.productId === productId);
  },

  async create(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    await delay();
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    reviews.push(newReview);
    return newReview;
  },
};

/**
 * FAQ API
 */
export const faqApi = {
  async getAll(): Promise<FAQ[]> {
    await delay();
    return faqs;
  },

  async getByCategory(category: string): Promise<FAQ[]> {
    await delay();
    return faqs.filter((f) => f.category === category);
  },
};

/**
 * CEP API
 */
export const cepApi = {
  async getAddress(zipCode: string): Promise<{
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  }> {
    const cepInfo = await getCEPInfo(zipCode);
    
    if (!cepInfo) {
      throw new Error('CEP não encontrado');
    }

    return {
      street: cepInfo.logradouro,
      neighborhood: cepInfo.bairro,
      city: cepInfo.localidade,
      state: cepInfo.uf,
    };
  },
};

/**
 * CEP/Shipping API (baseado em distância geográfica - Recife Metropolitano)
 */
import { getCoordinatesFromCEP, getCEPInfo } from './geocoding';
import { 
  shippingConfig, 
  calculateDistance, 
  calculateShippingPrice, 
  isCityAllowed, 
  isWithinDeliveryArea 
} from '@/config/shipping';

export const shippingApi = {
  async calculateShipping(
    zipCode: string, 
    products?: Product[] // Usado para calcular total e aplicar frete grátis
  ): Promise<ShippingCalculation> {
    const cleanZipCode = zipCode.replace(/\D/g, '');
    
    if (cleanZipCode.length !== 8) {
      throw new Error('CEP inválido');
    }

    try {
      // Busca informações do CEP
      const cepInfo = await getCEPInfo(cleanZipCode);
      
      if (!cepInfo) {
        throw new Error('CEP não encontrado');
      }

      // Verifica se a cidade está na lista permitida
      if (!isCityAllowed(cepInfo.localidade)) {
        throw new Error(shippingConfig.outsideDeliveryAreaMessage);
      }

      // Obtém coordenadas do CEP de destino
      const destinationCoords = await getCoordinatesFromCEP(cleanZipCode);
      
      if (!destinationCoords) {
        throw new Error('Não foi possível obter localização do CEP');
      }

      // Calcula distância do ponto de origem
      const distance = calculateDistance(
        shippingConfig.originCoordinates.lat,
        shippingConfig.originCoordinates.lng,
        destinationCoords.lat,
        destinationCoords.lng
      );

      // Verifica se está dentro do raio de entrega
      if (!isWithinDeliveryArea(distance)) {
        throw new Error(shippingConfig.outsideDeliveryAreaMessage);
      }

      // Calcula total dos produtos para verificar frete grátis
      const subtotal = products?.reduce((sum, product) => sum + product.price, 0) || 0;
      const hasFreeShipping = subtotal >= shippingConfig.freeShippingMinimum;

      // Calcula preço do frete (0 se qualificar para frete grátis)
      const shippingPrice = hasFreeShipping ? 0 : calculateShippingPrice(distance);

      // Retorna opção de frete
      const options: ShippingOption[] = [
        {
          id: 'standard',
          name: hasFreeShipping ? 'Frete Grátis' : 'Entrega Padrão',
          description: hasFreeShipping 
            ? `${cepInfo.localidade} - Compras acima de R$ 299,00`
            : `${cepInfo.localidade} - ${distance.toFixed(2)} km`,
          price: shippingPrice,
          estimatedDays: distance < 10 
            ? shippingConfig.deliveryDays.min 
            : shippingConfig.deliveryDays.max,
          carrier: 'Huum Sex Shop',
        },
      ];

      return {
        zipCode: cleanZipCode,
        options,
      };

    } catch (error) {
      // Re-lança erros de validação
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao calcular frete');
    }
  },

  async getCEPData(cep: string): Promise<CEPData | null> {
    try {
      const cleanCep = cep.replace(/\D/g, '');
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching CEP:', error);
      return null;
    }
  },
};

/**
 * Search API
 */
export const searchApi = {
  async search(query: string): Promise<SearchSuggestion[]> {
    await delay(200);
    
    const lowerQuery = query.toLowerCase();
    const suggestions: SearchSuggestion[] = [];

    // Search products
    products.forEach((product) => {
      if (
        product.name.toLowerCase().includes(lowerQuery) ||
        product.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      ) {
        suggestions.push({
          type: 'product',
          id: product.id,
          name: product.name,
          image: product.images[0]?.url,
          url: `/product/${product.slug}`,
        });
      }
    });

    // Search categories
    categories.forEach((category) => {
      if (category.name.toLowerCase().includes(lowerQuery)) {
        suggestions.push({
          type: 'category',
          id: category.id,
          name: category.name,
          url: `/collections/${category.slug}`,
        });
      }
    });

    return suggestions.slice(0, 8);
  },
};

/**
 * Blog API
 */
export const blogApi = {
  async getAll(categorySlug?: string): Promise<BlogPost[]> {
    await delay();
    if (categorySlug) {
      return blogPosts.filter((post) => post.category.slug === categorySlug);
    }
    return blogPosts;
  },

  async getFeatured(limit: number = 3): Promise<BlogPost[]> {
    await delay();
    return blogPosts.filter((post) => post.featured).slice(0, limit);
  },

  async getBySlug(slug: string): Promise<BlogPost | null> {
    await delay();
    return blogPosts.find((post) => post.slug === slug) || null;
  },

  async getCategories(): Promise<BlogCategory[]> {
    await delay();
    return blogCategories;
  },

  async getRelated(postId: string, limit: number = 3): Promise<BlogPost[]> {
    await delay();
    const currentPost = blogPosts.find((p) => p.id === postId);
    if (!currentPost) return [];

    return blogPosts
      .filter((post) => post.id !== postId && post.category.id === currentPost.category.id)
      .slice(0, limit);
  },
};

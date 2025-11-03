import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productsApi, categoriesApi } from '@/services/api';
import type { Product, Category } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;
      
      try {
        const [cat, prods] = await Promise.all([
          categoriesApi.getBySlug(slug),
          productsApi.getByCategory(slug),
        ]);
        setCategory(cat);
        setProducts(prods);
      } catch (error) {
        console.error('Error loading category:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neutral-400">Carregando...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-neutral-400">Categoria não encontrada</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-neutral-100 mb-4">{category.name}</h1>
          <p className="text-neutral-400">{category.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12 text-neutral-400">
            Nenhum produto encontrado nesta categoria
          </div>
        )}
      </div>
    </div>
  );
}

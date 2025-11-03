import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { blogApi } from '@/services/api';
import type { BlogPost, BlogCategory } from '@/types';
import { Button } from '@/components/ui/Button';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [postsData, categoriesData] = await Promise.all([
          blogApi.getAll(selectedCategory || undefined),
          blogApi.getCategories(),
        ]);
        setPosts(postsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedCategory]);

  const featuredPost = posts.find((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured || p.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-900/20 to-accent-900/20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-500/30 rounded-full px-4 py-2 mb-6">
              <BookOpen className="w-4 h-4 text-brand-400" />
              <span className="text-sm font-medium text-brand-300">Blog Educativo</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-brand-400 to-accent-500 bg-clip-text text-transparent">
                Conhecimento
              </span>{' '}
              <span className="text-neutral-100">com Respeito</span>
            </h1>

            <p className="text-lg text-neutral-400 leading-relaxed">
              Dicas especializadas, guias completos e conteúdo educativo para ajudar você a fazer
              escolhas conscientes e aproveitar ao máximo sua experiência de bem-estar íntimo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-neutral-800 bg-background-elevated sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === null
                  ? 'bg-brand-500 text-white'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category.slug
                    ? 'bg-brand-500 text-white'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-neutral-800 rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && !selectedCategory && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link to={`/blog/${featuredPost.slug}`} className="group block">
                  <div className="grid lg:grid-cols-2 gap-8 bg-gradient-to-br from-brand-900/10 to-accent-900/10 rounded-2xl overflow-hidden border border-neutral-800 hover:border-brand-500/50 transition-colors">
                    <div className="relative aspect-video lg:aspect-auto">
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        ⭐ Destaque
                      </div>
                    </div>

                    <div className="p-8 flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 text-sm text-brand-400 mb-3">
                        <span className="px-3 py-1 bg-brand-500/20 rounded-full">
                          {featuredPost.category.name}
                        </span>
                        <span className="text-neutral-500">•</span>
                        <Clock className="w-4 h-4" />
                        <span className="text-neutral-400">{featuredPost.readTime} min</span>
                      </div>

                      <h2 className="text-3xl font-bold text-neutral-100 mb-4 group-hover:text-brand-400 transition-colors">
                        {featuredPost.title}
                      </h2>

                      <p className="text-neutral-400 mb-6 line-clamp-3">{featuredPost.excerpt}</p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-brand-500/20 rounded-full flex items-center justify-center">
                            <span className="text-brand-400 font-semibold">
                              {featuredPost.author.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-neutral-200">
                              {featuredPost.author.name}
                            </p>
                            <p className="text-xs text-neutral-500">{featuredPost.author.role}</p>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          className="ml-auto group-hover:translate-x-2 transition-transform"
                        >
                          Ler artigo <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Regular Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="bg-background-elevated rounded-xl overflow-hidden border border-neutral-800 hover:border-brand-500/50 transition-all hover:shadow-lg hover:shadow-brand-500/10">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs mb-3">
                          <span className="px-2 py-1 bg-brand-500/20 text-brand-400 rounded-full">
                            {post.category.name}
                          </span>
                          <span className="text-neutral-500">•</span>
                          <Clock className="w-3 h-3 text-neutral-500" />
                          <span className="text-neutral-500">{post.readTime} min</span>
                        </div>

                        <h3 className="text-xl font-bold text-neutral-100 mb-3 group-hover:text-brand-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
                          <div className="w-8 h-8 bg-brand-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-brand-400 text-xs font-semibold">
                              {post.author.name.charAt(0)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-neutral-300 truncate">
                              {post.author.name}
                            </p>
                            <p className="text-xs text-neutral-500">{post.author.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {regularPosts.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <p className="text-neutral-500 text-lg">
                  Nenhum artigo encontrado nesta categoria.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

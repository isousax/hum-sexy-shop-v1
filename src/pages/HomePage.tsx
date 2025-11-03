import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ← Adicionei useNavigate
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Truck, Heart, Star, Zap } from 'lucide-react';
import { productsApi } from '@/services/api';
import type { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // ← Hook para navegação programática

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const products = await productsApi.getFeatured(8);
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error loading home page data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const curatedCollections = [
    {
      title: 'Para Iniciantes',
      description: 'Produtos suaves e acolhedores para começar sua jornada',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800',
      link: '/collections/iniciantes',
      color: 'from-pink-500 to-purple-500',
    },
    {
      title: 'Casais',
      description: 'Experiências compartilhadas para momentos especiais',
      image: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800',
      link: '/collections/casais',
      color: 'from-red-500 to-pink-500',
    },
    {
      title: 'Prazer Solo',
      description: 'Autoconhecimento e autocuidado em primeiro lugar',
      image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800',
      link: '/collections/solo',
      color: 'from-purple-500 to-indigo-500',
    },
  ];

  // Função para navegação otimizada
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background-subtle to-background min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920')] bg-cover bg-center opacity-5" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge de destaque */}
              <motion.div
                className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-500/30 rounded-full px-4 py-2 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Star className="w-4 h-4 text-brand-400 fill-current" />
                <span className="text-sm font-medium text-brand-300">
                  Maior Sexy Shop do Brasil
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-brand-400 via-brand-500 to-accent-500 bg-clip-text text-transparent">
                  Bem-estar íntimo
                </span>
                <br />
                <span className="text-neutral-100">com discrição e qualidade</span>
              </h1>

              <p className="text-lg md:text-xl text-neutral-400 mb-8 max-w-2xl leading-relaxed">
                Descubra produtos <span className="text-brand-400 font-semibold">selecionados</span>{' '}
                para explorar sua sexualidade com segurança, conforto e{' '}
                <span className="text-accent-400 font-semibold">total privacidade</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => handleNavigation('/collections')}
                  className="group"
                >
                  Explorar Produtos
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleNavigation('/collections/iniciantes')}
                >
                  Guia para Iniciantes
                </Button>
              </div>

              {/* Stats rápidas */}
              <motion.div
                className="flex items-center gap-6 mt-8 pt-8 border-t border-neutral-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-400">+10k</div>
                  <div className="text-xs text-neutral-500">Clientes satisfeitos</div>
                </div>
                <div className="w-px h-8 bg-neutral-800" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-400">100%</div>
                  <div className="text-xs text-neutral-500">Discreto</div>
                </div>
                <div className="w-px h-8 bg-neutral-800" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">★ 4.9</div>
                  <div className="text-xs text-neutral-500">Avaliações</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 bg-accent-500/10 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-background-elevated border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Mantém 2 colunas em mobile, 4 em md+ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400" />,
                title: 'Compra Segura',
                description: 'Seus dados protegidos',
                features: [],
              },
              {
                icon: <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400" />,
                title: 'Envio Discreto',
                description: 'Embalagem neutra',
                features: [],
              },
              {
                icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400" />,
                title: 'Qualidade Garantida',
                description: 'Produtos certificados',
                features: [],
              },
              {
                icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400" />,
                title: 'Entrega Rápida',
                description: 'Em até 3h',
                features: [],
              },
            ].map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ scale: 1.01 }}
                className="
            flex items-start gap-2
            cursor-pointer p-2 rounded-md
            hover:bg-neutral-800/20 transition-colors
          "
              >
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-brand-900/25 rounded-full flex items-center justify-center group-hover:bg-brand-900/45 transition-colors">
                  {badge.icon}
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-neutral-100 text-xs sm:text-sm leading-tight truncate">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-snug truncate">
                    {badge.description}
                  </p>

                  {/* se tiver tags */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {badge.features.map((f, i) => (
                      <span
                        key={i}
                        className="text-xxs bg-neutral-800 px-2 py-0.5 rounded text-neutral-300 text-[10px]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Collections */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Coleções <span className="text-brand-400">Especiais</span>
            </motion.h2>
            <motion.p
              className="text-neutral-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Seleções cuidadosamente elaboradas para diferentes momentos e necessidades
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {curatedCollections.map((collection, index) => (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={collection.link} className="group block">
                  <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-60 group-hover:opacity-70 transition-opacity`}
                    />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="text-2xl font-bold text-white mb-2">{collection.title}</h3>
                      <p className="text-white/90 mb-4">{collection.description}</p>
                      <div className="flex items-center text-white font-semibold">
                        Ver coleção{' '}
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-background-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start sm:items-center justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-2">
                Produtos em <span className="text-brand-400">Destaque</span>
              </h2>
              <p className="text-neutral-400">Os mais amados pelos nossos clientes</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <Link to="/collections">
                <Button
                  variant="outline"
                  className="group w-auto p-2 sm:px-4 sm:py-2 text-sm flex items-center whitespace-nowrap"
                >
                  Ver todos
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-background-elevated rounded-xl h-96 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          ) : (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" layout>
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-br from-brand-900/20 to-accent-900/20 rounded-2xl p-8 md:p-12 border border-brand-800/30 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500 rounded-full blur-3xl" />
            </div>

            <div className="flex items-start gap-4 mb-6 relative z-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-100 mb-4">
                  Conhecimento com <span className="text-brand-400">Respeito</span>
                </h2>
                <p className="text-neutral-300 mb-6 max-w-3xl leading-relaxed">
                  Acreditamos que <span className="text-accent-400">informação de qualidade</span> é
                  fundamental. Por isso, oferecemos guias completos, dicas especializadas e conteúdo
                  educativo para ajudar você a fazer{' '}
                  <span className="text-brand-400">escolhas conscientes</span> e aproveitar ao
                  máximo sua experiência.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/faq">
                    <Button variant="secondary" size="lg">
                      Guias e FAQ
                    </Button>
                  </Link>
                  <Link to="/blog">
                    <Button variant="outline" size="lg">
                      Dicas e Artigos
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

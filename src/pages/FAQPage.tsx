import { useState } from 'react';
import { ChevronDown, Search, MessageCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/mocks/faqs';

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(faqs.map(f => f.category)))];
  
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const groupedFaqs = activeCategory === 'all'
    ? categories
      .filter(cat => cat === 'all' ? true : filteredFaqs.some(faq => faq.category === cat))
      .map(category => ({
        category,
        faqs: filteredFaqs.filter(faq => category === 'all' || faq.category === category)
      }))
    : [{ category: activeCategory, faqs: filteredFaqs }];

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Aprimorado */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-400/10 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-brand-400" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-100 mb-4 bg-gradient-to-r from-neutral-100 to-neutral-300 bg-clip-text text-transparent">
            Perguntas Frequentes
          </h1>
        </div>

        {/* Barra de Pesquisa */}
        <div className="relative mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar em perguntas frequentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background-elevated border border-neutral-800 rounded-xl pl-12 pr-4 py-4 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Filtros por Categoria */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-brand-400 text-neutral-900 shadow-lg shadow-brand-400/20'
                  : 'bg-background-elevated text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100 border border-neutral-800'
              }`}
            >
              {category === 'all' ? 'Todas as Categorias' : category}
            </button>
          ))}
        </div>

        {/* Resultados da Busca */}
        {searchTerm && (
          <div className="mb-6">
            <p className="text-neutral-400">
              {filteredFaqs.length} resultado{filteredFaqs.length !== 1 ? 's' : ''} encontrado{filteredFaqs.length !== 1 ? 's' : ''} para "{searchTerm}"
            </p>
          </div>
        )}

        {/* Lista de FAQs */}
        <div className="space-y-8">
          {groupedFaqs.map(({ category, faqs: categoryFaqs }) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeCategory === 'all' && (
                <h2 className="text-2xl font-semibold text-neutral-100 mb-6 pb-2 border-b border-neutral-800">
                  {category === 'all' ? 'Todas as Perguntas' : category}
                </h2>
              )}
              
              <div className="space-y-4">
                {categoryFaqs.map((faq) => (
                  <motion.div
                    key={faq.id}
                    layout
                    className="bg-background-elevated border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-neutral-800/30 transition-colors group"
                    >
                      <span className="font-semibold text-neutral-100 text-left pr-4 group-hover:text-brand-400 transition-colors">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-neutral-400 transition-transform duration-200 flex-shrink-0 ${
                          openId === faq.id ? 'rotate-180 text-brand-400' : 'group-hover:text-brand-400'
                        }`}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {openId === faq.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ 
                            opacity: 1, 
                            height: 'auto',
                            transition: {
                              height: { duration: 0.3 },
                              opacity: { duration: 0.2, delay: 0.1 }
                            }
                          }}
                          exit={{ 
                            opacity: 0, 
                            height: 0,
                            transition: {
                              height: { duration: 0.2 },
                              opacity: { duration: 0.1 }
                            }
                          }}
                        >
                          <div className="px-6 pb-5">
                            <div className="w-8 h-0.5 bg-brand-400 rounded-full mb-4"></div>
                            <p className="text-neutral-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Estado Vazio */}
        {filteredFaqs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-100 mb-2">
              Nenhum resultado encontrado
            </h3>
            <p className="text-neutral-400 mb-6">
              Tente usar outros termos de busca ou explore todas as categorias
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="bg-brand-400 text-neutral-900 px-6 py-2 rounded-lg font-semibold hover:bg-brand-300 transition-colors"
            >
              Limpar Busca
            </button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 p-8 bg-gradient-to-r from-neutral-900 to-background-elevated rounded-2xl border border-neutral-800 text-center"
        >
          <MessageCircle className="w-12 h-12 text-brand-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-neutral-100 mb-3">
            Ainda com dúvidas?
          </h3>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
            Estamos aqui para ajudar você!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="border border-neutral-700 text-neutral-300 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-800 hover:border-neutral-600 transition-colors">
              <a href="https://wa.me/558186163513?text=Olá, pode me tirar uma dúvida?" target="_blank" rel="noopener noreferrer">Atendimento</a>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
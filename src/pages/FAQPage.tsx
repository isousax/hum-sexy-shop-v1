import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/mocks/faqs';

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = Array.from(new Set(faqs.map(f => f.category)));

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-neutral-100 mb-4">Perguntas Frequentes</h1>
        <p className="text-neutral-400 mb-12">
          Encontre respostas para as dúvidas mais comuns sobre nossos produtos e serviços
        </p>

        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-2xl font-semibold text-neutral-100 mb-4">{category}</h2>
              <div className="space-y-3">
                {faqs.filter(f => f.category === category).map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-background-elevated border border-neutral-800 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-800/50 transition-colors"
                    >
                      <span className="font-medium text-neutral-100">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-neutral-400 transition-transform ${
                          openId === faq.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openId === faq.id && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-6 pb-4 text-neutral-300">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

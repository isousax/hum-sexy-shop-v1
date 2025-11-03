import { Heart, Shield, Truck, Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-neutral-100 mb-8">Sobre a huumsexshop</h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-neutral-300 mb-6">
            A huumsexshop nasceu com a missão de transformar a forma como as pessoas 
            exploram sua sexualidade e bem-estar íntimo. Acreditamos que todos merecem 
            acesso a produtos de qualidade, informação confiável e um ambiente acolhedor 
            para descobrir o que traz prazer e satisfação.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
            <div className="bg-background-elevated border border-neutral-800 rounded-lg p-6">
              <Heart className="w-8 h-8 text-brand-400 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-100 mb-2">Nossa Missão</h3>
              <p className="text-neutral-400">
                Promover o bem-estar íntimo e sexual com produtos de qualidade, 
                informação e total discrição.
              </p>
            </div>

            <div className="bg-background-elevated border border-neutral-800 rounded-lg p-6">
              <Shield className="w-8 h-8 text-brand-400 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-100 mb-2">Privacidade</h3>
              <p className="text-neutral-400">
                Sua privacidade é nossa prioridade. Embalagens discretas e dados 
                protegidos sempre.
              </p>
            </div>

            <div className="bg-background-elevated border border-neutral-800 rounded-lg p-6">
              <Truck className="w-8 h-8 text-brand-400 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-100 mb-2">Entrega</h3>
              <p className="text-neutral-400">
                Envio rápido para todo Brasil com embalagem 100% neutra e discreta.
              </p>
            </div>

            <div className="bg-background-elevated border border-neutral-800 rounded-lg p-6">
              <Star className="w-8 h-8 text-brand-400 mb-4" />
              <h3 className="text-xl font-semibold text-neutral-100 mb-2">Qualidade</h3>
              <p className="text-neutral-400">
                Produtos certificados, materiais seguros e garantia em todos os itens.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-neutral-100 mt-12 mb-4">Nossos Valores</h2>
          <ul className="space-y-3 text-neutral-300">
            <li>✨ Respeito e acolhimento sem julgamentos</li>
            <li>🔒 Privacidade e discrição garantidas</li>
            <li>💚 Produtos seguros e certificados</li>
            <li>📚 Informação confiável e educativa</li>
            <li>🤝 Atendimento humanizado</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

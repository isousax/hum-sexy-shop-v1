import { Heart, Shield, Truck, Star, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header com gradiente sutil */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-100 mb-4 bg-gradient-to-r from-neutral-100 to-neutral-300 bg-clip-text text-transparent">
            Sobre a huumsexshop
          </h1>
          <div className="w-20 h-1 bg-brand-400 mx-auto rounded-full"></div>
        </div>

        <div className="prose prose-invert max-w-none">
          {/* Texto introdutório com destaque */}
          <div className="bg-background-elevated/50 border border-neutral-800 rounded-xl p-8 mb-12 backdrop-blur-sm">
            <p className="text-lg text-neutral-300 leading-relaxed">
              A <span className="text-brand-400 font-semibold">huumsexshop</span> nasceu com a missão de transformar a forma como as pessoas 
              exploram sua sexualidade e bem-estar íntimo. Acreditamos que todos merecem 
              acesso a produtos de qualidade, informação confiável e um ambiente acolhedor 
              para descobrir o que traz prazer e satisfação.
            </p>
          </div>

          {/* Grid de valores com hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
            {[
              {
                icon: Heart,
                title: "Nossa Missão",
                description: "Promover o bem-estar íntimo e sexual com produtos de qualidade, informação e total discrição."
              },
              {
                icon: Shield,
                title: "Privacidade",
                description: "Sua privacidade é nossa prioridade. Embalagens discretas e dados protegidos sempre."
              },
              {
                icon: Truck,
                title: "Entrega",
                description: "Envio rápido para todo Brasil com embalagem 100% neutra e discreta."
              },
              {
                icon: Star,
                title: "Qualidade",
                description: "Produtos certificados, materiais seguros e garantia em todos os itens."
              },
              {
                icon: Users,
                title: "Atendimento",
                description: "Equipe especializada e acolhedora para tirar todas suas dúvidas com discrição."
              },
              {
                icon: Award,
                title: "Compromisso",
                description: "Satisfação garantida ou seu dinheiro de volta. Sua felicidade em primeiro lugar."
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-background-elevated border border-neutral-800 rounded-lg p-6 transition-all duration-300 hover:border-brand-400/30 hover:translate-y-[-2px] group"
              >
                <div className="bg-brand-400/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-400/20 transition-colors">
                  <item.icon className="w-6 h-6 text-brand-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-100 mb-2 group-hover:text-brand-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Seção de valores com visual melhorado */}
          <div className="bg-background-elevated border border-neutral-800 rounded-xl p-8 mt-12">
            <h2 className="text-2xl font-bold text-neutral-100 mb-6 text-center">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "✨ Respeito e acolhimento sem julgamentos",
                "🔒 Privacidade e discrição garantidas",
                "💚 Produtos seguros e certificados",
                "📚 Informação confiável e educativa",
                "🤝 Atendimento humanizado",
                "🌟 Inovação constante",
                "💫 Diversidade e inclusão",
                "🎯 Qualidade comprovada"
              ].map((value, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-neutral-800/50 transition-colors">
                  <span className="text-lg">{value.split(' ')[0]}</span>
                  <span className="text-neutral-300">{value.split(' ').slice(1).join(' ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action no final */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-neutral-900 to-background-elevated rounded-xl border border-neutral-800">
            <h3 className="text-2xl font-bold text-neutral-100 mb-4">
              Pronta para explorar com confiança?
            </h3>
            <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
              Descubra nossa seleção cuidadosamente escolhida de produtos para seu bem-estar íntimo.
            </p>
            <button 
            onClick={() => navigate('/collections')}
            className="bg-brand-400 text-neutral-900 px-8 py-3 rounded-lg font-semibold hover:bg-brand-300 transition-colors">
              Explorar Produtos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Package, Truck, RotateCcw } from 'lucide-react';

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-neutral-100 mb-8">Envio e Devoluções</h1>

        <div className="space-y-8">
          {/* Shipping */}
          <section className="bg-background-elevated border border-neutral-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-6 h-6 text-brand-400" />
              <h2 className="text-2xl font-semibold text-neutral-100">Envio</h2>
            </div>
            
            <div className="space-y-4 text-neutral-300">
              <p>
                <strong className="text-neutral-100">Prazo de Entrega:</strong> até 3 horas
                para Regiões Metropolinas do Recife (dependendo da região).
              </p>
              <p>
                <strong className="text-neutral-100">Frete Grátis:</strong> Para compras acima de R$ 299,00.
              </p>
              <p>
                <strong className="text-neutral-100">Rastreamento:</strong> Você será notificado por whatsapp quando sua encomenda for despachada.
              </p>
            </div>
          </section>

          {/* Discrete Packaging */}
          <section className="bg-background-elevated border border-neutral-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-6 h-6 text-brand-400" />
              <h2 className="text-2xl font-semibold text-neutral-100">Embalagem Discreta</h2>
            </div>
            
            <div className="space-y-4 text-neutral-300">
              <p>
                Todos os produtos são enviados em caixas ou envelopes <strong className="text-neutral-100">
                totalmente neutros</strong>, sem qualquer identificação externa do conteúdo ou da loja.
              </p>
            </div>
          </section>

          {/* Returns */}
          <section className="bg-background-elevated border border-neutral-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <RotateCcw className="w-6 h-6 text-brand-400" />
              <h2 className="text-2xl font-semibold text-neutral-100">Trocas e Devoluções</h2>
            </div>
            
            <div className="space-y-4 text-neutral-300">
              <p>
                Aceitamos trocas e devoluções em até <strong className="text-neutral-100">7 dias</strong> após 
                o recebimento, desde que:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>O produto esteja <strong className="text-neutral-100">lacrado</strong></li>
                <li>Sem sinais de uso ou violação da embalagem</li>
                <li>Na embalagem original</li>
              </ul>
              <p className="text-sm italic">
                * Por questões de higiene e segurança, produtos abertos não podem ser trocados ou devolvidos.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

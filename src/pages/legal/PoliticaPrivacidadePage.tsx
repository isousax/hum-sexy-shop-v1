export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-neutral-100 mb-8">Política de Privacidade</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-neutral-300">
          <section>
            <h2 className="text-2xl font-semibold text-neutral-100 mb-4">1. Informações que Coletamos</h2>
            <p>
              Coletamos informações necessárias para processar seus pedidos e melhorar sua experiência:
              nome, email, telefone, endereço de entrega e informações de pagamento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-100 mb-4">2. Uso das Informações</h2>
            <p>
              Utilizamos suas informações exclusivamente para processar pedidos, enviar atualizações 
              sobre entregas e melhorar nossos serviços. Nunca compartilhamos seus dados com terceiros 
              sem seu consentimento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-100 mb-4">3. Segurança</h2>
            <p>
              Implementamos medidas de segurança rigorosas para proteger suas informações pessoais. 
              Todo o tráfego do site é criptografado via SSL.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-100 mb-4">4. Seus Direitos</h2>
            <p>
              Você tem direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. 
              Entre em contato conosco para exercer esses direitos.
            </p>
          </section>

          <p className="text-sm text-neutral-500 mt-8">
            Última atualização: 02 de novembro de 2025
          </p>
        </div>
      </div>
    </div>
  );
}

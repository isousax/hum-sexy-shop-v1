export default function TermsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-neutral-100 mb-8">Termos de Serviço</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-neutral-300">
          <section>
            <h2 className="text-2xl font-semibold text-neutral-100 mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar este site, você aceita e concorda em estar vinculado aos termos 
              e condições contidos neste acordo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-100 mb-4">2. Uso do Site</h2>
            <p>
              Este site destina-se exclusivamente a usuários maiores de 18 anos. Ao usar este site, 
              você confirma que tem idade legal para visualizar e comprar os produtos oferecidos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-100 mb-4">3. Produtos e Preços</h2>
            <p>
              Fazemos todos os esforços para exibir com precisão cores e imagens de nossos produtos. 
              Os preços estão sujeitos a alterações sem aviso prévio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-100 mb-4">4. Compras</h2>
            <p>
              Ao fazer um pedido, você garante que todas as informações fornecidas são verdadeiras 
              e precisas. Reservamo-nos o direito de recusar ou cancelar qualquer pedido.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-neutral-100 mb-4">5. Privacidade</h2>
            <p>
              Sua privacidade é importante para nós. Consulte nossa Política de Privacidade para 
              obter informações sobre como coletamos e usamos seus dados.
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

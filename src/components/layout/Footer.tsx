import { Link } from 'react-router-dom';
import { Instagram, Shield, Truck, CreditCard } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'Sobre Nós', path: '/about' },
      { name: 'FAQ', path: '/faq' },
    ],
    help: [
      { name: 'Envio e Entrega', path: '/shipping-returns' },
      { name: 'Política de Privacidade', path: '/legal/privacy' },
      { name: 'Termos de Serviço', path: '/legal/terms' },
    ],
    categories: [
      { name: 'Iniciantes', path: '/collections/iniciantes' },
      { name: 'Para Casais', path: '/collections/casais' },
      { name: 'Vibradores', path: '/collections/vibradores' },
      { name: 'Cosméticos', path: '/collections/cosmeticos' },
    ],
  };

  return (
    <footer className="bg-background-subtle border-t border-neutral-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-brand-400 to-accent-500 bg-clip-text text-transparent mb-4">
              <img src="logomarca.png" alt="Logo" className='h-10 w-20' />
            </h3>
            <p className="text-neutral-400 text-sm mb-4">
              Sua loja de confiança para produtos íntimos de qualidade. Discrição e privacidade garantidas.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/huumsexshop" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-brand-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/558186163513?text=Olá, Vim pelo site. Pode me ajudar?" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-brand-400 transition-colors" aria-label="WhatsApp">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-neutral-100 font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 hover:text-brand-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="text-neutral-100 font-semibold mb-4">Ajuda</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 hover:text-brand-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-neutral-100 font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 hover:text-brand-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-neutral-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-content-evenly">
            <div className="flex items-center gap-3 text-neutral-400">
              <Shield className="w-8 h-8 text-brand-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-neutral-200 text-sm">Compra 100% Segura</p>
                <p className="text-xs">Seus dados protegidos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-neutral-400">
              <Truck className="w-8 h-8 text-brand-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-neutral-200 text-sm">Envio Discreto</p>
                <p className="text-xs">Embalagem neutra</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-neutral-400">
              <CreditCard className="w-8 h-8 text-brand-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-neutral-200 text-sm">Pagamento Facilitado</p>
                <p className="text-xs">Várias formas de pagamento</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 pt-8 text-center text-neutral-500 text-sm">
          <p>&copy; {currentYear} huumsexshop. Todos os direitos reservados.</p>
          <p className="mt-2">CNPJ: 00.000.000/0000-00 | Razão Social: Huum Sex Shop LTDA</p>
        </div>
      </div>
    </footer>
  );
}

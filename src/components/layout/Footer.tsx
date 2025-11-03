import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Shield, Truck, CreditCard } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'Sobre Nós', path: '/about' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Contato', path: '/contact' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-brand-400 to-accent-500 bg-clip-text text-transparent mb-4">
              huum<span className="text-brand-500">sex</span>shop
            </h3>
            <p className="text-neutral-400 text-sm mb-4">
              Sua loja de confiança para produtos íntimos de qualidade. Discrição e privacidade garantidas.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-brand-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-brand-400 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="mailto:contato@huumsexshop.com.br" className="text-neutral-400 hover:text-brand-400 transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-around">
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

import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-neutral-800 opacity-20 mb-4">
            404
          </div>
          <h1 className="text-4xl font-bold text-neutral-100 mb-4">
            Página não encontrada
          </h1>
          <p className="text-neutral-400 text-lg mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="primary" size="lg" leftIcon={<Home className="w-5 h-5" />}>
              Voltar para Home
            </Button>
          </Link>
          <Link to="/collections">
            <Button variant="outline" size="lg" leftIcon={<Search className="w-5 h-5" />}>
              Explorar Produtos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

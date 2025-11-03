import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { shippingApi } from '@/services/api';
import type { ShippingOption, Product } from '@/types';
import { formatCurrency } from '@/lib/utils';

const ZIPCODE_STORAGE_KEY = '@huumsexshop_last_zipcode';

interface ShippingCalculatorProps {
  products: Product[];
  onSelectShipping?: (option: ShippingOption, zipCode: string) => void;
}

export function ShippingCalculator({ products, onSelectShipping }: ShippingCalculatorProps) {
  // Carrega CEP salvo do localStorage
  const [zipCode, setZipCode] = useState(() => {
    try {
      return localStorage.getItem(ZIPCODE_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [options, setOptions] = useState<ShippingOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Calcula automaticamente se tiver CEP salvo
  useEffect(() => {
    if (zipCode.replace(/\D/g, '').length === 8 && products.length > 0) {
      handleCalculate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Só executa uma vez ao montar

  const formatZipCode = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 5) return cleaned;
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatZipCode(e.target.value);
    setZipCode(formatted);
    if (error) setError('');
  };

  const handleCalculate = async () => {
    const cleanZipCode = zipCode.replace(/\D/g, '');

    if (cleanZipCode.length !== 8) {
      setError('CEP inválido. Digite um CEP válido.');
      return;
    }

    setIsLoading(true);
    setError('');
    setOptions([]);
    setSelectedOption(null); // Reseta seleção ao recalcular

    try {
      const result = await shippingApi.calculateShipping(cleanZipCode, products);

      if (result.options.length === 0) {
        setError('Não foi possível calcular o frete para este CEP.');
      } else {
        setOptions(result.options);

        // Salva CEP no localStorage após sucesso
        try {
          localStorage.setItem(ZIPCODE_STORAGE_KEY, zipCode);
        } catch (err) {
          console.error('Erro ao salvar CEP:', err);
        }
      }
    } catch (err) {
      // Exibe mensagem de erro específica (ex: fora da área de entrega)
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao calcular frete. Tente novamente.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Seleciona automaticamente quando houver apenas 1 opção
  useEffect(() => {
    if (options.length === 1 && !selectedOption) {
      const option = options[0];
      setSelectedOption(option.id);
      if (onSelectShipping) {
        onSelectShipping(option, zipCode);
      }
    }
  }, [options, selectedOption, onSelectShipping, zipCode]);

  const handleSelectOption = (option: ShippingOption) => {
    setSelectedOption(option.id);
    if (onSelectShipping) {
      onSelectShipping(option, zipCode);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="bg-background-elevated border border-neutral-800 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-3">
        <Truck className="w-5 h-5 text-brand-400" />
        <h4 className="font-semibold text-neutral-100">Calcular Frete</h4>
      </div>

      <div className="flex gap-2 mb-3 items-center min-w-0">
        <input
          type="text"
          value={zipCode}
          onChange={handleZipCodeChange}
          onKeyPress={handleKeyPress}
          placeholder="00000-000"
          maxLength={9}
          className="flex-1 min-w-0 px-3 py-2 bg-background-main border border-neutral-700 rounded-lg text-neutral-700 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
        <Button
          size="md"
          onClick={handleCalculate}
          disabled={isLoading || zipCode.replace(/\D/g, '').length !== 8}
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Calcular'}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-sm text-red-400 bg-red-950/30 border border-red-900/30 rounded-lg p-3 mb-3"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {options.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedOption === option.id
                    ? 'border-brand-500 bg-brand-950/30'
                    : 'border-neutral-700 hover:border-neutral-600 bg-background-main'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <div className="font-semibold text-neutral-100 text-sm">
                      {option.name} - {option.carrier}
                    </div>
                    <div className="text-xs text-neutral-400">{option.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-brand-400">
                      {option.price === 0 ? 'Grátis' : formatCurrency(option.price)}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-neutral-500">Entrega em até 3 horas</div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {options.length === 0 && !error && !isLoading && (
        <p className="text-xs text-neutral-500 text-center">Digite seu CEP para calcular o frete</p>
      )}
    </div>
  );
}

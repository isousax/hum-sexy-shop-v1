import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Package, MapPin, MessageCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency, getWhatsAppLink } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cepApi } from '@/services/api';
import { EMOJIS } from '@/lib/emojis';

interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  discretePackaging: boolean;
  notes?: string;
}

interface SavedAddress {
  fullName: string;
  email?: string;
  phone?: string;
  number: string;
  complement?: string;
}

const ADDRESSES_STORAGE_KEY = '@huumsexshop_addresses';

// Salva endereço no localStorage indexado por CEP
const saveAddress = (zipCode: string, data: SavedAddress) => {
  try {
    const addresses = JSON.parse(localStorage.getItem(ADDRESSES_STORAGE_KEY) || '{}');
    addresses[zipCode] = data;
    localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(addresses));
  } catch (error) {
    console.error('Erro ao salvar endereço:', error);
  }
};

// Recupera endereço salvo por CEP
const getSavedAddress = (zipCode: string): SavedAddress | null => {
  try {
    const addresses = JSON.parse(localStorage.getItem(ADDRESSES_STORAGE_KEY) || '{}');
    return addresses[zipCode] || null;
  } catch (error) {
    console.error('Erro ao recuperar endereço:', error);
    return null;
  }
};

export default function CheckoutPage() {
  const { cart, clearCart, lastZipCode } = useCart();
  const navigate = useNavigate();
  const step = 1;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CheckoutForm>();
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  // Carrega endereço automaticamente usando o CEP do carrinho
  useEffect(() => {
    const loadAddress = async () => {
      if (!lastZipCode) {
        navigate('/cart');
        return;
      }

      setIsLoadingAddress(true);
      try {
        // Primeiro tenta carregar endereço salvo do localStorage
        const savedAddress = getSavedAddress(lastZipCode);

        if (savedAddress) {
          // Preenche com dados salvos
          setValue('fullName', savedAddress.fullName);
          setValue('email', savedAddress?.email || '');
          setValue('phone', savedAddress?.phone || '');
          setValue('number', savedAddress.number);
          if (savedAddress.complement) {
            setValue('complement', savedAddress.complement);
          }
        }

        // Busca dados do CEP (rua, bairro, cidade, estado)
        const addressData = await cepApi.getAddress(lastZipCode);

        setValue('zipCode', lastZipCode);
        setValue('street', addressData.street);
        setValue('neighborhood', addressData.neighborhood);
        setValue('city', addressData.city);
        setValue('state', addressData.state);
      } catch (error) {
        console.error('Erro ao carregar endereço:', error);
      } finally {
        setIsLoadingAddress(false);
      }
    };

    loadAddress();
  }, [lastZipCode, navigate, setValue]);

  if (cart.items.length === 0) {
    return null;
  }

  const onSubmit = (data: CheckoutForm) => {
    // Salva endereço no localStorage antes de enviar
    saveAddress(data.zipCode, {
      fullName: data.fullName,
      number: data.number,
      complement: data.complement,
    });

    const safe = (v?: string) => (v ?? '').toString();

    // Prepare WhatsApp message
    const items = cart.items
      .map(
        (item) => `${item.quantity}x ${item.product.name} - ${formatCurrency(item.product.price)}`
      )
      .join('\n');

    const message = [
      `${EMOJIS.CART} *NOVO PEDIDO - HUUM*`,
      '',
      EMOJIS.SEP,
      `${EMOJIS.PACKAGE} *ITENS DO PEDIDO:*`,
      items,
      '',
      EMOJIS.SEP,
      `${EMOJIS.HOUSE} *DADOS DE ENTREGA:*`,
      `${safe(data.fullName)}`,
      '',
      `${safe(data.street)}, ${safe(data.number)}${
        data.complement ? ` - ${safe(data.complement)}` : ''
      }`,
      `${safe(data.neighborhood)}`,
      `${safe(data.city)}/${safe(data.state)}`,
      `CEP: ${safe(data.zipCode)}`,
      '',
      data.discretePackaging ? `${EMOJIS.LOCK} *EMBALAGEM DISCRETA SOLICITADA*` : '',
      data.notes ? `${EMOJIS.NOTES} *Observações:* ${safe(data.notes)}` : '',
      '',
      EMOJIS.SEP,
      `💰 *TOTAL:* ${formatCurrency(cart.total)}`,
      EMOJIS.SEP,
      '',
      `🕒 ${new Date().toLocaleString('pt-BR')}`,
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '5581986163513';
    const whatsappUrl = getWhatsAppLink(whatsappNumber, message, { useApi: true });

    clearCart();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    navigate('/');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-neutral-100 mb-8">Finalizar Compra</h1>

        {/* Progress */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s <= step ? 'bg-brand-500 text-white' : 'bg-neutral-800 text-neutral-500'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div className={`h-1 w-16 mx-2 ${s < step ? 'bg-brand-500' : 'bg-neutral-800'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Info */}
              <div className="bg-background-elevated border border-neutral-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-neutral-100 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Dados de Entrega
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nome Completo"
                    {...register('fullName', { required: 'Nome é obrigatório' })}
                    error={errors.fullName?.message}
                  />
                  <Input
                    label="CEP"
                    {...register('zipCode', { required: 'CEP é obrigatório' })}
                    error={errors.zipCode?.message}
                    disabled={true}
                    className="bg-neutral-800/50 cursor-not-allowed"
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="Endereço"
                      {...register('street', { required: 'Endereço é obrigatório' })}
                      error={errors.street?.message}
                      disabled={isLoadingAddress}
                    />
                  </div>
                  <Input
                    label="Número"
                    {...register('number', { required: 'Número é obrigatório' })}
                    error={errors.number?.message}
                  />
                  <Input label="Complemento" {...register('complement')} />
                  <Input
                    label="Bairro"
                    {...register('neighborhood', { required: 'Bairro é obrigatório' })}
                    error={errors.neighborhood?.message}
                    disabled={isLoadingAddress}
                  />
                  <Input
                    label="Cidade"
                    {...register('city', { required: 'Cidade é obrigatória' })}
                    error={errors.city?.message}
                    disabled={isLoadingAddress}
                  />
                  <Input
                    label="Estado"
                    {...register('state', { required: 'Estado é obrigatório' })}
                    error={errors.state?.message}
                    maxLength={2}
                    disabled={isLoadingAddress}
                  />
                </div>
              </div>

              {/* Options */}
              <div className="bg-background-elevated border border-neutral-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-neutral-100 mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Opções de Entrega
                </h3>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('discretePackaging')}
                    className="w-5 h-5 rounded border-neutral-700 bg-background-subtle text-brand-500 focus:ring-brand-500"
                  />
                  <span className="text-neutral-200">Embalagem discreta (sem identificação)</span>
                </label>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Observações (opcional)
                  </label>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-background-subtle border border-neutral-700 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="Adicione informações adicionais sobre a entrega..."
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                leftIcon={<MessageCircle className="w-5 h-5" />}
              >
                Finalizar via WhatsApp
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-background-elevated border border-neutral-800 rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-neutral-100 mb-6">Resumo</h3>

              <div className="space-y-3 mb-6">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-neutral-300">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="text-neutral-100">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-700 pt-4 space-y-2">
                <div className="flex justify-between text-neutral-300">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Frete</span>
                  <span>{cart.shipping === 0 ? 'Grátis' : formatCurrency(cart.shipping)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2">
                  <span className="text-neutral-100">Total</span>
                  <span className="text-brand-400">{formatCurrency(cart.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

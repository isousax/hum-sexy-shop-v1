/**
 * Melhor Envio Integration Service
 * https://docs.melhorenvio.com.br/
 */

import type { 
  MelhorEnvioProduct, 
  MelhorEnvioShippingRequest, 
  MelhorEnvioShippingResponse,
  Product,
} from '@/types';
import { getApiUrl, hasValidToken, melhorEnvioConfig } from '@/config/melhorenvio';

/**
 * Converte um produto da loja para o formato do Melhor Envio
 */
export const productToMelhorEnvio = (product: Product, quantity: number = 1): MelhorEnvioProduct => {
  const { defaultDimensions, defaultInsuranceValue } = melhorEnvioConfig;
  
  return {
    id: product.id,
    width: defaultDimensions.width,
    height: defaultDimensions.height,
    length: defaultDimensions.length,
    weight: defaultDimensions.weight,
    insurance_value: product.price > defaultInsuranceValue ? product.price : defaultInsuranceValue,
    quantity,
  };
};

/**
 * Calcula o frete usando a API do Melhor Envio
 */
export const calculateMelhorEnvioShipping = async (
  destinationZipCode: string,
  products: MelhorEnvioProduct[]
): Promise<MelhorEnvioShippingResponse[]> => {
  
  if (!hasValidToken()) {
    throw new Error('Token do Melhor Envio não configurado. Configure VITE_MELHOR_ENVIO_TOKEN no .env');
  }

  const cleanZipCode = destinationZipCode.replace(/\D/g, '');
  
  if (cleanZipCode.length !== 8) {
    throw new Error('CEP inválido');
  }

  const requestBody: MelhorEnvioShippingRequest = {
    from: {
      postal_code: melhorEnvioConfig.originZipCode,
    },
    to: {
      postal_code: cleanZipCode,
    },
    products,
  };

  try {
    const response = await fetch(`${getApiUrl()}/me/shipment/calculate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${melhorEnvioConfig.token}`,
        'User-Agent': 'huumsexshop (contato@huumsexshop.com.br)',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erro ao calcular frete: ${response.status}`);
    }

    const data: MelhorEnvioShippingResponse[] = await response.json();
    
    // Filtrar apenas opções sem erro
    return data.filter(option => !option.error);
    
  } catch (error) {
    console.error('Erro ao calcular frete no Melhor Envio:', error);
    throw error;
  }
};

/**
 * Mapeia os nomes das transportadoras para descrições amigáveis
 */
export const getCarrierDescription = (carrierName: string): string => {
  const descriptions: Record<string, string> = {
    'Correios': 'Envio pelos Correios',
    'PAC': 'Envio econômico',
    'SEDEX': 'Envio rápido',
    'Jadlog': 'Envio pela Jadlog',
    'Azul Cargo': 'Envio pela Azul Cargo',
  };
  
  return descriptions[carrierName] || 'Envio padrão';
};

/**
 * Formata o prazo de entrega
 */
export const formatDeliveryTime = (days: number): string => {
  if (days === 1) return '1 dia útil';
  return `${days} dias úteis`;
};

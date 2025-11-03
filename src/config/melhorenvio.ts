/**
 * Melhor Envio Configuration
 * 
 * Para usar em produção:
 * 1. Crie uma conta em https://melhorenvio.com.br
 * 2. Gere um token em https://melhorenvio.com.br/painel/gerenciar/tokens
 * 3. Adicione o token nas variáveis de ambiente: VITE_MELHOR_ENVIO_TOKEN
 */

export const melhorEnvioConfig = {
  // API URLs
  sandboxUrl: 'https://sandbox.melhorenvio.com.br/api/v2',
  productionUrl: 'https://melhorenvio.com.br/api/v2',
  
  // Usar sandbox ou produção
  useSandbox: import.meta.env.VITE_MELHOR_ENVIO_SANDBOX === 'true',
  
  // Token de autenticação
  token: import.meta.env.VITE_MELHOR_ENVIO_TOKEN || '',
  
  // CEP de origem (sua loja)
  originZipCode: import.meta.env.VITE_ORIGIN_ZIP_CODE || '01310-100', // Av Paulista, SP (default)
  
  // Dimensões padrão dos produtos (caso não tenha no cadastro)
  defaultDimensions: {
    width: 15,  // cm
    height: 10, // cm
    length: 20, // cm
    weight: 0.3, // kg
  },
  
  // Valor de seguro padrão
  defaultInsuranceValue: 50, // R$
  
  // Empresas disponíveis
  companies: {
    correios: [1, 2], // PAC e SEDEX
    jadlog: [3, 4],
    azul: [12, 13],
  },
};

export const getApiUrl = () => {
  return melhorEnvioConfig.useSandbox 
    ? melhorEnvioConfig.sandboxUrl 
    : melhorEnvioConfig.productionUrl;
};

export const hasValidToken = () => {
  return !!melhorEnvioConfig.token && melhorEnvioConfig.token.length > 0;
};

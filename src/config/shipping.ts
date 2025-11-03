/**
 * Configuração de Frete e Área de Entrega
 */

export const shippingConfig = {
  // CEP de origem (Jaboatão Centro)
  originZipCode: '54100-060',
  
  // Coordenadas de origem (Jaboatão Centro, PE)
  originCoordinates: {
    lat: -8.1130,
    lng: -35.0147,
  },
  
  // Preço base (frete mínimo para o CEP de origem)
  basePrice: 5.00, // R$ 5,00
  
  // Taxa por quilômetro de distância
  pricePerKm: 1.35, // R$ 1,35 por km
  
  // Raio máximo de entrega em km (Região Metropolitana do Recife)
  maxDeliveryRadius: 30, // 30 km
  
  // Valor mínimo para frete grátis
  freeShippingMinimum: 299.00, // R$ 299,00
  
  // Tempo estimado de entrega (dias úteis)
  deliveryDays: {
    min: 1,
    max: 3,
  },
  
  // Cidades atendidas (Região Metropolitana do Recife)
  allowedCities: [
    'Recife',
    'Jaboatão dos Guararapes',
    'Camaragibe',
    'São Lourenço da Mata',
    'Moreno',
  ],
  
  // Mensagem quando fora da área de entrega
  outsideDeliveryAreaMessage: 'Desculpe, no momento não entregamos na sua região.',
};

/**
 * Calcula a distância entre dois pontos geográficos usando a fórmula de Haversine
 * @param lat1 Latitude do ponto 1
 * @param lng1 Longitude do ponto 1
 * @param lat2 Latitude do ponto 2
 * @param lng2 Longitude do ponto 2
 * @returns Distância em quilômetros
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Raio da Terra em km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Calcula o preço do frete baseado na distância
 * @param distanceKm Distância em quilômetros
 * @returns Preço do frete em reais
 */
export function calculateShippingPrice(distanceKm: number): number {
  // Se a distância for menor que 1km, cobra apenas o frete base
  if (distanceKm < 1) {
    return shippingConfig.basePrice;
  }
  
  // Preço base + taxa por km
  const price = shippingConfig.basePrice + (distanceKm * shippingConfig.pricePerKm);
  
  // Arredonda para 2 casas decimais
  return Math.round(price * 100) / 100;
}

/**
 * Verifica se a cidade está na área de entrega
 */
export function isCityAllowed(city: string): boolean {
  const normalizedCity = city.trim().toLowerCase();
  return shippingConfig.allowedCities.some(
    allowedCity => allowedCity.toLowerCase() === normalizedCity
  );
}

/**
 * Verifica se o CEP está dentro da área de entrega
 */
export function isWithinDeliveryArea(distanceKm: number): boolean {
  return distanceKm <= shippingConfig.maxDeliveryRadius;
}

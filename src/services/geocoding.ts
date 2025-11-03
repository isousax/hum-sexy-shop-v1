/**
 * Geocoding Service - Obtém coordenadas de CEPs brasileiros
 */

interface Coordinates {
  lat: number;
  lng: number;
}

interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

// Cache de coordenadas para evitar múltiplas chamadas
const coordinatesCache = new Map<string, Coordinates>();

/**
 * Obtém coordenadas geográficas de um CEP usando Nominatim (OpenStreetMap)
 */
export async function getCoordinatesFromCEP(cep: string): Promise<Coordinates | null> {
  const cleanCep = cep.replace(/\D/g, '');
  
  // Verifica cache
  if (coordinatesCache.has(cleanCep)) {
    return coordinatesCache.get(cleanCep)!;
  }
  
  try {
    // Primeiro busca o endereço completo via ViaCEP
    const viaCepResponse = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const viaCepData: ViaCEPResponse = await viaCepResponse.json();
    
    if (viaCepData.erro) {
      return null;
    }
    
    // Monta a query para o Nominatim
    const address = `${viaCepData.logradouro}, ${viaCepData.bairro}, ${viaCepData.localidade}, ${viaCepData.uf}, Brasil`;
    const encodedAddress = encodeURIComponent(address);
    
    // Busca coordenadas no Nominatim (OpenStreetMap)
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`;
    const nominatimResponse = await fetch(nominatimUrl, {
      headers: {
        'User-Agent': 'HuumSexShop/1.0', // Nominatim requer User-Agent
      },
    });
    
    const nominatimData = await nominatimResponse.json();
    
    if (nominatimData.length > 0) {
      const coordinates: Coordinates = {
        lat: parseFloat(nominatimData[0].lat),
        lng: parseFloat(nominatimData[0].lon),
      };
      
      // Salva no cache
      coordinatesCache.set(cleanCep, coordinates);
      
      return coordinates;
    }
    
    // Fallback: Usa coordenadas aproximadas baseadas na cidade
    return getCityCoordinates(viaCepData.localidade);
    
  } catch (error) {
    console.error('Erro ao obter coordenadas do CEP:', error);
    return null;
  }
}

/**
 * Coordenadas aproximadas das principais cidades da Região Metropolitana do Recife
 */
const cityCoordinates: Record<string, Coordinates> = {
  'Recife': { lat: -8.0476, lng: -34.8770 },
  'Jaboatão dos Guararapes': { lat: -8.1130, lng: -35.0147 },
  'Camaragibe': { lat: -8.0241, lng: -34.9786 },
  'São Lourenço da Mata': { lat: -8.0011, lng: -35.0197 },
  'Moreno': { lat: -8.1193, lng: -35.0897 },
};

/**
 * Retorna coordenadas aproximadas baseadas no nome da cidade
 */
function getCityCoordinates(cityName: string): Coordinates | null {
  const normalizedCity = cityName.trim();
  
  if (cityCoordinates[normalizedCity]) {
    return cityCoordinates[normalizedCity];
  }
  
  // Tenta match parcial
  for (const [city, coords] of Object.entries(cityCoordinates)) {
    if (city.toLowerCase().includes(normalizedCity.toLowerCase()) ||
        normalizedCity.toLowerCase().includes(city.toLowerCase())) {
      return coords;
    }
  }
  
  return null;
}

/**
 * Obtém informações completas do CEP via ViaCEP
 */
export async function getCEPInfo(cep: string): Promise<ViaCEPResponse | null> {
  const cleanCep = cep.replace(/\D/g, '');
  
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data: ViaCEPResponse = await response.json();
    
    if (data.erro) {
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    return null;
  }
}

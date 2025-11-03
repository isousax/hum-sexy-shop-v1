# Sistema de Frete - Região Metropolitana do Recife

## 🚚 Como Funciona

O sistema de frete foi desenvolvido especificamente para entregas na **Região Metropolitana do Recife**, usando cálculo de distância geográfica real.

## ⚙️ Configurações (Facilmente Editáveis)

Todas as configurações estão centralizadas em: `src/config/shipping.ts`

### 📍 Ponto de Origem
```typescript
originZipCode: '54100-060'  // Jaboatão Centro
originCoordinates: {
  lat: -8.1130,
  lng: -35.0147,
}
```

### 💰 Preços
```typescript
basePrice: 5.00,        // R$ 5,00 (frete mínimo para Jaboatão Centro)
pricePerKm: 1.50,       // R$ 1,50 adicional por km de distância
```

**Exemplo de cálculos:**
- **0-1 km** do centro de Jaboatão: R$ 5,00
- **5 km** de distância: R$ 5,00 + (5 × R$ 1,50) = R$ 12,50
- **10 km** de distância: R$ 5,00 + (10 × R$ 1,50) = R$ 20,00
- **20 km** de distância: R$ 5,00 + (20 × R$ 1,50) = R$ 35,00

### 📦 Prazos de Entrega
```typescript
deliveryDays: {
  min: 1,  // 1 dia útil (até 10km)
  max: 3,  // 3 dias úteis (acima de 10km)
}
```

### 📏 Área de Cobertura
```typescript
maxDeliveryRadius: 50,  // Raio máximo de 50 km
```

### 🏙️ Cidades Atendidas
```typescript
allowedCities: [
  'Recife',
  'Jaboatão dos Guararapes',
  'Olinda',
  'Paulista',
  'Cabo de Santo Agostinho',
  'Camaragibe',
  'São Lourenço da Mata',
  'Abreu e Lima',
  'Igarassu',
  'Itamaracá',
  'Itapissuma',
  'Moreno',
  'Araçoiaba',
]
```

### 💬 Mensagem para Fora da Área
```typescript
outsideDeliveryAreaMessage: 'Desculpe, no momento entregamos apenas na Região Metropolitana do Recife.'
```

## 🔧 Como Ajustar as Regras

### 1. Alterar Preço Base
Em `src/config/shipping.ts`, linha 11:
```typescript
basePrice: 10.00,  // Novo valor: R$ 10,00
```

### 2. Alterar Taxa por Km
Em `src/config/shipping.ts`, linha 14:
```typescript
pricePerKm: 2.00,  // Novo valor: R$ 2,00/km
```

### 3. Aumentar Raio de Entrega
Em `src/config/shipping.ts`, linha 17:
```typescript
maxDeliveryRadius: 80,  // Agora entrega até 80km
```

### 4. Adicionar Nova Cidade
Em `src/config/shipping.ts`, adicione na lista `allowedCities`:
```typescript
allowedCities: [
  'Recife',
  'Jaboatão dos Guararapes',
  // ... outras cidades
  'Nova Cidade Aqui',  // ← Adicionar aqui
]
```

### 5. Alterar Prazos
Em `src/config/shipping.ts`, linha 20-23:
```typescript
deliveryDays: {
  min: 2,  // Novo mínimo: 2 dias
  max: 5,  // Novo máximo: 5 dias
}
```

### 6. Mudar Ponto de Origem
Em `src/config/shipping.ts`, linhas 5-10:
```typescript
originZipCode: '50000-000',  // Novo CEP
originCoordinates: {
  lat: -8.0476,   // Coordenadas do novo local
  lng: -34.8770,  // (use Google Maps para obter)
}
```

## 🧮 Lógica de Cálculo

1. **Usuário digita CEP**
2. **Sistema busca coordenadas** via ViaCEP + Nominatim (OpenStreetMap)
3. **Valida se cidade está na lista** permitida
4. **Calcula distância** usando fórmula de Haversine
5. **Verifica raio máximo** (50 km por padrão)
6. **Calcula preço:** Base + (Distância × Taxa por Km)
7. **Define prazo:** 1 dia (até 10km) ou 3 dias (acima)

## 📊 Exemplos Reais

### Jaboatão Centro → Recife Centro (~12 km)
- **Distância:** 12 km
- **Preço:** R$ 5,00 + (12 × R$ 1,50) = **R$ 23,00**
- **Prazo:** 3 dias úteis

### Jaboatão Centro → Olinda (~15 km)
- **Distância:** 15 km
- **Preço:** R$ 5,00 + (15 × R$ 1,50) = **R$ 27,50**
- **Prazo:** 3 dias úteis

### Jaboatão Centro → Paulista (~22 km)
- **Distância:** 22 km
- **Preço:** R$ 5,00 + (22 × R$ 1,50) = **R$ 38,00**
- **Prazo:** 3 dias úteis

### Jaboatão Centro → Igarassu (~35 km)
- **Distância:** 35 km
- **Preço:** R$ 5,00 + (35 × R$ 1,50) = **R$ 57,50**
- **Prazo:** 3 dias úteis

## ⚠️ Validações

O sistema bloqueia entregas quando:

1. ❌ **CEP inválido** (não são 8 dígitos)
2. ❌ **CEP não encontrado** (não existe nos Correios)
3. ❌ **Cidade não permitida** (fora da lista)
4. ❌ **Distância acima do raio** (mais de 50 km)

Em todos os casos, exibe: *"Desculpe, no momento entregamos apenas na Região Metropolitana do Recife."*

## 🔄 Recálculo Automático

Quando o cliente:
- Adiciona produtos
- Remove produtos
- Altera quantidade

O frete é **recalculado automaticamente** usando o CEP já informado.

## 🗺️ APIs Utilizadas

1. **ViaCEP**: Busca endereço completo do CEP
2. **Nominatim (OpenStreetMap)**: Obtém coordenadas geográficas
3. **Fórmula de Haversine**: Calcula distância entre dois pontos

## 🎯 Benefícios

✅ **Totalmente configurável** - Mude preços/regras sem tocar no código  
✅ **Baseado em distância real** - Frete justo e preciso  
✅ **Restringe área de entrega** - Evita pedidos impossíveis  
✅ **100% automático** - Sem tabelas fixas para manter  
✅ **Cache inteligente** - Coordenadas salvas para performance  

## 🚀 Próximas Melhorias

- [ ] Adicionar peso/dimensões dos produtos no cálculo
- [ ] Frete grátis acima de valor X
- [ ] Desconto progressivo por distância
- [ ] Múltiplos pontos de origem (filiais)
- [ ] Agendamento de horário de entrega

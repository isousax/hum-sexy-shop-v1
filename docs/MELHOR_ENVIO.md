# Integração Melhor Envio

Este projeto possui integração com a API do [Melhor Envio](https://melhorenvio.com.br) para cálculo de frete em tempo real.

## 🚀 Como configurar

### 1. Criar conta no Melhor Envio

1. Acesse [melhorenvio.com.br](https://melhorenvio.com.br)
2. Crie uma conta gratuita
3. Complete seu cadastro

### 2. Gerar Token de API

1. Acesse o [Painel do Melhor Envio](https://melhorenvio.com.br/painel)
2. Vá em **Configurações** > **Gerenciar Tokens**
3. Clique em **Gerar novo token**
4. Copie o token gerado

### 3. Configurar variáveis de ambiente

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` e adicione seu token:
   ```env
   # Token do Melhor Envio
   VITE_MELHOR_ENVIO_TOKEN=seu_token_aqui
   
   # Usar sandbox (true) ou produção (false)
   VITE_MELHOR_ENVIO_SANDBOX=true
   
   # CEP de origem (sua loja/armazém)
   VITE_ORIGIN_ZIP_CODE=01310-100
   ```

### 4. Reiniciar o servidor de desenvolvimento

```bash
npm run dev
```

## 📦 Como funciona

### Cálculo de frete

A calculadora de frete está disponível na página do carrinho. O usuário digita o CEP e recebe opções reais de:

- **Correios** (PAC, SEDEX)
- **Jadlog**
- **Azul Cargo**
- Outras transportadoras disponíveis

### Fallback automático

Se o token não estiver configurado ou houver erro na API, o sistema usa valores **mock** automaticamente:

- **PAC**: R$ 15,90 - 10 dias úteis
- **SEDEX**: R$ 25,90 - 5 dias úteis

### Dimensões dos produtos

As dimensões padrão estão configuradas em `src/config/melhorenvio.ts`:

```typescript
defaultDimensions: {
  width: 15,  // cm
  height: 10, // cm
  length: 20, // cm
  weight: 0.3, // kg
}
```

**Para produção**, você deve cadastrar as dimensões reais de cada produto e atualizar o tipo `Product` para incluir essas informações.

## 🔧 Configurações avançadas

### Ambiente Sandbox vs Produção

- **Sandbox**: Para testes, não gera cobranças reais
- **Produção**: Para uso real com clientes

Altere em `.env`:
```env
VITE_MELHOR_ENVIO_SANDBOX=false  # Usar produção
```

### Alterar CEP de origem

O CEP de origem é de onde os produtos serão enviados (sua loja/armazém):

```env
VITE_ORIGIN_ZIP_CODE=12345-678  # Seu CEP
```

### Filtrar transportadoras

Em `src/config/melhorenvio.ts`, você pode configurar quais transportadoras aceitar:

```typescript
companies: {
  correios: [1, 2], // PAC e SEDEX
  jadlog: [3, 4],
  azul: [12, 13],
}
```

## 📚 Documentação oficial

- [Documentação Melhor Envio](https://docs.melhorenvio.com.br/)
- [API Reference](https://docs.melhorenvio.com.br/reference)
- [Tabela de transportadoras](https://docs.melhorenvio.com.br/reference/transportadoras)

## 💰 Custos

O Melhor Envio é **gratuito** para cálculo de frete. Você só paga quando gera uma etiqueta de envio (após o cliente comprar).

As taxas são competitivas e geralmente menores que contratar diretamente com os Correios.

## ⚠️ Importante para produção

1. **Cadastre dimensões reais** de cada produto
2. **Use ambiente de produção** (não sandbox)
3. **Valide CEPs** antes de calcular
4. **Adicione tratamento de erros** robusto
5. **Considere cache** para reduzir chamadas à API
6. **Monitore limites** de requisições da API

## 🐛 Troubleshooting

### Erro: "Token do Melhor Envio não configurado"

Verifique se:
- O arquivo `.env` existe na raiz do projeto
- A variável `VITE_MELHOR_ENVIO_TOKEN` está preenchida
- Você reiniciou o servidor após editar o `.env`

### Calculadora mostra valores fixos

Isso significa que está usando o fallback mock. Verifique:
- Token configurado corretamente
- Servidor reiniciado
- Console do navegador para erros da API

### Erro 401 Unauthorized

- Token inválido ou expirado
- Gere um novo token no painel do Melhor Envio

### Erro 422 Unprocessable Entity

- CEP inválido ou não encontrado
- Dimensões do produto inválidas
- Verifique os dados enviados para a API

## 📞 Suporte

Em caso de dúvidas sobre a integração:

- **Documentação**: [docs.melhorenvio.com.br](https://docs.melhorenvio.com.br)
- **Suporte Melhor Envio**: contato@melhorenvio.com.br
- **Issues do projeto**: Abra uma issue no GitHub

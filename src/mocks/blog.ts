import type { BlogPost, BlogCategory, BlogAuthor } from '@/types';

export const blogCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Guias para Iniciantes',
    slug: 'iniciantes',
    description: 'Primeiros passos no mundo do bem-estar íntimo',
    color: 'purple',
  },
  {
    id: '2',
    name: 'Saúde e Bem-Estar',
    slug: 'saude',
    description: 'Informações sobre saúde sexual e autocuidado',
    color: 'pink',
  },
  {
    id: '3',
    name: 'Relacionamentos',
    slug: 'relacionamentos',
    description: 'Dicas para melhorar a intimidade em casal',
    color: 'red',
  },
  {
    id: '4',
    name: 'Educação Sexual',
    slug: 'educacao',
    description: 'Conteúdo educativo e desmistificação de tabus',
    color: 'indigo',
  },
  {
    id: '5',
    name: 'Escolha de Produtos',
    slug: 'produtos',
    description: 'Como escolher o produto ideal para você',
    color: 'accent',
  },
];

export const blogAuthors: BlogAuthor[] = [
  {
    id: '1',
    name: 'Dra. Carolina Silva',
    role: 'Sexóloga',
    bio: 'Especialista em saúde sexual e bem-estar íntimo com mais de 10 anos de experiência.',
  },
  {
    id: '2',
    name: 'Marina Santos',
    role: 'Educadora Sexual',
    bio: 'Educadora sexual focada em desconstrução de tabus e empoderamento.',
  },
  {
    id: '3',
    name: 'Dr. Rafael Costa',
    role: 'Psicólogo Clínico',
    bio: 'Especializado em terapia de casal e relacionamentos saudáveis.',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'guia-completo-para-iniciantes',
    title: 'Guia Completo para Iniciantes: Como Começar sua Jornada de Autoconhecimento',
    excerpt:
      'Descubra por onde começar no universo do bem-estar íntimo com segurança, sem medo e respeitando seu próprio tempo.',
    content: `
# Guia Completo para Iniciantes

Começar a explorar o bem-estar íntimo pode parecer intimidador, mas não precisa ser. Este guia foi criado para ajudá-lo(a) a dar os primeiros passos com confiança e segurança.

## 1. Conheça seu Corpo

O autoconhecimento é fundamental. Reserve um tempo para:
- Explorar seu próprio corpo sem julgamentos
- Entender suas preferências e limites
- Identificar zonas erógenas e sensibilidades

## 2. Escolha o Produto Certo

Para iniciantes, recomendamos:
- **Vibradores pequenos**: Discretos e fáceis de usar
- **Lubrificantes à base de água**: Versáteis e seguros
- **Produtos de silicone medicinal**: Hipoalergênicos e duráveis

## 3. Crie um Ambiente Confortável

- Escolha um momento em que tenha privacidade
- Desligue notificações e distrações
- Use iluminação suave e música relaxante, se desejar

## 4. Vá no Seu Ritmo

Não há pressa. Cada pessoa tem seu próprio tempo e isso é completamente normal. O importante é se sentir confortável e seguro(a).

## 5. Higiene é Essencial

- Lave os produtos antes e depois do uso
- Use sabonete neutro e água morna
- Armazene em local limpo e seco

## Conclusão

A jornada de autoconhecimento é pessoal e única. Seja gentil consigo mesmo(a) e lembre-se: não existe certo ou errado quando se trata do seu próprio prazer.
    `,
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200',
    author: blogAuthors[1],
    category: blogCategories[0],
    tags: ['iniciantes', 'autoconhecimento', 'primeiros passos'],
    readTime: 8,
    publishedAt: '2024-10-15T10:00:00Z',
    updatedAt: '2024-10-15T10:00:00Z',
    featured: true,
  },
  {
    id: '2',
    slug: 'importancia-lubrificacao',
    title: 'A Importância da Lubrificação: Mitos e Verdades',
    excerpt:
      'Descubra por que a lubrificação é essencial para o conforto e prazer, e aprenda a escolher o produto ideal.',
    content: `
# A Importância da Lubrificação

Muitas pessoas subestimam a importância do lubrificante íntimo, mas ele pode transformar completamente a experiência.

## Por Que Usar Lubrificante?

### Conforto
- Reduz atrito e desconforto
- Previne irritações e microlesões
- Torna a experiência mais prazerosa

### Versatilidade
- Compatível com brinquedos
- Melhora sensações naturais
- Essencial para certas práticas

## Tipos de Lubrificantes

### À Base de Água
- **Prós**: Versátil, compatível com preservativos e brinquedos
- **Contras**: Seca mais rápido, pode precisar reaplicação

### À Base de Silicone
- **Prós**: Duração prolongada, ideal para banho
- **Contras**: Não usar com brinquedos de silicone

### À Base de Óleo
- **Prós**: Hidratante, dura muito tempo
- **Contras**: Não usar com preservativos de látex

## Mitos Comuns

**Mito**: "Se preciso de lubrificante, algo está errado"
**Verdade**: Lubrificação natural varia por diversos fatores (hormônios, estresse, medicamentos). Usar lubrificante é normal e saudável!

## Como Escolher

1. Verifique ingredientes (evite parabenos e glicerina se tiver sensibilidade)
2. Considere o uso (solo, casal, com brinquedos)
3. Teste pequenas quantidades primeiro
4. Escolha marcas confiáveis

## Conclusão

Lubrificante não é luxo, é cuidado. Investir em um bom produto é investir no seu bem-estar e conforto.
    `,
    coverImage: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200',
    author: blogAuthors[0],
    category: blogCategories[1],
    tags: ['lubrificação', 'saúde', 'conforto'],
    readTime: 6,
    publishedAt: '2024-10-20T14:00:00Z',
    updatedAt: '2024-10-20T14:00:00Z',
    featured: true,
  },
  {
    id: '3',
    slug: 'comunicacao-casal-intimidade',
    title: 'Comunicação em Casal: A Chave para uma Intimidade Plena',
    excerpt:
      'Aprenda a falar sobre desejos, limites e fantasias de forma respeitosa e fortalecendo a conexão.',
    content: `
# Comunicação em Casal

A comunicação é a base de qualquer relacionamento saudável, especialmente quando se trata de intimidade.

## Por Que Falar é Importante?

- Cria segurança emocional
- Alinha expectativas
- Evita mal-entendidos
- Fortalece a conexão

## Como Começar a Conversa

### 1. Escolha o Momento Certo
- Não durante o ato
- Em ambiente calmo e privado
- Quando ambos estiverem relaxados

### 2. Use "Eu" ao invés de "Você"
❌ "Você nunca faz..."
✅ "Eu gostaria de experimentar..."

### 3. Seja Específico(a)
Ao invés de "quero mais romance", diga "gostaria de mais beijos e carícias antes".

## Tópicos para Discutir

- Preferências e desejos
- Limites e zonas de conforto
- Fantasias (se houver interesse)
- Frequência desejada
- Experimentar produtos ou práticas novas

## Lidando com Diferenças

É normal ter preferências diferentes. O importante é:
- Respeitar limites mútuos
- Buscar compromissos
- Nunca pressionar o parceiro(a)

## Quando Buscar Ajuda Profissional

Se a comunicação é difícil ou há questões não resolvidas, considere:
- Terapia de casal
- Consulta com sexólogo(a)
- Workshops de relacionamento

## Conclusão

Falar sobre intimidade não deve ser tabu entre parceiros. Quanto mais aberta a comunicação, mais satisfatória a relação.
    `,
    coverImage: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=1200',
    author: blogAuthors[2],
    category: blogCategories[2],
    tags: ['relacionamento', 'comunicação', 'casal'],
    readTime: 7,
    publishedAt: '2024-10-25T09:00:00Z',
    updatedAt: '2024-10-25T09:00:00Z',
    featured: true,
  },
  {
    id: '4',
    slug: 'escolher-primeiro-vibrador',
    title: 'Como Escolher seu Primeiro Vibrador: Guia Completo',
    excerpt:
      'Tudo o que você precisa saber antes de comprar seu primeiro vibrador: tipos, tamanhos, materiais e cuidados.',
    content: `
# Como Escolher seu Primeiro Vibrador

Escolher o primeiro vibrador pode ser confuso com tantas opções. Este guia vai ajudá-lo(a) a fazer a melhor escolha.

## Tipos de Vibradores

### Bullet (Cápsula)
- **Ideal para**: Iniciantes, estimulação externa
- **Prós**: Discreto, fácil de usar, versátil
- **Contras**: Menos potência que modelos maiores

### Vibrador Clássico
- **Ideal para**: Estimulação interna
- **Prós**: Simples, eficaz
- **Contras**: Pode ser intimidador para iniciantes

### Rabbit (Coelho)
- **Ideal para**: Estimulação dupla
- **Prós**: Multifuncional
- **Contras**: Pode ser intenso demais para começar

### Wand (Varinha)
- **Ideal para**: Estimulação externa potente
- **Prós**: Muito eficaz, relaxante muscular
- **Contras**: Tamanho maior, menos discreto

## Critérios de Escolha

### 1. Material
**Recomendado**: Silicone medicinal
- Hipoalergênico
- Fácil de limpar
- Durável
- Sem cheiro

### 2. Tamanho
Para iniciantes, comece com algo pequeno/médio. Você sempre pode aumentar depois.

### 3. Intensidade
Procure modelos com múltiplos níveis de vibração para ter controle.

### 4. À Prova D'água
Facilita limpeza e permite uso no banho/banheira.

### 5. Ruído
Se privacidade é uma preocupação, verifique o nível de ruído.

## Cuidados Essenciais

- Limpe antes e depois do uso
- Use lubrificante à base de água (não silicone!)
- Guarde em local seco e limpo
- Carregue bateria regularmente

## Investimento Vale a Pena

Produtos de qualidade custam mais, mas:
- Duram anos
- São mais seguros
- Têm melhor desempenho
- Geralmente vêm com garantia

## Nossa Recomendação para Iniciantes

1. **Bullet vibrador**: Pequeno, discreto, versátil
2. **Silicone medicinal**: Seguro e higiênico
3. **Múltiplas velocidades**: Controle total
4. **À prova d'água**: Fácil limpeza

## Conclusão

Não existe escolha errada - existe a escolha certa para VOCÊ. Escute seu corpo e vá no seu ritmo.
    `,
    coverImage: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=1200',
    author: blogAuthors[1],
    category: blogCategories[4],
    tags: ['vibrador', 'escolha', 'iniciantes', 'guia'],
    readTime: 9,
    publishedAt: '2024-10-28T11:00:00Z',
    updatedAt: '2024-10-28T11:00:00Z',
    featured: false,
  },
  {
    id: '5',
    slug: 'higiene-produtos-intimos',
    title: 'Higiene e Cuidados com Produtos Íntimos: Manual Completo',
    excerpt:
      'Aprenda a limpar, armazenar e cuidar corretamente de seus produtos para garantir saúde e durabilidade.',
    content: `
# Higiene e Cuidados com Produtos Íntimos

Cuidar adequadamente dos seus produtos é essencial para sua saúde e para prolongar a vida útil deles.

## Por Que a Higiene é Importante?

- Previne infecções
- Mantém materiais em bom estado
- Garante segurança no uso
- Prolonga durabilidade

## Limpeza Básica

### Antes do Primeiro Uso
1. Lave com sabonete neutro e água morna
2. Enxágue bem
3. Seque completamente

### Após Cada Uso
1. Limpe imediatamente
2. Use sabonete antibacteriano ou específico
3. Enxágue abundantemente
4. Seque com toalha limpa ou deixe secar naturalmente

## Produtos de Limpeza

### Recomendados
- Sabonete neutro sem perfume
- Limpadores específicos para brinquedos
- Água morna

### Evite
- Sabonetes perfumados
- Álcool
- Produtos abrasivos
- Água muito quente

## Cuidados por Material

### Silicone
- Use sabonete neutro
- Pode ferver por 3-5 minutos (sem motor)
- Seque bem antes de guardar

### Plástico Rígido
- Limpe com pano úmido e sabonete
- Não mergulhe se tiver bateria
- Evite produtos químicos fortes

### Vidro/Metal
- Pode ferver ou usar lava-louças
- Muito fáceis de limpar
- Não arranham facilmente

## Armazenamento

### Onde Guardar
- Local seco e fresco
- Longe de luz solar direta
- Separado de outros produtos (silicone pode reagir)

### Como Guardar
- Bolsas de tecido respirável
- Caixas específicas
- NUNCA em plástico fechado (cria umidade)

## Baterias e Carregamento

- Remova baterias se não for usar por tempo prolongado
- Carregue conforme instruções
- Não deixe carregando indefinidamente

## Quando Descartar

Substitua o produto se:
- Houver rachaduras ou danos
- Mudança de cor/odor
- Motor parou de funcionar
- Passou muito tempo sem uso adequado

## Checklist de Cuidados

✅ Limpar antes e depois do uso
✅ Secar completamente
✅ Guardar adequadamente
✅ Verificar regularmente estado do produto
✅ Usar lubrificante compatível

## Conclusão

Cuidar bem dos seus produtos é cuidar da sua saúde. Dedique alguns minutos à limpeza e você terá produtos seguros e duradouros.
    `,
    coverImage: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1200',
    author: blogAuthors[0],
    category: blogCategories[1],
    tags: ['higiene', 'cuidados', 'limpeza', 'saúde'],
    readTime: 8,
    publishedAt: '2024-10-30T15:00:00Z',
    updatedAt: '2024-10-30T15:00:00Z',
    featured: false,
  },
  {
    id: '6',
    slug: 'tabus-sexualidade-feminina',
    title: 'Desconstruindo Tabus: A Sexualidade Feminina sem Preconceitos',
    excerpt:
      'É hora de falar abertamente sobre prazer feminino, desmistificar tabus e celebrar o autoconhecimento.',
    content: `
# Desconstruindo Tabus da Sexualidade Feminina

Por muito tempo, a sexualidade feminina foi cercada de tabus e silêncio. É hora de mudar isso.

## Tabus Comuns

### "Mulheres não devem ter desejo"
**MITO**. Desejo sexual é natural e saudável em qualquer gênero.

### "Prazer solo é errado"
**MITO**. Autoconhecimento é essencial para bem-estar e saúde sexual.

### "Falar sobre sexo é vulgar"
**MITO**. Comunicação aberta é sinal de maturidade e saúde.

## O Poder do Autoconhecimento

### Benefícios
- Maior satisfação pessoal
- Melhor comunicação com parceiros
- Redução de ansiedade
- Fortalecimento da autoestima

### Como Começar
1. Reserve tempo para si mesma
2. Explore sem julgamentos
3. Aprenda sobre anatomia
4. Experimente diferentes estímulos

## Prazer é um Direito

Não é egoísmo, não é pecado, não é errado. Prazer é:
- Natural
- Saudável
- Merecido
- Importante para qualidade de vida

## Quebrando o Silêncio

### Com Parceiros
- Comunique preferências
- Estabeleça limites
- Compartilhe fantasias (se confortável)

### Com Profissionais
- Ginecologista
- Sexólogo
- Terapeuta

### Consigo Mesma
- Aceite seu corpo
- Reconheça seus desejos
- Seja gentil consigo

## Educação Sexual de Qualidade

- Busque fontes confiáveis
- Questione informações duvidosas
- Converse com especialistas
- Compartilhe conhecimento

## Conclusão

Sua sexualidade é sua. Não deixe que tabus históricos impeçam você de viver plenamente e com prazer.
    `,
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
    author: blogAuthors[1],
    category: blogCategories[3],
    tags: ['educação sexual', 'empoderamento', 'tabus', 'feminino'],
    readTime: 7,
    publishedAt: '2024-11-01T10:00:00Z',
    updatedAt: '2024-11-01T10:00:00Z',
    featured: true,
  },
];

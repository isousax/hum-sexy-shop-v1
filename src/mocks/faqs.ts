import type { FAQ } from '@/types';

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'A embalagem é realmente discreta?',
    answer: 'Sim! Todos os produtos são enviados em caixas neutras, sem qualquer identificação externa do conteúdo ou da loja.',
    category: 'Envio',
    order: 1,
  },
  {
    id: 'faq-2',
    question: 'Qual o prazo de entrega?',
    answer: 'O prazo varia de acordo com sua região. Geralmente entre 2 a 3 horas. Você será notificado pelo whatsapp assim que seu pedido for despachado.',
    category: 'Envio',
    order: 2,
  },
  {
    id: 'faq-3',
    question: 'Posso trocar ou devolver?',
    answer: 'Aceitamos trocas e devoluções em até 7 dias após o recebimento, desde que o produto esteja lacrado e sem sinais de uso, por questões de higiene e segurança.',
    category: 'Trocas e Devoluções',
    order: 3,
  },
  {
    id: 'faq-4',
    question: 'Os produtos têm garantia?',
    answer: 'Sim, todos os produtos têm garantia contra defeitos de fabricação. O prazo varia por produto (geralmente 90 dias a 1 ano).',
    category: 'Garantia',
    order: 4,
  },
  {
    id: 'faq-5',
    question: 'Como limpar os produtos?',
    answer: 'A maioria dos produtos pode ser limpa com água morna e sabão neutro. Produtos específicos para limpeza de brinquedos íntimos também são recomendados. Cada produto tem instruções detalhadas.',
    category: 'Cuidados',
    order: 5,
  },
  {
    id: 'faq-6',
    question: 'Os lubrificantes são seguros?',
    answer: 'Sim! Todos nossos lubrificantes são testados dermatologicamente, hipoalergênicos e seguros para uso íntimo. Recomendamos sempre fazer teste de alergia em pequena área antes.',
    category: 'Produtos',
    order: 6,
  },
  {
    id: 'faq-7',
    question: 'Posso usar lubrificante com preservativo?',
    answer: 'Sim, nossos lubrificantes à base de água são compatíveis com todos os tipos de preservativos. Evite lubrificantes à base de óleo com preservativos de látex.',
    category: 'Produtos',
    order: 7,
  },
  {
    id: 'faq-8',
    question: 'Meus dados estão seguros?',
    answer: 'Absolutamente! Utilizamos criptografia SSL em todo o site e não compartilhamos seus dados com terceiros. Sua privacidade é nossa prioridade.',
    category: 'Segurança',
    order: 8,
  },
];

export interface Product {
  id: string;
  name: string;
  category: 'Novos' | 'Seminovos' | 'Acessórios';
  condition: string;
  batteryHealth?: string;
  description: string;
  priceCash: number;
  installments: string;
  image: string;
  whatsappMessage: string;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max 256GB',
    category: 'Novos',
    condition: 'Novo Lacrado',
    description: 'Natural Titanium • Garantia Apple 1 Ano • Super Retina XDR 6.7"',
    priceCash: 7999,
    installments: '12x de R$ 749,90',
    image: '/src/assets/images/iphone15_gold_1783299696704.jpg',
    whatsappMessage: 'Olá! Tenho interesse no iPhone 15 Pro Max 256GB Novo Lacrado de R$ 7.999.'
  },
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    category: 'Novos',
    condition: 'Lançamento',
    description: 'Titanium Gray • Câmera 200MP • S-Pen Inclusa • IA Galaxy Integrada',
    priceCash: 7200,
    installments: '12x de R$ 689,00',
    image: '/src/assets/images/samsung_s24_1783299722056.jpg',
    whatsappMessage: 'Olá! Tenho interesse no Samsung Galaxy S24 Ultra 512GB de R$ 7.200.'
  },
  {
    id: 'iphone-13-128gb',
    name: 'iPhone 13 128GB',
    category: 'Seminovos',
    condition: 'Seminovo 100%',
    batteryHealth: '92%',
    description: 'Midnight • Impecável, sem marcas • Acompanha cabo original',
    priceCash: 3190,
    installments: '12x de R$ 299,00',
    image: '/src/assets/images/iphone13_blue_1783299704604.jpg',
    whatsappMessage: 'Olá! Tenho interesse no iPhone 13 128GB Seminovo Midnight (Saúde 92%) por R$ 3.190.'
  },
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro (2ª Geração)',
    category: 'Acessórios',
    condition: 'Premium',
    description: 'Cancelamento Ativo de Ruído • Som Espacial • Estojo de recarga MagSafe',
    priceCash: 1690,
    installments: '10x de R$ 169,00',
    image: '/src/assets/images/airpods_pro_1783299713349.jpg',
    whatsappMessage: 'Olá! Tenho interesse nos AirPods Pro 2ª Geração de R$ 1.690.'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Gabriel Souza',
    role: 'Cliente de Silvânia-GO',
    comment: 'Comprei meu iPhone 15 Pro Max na Cell Store e o atendimento foi nota 10. Aparelho impecável e o melhor preço da região!',
    rating: 5
  },
  {
    name: 'Mariana Oliveira',
    role: 'Cliente de Silvânia-GO',
    comment: 'Ótimo pós-venda. Comprei um seminovo com a bateria excelente, me deram toda a assistência na transferência de dados. Recomendo muito!',
    rating: 5
  },
  {
    name: 'Lucas Ferreira',
    role: 'Cliente de Silvânia-GO',
    comment: 'A melhor variedade de capinhas e películas premium de Silvânia. O parcelamento em até 18x facilitou demais a compra.',
    rating: 5
  }
];

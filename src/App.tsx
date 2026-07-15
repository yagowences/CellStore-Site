import { useState, useEffect } from 'react';
import {
  Smartphone,
  CreditCard,
  CheckCircle2,
  Headphones,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Instagram,
  Star,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Info,
  Calendar,
  Zap,
  ShoppingBag,
  Award,
  GitCompare,
  X
} from 'lucide-react';
import { PRODUCTS_DATA, TESTIMONIALS, Product } from './data';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | 'Novos' | 'Seminovos' | 'Acessórios'>('Todos');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProductForCalc, setSelectedProductForCalc] = useState<Product>(PRODUCTS_DATA[0]);
  const [installmentsCount, setInstallmentsCount] = useState<number>(12);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  // Comparison feature states
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [compareWarning, setCompareWarning] = useState<string | null>(null);

  // Clear comparison warning after some time
  useEffect(() => {
    if (compareWarning) {
      const timer = setTimeout(() => {
        setCompareWarning(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [compareWarning]);

  const toggleCompareProduct = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 2) {
        setCompareWarning("Você já selecionou 2 produtos para comparar. Remova um para adicionar outro!");
        return prev;
      }
      return [...prev, product];
    });
  };

  // WhatsApp number for Silvânia-GO cell store (dummy phone for presentation)
  const WHATSAPP_NUMBER = '5562999999999';

  // Filter products
  const filteredProducts = selectedCategory === 'Todos'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === selectedCategory);

  // Interest rate simulation (mock simple rates for card)
  // 1x to 3x: 0% interest, 4x to 12x: very low rates, 13x to 18x: moderate
  const calculateInstallmentDetails = (product: Product, count: number) => {
    let rate = 0;
    if (count > 3 && count <= 6) rate = 0.04;
    else if (count > 6 && count <= 12) rate = 0.08;
    else if (count > 12) rate = 0.14;

    const totalWithInterest = product.priceCash * (1 + rate);
    const installmentValue = totalWithInterest / count;

    return {
      installmentValue: installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      total: totalWithInterest.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      hasInterest: rate > 0
    };
  };

  const currentCalc = calculateInstallmentDetails(selectedProductForCalc, installmentsCount);

  // Handle smooth scroll to elements
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  // Set active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      const sections = ['home', 'vitrine', 'differentials', 'location'];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Formats whatsapp link nicely
  const getWhatsappLink = (text: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-[#0F172A] selection:bg-orange-500 selection:text-white">
      
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-orange-500 shadow-md">
              <Smartphone className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-display text-xl font-extrabold tracking-tight text-slate-900">
                Cell<span className="text-orange-500">Store</span>
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Silvânia</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className={`font-display text-sm font-bold tracking-wide transition-colors ${activeTab === 'home' ? 'text-orange-500' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('vitrine')} 
              className={`font-display text-sm font-bold tracking-wide transition-colors ${activeTab === 'vitrine' ? 'text-orange-500' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Vitrine
            </button>
            <button 
              onClick={() => scrollToSection('differentials')} 
              className={`font-display text-sm font-bold tracking-wide transition-colors ${activeTab === 'differentials' ? 'text-orange-500' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Diferenciais
            </button>
            <button 
              onClick={() => scrollToSection('location')} 
              className={`font-display text-sm font-bold tracking-wide transition-colors ${activeTab === 'location' ? 'text-orange-500' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Localização
            </button>
          </nav>

          {/* Contact Button */}
          <a
            href={getWhatsappLink('Olá! Visitei a Cell Store Silvânia e gostaria de falar com um consultor.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98]"
          >
            <MessageSquare className="h-4 w-4 fill-white stroke-none" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            
            {/* Hero Left Content */}
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3.5 py-1.5 text-xs font-bold text-orange-600">
                <Sparkles className="h-3.5 w-3.5 fill-orange-500/10 stroke-[2.5]" />
                <span>LOJA LÍDER EM SMARTPHONES</span>
              </div>
              
              <h1 className="font-display text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Smartphones novos e seminovos com quem <span className="text-orange-500">você confia</span>.
              </h1>
              
              <p className="max-w-xl text-lg leading-relaxed text-slate-500 sm:text-xl">
                Adquira seu iPhone ou smartphone de ponta em Silvânia-GO. Garantia absoluta, aparelhos impecáveis testados em mais de 30 itens, e o parcelamento facilitado que cabe no seu bolso.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={() => scrollToSection('vitrine')}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-8 text-base font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/30 active:scale-[0.98]"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Ver Catálogo
                </button>
                <a
                  href={getWhatsappLink('Olá! Gostaria de consultar a disponibilidade de aparelhos na Cell Store Silvânia.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 text-base font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]"
                >
                  <MessageSquare className="h-5 w-5 stroke-[2.2] text-slate-500" />
                  Falar com Consultor
                </a>
              </div>

              {/* Quick stats / Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-100 max-w-md">
                <div>
                  <span className="block font-display text-2xl font-extrabold text-slate-900">100%</span>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Garantido</span>
                </div>
                <div>
                  <span className="block font-display text-2xl font-extrabold text-slate-900">Até 18x</span>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Sem Burocracia</span>
                </div>
                <div>
                  <span className="block font-display text-2xl font-extrabold text-slate-900">Silvânia</span>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Loja Física</span>
                </div>
              </div>
            </div>

            {/* Hero Right Media Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -left-4 -top-4 -right-4 -bottom-4 bg-orange-500/5 rounded-3xl blur-3xl"></div>
              <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-2 shadow-2xl">
                <img
                  src="/images/cellstore_hero_1783299688150.jpg"
                  alt="Premium Smartphone Showcase"
                  referrerPolicy="no-referrer"
                  className="w-full rounded-2xl object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-950/80 p-4 text-white backdrop-blur-md border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Oferta Destaque</span>
                      <p className="font-display text-sm font-bold text-white">iPhone 15 Pro Max 256GB</p>
                    </div>
                    <span className="rounded-lg bg-orange-500 px-2 py-1 text-xs font-extrabold">Novidade</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DIFFERENTIALS / VALUE PROPS */}
      <section id="differentials" className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Por que escolher a Cell Store?</span>
            <h2 className="font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Sua melhor experiência na compra de celulares
            </h2>
            <p className="text-slate-500 text-base sm:text-lg">
              Prezamos pela transparência absoluta, qualidade incomparável de cada peça e atendimento acolhedor focado na sua satisfação.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Diff 1 */}
            <div className="relative rounded-2xl bg-white p-8 border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <CreditCard className="h-6 w-6 stroke-[2.2]" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-3">Parcelamento Facilitado</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Parcele seu novo smartphone em até 18x no cartão de crédito. Trabalhamos com as menores taxas do mercado para Silvânia-GO.
              </p>
            </div>

            {/* Diff 2 */}
            <div className="relative rounded-2xl bg-white p-8 border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <ShieldCheck className="h-6 w-6 stroke-[2.2]" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-3">Seminovos 100% Testados</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Nossos seminovos passam por análise em mais de 30 pontos. Garantia de procedência, bateria excelente e funcionamento impecável.
              </p>
            </div>

            {/* Diff 3 */}
            <div className="relative rounded-2xl bg-white p-8 border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <Headphones className="h-6 w-6 stroke-[2.2]" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-3">Acessórios Premium</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Trabalhamos com as melhores marcas de películas 3D, cases protetoras e carregadores homologados com garantia exclusiva.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VITRINE / PRODUCTS */}
      <section id="vitrine" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Estoque Atualizado</span>
              <h2 className="font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Vitrine de Destaques
              </h2>
              <p className="text-slate-500 text-base max-w-xl">
                Filtre por categoria e clique no aparelho para garantir as melhores condições de pagamento.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl self-start md:self-end">
              {(['Todos', 'Novos', 'Seminovos', 'Acessórios'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                    selectedCategory === cat
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/10'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {cat === 'Todos' ? '🔥 Todos' : cat === 'Novos' ? '📱 Novos' : cat === 'Seminovos' ? '✨ Seminovos' : '🎧 Acessórios'}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Image Showcase Container */}
                <div className="relative aspect-square bg-slate-50 p-6 flex items-center justify-center overflow-hidden">
                  <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg ${
                    product.condition === 'Novo Lacrado' || product.condition === 'Lançamento'
                      ? 'bg-slate-900 text-white'
                      : 'bg-orange-50 text-orange-600'
                  }`}>
                    {product.condition}
                  </span>
                  
                  {product.batteryHealth && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded-lg flex items-center gap-1">
                      🔋 {product.batteryHealth}
                    </span>
                  )}

                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="h-44 w-44 object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info Container */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{product.category}</span>
                    <button
                      onClick={() => toggleCompareProduct(product)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
                        compareList.some(p => p.id === product.id)
                          ? 'bg-orange-500 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <GitCompare className="h-3 w-3" />
                      {compareList.some(p => p.id === product.id) ? 'Selecionado' : 'Comparar'}
                    </button>
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2 h-8">{product.description}</p>
                  
                  {/* Prices */}
                  <div className="mt-auto pt-4 border-t border-slate-50">
                    <span className="block text-xs font-bold text-orange-500 uppercase tracking-widest mb-0.5">Sem juros</span>
                    <span className="block font-display text-xl font-extrabold text-slate-900">{product.installments}</span>
                    <span className="block text-xs text-slate-400 mt-1">
                      ou R$ {product.priceCash.toLocaleString('pt-BR')} à vista
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    <a
                      href={getWhatsappLink(product.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="col-span-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-orange-500 py-3 text-xs font-bold text-white shadow-md shadow-orange-500/10 transition-colors hover:bg-orange-600"
                    >
                      <MessageSquare className="h-3.5 w-3.5 fill-white stroke-none" />
                      Tenho Interesse
                    </a>
                    <button
                      onClick={() => {
                        setSelectedProductForCalc(product);
                        scrollToSection('calculator');
                      }}
                      title="Simular Parcelas"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
                    >
                      <CreditCard className="h-4 w-4" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* INTERACTIVE INSTALLMENT CALCULATOR */}
      <section id="calculator" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract lights background */}
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"></div>
        <div className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-slate-800/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            
            {/* Calculator Left */}
            <div className="space-y-6 lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Transparência Total</span>
              <h2 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
                Simulador de Parcelas
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Descubra em tempo real como fica o valor das parcelas para o celular dos seus sonhos. Escolha o aparelho e a quantidade de meses no cartão de crédito de maneira totalmente simulada.
              </p>

              {/* Steps or highlights */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">Sem burocracia</h4>
                    <p className="text-xs text-slate-400">Passamos seu cartão direto na loja física ou geramos link online.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">Até 18 parcelas</h4>
                    <p className="text-xs text-slate-400">Divida em até 18 vezes com taxas de juros extremamente baixas.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculator Right UI Card */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-6 sm:p-8 backdrop-blur-xl">
                
                {/* 1. Select Product */}
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    1. Escolha o Celular
                  </label>
                  <div className="relative">
                    <select
                      value={selectedProductForCalc.id}
                      onChange={(e) => {
                        const found = PRODUCTS_DATA.find(p => p.id === e.target.value);
                        if (found) setSelectedProductForCalc(found);
                      }}
                      className="w-full appearance-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm font-bold text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                      {PRODUCTS_DATA.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.condition})</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* 2. Select Installment Count */}
                <div className="mb-8">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    2. Número de Parcelas: <span className="text-orange-500 font-extrabold">{installmentsCount}x</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[1, 3, 6, 10, 12, 18].map((months) => (
                      <button
                        key={months}
                        onClick={() => setInstallmentsCount(months)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          installmentsCount === months
                            ? 'bg-orange-500 text-white'
                            : 'bg-slate-900 border border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {months}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Output display */}
                <div className="rounded-2xl bg-slate-900/60 p-6 border border-white/5 mb-6">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Resultado da Simulação</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-white">{installmentsCount}x de</span>
                    <span className="text-3xl font-black text-orange-500">R$ {currentCalc.installmentValue}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-3">
                    <span>Preço à vista:</span>
                    <span className="font-bold text-white">R$ {selectedProductForCalc.priceCash.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
                    <span>Total parcelado:</span>
                    <span className="font-bold text-white">R$ {currentCalc.total}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={getWhatsappLink(`Olá! Fiz uma simulação na Cell Store Silvânia e gostaria de garantir o ${selectedProductForCalc.name} em ${installmentsCount}x de R$ ${currentCalc.installmentValue}. Como podemos fechar?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full h-14 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:bg-orange-600 active:scale-[0.98]"
                >
                  <MessageSquare className="h-4.5 w-4.5 fill-white stroke-none" />
                  Garantir essa condição via WhatsApp
                </a>
                
                <p className="text-center text-[10px] text-slate-500 mt-3 flex items-center justify-center gap-1">
                  <Info className="h-3 w-3" />
                  Valores estimados sujeitos à alteração na loja física.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Depoimentos reais</span>
            <h2 className="font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Quem compra na Cell Store aprova
            </h2>
            <p className="text-slate-500 text-base">
              A satisfação dos nossos clientes é o nosso maior prêmio. Veja o que dizem sobre nossa loja em Silvânia-GO.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-slate-600 text-sm italic leading-relaxed mb-6">
                    "{testimonial.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-extrabold text-sm uppercase">
                    {testimonial.name.substring(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{testimonial.name}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION & TRUST (MAP) */}
      <section id="location" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            
            {/* Left Texts */}
            <div className="space-y-6 lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Venha nos visitar</span>
              <h2 className="font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Onde estamos localizados
              </h2>
              <p className="text-slate-500 text-base leading-relaxed">
                Temos uma loja física completa, climatizada e cheia de novidades esperando por você bem no centro de Silvânia-GO.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-orange-50 p-2.5 text-orange-500 shrink-0">
                    <MapPin className="h-5 w-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Endereço</h4>
                    <p className="text-sm text-slate-500">Rua 24 de Outubro, 460 - Centro, Silvânia - GO, 75180-000</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-orange-50 p-2.5 text-orange-500 shrink-0">
                    <Clock className="h-5 w-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Horário de Funcionamento</h4>
                    <p className="text-sm text-slate-500">Segunda a Sexta: 08:00 às 18:00</p>
                    <p className="text-sm text-slate-500">Sábado: 08:00 às 13:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-orange-50 p-2.5 text-orange-500 shrink-0">
                    <Phone className="h-5 w-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Telefone / Fone Fácil</h4>
                    <p className="text-sm text-slate-500">(62) 99999-9999</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Rua+24+de+Outubro,+460,+Centro,+Silvânia+GO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-slate-900/10 transition-all hover:bg-slate-800 active:scale-[0.98]"
                >
                  <MapPin className="h-4.5 w-4.5 text-orange-500 fill-orange-500/10" />
                  Como Chegar pelo GPS
                </a>
              </div>
            </div>

            {/* Right Map Mockup */}
            <div className="lg:col-span-7">
              <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 shadow-lg aspect-[16/10]">
                {/* 3D Map Visual */}
                <img
                  src="/images/store_map_mockup_1783299730394.jpg"
                  alt="Cell Store Location Map"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
                
                {/* Overlay card */}
                <div className="absolute inset-0 bg-slate-950/20 flex flex-col items-center justify-center transition-all group-hover:bg-slate-950/10">
                  <a
                    href="https://maps.google.com/?q=Rua+24+de+Outubro,+460,+Centro,+Silvânia+GO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-xl transition-all hover:scale-105"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                    </span>
                    Ver no Google Maps
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Dúvidas Frequentes</span>
            <h2 className="font-display text-3xl font-black tracking-tight text-slate-900">
              Perguntas Frequentes (FAQ)
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Qual é o tempo de garantia oferecido nos aparelhos?",
                a: "Para celulares novos lacrados da Apple, você conta com a garantia mundial da Apple de 1 ano. Para aparelhos seminovos selecionados da nossa vitrine, oferecemos nossa garantia total da loja física de 3 meses contra qualquer defeito de funcionamento."
              },
              {
                q: "Como funciona a avaliação de seminovos?",
                a: "Cada seminovo que entra em nossa vitrine passa por um processo rigoroso com mais de 30 pontos inspecionados: saúde da bateria (nunca abaixo de 80%), estado das câmeras, microfone, conectores, sensores faciais, integridade do chassi e procedência documental total."
              },
              {
                q: "Quais as formas de parcelamento aceitas?",
                a: "Aceitamos todos os principais cartões de crédito em até 18 vezes, com simulações super fáceis e taxas transparentes. Também parcelamos via boleto bancário mediante aprovação de crédito ou no crediário próprio para clientes selecionados de Silvânia."
              },
              {
                q: "A loja faz troca de aparelhos antigos?",
                a: "Sim! Pegamos seu smartphone antigo (especialmente iPhones) como parte do pagamento na compra do seu aparelho novo ou seminovo. A avaliação é feita de forma justa e rápida diretamente em nossa loja física."
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-900 hover:text-orange-500 transition-colors"
                >
                  <span className="pr-4">{item.q}</span>
                  <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${faqOpen[index] ? 'rotate-180 text-orange-500' : ''}`} />
                </button>
                {faqOpen[index] && (
                  <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK FOOTER */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-24 sm:pb-16 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Column 1: Brand */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white shadow-md">
                  <Smartphone className="h-5 w-5 stroke-[2.5]" />
                </div>
                <span className="font-display text-lg font-extrabold tracking-tight text-white">
                  Cell<span className="text-orange-500">Store</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                Sua parceira ideal para tecnologia em Silvânia-GO. Conectando pessoas e entregando sonhos com excelência absoluta.
              </p>
              <div className="flex items-center gap-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a 
                  href={getWhatsappLink('Olá! Gostaria de falar com o suporte da Cell Store.')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Links */}
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-widest text-white mb-4">Aparelhos</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => { setSelectedCategory('Novos'); scrollToSection('vitrine'); }} className="hover:text-white transition-colors">Novos Lacrados</button></li>
                <li><button onClick={() => { setSelectedCategory('Seminovos'); scrollToSection('vitrine'); }} className="hover:text-white transition-colors">Seminovos Premium</button></li>
                <li><button onClick={() => { setSelectedCategory('Acessórios'); scrollToSection('vitrine'); }} className="hover:text-white transition-colors">Acessórios</button></li>
                <li><a href={getWhatsappLink('Olá! Gostaria de consultar modelos de iPhones sob encomenda.')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sob Encomenda</a></li>
              </ul>
            </div>

            {/* Column 3: Differentials */}
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-widest text-white mb-4">Garantias</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-orange-500" /> 1 Ano de Garantia Apple</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-orange-500" /> 3 Meses nos Seminovos</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-orange-500" /> Bateria Inspecionada</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-orange-500" /> Assistência Pós-Compra</li>
              </ul>
            </div>

            {/* Column 4: Contact info */}
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-widest text-white mb-4">Contato</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-2">
                Rua 24 de Outubro, 460 - Centro<br />
                Silvânia - GO, 75180-000
              </p>
              <p className="text-xs text-slate-300 font-bold">
                (62) 99999-9999
              </p>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 text-center text-[10px] text-slate-600">
            <p>© 2026 Cell Store Silvânia. Todos os direitos reservados. CNPJ: 00.000.000/0001-00.</p>
            <p className="mt-1">Desenvolvido com sofisticação de nível mundial.</p>
          </div>
        </div>
      </footer>

      {/* Comparison Warning Toast */}
      {compareWarning && (
        <div className="fixed top-20 right-4 left-4 sm:left-auto sm:w-96 z-50 bg-slate-900 border border-orange-500/30 text-white rounded-2xl p-4 shadow-xl flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2.5">
            <Info className="h-5 w-5 text-orange-500 shrink-0" />
            <p className="text-xs font-bold">{compareWarning}</p>
          </div>
          <button onClick={() => setCompareWarning(null)} className="text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Comparison Floating Dock */}
      {compareList.length > 0 && (
        <div className="fixed bottom-20 md:bottom-6 left-4 right-4 z-40 max-w-2xl mx-auto bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-slide-up text-white">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md">
              <GitCompare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold font-display">Comparação de Aparelhos</p>
              <p className="text-xs text-slate-400">
                {compareList.length === 1 
                  ? "Selecione mais um aparelho para comparar lado a lado." 
                  : "Pronto! Veja a tabela comparativa completa."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-2 mr-2">
              {compareList.map(p => (
                <div key={p.id} className="relative group bg-slate-800 rounded-lg p-1.5 flex items-center gap-2 border border-white/5">
                  <img src={p.image} alt={p.name} className="h-6 w-6 object-contain" />
                  <span className="text-[10px] font-bold max-w-[80px] truncate">{p.name}</span>
                  <button 
                    onClick={() => toggleCompareProduct(p)} 
                    className="text-slate-500 hover:text-red-400"
                    title="Remover"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>

            <button
              disabled={compareList.length < 2}
              onClick={() => setIsCompareModalOpen(true)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
                compareList.length === 2
                  ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20 active:scale-[0.98]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <GitCompare className="h-3.5 w-3.5" />
              Comparar Agora
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {isCompareModalOpen && compareList.length === 2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-orange-500 shadow-md">
                  <GitCompare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-extrabold text-slate-900">Comparativo Técnico</h3>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Lado a Lado • Cell Store Silvânia</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCompareModalOpen(false)}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-colors shadow-sm"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body / Table Scroll */}
            <div className="p-6 overflow-y-auto flex-grow space-y-6">
              
              {/* Product cards headers side-by-side */}
              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-100">
                {compareList.map(p => (
                  <div key={p.id} className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="h-28 flex items-center justify-center mb-3">
                      <img src={p.image} alt={p.name} className="h-24 w-24 object-contain" />
                    </div>
                    <span className="inline-block px-2.5 py-0.5 text-[9px] font-bold uppercase bg-slate-900 text-white rounded-md mb-2">{p.condition}</span>
                    <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base line-clamp-1">{p.name}</h4>
                    <p className="text-orange-500 font-extrabold text-sm mt-1">{p.installments}</p>
                    <p className="text-[11px] text-slate-400">ou R$ {p.priceCash.toLocaleString('pt-BR')} à vista</p>
                  </div>
                ))}
              </div>

              {/* Specifications rows */}
              <div className="space-y-4">
                
                {/* 1. Tela */}
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/60">
                  <span className="block text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Tela</span>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div className="border-r border-slate-100 pr-3">
                      <p className="text-xs text-slate-500 font-semibold">{compareList[0].specs?.screen || 'N/A'}</p>
                    </div>
                    <div className="pl-3">
                      <p className="text-xs text-slate-500 font-semibold">{compareList[1].specs?.screen || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* 2. Processador */}
                <div className="p-4 rounded-xl border border-slate-100/60">
                  <span className="block text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Processador</span>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div className="border-r border-slate-100 pr-3">
                      <p className="text-xs text-slate-500 font-semibold">{compareList[0].specs?.processor || 'N/A'}</p>
                    </div>
                    <div className="pl-3">
                      <p className="text-xs text-slate-500 font-semibold">{compareList[1].specs?.processor || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* 3. Câmeras */}
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/60">
                  <span className="block text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Câmeras</span>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div className="border-r border-slate-100 pr-3">
                      <p className="text-xs text-slate-500 font-semibold">{compareList[0].specs?.camera || 'N/A'}</p>
                    </div>
                    <div className="pl-3">
                      <p className="text-xs text-slate-500 font-semibold">{compareList[1].specs?.camera || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* 4. Bateria */}
                <div className="p-4 rounded-xl border border-slate-100/60">
                  <span className="block text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Bateria</span>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div className="border-r border-slate-100 pr-3">
                      <p className="text-xs text-slate-500 font-semibold">{compareList[0].specs?.battery || 'N/A'}</p>
                    </div>
                    <div className="pl-3">
                      <p className="text-xs text-slate-500 font-semibold">{compareList[1].specs?.battery || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* 5. Armazenamento */}
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/60">
                  <span className="block text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Armazenamento</span>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div className="border-r border-slate-100 pr-3">
                      <p className="text-xs text-slate-500 font-semibold">{compareList[0].specs?.storage || 'N/A'}</p>
                    </div>
                    <div className="pl-3">
                      <p className="text-xs text-slate-500 font-semibold">{compareList[1].specs?.storage || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* 6. Destaques / Recursos */}
                <div className="p-4 rounded-xl border border-slate-100/60">
                  <span className="block text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Recursos Premium</span>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div className="border-r border-slate-100 pr-3">
                      <p className="text-xs text-slate-500 font-semibold">{compareList[0].specs?.features || 'N/A'}</p>
                    </div>
                    <div className="pl-3">
                      <p className="text-xs text-slate-500 font-semibold">{compareList[1].specs?.features || 'N/A'}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer (CTAs side-by-side) */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 grid grid-cols-2 gap-4">
              <a
                href={getWhatsappLink(`Olá! Após comparar com o outro modelo, decidi pelo ${compareList[0].name} de R$ ${compareList[0].priceCash.toLocaleString('pt-BR')} à vista. Ainda está disponível?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-orange-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/10 hover:bg-orange-600 transition-colors"
              >
                <MessageSquare className="h-4 w-4 fill-white stroke-none" />
                Levar {compareList[0].name.split(' ')[0]}
              </a>
              
              <a
                href={getWhatsappLink(`Olá! Após comparar com o outro modelo, decidi pelo ${compareList[1].name} de R$ ${compareList[1].priceCash.toLocaleString('pt-BR')} à vista. Ainda está disponível?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-900 text-white font-bold text-xs sm:text-sm shadow-md hover:bg-slate-800 transition-colors"
              >
                <MessageSquare className="h-4 w-4 fill-white stroke-none" />
                Levar {compareList[1].name.split(' ')[0]}
              </a>
            </div>

          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-4 py-2 flex items-center justify-between shadow-[0_-8px_24px_rgba(15,23,42,0.06)]">
        <button 
          onClick={() => scrollToSection('home')}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all"
        >
          <Smartphone className={`h-5 w-5 ${activeTab === 'home' ? 'text-orange-500' : 'text-slate-400'}`} />
          <span className={`text-[9px] font-bold mt-1 tracking-wider uppercase ${activeTab === 'home' ? 'text-orange-500' : 'text-slate-400'}`}>
            Início
          </span>
        </button>

        <button 
          onClick={() => scrollToSection('vitrine')}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all"
        >
          <ShoppingBag className={`h-5 w-5 ${activeTab === 'vitrine' ? 'text-orange-500' : 'text-slate-400'}`} />
          <span className={`text-[9px] font-bold mt-1 tracking-wider uppercase ${activeTab === 'vitrine' ? 'text-orange-500' : 'text-slate-400'}`}>
            Vitrine
          </span>
        </button>

        <button 
          onClick={() => scrollToSection('location')}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all"
        >
          <MapPin className={`h-5 w-5 ${activeTab === 'location' ? 'text-orange-500' : 'text-slate-400'}`} />
          <span className={`text-[9px] font-bold mt-1 tracking-wider uppercase ${activeTab === 'location' ? 'text-orange-500' : 'text-slate-400'}`}>
            Onde Estamos
          </span>
        </button>

        <a 
          href={getWhatsappLink('Olá! Gostaria de receber o atendimento rápido da Cell Store Silvânia.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all text-orange-500"
        >
          <div className="relative">
            <MessageSquare className="h-5 w-5 fill-orange-500 stroke-none" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </div>
          <span className="text-[9px] font-bold mt-1 tracking-wider uppercase text-orange-500">
            WhatsApp
          </span>
        </a>
      </nav>

    </div>
  );
}


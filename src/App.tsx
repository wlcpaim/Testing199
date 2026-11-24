import React, { useState } from "react";
import { validateName, validatePhone, validateDate } from "./utils/validators";

interface Service {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  icon: string;
  badge?: string;
}

const SERVICES: Service[] = [
  {
    id: "1",
    name: "Corte Clássico & Fade",
    price: "R$ 55",
    duration: "45 min",
    description: "Corte tesoura ou máquina com visagismo, acabamento navalhado e lavagem relaxante.",
    icon: "✂️"
  },
  {
    id: "2",
    name: "Barba Terapia Ritual",
    price: "R$ 48",
    duration: "35 min",
    description: "Toalha quente com essência de eucalipto, óleos nobres, navalha afiada e massagem facial.",
    icon: "🪒"
  },
  {
    id: "3",
    name: "Combo Navalha Fina",
    price: "R$ 89",
    duration: "1h 15min",
    description: "O ritual completo: Corte de alta precisão + Barba terapia com produtos premium importados.",
    icon: "⭐",
    badge: "Mais Escolhido"
  },
  {
    id: "4",
    name: "Pigmentação & Camuflagem",
    price: "R$ 40",
    duration: "25 min",
    description: "Disfarce natural de fios brancos e falhas com pigmento profissional de longa fixação.",
    icon: "💈"
  }
];

const PERKS = [
  {
    icon: "☕",
    title: "Café & Chopp Artesanal",
    desc: "Bebidas geladas e café espresso especial de cortesia enquanto você aguarda ou relaxa."
  },
  {
    icon: "📐",
    title: "Visagismo Masculino",
    desc: "Alinhamento do corte ao formato do seu rosto e estilo de vida para máxima harmonia."
  },
  {
    icon: "🧖",
    title: "Toalha Quente & Ozônio",
    desc: "Abertura de poros e hidratação profunda da pele antes de cada navalhado."
  },
  {
    icon: "⏱️",
    title: "Pontualidade Rigorosa",
    desc: "Atendimento no horário exato, sem filas de espera, respeitando a sua rotina."
  }
];

const GALLERY = [
  {
    title: "Pompadour com Fade Low",
    category: "Corte Moderno",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "Barba Terapia Alinhada",
    category: "Barba & Ritual",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "Texturizado & Undercut",
    category: "Estilo Urbano",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=700&q=80"
  },
  {
    title: "Corte Executivo Clássico",
    category: "Estilo Clássico",
    image: "https://images.unsplash.com/photo-1517832606293-7ae2f72c392f?auto=format&fit=crop&w=700&q=80"
  }
];

const TESTIMONIALS = [
  {
    name: "Rodrigo Mendonça",
    role: "Empresário",
    text: "Ambiente impecável, atendimento de primeiro mundo. O combo com barba terapia é indispensável antes de reuniões importantes.",
    rating: 5
  },
  {
    name: "Lucas Silveira",
    role: "Arquiteto",
    text: "A pontualidade e o visagismo me conquistaram. Nunca mais corto cabelo em outro lugar. Nota 10!",
    rating: 5
  },
  {
    name: "Gabriel Mattos",
    role: "Engenheiro de Software",
    text: "Cerveja artesanal gelada, wifi rápido e os melhores barbeiros da cidade. Experiência que vale cada centavo.",
    rating: 5
  }
];

const FAQS = [
  {
    q: "Preciso agendar com antecedência?",
    a: "Recomendamos o agendamento prévio pelo site para garantir seu horário sem filas. Encaixes são realizados conforme disponibilidade."
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "Aceitamos PIX, cartões de crédito e débito das principais bandeiras e dinheiro em espécie."
  },
  {
    q: "A barbearia possui estacionamento?",
    a: "Sim, temos convênio com estacionamento rotativo em frente ao estabelecimento com 1 hora de cortesia para clientes."
  },
  {
    q: "Quanto tempo dura o atendimento completo?",
    a: "O corte tradicional dura cerca de 45 minutos. O combo completo (cabelo + barba terapia) tem duração de aproximadamente 1h15."
  }
];

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(SERVICES[2].name);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("10:00");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!validateName(clientName)) {
      setFormError("Por favor, insira um nome válido com pelo menos 3 caracteres.");
      return;
    }
    if (!validatePhone(clientPhone)) {
      setFormError("Por favor, insira um telefone celular com DDD (ex: 11999999999).");
      return;
    }
    if (!appointmentDate || !validateDate(appointmentDate)) {
      setFormError("Selecione uma data válida a partir de hoje.");
      return;
    }

    setFormSuccess(true);
  };

  const selectServiceAndScroll = (serviceName: string) => {
    setSelectedService(serviceName);
    const element = document.getElementById("agendar");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0E] text-[#F5F5F5] flex flex-col font-sans selection:bg-gold selection:text-black">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#0D0D0E]/85 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-amber-500/10 border border-gold/40 flex items-center justify-center text-gold text-xl shadow-lg shadow-gold/10">
              ✂️
            </div>
            <div>
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-gold to-yellow-100">
                Navalha Fina
              </span>
              <span className="hidden sm:block text-[10px] tracking-widest uppercase text-text-muted font-medium -mt-1">
                Barbershop Premium
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-text-muted">
            <a href="#diferenciais" className="hover:text-gold transition-colors">Diferenciais</a>
            <a href="#servicos" className="hover:text-gold transition-colors">Serviços</a>
            <a href="#galeria" className="hover:text-gold transition-colors">Galeria</a>
            <a href="#avaliacoes" className="hover:text-gold transition-colors">Avaliações</a>
            <a href="#faq" className="hover:text-gold transition-colors">Dúvidas</a>
            <a
              href="#agendar"
              className="bg-gradient-to-r from-gold via-amber-400 to-yellow-500 text-black font-semibold px-6 py-2.5 rounded-full hover:brightness-110 transition-all shadow-lg shadow-gold/20 flex items-center space-x-2 text-sm"
            >
              <span>Agendar Agora</span>
              <span>→</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-text-light hover:bg-white/10 focus:outline-none min-h-touch flex items-center justify-center"
            aria-label="Menu de navegação"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#141417] border-b border-white/10 px-6 py-6 space-y-4 animate-fadeIn">
            <a
              href="#diferenciais"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-text-light hover:text-gold py-1"
            >
              Diferenciais
            </a>
            <a
              href="#servicos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-text-light hover:text-gold py-1"
            >
              Serviços
            </a>
            <a
              href="#galeria"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-text-light hover:text-gold py-1"
            >
              Galeria de Cortes
            </a>
            <a
              href="#avaliacoes"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-text-light hover:text-gold py-1"
            >
              Depoimentos
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-text-light hover:text-gold py-1"
            >
              Dúvidas Frequentes
            </a>
            <div className="pt-3">
              <a
                href="#agendar"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center bg-gradient-to-r from-gold to-amber-500 text-black font-semibold py-3.5 rounded-xl shadow-lg shadow-gold/20"
              >
                Agendar Meu Horário
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden border-b border-white/5">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gold/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-7">
            {/* Live Status Pill */}
            <div className="inline-flex items-center space-x-2.5 bg-white/5 border border-white/10 backdrop-blur-lg px-4 py-1.5 rounded-full text-xs font-medium text-text-light">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Horários abertos para esta semana • Agendamento online instantâneo</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight leading-[1.1]">
              Estilo Clássico,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-gold to-yellow-100">
                Precisão Absoluta
              </span>
            </h1>

            <p className="text-text-muted text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              Cortes sob medida, terapia da barba com toalha quente e uma experiência única de bem-estar masculino com chopp artesanal e atendimento exclusivo.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <a
                href="#agendar"
                className="w-full sm:w-auto bg-gradient-to-r from-gold via-amber-400 to-yellow-500 text-black font-bold px-8 py-4 rounded-xl hover:brightness-110 transition-all shadow-xl shadow-gold/25 flex items-center justify-center space-x-2"
              >
                <span>Agendar Horário Online</span>
                <span className="text-lg">→</span>
              </a>
              <a
                href="#servicos"
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-text-light font-medium px-8 py-4 rounded-xl transition-all border border-white/10 flex items-center justify-center"
              >
                Ver Tabela de Serviços
              </a>
            </div>

            {/* Social Proof Stats */}
            <div className="pt-12 mt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-gold">
                  10+
                </p>
                <p className="text-xs sm:text-sm text-text-muted">Anos de Tradição</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-gold">
                  15k+
                </p>
                <p className="text-xs sm:text-sm text-text-muted">Clientes Atendidos</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-gold">
                  4.9★
                </p>
                <p className="text-xs sm:text-sm text-text-muted">Avaliação Média</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS SECTION */}
      <section id="diferenciais" className="py-20 bg-[#121215] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-gold text-xs font-semibold uppercase tracking-wider bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/30 inline-block mb-3">
              A Experiência Navalha Fina
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-light">
              Por que somos a barbearia mais recomendada
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map((perk, idx) => (
              <div
                key={idx}
                className="bg-[#18181D]/80 border border-white/5 rounded-2xl p-6 hover:border-gold/30 hover:bg-[#1E1E24] transition-all group shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {perk.icon}
                </div>
                <h3 className="text-lg font-bold text-text-light mb-2 font-heading">{perk.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="servicos" className="py-24 bg-[#0D0D0E] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold text-xs font-semibold uppercase tracking-wider bg-gold/10 px-3 py-1 rounded-full border border-gold/30 inline-block mb-3">
              Menu Exclusivo
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-text-light">
              Nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-gold">Serviços</span>
            </h2>
            <p className="text-text-muted mt-3 text-base">
              Combinamos técnicas clássicas de navalha com acabamentos contemporâneos de alta performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className={`relative rounded-2xl p-7 border transition-all flex flex-col justify-between group shadow-xl ${
                  srv.badge
                    ? "bg-gradient-to-b from-[#1C1C24] to-[#14141A] border-gold/40 ring-1 ring-gold/20"
                    : "bg-[#15151A]/80 border-white/10 hover:border-gold/30"
                }`}
              >
                {srv.badge && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-gold to-amber-500 text-black text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                    {srv.badge}
                  </div>
                )}
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                    {srv.icon}
                  </div>
                  <h3 className="text-xl font-bold text-text-light font-heading mb-2">{srv.name}</h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-6">{srv.description}</p>
                </div>

                <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-text-muted block">Duração: {srv.duration}</span>
                    <span className="text-2xl font-bold text-gold font-heading">{srv.price}</span>
                  </div>
                  <button
                    onClick={() => selectServiceAndScroll(srv.name)}
                    className="bg-white/10 hover:bg-gold hover:text-black text-text-light text-xs font-semibold px-4 py-2.5 rounded-lg transition-all border border-white/10 hover:border-gold cursor-pointer"
                  >
                    Escolher
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="galeria" className="py-24 bg-[#121215] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold text-xs font-semibold uppercase tracking-wider bg-gold/10 px-3 py-1 rounded-full border border-gold/30 inline-block mb-3">
              Portfólio Real
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-light">
              Galeria de <span className="text-gold">Cortes & Barbas</span>
            </h2>
            <p className="text-text-muted mt-3">
              Inspire-se em trabalhos executados por nossos especialistas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLERY.map((item, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl aspect-[4/5] border border-white/10 bg-[#1A1A1F]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <span className="text-gold text-[11px] font-semibold uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h4 className="text-base font-bold text-text-light font-heading mt-1">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="avaliacoes" className="py-24 bg-[#0D0D0E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold text-xs font-semibold uppercase tracking-wider bg-gold/10 px-3 py-1 rounded-full border border-gold/30 inline-block mb-3">
              Opinião de Quem Frequenta
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-light">
              Avaliações 5 Estrelas
            </h2>
            <p className="text-text-muted mt-3">
              Veja o que nossos clientes dizem sobre o ambiente e o resultado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-[#16161B] border border-white/10 rounded-2xl p-7 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex text-gold text-sm mb-4">
                    {"★".repeat(t.rating)}
                  </div>
                  <p className="text-text-light/90 text-sm italic leading-relaxed mb-6">
                    "{t.text}"
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-light">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section id="agendar" className="py-24 bg-[#121215] border-t border-white/5 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-[#18181F] to-[#121216] rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-gold text-xs font-semibold uppercase tracking-wider bg-gold/10 px-3 py-1 rounded-full border border-gold/30 inline-block mb-3">
                Agendamento Simplificado
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-light">
                Garanta Seu <span className="text-gold">Horário</span>
              </h2>
              <p className="text-text-muted mt-2 text-sm sm:text-base">
                Escolha o serviço, selecione a data e confirme seu atendimento em menos de 1 minuto.
              </p>
            </div>

            {formSuccess ? (
              <div className="bg-gradient-to-b from-gold/15 to-gold/5 border border-gold/50 rounded-2xl p-8 sm:p-10 text-center space-y-5 animate-fadeIn">
                <div className="w-16 h-16 bg-gradient-to-tr from-gold to-yellow-300 text-black rounded-full flex items-center justify-center text-3xl mx-auto font-bold shadow-lg shadow-gold/20">
                  ✓
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-gold">
                  Horário Reservado com Sucesso!
                </h3>
                <p className="text-text-light/90 max-w-md mx-auto leading-relaxed text-sm sm:text-base">
                  Obrigado, <strong className="text-gold">{clientName}</strong>! Seu atendimento para{" "}
                  <strong className="text-white">{selectedService}</strong> foi agendado para o dia{" "}
                  <strong className="text-white">{appointmentDate}</strong> às{" "}
                  <strong className="text-white">{appointmentTime}</strong>.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                      `Olá! Acabei de agendar na Navalha Fina: ${selectedService} no dia ${appointmentDate} às ${appointmentTime}. Nome: ${clientName}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto bg-[#25D366] text-white font-bold px-7 py-3.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>Confirmar via WhatsApp</span>
                    <span>💬</span>
                  </a>
                  <button
                    onClick={() => {
                      setFormSuccess(false);
                      setClientName("");
                      setClientPhone("");
                      setAppointmentDate("");
                    }}
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-text-light font-medium px-6 py-3.5 rounded-xl transition-all cursor-pointer"
                  >
                    Fazer Novo Agendamento
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-6 relative z-10">
                {formError && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-300 p-4 rounded-xl text-sm flex items-center space-x-2">
                    <span>⚠️</span>
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                      Seu Nome Completo
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ex: Carlos Eduardo Silva"
                      className="w-full bg-[#101014] border border-white/10 rounded-xl px-4 py-3.5 text-text-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                      WhatsApp / Celular com DDD
                    </label>
                    <input
                      type="text"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="Ex: 11999999999"
                      className="w-full bg-[#101014] border border-white/10 rounded-xl px-4 py-3.5 text-text-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                      Serviço Desejado
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-[#101014] border border-white/10 rounded-xl px-4 py-3.5 text-text-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-sm"
                    >
                      {SERVICES.map((srv) => (
                        <option key={srv.id} value={srv.name} className="bg-[#16161B] text-white">
                          {srv.name} — {srv.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                      Data do Atendimento
                    </label>
                    <input
                      type="date"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full bg-[#101014] border border-white/10 rounded-xl px-4 py-3.5 text-text-light focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2.5">
                    Selecione o Horário Disponível
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setAppointmentTime(slot)}
                        className={`py-2.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                          appointmentTime === slot
                            ? "bg-gradient-to-r from-gold to-amber-500 text-black border-gold shadow-md shadow-gold/20"
                            : "bg-white/5 border-white/10 text-text-muted hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto min-w-[260px] bg-gradient-to-r from-gold via-amber-400 to-yellow-500 text-black font-bold px-10 py-4 rounded-xl hover:brightness-110 transition-all shadow-xl shadow-gold/25 text-base cursor-pointer"
                  >
                    Confirmar Agendamento Agora
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 bg-[#0D0D0E]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold text-xs font-semibold uppercase tracking-wider bg-gold/10 px-3 py-1 rounded-full border border-gold/30 inline-block mb-3">
              Tira-Dúvidas
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-light">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#15151B] border border-white/10 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between font-heading font-semibold text-text-light hover:text-gold transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-gold font-bold text-xl ml-4">
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-text-muted text-sm leading-relaxed border-t border-white/5 pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT & LOCATION */}
      <section className="py-24 bg-[#121215] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-gold text-xs font-semibold uppercase tracking-wider bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/30">
                Tradição & Conforto
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-light">
                Um refúgio clássico no coração da cidade
              </h2>
              <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                Fundada em 2014, a Navalha Fina nasceu da paixão pela alfaiataria do visual masculino. Criamos um ambiente que reúne o melhor da barbearia tradicional — toalha quente, navalha e conversa de alto nível — com o requinte moderno que o homem contemporâneo valoriza.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-[#18181F] p-5 rounded-2xl border border-white/10">
                  <p className="text-gold font-bold font-heading text-lg">Segunda a Sábado</p>
                  <p className="text-text-muted text-xs sm:text-sm mt-1">09:00 às 20:00 (sem fechar ao meio-dia)</p>
                </div>
                <div className="bg-[#18181F] p-5 rounded-2xl border border-white/10">
                  <p className="text-gold font-bold font-heading text-lg">Localização Nobre</p>
                  <p className="text-text-muted text-xs sm:text-sm mt-1">Av. Central, 1200 - Centro (com manobrista)</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-white/10 h-80 lg:h-[420px] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=80"
                alt="Interior Navalha Fina"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0C] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-lg">
              ✂️
            </div>
            <span className="font-heading text-lg font-bold text-gold tracking-wide">
              Navalha Fina Barbearia
            </span>
          </div>
          <p className="text-text-muted text-xs sm:text-sm">
            © {new Date().getFullYear()} Navalha Fina Barbearia. Todos os direitos reservados.
          </p>
          <div className="flex space-x-3">
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-gold hover:border-gold transition-all text-xs font-semibold"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-gold hover:border-gold transition-all text-xs font-semibold"
              aria-label="WhatsApp"
            >
              WA
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
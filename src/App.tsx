import React, { useState } from "react";
import { validateName, validatePhone, validateDate } from "./utils/validators";

interface Service {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  icon: string;
}

const SERVICES: Service[] = [
  {
    id: "1",
    name: "Corte Clássico & Fade",
    price: "R$ 50",
    duration: "45 min",
    description: "Corte tesoura ou máquina com acabamento impecável e lavagem relaxante.",
    icon: "✂️"
  },
  {
    id: "2",
    name: "Barba Terapia",
    price: "R$ 45",
    duration: "30 min",
    description: "Toalha quente, óleos essenciais, navalha afiada e massagem facial.",
    icon: "🪒"
  },
  {
    id: "3",
    name: "Combo Navalha Fina",
    price: "R$ 85",
    duration: "1h 15min",
    description: "O ritual completo: Corte de cabelo + Barba terapia com produtos premium.",
    icon: "⭐"
  },
  {
    id: "4",
    name: "Pigmentação & Acabamento",
    price: "R$ 35",
    duration: "25 min",
    description: "Disfarce perfeito em brancos ou falhas com pigmento profissional.",
    icon: "💈"
  }
];

const GALLERY = [
  {
    title: "Pompadour Moderno",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Barba Lenhador Alinhada",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Fade Low com Navalha",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Corte Executivo",
    image: "https://images.unsplash.com/photo-1517832606293-7ae2f72c392f?auto=format&fit=crop&w=600&q=80"
  }
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

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!validateName(clientName)) {
      setFormError("Por favor, insira um nome válido (mínimo 3 caracteres).");
      return;
    }
    if (!validatePhone(clientPhone)) {
      setFormError("Por favor, insira um telefone celular válido (ex: 11999999999).");
      return;
    }
    if (!appointmentDate || !validateDate(appointmentDate)) {
      setFormError("Selecione uma data válida a partir de hoje.");
      return;
    }

    setFormSuccess(true);
  };

  return (
    <div className="min-h-screen bg-dark text-text-light flex flex-col">
      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 bg-dark/95 backdrop-blur border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-gold text-xl">
              ✂️
            </div>
            <span className="font-heading text-xl sm:text-2xl font-bold text-gold tracking-wide">
              Navalha Fina
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#servicos" className="hover:text-gold transition-colors">Serviços</a>
            <a href="#galeria" className="hover:text-gold transition-colors">Galeria</a>
            <a href="#sobre" className="hover:text-gold transition-colors">A Barbearia</a>
            <a href="#contato" className="hover:text-gold transition-colors">Contato</a>
            <a
              href="#agendar"
              className="bg-gold text-dark font-semibold px-5 py-2.5 rounded-lg hover:bg-gold-light transition-all shadow-lg shadow-gold/10"
            >
              Agendar Horário
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-text-light hover:bg-dark-card focus:outline-none min-h-touch flex items-center justify-center"
            aria-label="Menu"
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
          <div className="md:hidden bg-dark-card border-b border-dark-border px-6 py-6 space-y-4 animate-fadeIn">
            <a
              href="#servicos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-medium hover:text-gold"
            >
              Serviços
            </a>
            <a
              href="#galeria"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-medium hover:text-gold"
            >
              Galeria
            </a>
            <a
              href="#sobre"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-medium hover:text-gold"
            >
              A Barbearia
            </a>
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-medium hover:text-gold"
            >
              Contato
            </a>
            <div className="pt-2">
              <a
                href="#agendar"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center bg-gold text-dark font-semibold py-3 rounded-lg hover:bg-gold-light"
              >
                Agendar Horário
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-dark-card py-20 lg:py-32 overflow-hidden border-b border-dark-border">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-gold/10 border border-gold/30 px-4 py-1.5 rounded-full text-gold text-xs sm:text-sm font-medium">
              <span>✨ Tradição e Excelência em Cada Corte</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold text-text-light tracking-tight">
              Estilo Clássico, <span className="text-gold">Precisão Moderna</span>
            </h1>
            <p className="text-text-muted text-base sm:text-xl max-w-2xl mx-auto">
              Ambiente sofisticado, cerveja gelada, profissionais de elite e o melhor atendimento para o seu visual.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#agendar"
                className="w-full sm:w-auto bg-gold text-dark font-bold px-8 py-4 rounded-xl hover:bg-gold-light transition-all shadow-xl shadow-gold/20 flex items-center justify-center space-x-2"
              >
                <span>Agende Seu Horário</span>
                <span>→</span>
              </a>
              <a
                href="#servicos"
                className="w-full sm:w-auto bg-dark-border text-text-light font-medium px-8 py-4 rounded-xl hover:bg-dark-border/80 transition-all border border-dark-border flex items-center justify-center"
              >
                Ver Tabela de Preços
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-12 border-t border-dark-border/60 mt-12 max-w-xl mx-auto text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gold">10+</p>
                <p className="text-xs sm:text-sm text-text-muted mt-1">Anos de Tradição</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gold">5.0k</p>
                <p className="text-xs sm:text-sm text-text-muted mt-1">Clientes Fiéis</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gold">4.9</p>
                <p className="text-xs sm:text-sm text-text-muted mt-1">Avaliação Média</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="servicos" className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-light">
              Nossos <span className="text-gold">Serviços</span>
            </h2>
            <p className="text-text-muted mt-3">
              Trabalhamos com as melhores técnicas e produtos do mercado para garantir o resultado que você merece.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="bg-dark-card rounded-2xl p-6 border border-dark-border hover:border-gold transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    {srv.icon}
                  </div>
                  <h3 className="text-xl font-bold text-text-light font-heading mb-2">{srv.name}</h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-6">{srv.description}</p>
                </div>
                <div className="pt-4 border-t border-dark-border flex items-center justify-between">
                  <div>
                    <span className="text-xs text-text-muted block">Duração: {srv.duration}</span>
                    <span className="text-2xl font-bold text-gold font-heading">{srv.price}</span>
                  </div>
                  <a
                    href="#agendar"
                    onClick={() => setSelectedService(srv.name)}
                    className="bg-dark-border hover:bg-gold hover:text-dark text-text-light text-xs font-semibold px-3.5 py-2 rounded-lg transition-all"
                  >
                    Escolher
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="galeria" className="py-20 bg-dark-card border-t border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-light">
              Galeria de <span className="text-gold">Trabalhos</span>
            </h2>
            <p className="text-text-muted mt-3">
              Confira alguns dos cortes e barbas executados por nossa equipe de barbeiros master.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLERY.map((item, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl aspect-square border border-dark-border">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <span className="text-gold text-xs font-semibold uppercase tracking-wider">Navalha Fina</span>
                    <h4 className="text-lg font-bold text-text-light font-heading">{item.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section id="agendar" className="py-20 bg-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-card rounded-3xl border border-dark-border p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-3xl font-heading font-bold text-text-light">
                Agende seu <span className="text-gold">Horário</span>
              </h2>
              <p className="text-text-muted mt-2 text-sm sm:text-base">
                Preencha seus dados abaixo para garantir o seu atendimento sem filas.
              </p>
            </div>

            {formSuccess ? (
              <div className="bg-gold/10 border border-gold rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-gold text-dark rounded-full flex items-center justify-center text-3xl mx-auto font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold font-heading text-gold">Agendamento Confirmado!</h3>
                <p className="text-text-muted max-w-md mx-auto">
                  Obrigado, <strong className="text-text-light">{clientName}</strong>! Seu horário para <strong className="text-text-light">{selectedService}</strong> no dia <strong className="text-text-light">{appointmentDate}</strong> às <strong className="text-text-light">{appointmentTime}</strong> foi pré-agendado com sucesso. Entraremos em contato via WhatsApp.
                </p>
                <button
                  onClick={() => {
                    setFormSuccess(false);
                    setClientName("");
                    setClientPhone("");
                    setAppointmentDate("");
                  }}
                  className="mt-4 inline-block bg-gold text-dark font-semibold px-6 py-3 rounded-xl hover:bg-gold-light transition-all"
                >
                  Fazer Novo Agendamento
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-6">
                {formError && (
                  <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-xl text-sm">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-light mb-2">Seu Nome Completo</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ex: Carlos Silva"
                      className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-text-light focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-light mb-2">WhatsApp / Celular</label>
                    <input
                      type="text"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="Ex: 11999999999"
                      className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-text-light focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-light mb-2">Serviço Desejado</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-text-light focus:outline-none focus:border-gold transition-colors"
                    >
                      {SERVICES.map((srv) => (
                        <option key={srv.id} value={srv.name}>
                          {srv.name} ({srv.price})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-light mb-2">Data do Atendimento</label>
                    <input
                      type="date"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-text-light focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-light mb-2">Horário</label>
                    <select
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      className="w-full bg-dark border border-dark-border rounded-xl px-4 py-3 text-text-light focus:outline-none focus:border-gold transition-colors"
                    >
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                      <option value="19:00">19:00</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-gold text-dark font-bold px-10 py-4 rounded-xl hover:bg-gold-light transition-all shadow-xl shadow-gold/20"
                  >
                    Confirmar Agendamento
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT & CONTACT SECTION */}
      <section id="sobre" className="py-20 bg-dark-card border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-gold text-xs font-semibold uppercase tracking-wider bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                Nossa História
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-light">
                Tradição que se renova a cada corte
              </h2>
              <p className="text-text-muted leading-relaxed">
                Fundada em 2014, a Navalha Fina nasceu da paixão pela barbearia clássica e do desejo de proporcionar um espaço onde os homens possam cuidar da aparência, relaxar e trocar ideias. Contamos com profissionais altamente qualificados e um ambiente rústico com toque moderno.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-dark p-4 rounded-xl border border-dark-border">
                  <p className="text-gold font-bold font-heading text-lg">Seg à Sáb</p>
                  <p className="text-text-muted text-sm mt-1">09:00 às 20:00</p>
                </div>
                <div className="bg-dark p-4 rounded-xl border border-dark-border">
                  <p className="text-gold font-bold font-heading text-lg">Localização</p>
                  <p className="text-text-muted text-sm mt-1">Rua da Estética, 123 - Centro</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-dark-border h-96 lg:h-[450px]">
              <img
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
                alt="Interior da Barbearia"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato" className="bg-dark border-t border-dark-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-gold text-xl">
              ✂️
            </div>
            <span className="font-heading text-xl font-bold text-gold tracking-wide">
              Navalha Fina Barbearia
            </span>
          </div>
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} Navalha Fina Barbearia. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-text-light hover:text-gold hover:border-gold transition-all">
              IG
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-text-light hover:text-gold hover:border-gold transition-all">
              FB
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-text-light hover:text-gold hover:border-gold transition-all">
              WA
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PORTFOLIO_PROJECTS, 
  TESTIMONIALS, 
  FAQ_ITEMS, 
  PortfolioProject 
} from './data';
import StyleShowcase from './components/StyleShowcase';
import Calculator from './components/Calculator';
import { 
  Globe, 
  Search, 
  Smartphone, 
  ShieldCheck, 
  Clock, 
  BadgeCheck, 
  Sparkles, 
  ChevronDown, 
  Star, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Zap, 
  Menu, 
  X,
  MessageCircle,
  HelpCircle,
  TrendingUp,
  UserCheck,
  Check,
  MessageSquareText
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState<string>('Alles');
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  
  // Callback quick contact form
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  const WERKWIJZE_STEPS = [
    {
      step: '01',
      title: 'Kennismaking & Offerte',
      tagline: 'Gratis en 100% vrijblijvend',
      description: 'We bespreken jouw wensen, branche en doelgroep telefonisch of via WhatsApp. Je ontvangt direct een transparante en vaste prijsopgave zodat je precies weet waar je aan toe bent. Geen verborgen kosten.',
      badge: 'Stap 1: Offerte',
      detail: 'Binnen 24 uur een helder voorstel in je mailbox.',
      metric: 'Binnen 24u',
      accent: 'Intake'
    },
    {
      step: '02',
      title: 'Content & Voorkeuren',
      tagline: 'Lever je logo, teksten en foto’s aan',
      description: 'Stuur ons je huisstijlvoorkeuren, logo, teksten en afbeeldingen. Heb je dit nog niet? Geen paniek! Onze specialisten voorzien je van handige tips en templates om snel en simpel tekst op papier te krijgen.',
      badge: 'Stap 2: Input',
      detail: 'Wij controleren al je bestanden op kwaliteit.',
      metric: 'Templates inbegrepen',
      accent: 'Huisstijl'
    },
    {
      step: '03',
      title: 'Ontwerp & Ontwikkeling',
      tagline: 'Razendsnel en SEO-geoptimaliseerd',
      description: 'We bouwen jouw unieke responsive website. Geen slome WordPress-rommel, maar supersnelle en schone broncode. We testen de laadsnelheid en optimaliseren de mobiele lay-out voor een maximale conversie.',
      badge: 'Stap 3: Bouw',
      detail: 'Volledig responsive en Google-vriendelijk.',
      metric: 'Binnen 10 dagen',
      accent: 'Realisatie'
    },
    {
      step: '04',
      title: 'Feedback, Oplevering & Live!',
      tagline: 'Gefeliciteerd, je bent online!',
      description: 'Na jouw feedback en akkoord zetten we de website live op jouw eigen domeinnaam en richten we je e-mailadres in. Je krijgt bovendien een handige video-uitleg zodat je zelf makkelijk aanpassingen kunt doorvoeren.',
      badge: 'Stap 4: Livegang',
      detail: '100% jouw eigendom, geen wurgcontracten.',
      metric: 'Inclusief video-uitleg',
      accent: 'Live'
    }
  ];

  // Filter portfolio
  const filteredPortfolio = portfolioFilter === 'Alles'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(project => project.category.includes(portfolioFilter) || project.branch.includes(portfolioFilter));

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (callbackName.trim() && callbackPhone.trim()) {
      setCallbackSubmitted(true);
      setTimeout(() => {
        setCallbackName('');
        setCallbackPhone('');
      }, 5000);
    }
  };

  const toggleFaq = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-sand text-brand-charcoal selection:bg-brand-clay selection:text-white antialiased">
      
      {/* Top Banner */}
      <div className="bg-brand-forest text-white py-2 px-4 text-center text-xs font-semibold border-b border-brand-moss relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-1.5 sm:gap-4">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-clay animate-pulse" />
            Tijdelijke actie: Gratis SEO Basis t.w.v. €79,- bij elke nieuwe website!
          </span>
          <button 
            onClick={() => scrollToSection('cost-calculator')} 
            className="underline hover:text-brand-clay text-[11px] font-bold transition-colors"
          >
            Bereken je prijs &rsaquo;
          </button>
        </div>
      </div>      {/* Main Navigation Header */}
      <header className="sticky top-0 bg-brand-sand/95 backdrop-blur-md border-b border-brand-sand-dark z-40 transition-all">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand in Bento style */}
          <button 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
            id="nav-logo"
          >
            <div className="w-8 h-8 bg-brand-clay rounded-lg transition-transform group-hover:scale-105 shadow-md flex items-center justify-center text-white font-extrabold text-sm">
              O
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic text-brand-clay group-hover:text-orange-600 transition-colors">
              OERANG
            </span>
          </button>

          {/* Desktop Menu - styled clean, uppercase bento-style */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-[11px] font-bold uppercase tracking-widest text-brand-moss">
            <button onClick={() => scrollToSection('voordelen')} className="hover:text-brand-clay transition-colors cursor-pointer">Voordelen</button>
            <button onClick={() => scrollToSection('werkwijze')} className="hover:text-brand-clay transition-colors cursor-pointer text-brand-clay font-extrabold">Werkwijze</button>
            <button onClick={() => scrollToSection('stijlen')} className="hover:text-brand-clay transition-colors cursor-pointer">Stijlen</button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:text-brand-clay transition-colors cursor-pointer">Portfolio</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-brand-clay transition-colors cursor-pointer">FAQ</button>
            <button onClick={() => scrollToSection('cost-calculator')} className="hover:text-brand-clay transition-colors cursor-pointer">Kostprijs</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-brand-clay transition-colors cursor-pointer border-b border-dashed border-brand-clay/40 pb-0.5">Contact</button>
          </nav>

          {/* Desktop Call To Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="tel:0612345678" 
              className="flex items-center gap-1 text-[11px] font-bold text-brand-moss hover:text-brand-clay transition-colors mr-1"
            >
              <Phone className="w-3.5 h-3.5 text-brand-clay" />
              <span>06 - 1234 5678</span>
            </a>
            <button
              onClick={() => scrollToSection('cost-calculator')}
              className="px-4 py-2 border border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs"
              id="cta-calc-button"
            >
              Bereken Prijs
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2 bg-brand-clay hover:bg-orange-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              id="cta-contact-button"
            >
              <MessageSquareText className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-forest hover:text-brand-clay transition-colors focus:outline-none"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-brand-sand-dark overflow-hidden absolute w-full left-0 shadow-xl"
              id="mobile-nav-menu"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col">
                <button onClick={() => scrollToSection('voordelen')} className="text-left font-bold text-brand-forest py-2 border-b border-gray-100">Voordelen</button>
                <button onClick={() => scrollToSection('werkwijze')} className="text-left font-bold text-brand-clay py-2 border-b border-gray-100">Onze Werkwijze</button>
                <button onClick={() => scrollToSection('stijlen')} className="text-left font-bold text-brand-forest py-2 border-b border-gray-100">Kies een Stijl</button>
                <button onClick={() => scrollToSection('portfolio')} className="text-left font-bold text-brand-forest py-2 border-b border-gray-100">Portfolio</button>
                <button onClick={() => scrollToSection('faq')} className="text-left font-bold text-brand-forest py-2 border-b border-gray-100">Veelgestelde Vragen</button>
                <button onClick={() => scrollToSection('cost-calculator')} className="text-left font-bold text-brand-forest py-2 border-b border-gray-100">Kostprijs Berekenen</button>
                <button onClick={() => scrollToSection('contact')} className="text-left font-bold text-brand-clay py-2 border-b border-gray-100">Contact Opnemen</button>
                
                <div className="pt-4 flex flex-col gap-3">
                  <a 
                    href="tel:0612345678" 
                    className="flex items-center justify-center gap-2 py-3 bg-brand-sand border border-brand-sand-dark rounded-xl text-xs font-bold text-brand-forest"
                  >
                    <Phone className="w-4 h-4 text-brand-clay" />
                    <span>Bel direct: 06 - 1234 5678</span>
                  </a>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => scrollToSection('cost-calculator')}
                      className="py-3 bg-brand-sand border border-brand-forest text-brand-forest font-bold text-xs rounded-xl text-center hover:bg-gray-50 transition-colors"
                    >
                      Bereken Prijs
                    </button>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="py-3 bg-brand-clay text-white font-bold text-xs rounded-xl shadow-md text-center hover:bg-orange-600 transition-colors"
                    >
                      Neem Contact Op
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section styled as a gorgeous Bento Grid */}
      <section id="hero" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Main Hero Card (spans 2 cols on md/lg) */}
          <div className="md:col-span-2 lg:col-span-2 bg-brand-forest rounded-[24px] p-6 md:p-8 flex flex-col justify-between text-white relative overflow-hidden shadow-xl min-h-[320px]">
            <div className="z-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-[10px] font-bold tracking-wider text-brand-clay uppercase">
                <Sparkles className="w-3.5 h-3.5 text-brand-clay" />
                <span>Budget-proof &amp; Snel</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black leading-[0.95] tracking-tighter text-white uppercase italic">
                WEBSITES DIE VOOR JE <span className="text-brand-clay">WERKEN.</span>
              </h1>
              <p className="text-sm md:text-base text-gray-300 max-w-md leading-relaxed">
                Betaalbare, professionele websites voor ambitieuze kleine ondernemers en ZZP'ers. Binnen 14 dagen online en volledig geoptimaliseerd voor resultaat.
              </p>
            </div>
            
            <div className="flex gap-6 z-10 pt-6 border-t border-zinc-850">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white">50+</span>
                <span className="text-[9px] uppercase tracking-wider text-brand-moss font-bold">Projecten</span>
              </div>
              <div className="w-px h-8 bg-zinc-800"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-brand-clay">14 dgn</span>
                <span className="text-[9px] uppercase tracking-wider text-brand-moss font-bold">Oplevertijd</span>
              </div>
              <div className="w-px h-8 bg-zinc-800"></div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white">24u</span>
                <span className="text-[9px] uppercase tracking-wider text-brand-moss font-bold">Responstijd</span>
              </div>
            </div>
            {/* Decorative organic glow circle */}
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-brand-clay rounded-full blur-[90px] opacity-20 pointer-events-none"></div>
          </div>

          {/* Pricing Card (spans 1 col) */}
          <div className="bg-white rounded-[24px] p-6 border border-brand-sand-dark flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-clay bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                Budget-proof
              </span>
              <h2 className="text-4xl font-black font-display text-brand-forest mt-4 tracking-tight uppercase leading-none">
                Vanaf <br />
                <span className="text-brand-clay">€299,-</span>
              </h2>
            </div>
            <p className="text-xs text-brand-moss leading-relaxed mt-4 font-semibold">
              Alles-in-één budget pakket: uniek responsive design, betrouwbare hosting en wekelijkse backups.
            </p>
          </div>

          {/* Focus Card (spans 1 col) */}
          <div className="bg-brand-clay rounded-[24px] p-6 text-white flex flex-col justify-between shadow-xl relative overflow-hidden group hover:scale-[1.01] transition-transform">
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-wider opacity-85 font-sans">Focus</div>
              <div className="text-xl font-bold tracking-tight font-display uppercase italic leading-tight">
                CONVERSIE &amp; <br />SNELHEID
              </div>
            </div>
            <p className="text-xs text-white/90 leading-relaxed font-semibold">
              Geen trage laadsnelheid. Jouw website is geoptimaliseerd om bezoekers om te zetten in betalende klanten.
            </p>
            <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center self-end group-hover:translate-x-1 transition-transform">
              <Zap className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
          </div>

          {/* Portfolio/Testimonial Card (spans 2 cols) */}
          <div className="md:col-span-2 bg-white rounded-[24px] p-6 border border-brand-sand-dark flex flex-col sm:flex-row items-center gap-4 shadow-xs hover:shadow-md transition-all">
            <div className="w-20 h-20 bg-brand-sand rounded-2xl flex items-center justify-center text-xs font-black italic text-brand-moss shrink-0 select-none border border-brand-sand-dark">
              LOGO
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium leading-relaxed italic text-brand-charcoal">
                "Oerang begreep precies wat mijn salon nodig had. Binnen 10 dagen was ik online en had ik mijn eerste aanvraag binnen!"
              </p>
              <p className="text-xs font-bold text-brand-forest">
                — Anouk van Dam, <span className="text-brand-clay">Haarstudio Nova</span>
              </p>
            </div>
          </div>

          {/* Quick Features Bento Grid (spans 1 col) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-[24px] border border-brand-sand-dark flex flex-col items-center justify-center p-3 text-center hover:border-brand-clay/40 transition-colors">
               <div className="w-2 h-2 bg-green-500 rounded-full mb-1.5 animate-pulse"></div>
               <span className="text-[9px] font-extrabold uppercase tracking-tight text-brand-forest">Mobile Ready</span>
            </div>
            <div className="bg-white rounded-[24px] border border-brand-sand-dark flex flex-col items-center justify-center p-3 text-center hover:border-brand-clay/40 transition-colors">
               <span className="text-xs font-black text-brand-clay">SEO</span>
               <span className="text-[8px] text-brand-moss uppercase tracking-wider font-extrabold">Optimized</span>
            </div>
            <div className="bg-white rounded-[24px] border border-brand-sand-dark flex flex-col items-center justify-center p-3 text-center hover:border-brand-clay/40 transition-colors">
               <span className="text-xs font-black text-brand-forest">CMS</span>
               <span className="text-[8px] text-brand-moss uppercase tracking-wider font-extrabold">Beheer</span>
            </div>
            <div className="bg-white rounded-[24px] border border-brand-sand-dark flex flex-col items-center justify-center p-3 text-center hover:border-brand-clay/40 transition-colors">
               <span className="text-xs text-brand-clay">★</span>
               <span className="text-[8px] text-brand-moss uppercase tracking-wider font-extrabold">Support</span>
            </div>
          </div>

          {/* Final CTA Card (spans 1 col) */}
          <div 
            onClick={() => scrollToSection('cost-calculator')}
            className="bg-brand-forest rounded-[24px] p-6 text-white flex flex-col justify-center items-center text-center gap-3 shadow-xl cursor-pointer hover:bg-black transition-all group border border-brand-forest"
          >
            <div className="text-[9px] text-brand-moss uppercase tracking-widest font-black">Klaar om te starten?</div>
            <div className="text-xl font-bold leading-tight uppercase font-display underline decoration-brand-clay decoration-4 underline-offset-8 group-hover:text-brand-clay transition-colors">
              Plan een call
            </div>
          </div>

        </div>
      </section>

      {/* Bento Grid: Why Oerang? */}
      <section id="voordelen" className="py-10 bg-white border-y border-brand-sand-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-clay uppercase tracking-widest block">Ontdek onze werkwijze</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-forest tracking-tight">
              Alles wat je nodig hebt, zonder de onnodige kosten
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Veel webdesignbureaus rekenen duizenden euro’s voor functionaliteiten die je als kleine ondernemer helemaal niet direct nodig hebt. Oerang doet dit anders.
            </p>
          </div>

          {/* Grid cards styled perfectly as Bento Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <div className="bg-brand-sand p-6 rounded-[20px] border border-brand-sand-dark space-y-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-brand-forest text-white flex items-center justify-center shadow-xs">
                <Smartphone className="w-5 h-5 text-brand-clay" />
              </div>
              <h3 className="font-display font-bold text-base text-brand-forest">100% Responsive &amp; Mobiel</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Meer dan 65% van je bezoekers bekijkt je site op een smartphone. Onze websites zijn volledig geoptimaliseerd voor een perfecte mobiele ervaring.
              </p>
            </div>

            <div className="bg-brand-sand p-6 rounded-[20px] border border-brand-sand-dark space-y-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-brand-forest text-white flex items-center justify-center shadow-xs">
                <Search className="w-5 h-5 text-brand-clay" />
              </div>
              <h3 className="font-display font-bold text-base text-brand-forest">Direct vindbaar in Google (SEO)</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We bouwen de website volgens de nieuwste Google-standaarden. Supersnel geladen, schone code en direct aangemeld bij Google Search Console.
              </p>
            </div>

            <div className="bg-brand-sand p-6 rounded-[20px] border border-brand-sand-dark space-y-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-brand-forest text-white flex items-center justify-center shadow-xs">
                <Clock className="w-5 h-5 text-brand-clay" />
              </div>
              <h3 className="font-display font-bold text-base text-brand-forest">Binnen 14 dagen online</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Geen maandenlange overlegtrajecten. Zodra we jouw teksten en logo hebben, staat je professionele budget website binnen twee weken live op het internet.
              </p>
            </div>

            <div className="bg-brand-sand p-6 rounded-[20px] border border-brand-sand-dark space-y-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-brand-forest text-white flex items-center justify-center shadow-xs">
                <BadgeCheck className="w-5 h-5 text-brand-clay" />
              </div>
              <h3 className="font-display font-bold text-base text-brand-forest">Jouw eigen bezit</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Bij Oerang zit je niet vast aan wurgcontracten. De website is volledig jouw eigendom. Verhuis je na een jaar? Dan neem je de site gewoon mee.
              </p>
            </div>

            <div className="bg-brand-sand p-6 rounded-[20px] border border-brand-sand-dark space-y-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-brand-forest text-white flex items-center justify-center shadow-xs">
                <Globe className="w-5 h-5 text-brand-clay" />
              </div>
              <h3 className="font-display font-bold text-base text-brand-forest">Inclusief Domein &amp; Mail</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                In onze hosting is een professionele .nl-domeinnaam en een bijbehorend e-mailadres (bijv. info@jouwbedrijf.nl) altijd inbegrepen. Wel zo betrouwbaar!
              </p>
            </div>

            <div className="bg-brand-sand p-6 rounded-[20px] border border-brand-sand-dark space-y-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-brand-forest text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-5 h-5 text-brand-clay" />
              </div>
              <h3 className="font-display font-bold text-base text-brand-forest">Wekelijkse backups</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Onze servers maken elke week automatische backups van jouw website. Mocht er ooit per ongeluk iets misgaan, dan herstellen we dat kosteloos.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive step-by-step Werkwijze Section */}
      <section id="werkwijze" className="py-16 bg-brand-sand bg-grid-pattern border-b border-brand-sand-dark relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-clay/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-clay uppercase tracking-widest block">In 4 heldere stappen</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-forest tracking-tight">
              Hoe we jouw website snel &amp; professioneel live zetten
            </h2>
            <p className="text-sm text-gray-600">
              Bij Oerang weet je precies wat je kunt verwachten. Geen trage overlegtrajecten, maar een snelle, efficiënte route naar een topresultaat.
            </p>
          </div>

          {/* Interactive Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Interactive Vertical Step Buttons */}
            <div className="lg:col-span-5 space-y-3">
              {WERKWIJZE_STEPS.map((stepItem, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={stepItem.step}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border flex gap-4 items-start cursor-pointer ${
                      isActive
                        ? 'bg-white border-brand-clay shadow-md translate-x-1'
                        : 'bg-white/60 border-brand-sand-dark/80 hover:bg-white hover:border-gray-300 hover:shadow-xs'
                    }`}
                  >
                    {/* Big Step Number */}
                    <div className={`text-2xl font-black font-display italic leading-none shrink-0 ${
                      isActive ? 'text-brand-clay' : 'text-zinc-350'
                    }`}>
                      {stepItem.step}
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-sm sm:text-base text-brand-forest flex items-center gap-1.5">
                        {stepItem.title}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-clay animate-ping" />
                        )}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {stepItem.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Step Detail View (Design Blueprint Box) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[24px] border border-brand-sand-dark shadow-xl overflow-hidden flex flex-col justify-between min-h-[360px] p-6 sm:p-8 relative">
                
                {/* Mock Browser Header decorative */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-brand-sand/50 border-b border-brand-sand-dark/60 px-4 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-400">
                    oerang_werkwijze_stap_{WERKWIJZE_STEPS[activeStep].step}.ts
                  </span>
                  <div className="w-8 h-1 bg-gray-200 rounded" />
                </div>

                <div className="pt-6 space-y-5 z-10 flex-1">
                  
                  {/* Step Accent Badge */}
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-100 rounded-full text-[10px] font-bold text-brand-clay uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-brand-clay" />
                      {WERKWIJZE_STEPS[activeStep].badge}
                    </span>
                    <span className="text-[10px] font-mono text-brand-moss font-semibold uppercase bg-brand-sand px-2.5 py-1 rounded">
                      {WERKWIJZE_STEPS[activeStep].metric}
                    </span>
                  </div>

                  {/* Step content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-display font-black text-brand-forest leading-tight uppercase italic">
                      {WERKWIJZE_STEPS[activeStep].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {WERKWIJZE_STEPS[activeStep].description}
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="pt-4 border-t border-brand-sand-dark/60 space-y-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand-moss">Geleverd resultaat:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-brand-charcoal">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="font-medium text-gray-700">{WERKWIJZE_STEPS[activeStep].detail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="font-medium text-gray-700 font-sans">Persoonlijke ondersteuning</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer of card */}
                <div className="mt-8 pt-4 border-t border-brand-sand-dark/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-brand-clay/10 rounded-lg flex items-center justify-center text-brand-clay">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-brand-moss uppercase tracking-wider">
                      Fase: {WERKWIJZE_STEPS[activeStep].accent}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => scrollToSection('cost-calculator')}
                    className="px-5 py-2 bg-brand-forest hover:bg-brand-clay text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                  >
                    Direct Aanvragen &rsaquo;
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Style Showcase Section */}
      <section id="stijlen" className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <StyleShowcase />
      </section>

      {/* Interactive Portfolio Grid */}
      <section id="portfolio" className="py-10 bg-white border-y border-brand-sand-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-clay uppercase tracking-widest block">Gerealiseerd Werk</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-forest tracking-tight">
              Trotse ondernemers die al online zijn met Oerang
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Bekijk een greep uit onze opgeleverde projecten. Eerlijke, transparante prijzen en razendsnelle laadtijden voor elk type bedrijf.
            </p>
          </div>

          {/* Filter Bar tabs */}
          <div className="flex flex-wrap justify-center items-center gap-2 bg-brand-sand p-1 rounded-xl border border-brand-sand-dark max-w-md mx-auto">
            {['Alles', 'Horeca', 'Schoonheid', 'Bouw'].map((tab) => (
              <button
                key={tab}
                onClick={() => setPortfolioFilter(tab)}
                className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                  portfolioFilter === tab
                    ? 'bg-brand-forest text-white shadow-xs'
                    : 'text-brand-moss hover:text-brand-clay'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredPortfolio.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-brand-sand rounded-[20px] border border-brand-sand-dark p-6 flex flex-col justify-between group hover:shadow-xl transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-clay">
                          {project.branch}
                        </span>
                        <h3 className="font-display font-bold text-lg text-brand-forest group-hover:text-brand-clay transition-colors mt-0.5">
                          {project.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-brand-forest/10 text-brand-moss px-2.5 py-1 rounded-full font-bold">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Meta tags details */}
                    <div className="grid grid-cols-2 gap-4 py-3 border-t border-brand-sand-dark/60 font-mono text-[10px] text-gray-500">
                      <div>
                        <p className="font-bold text-brand-moss">Levertijd</p>
                        <p className="mt-0.5">{project.deliveryTime}</p>
                      </div>
                      <div>
                        <p className="font-bold text-brand-moss">Totale Investering</p>
                        <p className="mt-0.5 text-brand-charcoal font-bold">{project.price},-</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-brand-sand-dark/60 flex items-center justify-between">
                    <span className="text-[11px] text-brand-moss font-semibold flex items-center gap-1">
                      <BadgeCheck className="w-4 h-4 text-brand-clay" />
                      Live website operationeel
                    </span>
                    <button 
                      onClick={() => scrollToSection('cost-calculator')} 
                      className="text-xs font-bold text-brand-forest group-hover:text-brand-clay flex items-center gap-1 transition-colors"
                    >
                      <span>Prijs berekenen</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-10 bg-brand-sand-dark/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-clay uppercase tracking-widest block">Klanten over Oerang</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-forest tracking-tight">
              Wat andere ondernemers vertellen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((test) => (
              <div 
                key={test.id} 
                className="bg-white p-6 rounded-[20px] border border-brand-sand-dark flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Rating stars */}
                  <div className="flex text-amber-500 text-sm">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs text-gray-600 italic leading-relaxed">
                    "{test.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-brand-sand-dark/60">
                  {test.image ? (
                    <img 
                      src={test.image} 
                      alt={test.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border-2 border-brand-sand-dark shadow-xs shrink-0" 
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-brand-forest text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {test.initials}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-xs text-brand-forest flex items-center gap-1">
                      {test.name}
                      <span className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-green-100 text-green-700 text-[8px] font-bold" title="Geverifieerde klant">✓</span>
                    </h4>
                    <p className="text-[10px] text-gray-400 font-semibold">{test.role} • {test.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section id="cost-calculator" className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Calculator />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-10 bg-white border-y border-brand-sand-dark">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
          
          <div className="text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-brand-clay mx-auto" />
            <h2 className="text-2xl font-display font-bold text-brand-forest tracking-tight">
              Veelgestelde Vragen
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Heb je een vraag over de hosting, eigendom, of levertijd? Hier vind je direct antwoord. Staat je vraag er niet bij? Neem gerust even contact op!
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => {
              const isOpen = activeFaqId === item.id;
              return (
                <div 
                  key={item.id} 
                  className="border border-brand-sand-dark rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(item.id)}
                    className="w-full text-left px-5 py-4 bg-brand-sand/40 hover:bg-brand-sand/80 flex items-center justify-between gap-4 transition-colors focus:outline-none"
                  >
                    <span className="font-display font-bold text-sm text-brand-forest leading-snug">
                      {item.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-brand-moss shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 py-4 bg-white border-t border-brand-sand-dark text-xs text-gray-600 leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Advisory & Callback Request Footer block */}
      <section id="contact" className="py-10 bg-brand-forest text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-clay/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-6 space-y-4">
            <span className="text-xs font-bold text-brand-clay uppercase tracking-widest block">Gratis adviesgesprek</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-white leading-tight">
              Twijfel je nog? <br />
              Laat ons je terugbellen!
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed max-w-md">
              We nemen binnen een werkdag telefonisch contact met je op. We bespreken je wensen, beantwoorden je vragen en geven je direct gratis advies. Helemaal vrijblijvend!
            </p>

            <div className="space-y-2 pt-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-brand-clay" />
                <span>Geen verkoopdruk, gewoon een fijn gesprek</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-brand-clay" />
                <span>Binnen 5 minuten helderheid over de kosten</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 bg-brand-charcoal p-6 rounded-2xl border border-brand-moss shadow-xl">
            <AnimatePresence mode="wait">
              {!callbackSubmitted ? (
                <motion.form 
                  key="callback-form"
                  onSubmit={handleCallbackSubmit} 
                  className="space-y-4"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h4 className="font-display font-bold text-sm text-white mb-2">Vul je nummer in voor een terugbelverzoek</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <input 
                        type="text" 
                        required
                        placeholder="Jouw naam"
                        value={callbackName}
                        onChange={(e) => setCallbackName(e.target.value)}
                        className="w-full px-4 py-3 text-xs text-white placeholder-gray-500 bg-brand-forest/20 rounded-xl border border-brand-moss focus:outline-none focus:ring-1 focus:ring-brand-clay"
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        required
                        placeholder="Telefoonnummer (bijv. 0612345678)"
                        value={callbackPhone}
                        onChange={(e) => setCallbackPhone(e.target.value)}
                        className="w-full px-4 py-3 text-xs text-white placeholder-gray-500 bg-brand-forest/20 rounded-xl border border-brand-moss focus:outline-none focus:ring-1 focus:ring-brand-clay"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-clay text-white font-bold text-xs rounded-xl shadow-md hover:bg-amber-700 transition-all"
                  >
                    Bel Mij Terug
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="callback-success"
                  className="text-center py-6 space-y-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-3xl text-brand-clay">✓</div>
                  <h4 className="font-display font-bold text-sm text-white">Bedankt voor je aanvraag!</h4>
                  <p className="text-xs text-gray-400">
                    We bellen je zo snel mogelijk terug op het opgegeven nummer. Tot snel!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-charcoal text-gray-400 pt-10 pb-8 border-t border-brand-charcoal">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Oerang Col */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 rounded-lg bg-brand-clay flex items-center justify-center text-white font-display font-bold text-sm">
                  O
                </div>
                <span className="font-display font-bold text-lg tracking-tight text-brand-clay">
                  Oerang<span className="text-white">.</span>
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                Oerang bouwt professionele en betrouwbare websites voor kleine ondernemers, ZZP'ers, therapeuten, salons, bakkers, horeca en bouwbedrijven. Kwaliteit voor een eerlijke budget prijs.
              </p>
              <div className="flex gap-4 text-xs font-semibold text-white">
                <a href="mailto:info@oerang.nl" className="hover:text-brand-clay transition-colors flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-brand-clay" />
                  <span>info@oerang.nl</span>
                </a>
                <a href="tel:0612345678" className="hover:text-brand-clay transition-colors flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-brand-clay" />
                  <span>06 - 1234 5678</span>
                </a>
              </div>
            </div>

            {/* Links Col 1 */}
            <div className="md:col-span-3 space-y-4 text-xs">
              <h4 className="font-display font-bold text-white uppercase tracking-wider text-[11px]">Diensten</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('cost-calculator')} className="hover:text-brand-clay transition-colors text-left focus:outline-none">Budget Webdesign</button></li>
                <li><button onClick={() => scrollToSection('cost-calculator')} className="hover:text-brand-clay transition-colors text-left focus:outline-none">Online Reserveren</button></li>
                <li><button onClick={() => scrollToSection('cost-calculator')} className="hover:text-brand-clay transition-colors text-left focus:outline-none">E-commerce Mini-shop</button></li>
                <li><button onClick={() => scrollToSection('cost-calculator')} className="hover:text-brand-clay transition-colors text-left focus:outline-none">Hosting & Onderhoud</button></li>
              </ul>
            </div>

            {/* Links Col 2 */}
            <div className="md:col-span-4 space-y-4 text-xs">
              <h4 className="font-display font-bold text-white uppercase tracking-wider text-[11px]">Over Oerang</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Wij zijn gevestigd in Nederland en ondersteunen lokale ondernemers door het hele land. Geen ingewikkeld vakjargon, gewoon duidelijke taal en snelle oplevering.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-brand-clay shrink-0" />
                <span>Utrecht, Nederland • KvK: 12345678</span>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-brand-forest/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
            <p>&copy; {new Date().getFullYear()} Oerang Budget Websites. Alle rechten voorbehouden.</p>
            <div className="flex gap-6">
              <button className="hover:text-brand-clay transition-colors focus:outline-none">Privacybeleid</button>
              <button className="hover:text-brand-clay transition-colors focus:outline-none">Algemene Voorwaarden</button>
              <button className="hover:text-brand-clay transition-colors focus:outline-none">Disclaimer</button>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

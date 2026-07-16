/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PORTFOLIO_PROJECTS, 
  TESTIMONIALS, 
  PortfolioProject 
} from './data';
import StyleShowcase from './components/StyleShowcase';
import Calculator from './components/Calculator';
import { OrangutanIcon } from './components/OrangutanIcon';
import { 
  Globe, 
  Search, 
  Smartphone, 
  ShieldCheck, 
  Clock, 
  BadgeCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Star, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Zap, 
  Menu, 
  X,
  MessageCircle,
  TrendingUp,
  UserCheck,
  Check,
  MessageSquareText
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState<string>('Alles');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [heroReviewIdx, setHeroReviewIdx] = useState<number>(0);
  
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

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-sand text-brand-charcoal selection:bg-brand-clay selection:text-white antialiased">
      
      {/* Main Navigation Header */}
      <header className="sticky top-0 bg-brand-sand/95 backdrop-blur-md border-b border-brand-sand-dark z-40 transition-all">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-2.5 pb-2 md:pt-3 md:pb-2.5 flex flex-col gap-2 md:gap-3">
          
          {/* Top Row: Logo Centered */}
          <div className="flex justify-center w-full relative">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="flex items-center gap-3.5 group text-left cursor-pointer focus:outline-none"
              id="nav-logo"
            >
              <div className="w-12 h-12 bg-zinc-950 border-2 border-brand-clay rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-6 shadow-md flex items-center justify-center p-1.5 select-none">
                <OrangutanIcon size="100%" />
              </div>
              <span className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic text-brand-clay group-hover:text-orange-500 transition-colors">
                OERANG
              </span>
            </button>

            {/* Mobile Menu Trigger aligned right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-zinc-200 hover:text-brand-clay transition-colors focus:outline-none"
                id="mobile-menu-trigger"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Bottom Row: Navigation and CTAs - Desktop only */}
          <div className="hidden md:flex items-center justify-between w-full pt-2.5 border-t border-zinc-900/60">
            {/* Left spacing placeholder to keep navigation perfectly centered */}
            <div className="w-64" />

            {/* Centered Desktop Menu */}
            <nav className="flex items-center gap-8 lg:gap-10 text-sm md:text-[15px] lg:text-[16px] font-extrabold uppercase tracking-widest text-zinc-300">
              <button onClick={() => scrollToSection('hero')} className="hover:text-brand-clay transition-colors cursor-pointer text-zinc-100 font-extrabold">Home</button>
              <button onClick={() => scrollToSection('over-ons')} className="hover:text-brand-clay transition-colors cursor-pointer text-zinc-300 hover:text-brand-clay">Over Ons</button>
              <button onClick={() => scrollToSection('testimonials')} className="hover:text-brand-clay transition-colors cursor-pointer text-zinc-300 hover:text-brand-clay">Reviews</button>
              <button onClick={() => scrollToSection('portfolio')} className="hover:text-brand-clay transition-colors cursor-pointer text-zinc-300 hover:text-brand-clay">Voorbeelden</button>
            </nav>

            {/* Right Desktop CTA Buttons */}
            <div className="flex items-center gap-3 w-64 justify-end">
              <button
                onClick={() => scrollToSection('cost-calculator')}
                className="px-4 py-2 border border-zinc-700 text-zinc-200 hover:bg-zinc-800 text-[11px] md:text-[13px] font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm"
                id="cta-calc-button"
              >
                Bereken Prijs
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-4.5 py-2 bg-brand-clay hover:bg-orange-600 text-white text-[11px] md:text-[13px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-2"
                id="cta-contact-button"
              >
                <MessageSquareText className="w-4 h-4" />
                <span>Contact</span>
              </button>
            </div>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-zinc-900 border-b border-zinc-800 overflow-hidden absolute w-full left-0 shadow-xl"
              id="mobile-nav-menu"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col">
                <button onClick={() => scrollToSection('hero')} className="text-left font-bold text-zinc-100 py-2 border-b border-zinc-800/60">Home</button>
                <button onClick={() => scrollToSection('over-ons')} className="text-left font-bold text-zinc-100 py-2 border-b border-zinc-800/60">Over Ons</button>
                <button onClick={() => scrollToSection('testimonials')} className="text-left font-bold text-zinc-100 py-2 border-b border-zinc-800/60">Reviews</button>
                <button onClick={() => scrollToSection('portfolio')} className="text-left font-bold text-zinc-100 py-2 border-b border-zinc-800/60">Voorbeelden</button>
                <button onClick={() => scrollToSection('contact')} className="text-left font-bold text-brand-clay py-2 border-b border-zinc-800/60">Contact Opnemen</button>
                
                <div className="pt-4 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => scrollToSection('cost-calculator')}
                      className="py-3 bg-zinc-950 border border-zinc-800 text-zinc-300 font-bold text-xs rounded-xl text-center hover:bg-zinc-800 transition-colors"
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

      {/* Hero Section styled as a gorgeous Aggressive Split Layout */}
      <section id="hero" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-12 md:pb-20 relative">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-clay/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute -left-12 top-10 w-48 h-48 bg-brand-clay/5 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
          
          {/* Left Column: Aggressive Core Value Pitch */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-clay/10 border border-brand-clay/30 rounded-full text-[10px] font-bold tracking-wider text-brand-clay uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Binnen 14 dgn online</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black leading-[0.9] tracking-tighter text-white uppercase italic">
                WIJ MAKEN <span className="text-brand-clay">BETAALBARE</span> WEBSITES <br />
                DIE BIJ <span className="text-brand-clay">JOUW BEDRIJF</span> PASSEN.
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 max-w-lg leading-relaxed font-medium">
                Wij bouwen betaalbare gebruiksvriendelijke websites voor de kleine ondernemer.
              </p>

              {/* Aggressive Benefit Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-zinc-200 pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-brand-clay/20 text-brand-clay flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                  <span>100% jouw eigendom (geen contracten)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-brand-clay/20 text-brand-clay flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                  <span>Direct bovenaan in Google (SEO)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-brand-clay/20 text-brand-clay flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                  <span>Supersnel laden op elk apparaat</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-brand-clay/20 text-brand-clay flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                  <span>Hosting, Backups &amp; Support</span>
                </div>
              </div>
            </div>

            {/* Aggressive Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => scrollToSection('cost-calculator')}
                className="px-8 py-4 bg-brand-clay hover:bg-orange-600 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-lg hover:shadow-orange-950/20 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current text-white animate-pulse" />
                <span>Bereken je prijs</span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-zinc-800 hover:border-brand-clay text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer bg-zinc-900/40 hover:bg-zinc-900 flex items-center justify-center gap-2"
              >
                <MessageSquareText className="w-4 h-4 text-brand-clay" />
                <span>Neem direct contact op</span>
              </button>
            </div>

            {/* Dynamic Stats Row */}
            <div className="flex gap-6 pt-6 border-t border-zinc-900">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">50+</span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-extrabold mt-0.5">Live Projecten</span>
              </div>
              <div className="w-px h-10 bg-zinc-850"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-brand-clay">14 Dgn</span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-extrabold mt-0.5">Gem. Levertijd</span>
              </div>
              <div className="w-px h-10 bg-zinc-850"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">24u</span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-extrabold mt-0.5">WhatsApp Support</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Customer Review Card with LARGE portrait image */}
          <div className="lg:col-span-6 scroll-mt-24" id="testimonials">
            {(() => {
              const currentReview = TESTIMONIALS[heroReviewIdx];
              const HERO_PORTRAITS: Record<string, string> = {
                test_1: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&h=1000&q=80',
                test_2: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&h=1000&q=80',
                test_3: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&h=1000&q=80',
                test_4: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=800&h=1000&q=80',
                test_5: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&h=1000&q=80',
                test_6: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&h=1000&q=80',
                test_7: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=1000&q=80',
                test_8: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&h=1000&q=80',
                test_9: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=800&h=1000&q=80',
                test_10: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&w=800&h=1000&q=80',
                test_11: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&h=1000&q=80'
              };
              const portraitSrc = HERO_PORTRAITS[currentReview.id] || currentReview.image;

              return (
                <div className="bg-zinc-900 rounded-[32px] border-2 border-zinc-800 p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden h-full shadow-2xl hover:border-brand-clay/30 transition-all duration-300 group aggressive-glow">
                  <div className="absolute top-0 right-0 bg-brand-clay text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-md flex items-center gap-1 z-20">
                    <Star className="w-3 h-3 fill-current text-white" />
                    <span>Reviews</span>
                  </div>

                  {/* Top Portion: VERY LARGE client photo with navigation arrows overlay */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-zinc-800 bg-zinc-950 shrink-0">
                    <img 
                      src={portraitSrc} 
                      alt={currentReview.name}
                      referrerPolicy="no-referrer"
                      className={`absolute inset-0 w-full h-full object-cover object-center filter contrast-110 brightness-95 group-hover:scale-[1.02] transition-all duration-500 ${currentReview.id === 'test_1' ? '' : 'grayscale group-hover:grayscale-0'}`}
                    />
                    {/* Orange outline accent inside the frame */}
                    <div className="absolute inset-0 border border-zinc-800 group-hover:border-brand-clay/30 transition-colors pointer-events-none rounded-2xl"></div>
                    {/* Subtle dark gradient overlay at the bottom of the photo */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950 via-zinc-950/45 to-transparent pointer-events-none"></div>
                    
                    {/* Interactive overlay arrows on the left/right sides of the photo */}
                    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setHeroReviewIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
                        }}
                        className="w-10 h-10 rounded-full bg-zinc-950/80 hover:bg-brand-clay border border-zinc-800/80 hover:border-brand-clay text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg flex items-center justify-center backdrop-blur-md hover:scale-110 active:scale-95"
                        aria-label="Vorige review"
                        title="Vorige review"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setHeroReviewIdx((prev) => (prev + 1) % TESTIMONIALS.length);
                        }}
                        className="w-10 h-10 rounded-full bg-zinc-950/80 hover:bg-brand-clay border border-zinc-800/80 hover:border-brand-clay text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg flex items-center justify-center backdrop-blur-md hover:scale-110 active:scale-95"
                        aria-label="Volgende review"
                        title="Volgende review"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Overlay Identity details inside the bottom of the large image for maximum punch */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="bg-zinc-950/80 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-zinc-800/80">
                        <h4 className="font-display font-black text-sm text-white tracking-tight uppercase flex items-center gap-1.5">
                          {currentReview.name}
                          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-green-500/20 text-green-400 text-[9px] font-bold" title="Geverifieerde klant">✓</span>
                        </h4>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-0.5">
                          {currentReview.role} • <span className="text-brand-clay">{currentReview.company}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Portion: Testimonial content below photo */}
                  <div className="flex-1 flex flex-col justify-between space-y-5">
                    
                    <div className="space-y-3">
                      {/* Star Rating and Tag */}
                      <div className="flex items-center justify-between">
                        <div className="flex text-amber-500 gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current text-brand-clay" />
                          ))}
                        </div>
                        <span className="text-[9px] font-black text-brand-clay uppercase tracking-widest font-display bg-brand-clay/10 px-2.5 py-0.5 rounded-md border border-brand-clay/20">
                          Geverifieerd
                        </span>
                      </div>

                      {/* Emotional Client Quote */}
                      <p className="text-sm sm:text-base font-medium text-zinc-100 italic leading-relaxed">
                        "{currentReview.text}"
                      </p>

                      {/* Small Client Avatars Underneath the Text for Easier Scrolling and Direct Selection */}
                      <div className="pt-4 border-t border-zinc-800/40 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Kies een klant:</span>
                          <span className="text-[10px] font-bold text-brand-clay">klik op een foto om te wisselen</span>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none sm:scrollbar-thin sm:scrollbar-thumb-zinc-800 sm:scrollbar-track-transparent">
                          {TESTIMONIALS.map((test, idx) => {
                            const thumbSrc = HERO_PORTRAITS[test.id] || test.image;
                            const isActive = heroReviewIdx === idx;
                            return (
                              <button
                                key={test.id}
                                onClick={() => setHeroReviewIdx(idx)}
                                className={`relative w-12 h-12 rounded-xl overflow-hidden shrink-0 transition-all cursor-pointer border-2 focus:outline-none ${
                                  isActive
                                    ? 'border-brand-clay scale-110 ring-4 ring-brand-clay/10 z-10'
                                    : `border-zinc-800 hover:border-zinc-600 opacity-70 hover:opacity-100 hover:grayscale-0 ${test.id === 'test_1' ? '' : 'grayscale'}`
                                }`}
                                title={`${test.name} - ${test.company}`}
                              >
                                <img
                                  src={thumbSrc}
                                  alt={test.name}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                />
                                {isActive && (
                                  <div className="absolute inset-0 bg-brand-clay/15 flex items-end justify-center pb-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-clay" />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Client Selector Controls with Arrows and Dot Pagination */}
                    <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Geselecteerd:</span>
                        <span className="text-xs font-bold text-zinc-200 truncate max-w-[140px] sm:max-w-[200px]">
                          {currentReview.company}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                        <button
                          onClick={() => setHeroReviewIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                          className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
                          aria-label="Vorige review"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        
                        <span className="text-[10px] font-bold text-zinc-400 px-1 font-mono">
                          {heroReviewIdx + 1} / {TESTIMONIALS.length}
                        </span>

                        <button
                          onClick={() => setHeroReviewIdx((prev) => (prev + 1) % TESTIMONIALS.length)}
                          className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
                          aria-label="Volgende review"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })()}
          </div>

        </div>
      </section>

      {/* High-Impact Over Ons Section */}
      <section id="over-ons" className="py-16 bg-zinc-950 text-white border-y border-zinc-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-clay/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left Column: Aggressive Manifesto */}
            <div className="md:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-clay/10 border border-brand-clay/30 rounded-full text-[10px] font-bold tracking-wider text-brand-clay uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Wie is Oerang?</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-black leading-[0.95] tracking-tighter text-white uppercase italic">
                WIJ GELOOVEN NIET IN <br />
                <span className="text-brand-clay">BUREAUCRATISCHE SLOP.</span>
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-medium">
                Veel traditionele webdesignbureaus vullen hun uren met eindeloze vergaderingen, onnodige rapportages en torenhoge marges. Ondertussen wacht jij maanden op een simpele website. 
              </p>
              <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl border-l-4 border-l-brand-clay">
                <p className="text-xs text-zinc-300 italic leading-relaxed">
                  "Oerang is opgericht met één doel: professionele, flitsend snelle websites bouwen voor ZZP'ers en MKB'ers, zonder de agency-hoofdpijn of wurgcontracten. Wij leveren resultaat binnen 14 dagen, punt."
                </p>
              </div>
            </div>

            {/* Right Column: Brutalist Perks List */}
            <div className="md:col-span-5 space-y-4">
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">Onze No-Nonsense Belofte</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-5.5 h-5.5 rounded-md bg-brand-clay/10 flex items-center justify-center text-brand-clay font-black shrink-0">✓</div>
                    <div>
                      <h4 className="font-bold text-white">Geen Wurgcontracten</h4>
                      <p className="text-zinc-500 mt-0.5">De website is na oplevering 100% van jou. Geen maandelijkse verplichtingen.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5.5 h-5.5 rounded-md bg-brand-clay/10 flex items-center justify-center text-brand-clay font-black shrink-0">✓</div>
                    <div>
                      <h4 className="font-bold text-white">Razendsnel Online</h4>
                      <p className="text-zinc-500 mt-0.5">Zodra we jouw teksten en logo hebben, staat de site binnen 14 dagen live.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5.5 h-5.5 rounded-md bg-brand-clay/10 flex items-center justify-center text-brand-clay font-black shrink-0">✓</div>
                    <div>
                      <h4 className="font-bold text-white">Echte Mensen, Geen Ticket-slop</h4>
                      <p className="text-zinc-500 mt-0.5">Direct contact via WhatsApp of telefoon. Geen helpdesk-tickets of lange wachttijden.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bento Grid: Why Oerang? */}
      <section id="voordelen" className="py-12 bg-zinc-900/40 border-y border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-clay uppercase tracking-widest block font-display">Ontdek onze voordelen</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight uppercase italic">
              Alles wat je nodig hebt, zonder de onnodige kosten
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Veel webdesignbureaus rekenen duizenden euro’s voor functionaliteiten die je als kleine ondernemer helemaal niet direct nodig hebt. Oerang doet dit anders.
            </p>
          </div>

          {/* Grid cards styled perfectly as Bento Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <div className="bg-zinc-900 p-6 rounded-[20px] border border-zinc-800 space-y-3 hover:shadow-lg hover:border-brand-clay/30 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-zinc-950 text-white flex items-center justify-center shadow-xs border border-zinc-850">
                <Smartphone className="w-5 h-5 text-brand-clay" />
              </div>
              <h3 className="font-display font-bold text-base text-white">100% Responsive &amp; Mobiel</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Meer dan 65% van je bezoekers bekijkt je site op een smartphone. Onze websites zijn volledig geoptimaliseerd voor een perfecte mobiele ervaring.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-[20px] border border-zinc-800 space-y-3 hover:shadow-lg hover:border-brand-clay/30 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-zinc-950 text-white flex items-center justify-center shadow-xs border border-zinc-850">
                <Search className="w-5 h-5 text-brand-clay" />
              </div>
              <h3 className="font-display font-bold text-base text-white">Direct vindbaar in Google (SEO)</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We bouwen de website volgens de nieuwste Google-standaarden. Supersnel geladen, schone code en direct aangemeld bij Google Search Console.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-[20px] border border-zinc-800 space-y-3 hover:shadow-lg hover:border-brand-clay/30 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-zinc-950 text-white flex items-center justify-center shadow-xs border border-zinc-850">
                <Clock className="w-5 h-5 text-brand-clay" />
              </div>
              <h3 className="font-display font-bold text-base text-white">Binnen 14 dagen online</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Geen maandenlange overlegtrajecten. Zodra we jouw teksten en logo hebben, staat je professionele budget website binnen twee weken live op het internet.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-[20px] border border-zinc-800 space-y-3 hover:shadow-lg hover:border-brand-clay/30 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-zinc-950 text-white flex items-center justify-center shadow-xs border border-zinc-850">
                <BadgeCheck className="w-5 h-5 text-brand-clay" />
              </div>
              <h3 className="font-display font-bold text-base text-white">Jouw eigen bezit</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Bij Oerang zit je niet vast aan wurgcontracten. De website is volledig jouw eigendom. Verhuis je na een jaar? Dan neem je de site gewoon mee.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-[20px] border border-zinc-800 space-y-3 hover:shadow-lg hover:border-brand-clay/30 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-zinc-950 text-white flex items-center justify-center shadow-xs border border-zinc-850">
                <Globe className="w-5 h-5 text-brand-clay" />
              </div>
              <h3 className="font-display font-bold text-base text-white">Inclusief Domein &amp; Mail</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                In onze hosting is een professionele .nl-domeinnaam en een bijbehorend e-mailadres (bijv. info@jouwbedrijf.nl) altijd inbegrepen. Wel zo betrouwbaar!
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-[20px] border border-zinc-800 space-y-3 hover:shadow-lg hover:border-brand-clay/30 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-zinc-950 text-white flex items-center justify-center shadow-xs border border-zinc-850">
                <ShieldCheck className="w-5 h-5 text-brand-clay" />
              </div>
              <h3 className="font-display font-bold text-base text-white">Wekelijkse backups</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
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

      {/* Interactive Calculator Section */}
      <section id="cost-calculator" className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Calculator />
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

          <div className="md:col-span-6 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-xl">
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
      <footer className="bg-zinc-950 text-zinc-400 pt-10 pb-8 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Oerang Col */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-white">
                <div className="w-9 h-9 rounded-lg bg-zinc-950 border border-brand-clay flex items-center justify-center p-1 select-none">
                  <OrangutanIcon size="100%" />
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

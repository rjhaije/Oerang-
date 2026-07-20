/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  CALCULATOR_OPTIONS,
  FAQ_ITEMS
} from './data';
import { OrangutanIcon } from './components/OrangutanIcon';
import { WebsitePortfolioShowcase } from './components/WebsitePortfolioShowcase';
import { 
  Globe, 
  Smartphone, 
  ShieldCheck, 
  Clock, 
  BadgeCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
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
  MessageSquareText,
  Paintbrush,
  PenTool,
  ShoppingBag,
  ExternalLink,
  AlertTriangle,
  RefreshCw,
  UtensilsCrossed,
  Lock,
  HelpCircle,
  Tag,
  Hourglass,
  CheckCircle2,
  Calculator
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [heroReviewIdx, setHeroReviewIdx] = useState<number>(0);
  
  // Callback quick contact form
  const [callbackEmail, setCallbackEmail] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackMessage, setCallbackMessage] = useState(''); // Custom client message or inquiries
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

  // Cost Calculator Options - base webdesign and hosting are selected by default
  const [selectedCalcOptions, setSelectedCalcOptions] = useState<string[]>(['webdesign', 'hosting']);

  // FAQ Expanded State
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Static site configurations (replaces CMS dynamic states)
  const companyInfo = {
    email: 'rjhaije@protonmail.com',
    phone: '+31 (0) 6 4539 2108',
    phoneRaw: '+31645392108',
    address: 'Utrecht, Nederland',
    kvk: '12345678',
    heroTitle: 'WIJ MAKEN BETAALBARE WEBSITES DIE BIJ JOUW BEDRIJF PASSEN.',
    heroSubtitle: 'Wij bouwen betaalbare gebruiksvriendelijke websites voor de kleine ondernemer.'
  };

  const testimonials = DEFAULT_TESTIMONIALS;

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

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackEmail.trim() || !callbackPhone.trim()) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitFeedback(null);

    try {
      // Calculate selected packages
      const optionsMapped = CALCULATOR_OPTIONS.filter(o => selectedCalcOptions.includes(o.id)).map(o => o.name);
      if (callbackMessage.trim()) {
        optionsMapped.push(`Klant bericht: ${callbackMessage.trim()}`);
      }
      const setupPriceTotal = CALCULATOR_OPTIONS.filter(o => selectedCalcOptions.includes(o.id)).reduce((acc, o) => acc + o.setupPrice, 0);
      const monthlyPriceTotal = CALCULATOR_OPTIONS.filter(o => selectedCalcOptions.includes(o.id)).reduce((acc, o) => acc + o.monthlyPrice, 0);

      const packageConfigObj = {
        options: optionsMapped,
        setupPrice: setupPriceTotal,
        monthlyPrice: monthlyPriceTotal
      };

      const payload: any = {
        email: callbackEmail,
        phone: callbackPhone,
        packageConfig: packageConfigObj
      };

      // Dynamisch bepalen van de API URL en verzendmethode.
      // Als de app draait op localhost of de AI Studio preview (.run.app), gebruiken we het relatieve pad van de Express server.
      // Als de static site is geüpload naar de live website op Hostinger (zoals oerang.nl), sturen we de POST via URL-encoded form data naar contact.php.
      // Dit omzeilt de ModSecurity WAF-regels op Hostinger (die vaak JSON-payloads met '409 Conflict' blokkeren).
      const hostname = window.location.hostname;
      const isLocalOrPreview = (hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".run.app"));
      const apiUrl = isLocalOrPreview ? "/api/contact" : "/contact.php";

      let res;
      if (isLocalOrPreview) {
        res = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else {
        const formBody = new URLSearchParams();
        formBody.append("email", payload.email);
        formBody.append("phone", payload.phone);
        formBody.append("packageConfig", JSON.stringify(packageConfigObj));

        res = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody.toString(),
        });
      }

      let data: any = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        // Response was not valid JSON
      }

      if (res.ok && data.success) {
        setCallbackSubmitted(true);
        setSubmitFeedback("Bedankt! We hebben je aanvraag ontvangen en nemen binnen 1 werkdag telefonisch contact met je op.");
        setCallbackEmail('');
        setCallbackPhone('');
        setCallbackMessage('');
      } else {
        setSubmitError(data.message || `Fout (${res.status}): Er is een fout opgetreden bij het verzenden van je aanvraag.`);
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setSubmitError(`Verbindingsfout (${err?.message || err || "onbekend"}): Kon geen verbinding maken met de server. Controleer je internetverbinding of ververs de pagina.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = rect.top + scrollTop - 90; // Offset to account for sticky header
      window.scrollTo({ top: targetY, behavior: 'smooth' });
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
              <div className="w-12 h-12 bg-zinc-950 border-2 border-brand-clay rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-6 shadow-md flex items-center justify-center p-1.5 select-none shrink-0">
                <OrangutanIcon size="100%" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic text-brand-clay group-hover:text-orange-500 transition-colors">
                  OERANG
                </span>
                <span className="text-xs md:text-sm font-sans font-extrabold text-white group-hover:text-zinc-200 transition-colors tracking-wide uppercase italic">
                  budget websigners
                </span>
              </div>
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
              <button onClick={() => scrollToSection('over-ons')} className="hover:text-brand-clay transition-colors cursor-pointer text-zinc-300 hover:text-brand-clay">About us</button>
            </nav>

            {/* Right Desktop CTA Buttons */}
            <div className="flex items-center gap-3 w-64 justify-end">
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
                <button onClick={() => scrollToSection('over-ons')} className="text-left font-bold text-zinc-100 py-2 border-b border-zinc-800/60">About us</button>
                <button onClick={() => scrollToSection('contact')} className="text-left font-bold text-brand-clay py-2 border-b border-zinc-800/60">Contact Opnemen</button>
                
                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full py-3 bg-brand-clay text-white font-bold text-xs rounded-xl shadow-md text-center hover:bg-orange-600 transition-colors"
                  >
                    Neem Contact Op
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section styled as a gorgeous Aggressive Split Layout */}
      <section id="hero" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-12 md:pb-16 relative">
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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black leading-[0.9] tracking-tighter text-white uppercase italic">
                {companyInfo.heroTitle}
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 max-w-lg leading-relaxed font-medium">
                {companyInfo.heroSubtitle}
              </p>
 
              {/* High-Impact Over Ons Block placed higher in the left column */}
              <div id="over-ons" className="bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-[24px] space-y-3 relative overflow-hidden group hover:border-brand-clay/30 transition-all duration-300 animate-fade-in">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-clay/5 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex items-center gap-1.5">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-brand-clay/10 border border-brand-clay/30 rounded-full text-[9px] font-bold tracking-wider text-brand-clay uppercase">
                    <Sparkles className="w-3 h-3" />
                    <span>About us</span>
                  </div>
                </div>
                <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tighter uppercase italic leading-[1.0] lg:leading-[0.9]">
                  "Oerang is opgericht met één doel: <span className="text-brand-clay">professionele websites</span> bouwen voor ZZP'ers en MKB'ers, binnen <span className="text-brand-clay">14 dagen</span>, punt."
                </h2>
              </div>

              {/* Aggressive Benefit Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-zinc-200 pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-brand-clay/20 text-brand-clay flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                  <span>100% jouw eigendom (geen contracten)</span>
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

          </div>

          {/* Right Column: High-Impact Customer Review Card with LARGE portrait image */}
          <div className="lg:col-span-6 scroll-mt-24" id="testimonials">
            {(() => {
              const currentReview = testimonials[heroReviewIdx] || testimonials[0] || DEFAULT_TESTIMONIALS[0];
              const HERO_PORTRAITS: Record<string, string> = {
                test_1: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&h=1000&q=80',
                test_2: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&h=1000&q=80',
                test_3: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&h=1000&q=80',
                test_4: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&h=1000&q=80',
                test_5: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&h=1000&q=80',
                test_6: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&h=1000&q=80',
                test_7: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=1000&q=80',
                test_8: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&h=1000&q=80',
                test_9: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=800&h=1000&q=80',
                test_10: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&w=800&h=1000&q=80',
                test_11: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&h=1000&q=80',
                test_12: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&h=1000&q=80',
                test_13: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&h=1000&q=80',
                test_14: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&h=1000&q=80'
              };
              const portraitSrc = HERO_PORTRAITS[currentReview.id] || currentReview.image;

              return (
                <div className="bg-zinc-900 rounded-[32px] border-2 border-zinc-800 p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden h-full shadow-2xl hover:border-brand-clay/30 transition-all duration-300 group aggressive-glow">
                  <div className="absolute top-0 right-0 bg-brand-clay text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-md flex items-center gap-1 z-20">
                    <Star className="w-3 h-3 fill-current text-white" />
                    <span>Reviews</span>
                  </div>

                  {/* Top Portion: VERY LARGE client photo with navigation arrows overlay */}
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 border-zinc-800 bg-zinc-950 shrink-0">
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
                          setHeroReviewIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
                          setHeroReviewIdx((prev) => (prev + 1) % testimonials.length);
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
                        <div className="flex flex-wrap gap-2 pb-1">
                          {testimonials.map((test, idx) => {
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
                          onClick={() => setHeroReviewIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                          className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
                          aria-label="Vorige review"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        
                        <span className="text-[10px] font-bold text-zinc-400 px-1 font-mono">
                          {heroReviewIdx + 1} / {testimonials.length}
                        </span>

                        <button
                          onClick={() => setHeroReviewIdx((prev) => (prev + 1) % testimonials.length)}
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

      {/* Premium custom interactive portfolio website showcase */}
      <WebsitePortfolioShowcase />

      {/* Interactive Werkwijze Timeline Section */}
      <section id="werkwijze" className="py-16 bg-zinc-950 border-b border-zinc-900 relative overflow-hidden text-left">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-clay/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          {/* Section Header */}
          <div className="space-y-3 max-w-2xl border-b border-zinc-900 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-clay/10 border border-brand-clay/30 rounded-full text-[10px] font-bold tracking-wider text-brand-clay uppercase">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span>Snel &amp; transparant</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase italic tracking-tighter leading-none">
              Onze <span className="text-brand-clay">Werkwijze</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
              Van kennismaking tot een professionele website online binnen 14 dagen. Transparant, betrouwbaar en volledig ontzorgd. Klik op de stappen om de details te ontdekken.
            </p>
          </div>

          {/* Interactive timeline tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Steps Left Selector */}
            <div className="lg:col-span-5 space-y-3">
              {WERKWIJZE_STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={step.step}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer relative overflow-hidden group ${
                      isActive
                        ? 'bg-zinc-900 border-brand-clay/50 ring-2 ring-brand-clay/15 shadow-lg'
                        : 'bg-zinc-900/40 border-zinc-850 hover:bg-zinc-900/80 hover:border-zinc-800'
                    }`}
                    id={`werkwijze-step-btn-${step.step}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-sm shrink-0 transition-all ${
                      isActive 
                        ? 'bg-brand-clay text-white' 
                        : 'bg-zinc-950 text-zinc-500 group-hover:text-zinc-300'
                    }`}>
                      {step.step}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
                          {step.accent}
                        </span>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-clay animate-pulse shrink-0" />
                        )}
                      </div>
                      <h4 className={`text-xs sm:text-sm font-black tracking-tight uppercase truncate mt-0.5 ${
                        isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                      }`}>
                        {step.title}
                      </h4>
                    </div>

                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-clay" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Step Detail Card Right */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="bg-zinc-900 border border-zinc-850 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl min-h-[320px] flex flex-col justify-between"
                >
                  <div className="space-y-4 text-left">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] font-black text-brand-clay bg-brand-clay/10 border border-brand-clay/20 px-3 py-1 rounded-full uppercase tracking-wider">
                        {WERKWIJZE_STEPS[activeStep].badge}
                      </span>
                      <span className="text-xs font-mono font-black text-zinc-500">
                        Fase {WERKWIJZE_STEPS[activeStep].step}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tighter uppercase italic leading-none">
                      {WERKWIJZE_STEPS[activeStep].title}
                    </h3>
                    
                    <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest font-mono">
                      {WERKWIJZE_STEPS[activeStep].tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                      {WERKWIJZE_STEPS[activeStep].description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-zinc-850/60 grid grid-cols-2 gap-4 text-left">
                    <div>
                      <span className="text-[9px] text-zinc-500 uppercase font-black tracking-wider">Resultaat</span>
                      <p className="text-xs font-bold text-zinc-200 mt-0.5">
                        {WERKWIJZE_STEPS[activeStep].detail}
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 uppercase font-black tracking-wider">Snelheid</span>
                      <p className="text-xs font-mono font-black text-brand-clay mt-0.5">
                        {WERKWIJZE_STEPS[activeStep].metric}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Budget Cost Calculator */}
      <section id="calculator" className="py-16 bg-zinc-900 border-b border-zinc-950 relative overflow-hidden text-left">
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-clay/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          {/* Section Header */}
          <div className="space-y-3 max-w-2xl border-b border-zinc-800 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-clay/10 border border-brand-clay/30 rounded-full text-[10px] font-bold tracking-wider text-brand-clay uppercase">
              <Calculator className="w-3.5 h-3.5" />
              <span>Transparante prijzen</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase italic tracking-tighter leading-none">
              Oerang <span className="text-brand-clay">Kosten-Calculator</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
              Bereken direct de exacte kosten voor jouw website. Toggle opties aan of uit en zie in realtime de opstart- en maandelijkse kosten veranderen. Geen verrassingen achteraf!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Options Selector List (Left Column) */}
            <div className="lg:col-span-7 space-y-3">
              <p className="text-[10px] font-black tracking-widest text-zinc-500 uppercase flex items-center gap-1.5 mb-2">
                <Tag className="w-3.5 h-3.5 text-zinc-600" />
                <span>Kies jouw gewenste functionaliteiten:</span>
              </p>

              <div className="space-y-3">
                {CALCULATOR_OPTIONS.map((opt) => {
                  const isBase = opt.id === 'webdesign' || opt.id === 'hosting';
                  const isSelected = selectedCalcOptions.includes(opt.id) || isBase;
                  const IconComponent = opt.icon;

                  const toggleOption = () => {
                    if (isBase) return; // Cannot toggle core options
                    if (selectedCalcOptions.includes(opt.id)) {
                      setSelectedCalcOptions(prev => prev.filter(id => id !== opt.id));
                    } else {
                      setSelectedCalcOptions(prev => [...prev, opt.id]);
                    }
                  };

                  return (
                    <div
                      key={opt.id}
                      onClick={toggleOption}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer select-none text-left relative overflow-hidden ${
                        isSelected
                          ? 'bg-zinc-950 border-brand-clay/40 shadow-inner'
                          : 'bg-zinc-950/40 border-zinc-850/80 hover:bg-zinc-950/80 hover:border-zinc-800'
                      }`}
                      id={`calc-option-box-${opt.id}`}
                    >
                      {/* Checkbox status indicator */}
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-1 transition-all ${
                        isSelected
                          ? 'bg-brand-clay border-brand-clay text-white'
                          : 'border-zinc-700 bg-zinc-900'
                      }`}>
                        {isSelected && (
                          isBase ? <Lock className="w-3.5 h-3.5 text-white" /> : <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>

                      {/* Icon */}
                      <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                        isSelected ? 'bg-brand-clay/10 text-brand-clay' : 'bg-zinc-900 text-zinc-500'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>

                      {/* Details Text */}
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-baseline justify-between gap-2 flex-wrap">
                          <h4 className={`text-xs sm:text-sm font-black tracking-tight uppercase ${
                            isSelected ? 'text-white' : 'text-zinc-400'
                          }`}>
                            {opt.name}
                          </h4>
                          
                          {/* Price tags */}
                          <div className="flex gap-2 text-[10px] font-mono font-black uppercase shrink-0">
                            {opt.setupPrice > 0 && (
                              <span className="text-orange-400">
                                +€{opt.setupPrice} eenmalig
                              </span>
                            )}
                            {opt.monthlyPrice > 0 && (
                              <span className="text-emerald-400">
                                +€{opt.monthlyPrice}/mnd
                              </span>
                            )}
                            {isBase && opt.setupPrice === 0 && opt.monthlyPrice === 0 && (
                              <span className="text-zinc-500 font-sans font-bold">Inbegrepen</span>
                            )}
                          </div>
                        </div>

                        <p className="text-[11px] text-zinc-500 leading-relaxed font-medium mt-1">
                          {opt.description}
                        </p>

                        {/* Lock warning badge for core options */}
                        {isBase && (
                          <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[8px] font-bold text-zinc-400 uppercase tracking-wider">
                            <Lock className="w-2.5 h-2.5" />
                            <span>Basis Website Vereiste</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cost Breakdown Receipt Card (Right Column) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-zinc-950 border border-zinc-850 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              
              {/* Premium Card Corner Accents */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-brand-clay/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="space-y-6 text-left">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black tracking-widest text-brand-clay uppercase bg-brand-clay/10 px-2.5 py-0.5 rounded-md border border-brand-clay/20">
                      Samenstelling
                    </span>
                    <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">
                      Offerte-Sleutel: #ORG-{selectedCalcOptions.length}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-2xl text-white uppercase italic leading-none pt-1">
                    Kosten Overzicht
                  </h3>
                </div>

                {/* Checklist receipt */}
                <div className="space-y-2 bg-zinc-900/40 border border-zinc-850 p-4 rounded-2xl">
                  <span className="text-[9px] text-zinc-500 font-black uppercase tracking-wider block border-b border-zinc-850 pb-1.5">
                    Geselecteerde website modules:
                  </span>
                  
                  <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
                    {CALCULATOR_OPTIONS.map((opt) => {
                      const isBase = opt.id === 'webdesign' || opt.id === 'hosting';
                      const isSelected = selectedCalcOptions.includes(opt.id) || isBase;
                      if (!isSelected) return null;

                      return (
                        <div key={opt.id} className="flex items-center justify-between gap-3 text-xs text-zinc-300 font-bold uppercase tracking-tight">
                          <span className="truncate flex items-center gap-1.5 font-sans">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-clay shrink-0" />
                            {opt.name}
                          </span>
                          <span className="font-mono text-[10px] text-zinc-500 shrink-0">
                            {isBase && opt.id === 'hosting' ? '€15/md' : isBase && opt.id === 'webdesign' ? '€299' : opt.setupPrice > 0 ? `+€${opt.setupPrice}` : `+€${opt.monthlyPrice}/md`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Totals displays */}
                <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-850 py-5">
                  <div>
                    <span className="text-[9px] text-zinc-500 uppercase font-black tracking-wider block">Eenmalig Ontwerp</span>
                    <p className="text-2xl sm:text-3xl font-mono font-black text-white mt-1 leading-none">
                      € {CALCULATOR_OPTIONS.filter(o => selectedCalcOptions.includes(o.id) || o.id === 'webdesign' || o.id === 'hosting').reduce((acc, o) => acc + o.setupPrice, 0)}
                    </p>
                    <span className="text-[9px] text-zinc-500 font-medium mt-1 block">opstartkosten incl. btw</span>
                  </div>

                  <div>
                    <span className="text-[9px] text-zinc-500 uppercase font-black tracking-wider block">Maandelijks Service</span>
                    <p className="text-2xl sm:text-3xl font-mono font-black text-brand-clay mt-1 leading-none">
                      € {CALCULATOR_OPTIONS.filter(o => selectedCalcOptions.includes(o.id) || o.id === 'webdesign' || o.id === 'hosting').reduce((acc, o) => acc + o.monthlyPrice, 0)}<span className="text-xs text-zinc-500 font-medium">/md</span>
                    </p>
                    <span className="text-[9px] text-zinc-500 font-medium mt-1 block">hosting, backups &amp; support</span>
                  </div>
                </div>

                {/* Speed indicator */}
                <div className="flex items-center gap-3.5 bg-zinc-900/60 border border-zinc-850 p-3.5 rounded-2xl">
                  <Zap className="w-5 h-5 text-emerald-500 animate-pulse shrink-0" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-black tracking-wider text-emerald-400">Google Lighthouse Score</p>
                    <p className="text-xs font-semibold text-zinc-300">100/100 Laadsnelheid op mobiel gegarandeerd!</p>
                  </div>
                </div>

              </div>

              {/* Call-to-action */}
              <button
                onClick={() => {
                  const finalConfigDesc = CALCULATOR_OPTIONS.filter(o => selectedCalcOptions.includes(o.id) || o.id === 'webdesign' || o.id === 'hosting').map(o => o.name).join(", ");
                  setCallbackMessage(`Beste Oerang, ik wil graag de budget website met de volgende gekozen modules: ${finalConfigDesc}`);
                  
                  const contactSec = document.getElementById('contact');
                  if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full mt-6 py-4.5 bg-brand-clay hover:bg-orange-600 text-white font-black uppercase tracking-wider rounded-2xl transition-all cursor-pointer shadow-lg hover:shadow-brand-clay/15 flex items-center justify-center gap-2 text-xs"
                id="calc-submit-btn"
              >
                <span>Samenstelling versturen</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faq" className="py-16 bg-zinc-950 border-b border-zinc-900 relative overflow-hidden text-left">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-brand-clay/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          {/* Section Header */}
          <div className="space-y-3 max-w-2xl border-b border-zinc-900 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-clay/10 border border-brand-clay/30 rounded-full text-[10px] font-bold tracking-wider text-brand-clay uppercase">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Heb je vragen?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase italic tracking-tighter leading-none">
              Veelgestelde <span className="text-brand-clay">Vragen</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
              Alles wat je moet weten over het bouwen, hosten, onderhouden en optimaliseren van jouw nieuwe budget website. Klik op een vraag om het antwoord te openen.
            </p>
          </div>

          {/* Accordion grid */}
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQ_ITEMS.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              
              return (
                <div
                  key={faq.id}
                  className="bg-zinc-900 border border-zinc-850 rounded-2xl overflow-hidden transition-colors"
                  id={`faq-item-box-${faq.id}`}
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full text-left px-5 py-4.5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                  >
                    <span className="text-xs sm:text-sm font-black tracking-tight uppercase text-zinc-200 group-hover:text-brand-clay transition-colors leading-snug">
                      {faq.question}
                    </span>
                    <span className={`p-1 bg-zinc-950 border border-zinc-850 rounded-lg text-zinc-500 transition-all ${
                      isExpanded ? 'rotate-180 text-brand-clay border-brand-clay/25' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium border-t border-zinc-850/40">
                          {faq.answer}
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
            <span className="text-xs font-bold text-brand-clay uppercase tracking-widest block">Contact</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-white leading-tight">
              Laat ons je terugbellen of mailen!
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed max-w-md">
              We nemen binnen een werkdag telefonisch contact met je op. We bespreken je wensen, beantwoorden je vragen en geven je direct gratis advies. Helemaal vrijblijvend!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 text-xs font-semibold text-gray-300 pt-2 border-t border-brand-moss/40 max-w-md">
              <a href={`mailto:${companyInfo.email}`} className="hover:text-brand-clay transition-colors flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-brand-clay" />
                <span>{companyInfo.email}</span>
              </a>
              <a href={`tel:${companyInfo.phoneRaw}`} className="hover:text-brand-clay transition-colors flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-brand-clay" />
                <span>{companyInfo.phone}</span>
              </a>
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
                  <h4 className="font-display font-bold text-sm text-white mb-2">
                    Vul je gegevens in voor contact
                  </h4>
                  
                  <div className="space-y-3">
                    <div>
                      <input 
                        type="email" 
                        required
                        disabled={isSubmitting}
                        placeholder="E-mailadres (bijv. naam@voorbeeld.nl)"
                        value={callbackEmail}
                        onChange={(e) => setCallbackEmail(e.target.value)}
                        className="w-full px-4 py-3 text-xs text-white placeholder-gray-500 bg-brand-forest/20 rounded-xl border border-brand-moss focus:outline-none focus:ring-1 focus:ring-brand-clay disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        required
                        disabled={isSubmitting}
                        placeholder="Telefoonnummer (bijv. 0612345678)"
                        value={callbackPhone}
                        onChange={(e) => setCallbackPhone(e.target.value)}
                        className="w-full px-4 py-3 text-xs text-white placeholder-gray-500 bg-brand-forest/20 rounded-xl border border-brand-moss focus:outline-none focus:ring-1 focus:ring-brand-clay disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <textarea 
                        rows={3}
                        disabled={isSubmitting}
                        placeholder="Je bericht, opmerkingen of specifieke wensen (optioneel)"
                        value={callbackMessage}
                        onChange={(e) => setCallbackMessage(e.target.value)}
                        className="w-full px-4 py-3 text-xs text-white placeholder-gray-500 bg-brand-forest/20 rounded-xl border border-brand-moss focus:outline-none focus:ring-1 focus:ring-brand-clay disabled:opacity-50 resize-none font-sans"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div className="space-y-2.5 animate-fade-in">
                      <div className="p-3 bg-red-500/10 border border-red-500/35 text-red-300 text-[11px] rounded-xl font-medium leading-relaxed">
                        ⚠️ {submitError}
                      </div>
                      <div className="p-3 bg-zinc-950/60 border border-zinc-800 rounded-xl space-y-2">
                        <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Directe Fallback (Altijd Succes):</p>
                        <p className="text-[10px] text-zinc-300 leading-normal">
                          Als de verbinding met de server faalt, kun je je aanvraag direct handmatig via WhatsApp of E-mail versturen. We reageren binnen 24 uur!
                        </p>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <a
                            href={`https://wa.me/31645392108?text=${encodeURIComponent(
                              `Beste Oerang, ik wil graag contact opnemen.\n\nE-mailadres: ${callbackEmail || '(nog niet ingevuld)'}\nTelefoonnummer: ${callbackPhone || '(nog niet ingevuld)'}${callbackMessage ? `\n\nBericht/Opties:\n${callbackMessage}` : ""}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>WhatsApp</span>
                          </a>
                          <a
                            href={`mailto:rjhaije@protonmail.com?subject=${encodeURIComponent(
                              "Oerang.nl: Terugbelverzoek"
                            )}&body=${encodeURIComponent(
                              `Beste Oerang,\n\nHierbij mijn contactgegevens:\n\nE-mailadres: ${callbackEmail || ''}\nTelefoonnummer: ${callbackPhone || ''}${callbackMessage ? `\n\nOpmerkingen/Opties:\n${callbackMessage}` : ""}\n\nMet vriendelijke groet,\n${callbackEmail}`
                            )}`}
                            className="py-2 px-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-[10px] rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors border border-zinc-700"
                          >
                            <Mail className="w-3.5 h-3.5 shrink-0" />
                            <span>E-mail</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-brand-clay hover:bg-orange-600 disabled:bg-zinc-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Versturen...</span>
                      </>
                    ) : (
                      <span>Neem Contact Met Mij Op</span>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="callback-success"
                  className="text-center py-6 space-y-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-3xl text-brand-clay">✓</div>
                  <h4 className="font-display font-bold text-sm text-white">Bedankt voor je aanvraag!</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {submitFeedback || "We nemen zo snel mogelijk contact met je op via e-mail of telefoon. Tot snel!"}
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
            <div className="md:col-span-6 space-y-4">
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
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 text-xs font-semibold text-white">
                <a href={`mailto:${companyInfo.email}`} className="hover:text-brand-clay transition-colors flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-brand-clay" />
                  <span>{companyInfo.email}</span>
                </a>
                <a href={`tel:${companyInfo.phoneRaw}`} className="hover:text-brand-clay transition-colors flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-brand-clay" />
                  <span>{companyInfo.phone}</span>
                </a>
              </div>
            </div>

            {/* Links Col 2 */}
            <div className="md:col-span-6 space-y-4 text-xs">
              <h4 className="font-display font-bold text-white uppercase tracking-wider text-[11px]">Over Oerang</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Wij zijn gevestigd in Nederland en ondersteunen lokale ondernemers door het hele land. Geen ingewikkeld vakjargon, gewoon duidelijke taal en snelle oplevering.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-brand-clay shrink-0" />
                <span>{companyInfo.address} • KvK: {companyInfo.kvk}</span>
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

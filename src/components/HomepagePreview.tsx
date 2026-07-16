import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Search, 
  Star, 
  Check, 
  X, 
  Calendar, 
  User, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  MousePointerClick,
  MapPin,
  Coffee,
  CheckCircle2,
  Utensils,
  Paintbrush,
  Scissors
} from 'lucide-react';

export interface MockupConfig {
  url: string;
  logo: string;
  navLinks: string[];
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  ctaText: string;
  accentColor: string;
  features: string[];
  trustBadge: string;
  theme: 'pink' | 'green' | 'amber' | 'blue';
  interactiveTitle: string;
  interactiveSubtitle: string;
}

export const HOMEPAGE_MOCKUPS: Record<string, MockupConfig> = {
  port_1: {
    url: 'www.haarstudionova.nl',
    logo: '✨ NOVA',
    navLinks: ['Diensten', 'Tarieven', 'Boek nu'],
    heroTitle: 'Jouw haar verdient de beste zorg',
    heroSubtitle: 'Frisse kapsels, moderne balayage & direct online jouw afspraak plannen.',
    heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&h=450&q=80',
    ctaText: 'Maak Afspraak',
    accentColor: '#ec4899', // Pink
    features: ['Online boeken', 'Top stylisten', 'Koffie staat klaar'],
    trustBadge: '⭐️ 4.9 (124 reviews) • Utrecht',
    theme: 'pink',
    interactiveTitle: 'Boek jouw behandeling',
    interactiveSubtitle: 'Dames knippen, wassen & stylen'
  },
  port_2: {
    url: 'www.groenenco-hoveniers.nl',
    logo: '🌿 GROEN & CO',
    navLinks: ['Tuinaanleg', 'Onderhoud', 'Ontwerp'],
    heroTitle: 'Prachtige tuinen om in te leven',
    heroSubtitle: 'Duurzame tuinaanleg, strakke bestrating & professioneel onderhoud.',
    heroImage: 'https://images.unsplash.com/photo-1558904541-efa8c1a68fc2?auto=format&fit=crop&w=800&h=450&q=80',
    ctaText: 'Vraag Offerte',
    accentColor: '#10b981', // Green
    features: ['Vrijblijvende offerte', 'Gecertificeerd', 'Eigen ontwerp'],
    trustBadge: '⭐️ 5.0 (84 reviews) • Amersfoort',
    theme: 'green',
    interactiveTitle: 'Vraag Tuinofferte Aan',
    interactiveSubtitle: 'Binnen 24 uur reactie'
  },
  port_3: {
    url: 'www.cafedebuurman.nl',
    logo: '🍺 DE BUURMAN',
    navLinks: ['Menukaart', 'Sfeer', 'Reserveren'],
    heroTitle: 'Gezelligheid & lekker eten',
    heroSubtitle: 'Kom genieten van onze dagschotels, speciaalbieren en sfeervolle terras.',
    heroImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&h=450&q=80',
    ctaText: 'Bekijk Menu',
    accentColor: '#d97706', // Amber
    features: ['Lunch & Diner', 'Zonnig terras', 'Live muziek'],
    trustBadge: '⭐️ 4.8 (192 reviews) • Zeist',
    theme: 'amber',
    interactiveTitle: 'Smaakvol Eetcafé Menu',
    interactiveSubtitle: 'Huisgemaakte klassiekers & bieren'
  },
  port_4: {
    url: 'www.vandamschilders.nl',
    logo: '🎨 VAN DAM',
    navLinks: ['Schilderwerk', 'Over Ons', 'Contact'],
    heroTitle: 'Kwaliteitsschilder voor jouw woning',
    heroSubtitle: 'Strak binnenschilderwerk, duurzame buitenbescherming & garantie.',
    heroImage: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&h=450&q=80',
    ctaText: 'Kleuradvies',
    accentColor: '#3b82f6', // Blue
    features: ['5 jaar garantie', 'Snel beschikbaar', 'Gratis kleuradvies'],
    trustBadge: '⭐️ 4.9 (76 reviews) • Hilversum',
    theme: 'blue',
    interactiveTitle: 'Gratis Schilderadvies',
    interactiveSubtitle: 'Vraag direct gratis kleuradvies aan'
  }
};

interface Props {
  projectId: string;
}

export default function HomepagePreview({ projectId }: Props) {
  const mockup = HOMEPAGE_MOCKUPS[projectId];
  if (!mockup) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  
  // Specific inputs depending on the theme
  const [extraVal, setExtraVal] = useState<string>('');

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetSimulator = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setSubmitted(false);
    setSelectedOption('');
    setExtraVal('');
  };

  // Theme matching helper
  const getThemeStyles = () => {
    switch (mockup.theme) {
      case 'pink':
        return {
          accent: 'bg-pink-500 hover:bg-pink-600 ring-pink-500/20',
          text: 'text-pink-500',
          badge: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
          border: 'border-pink-500/20',
          gradient: 'from-pink-950/90 via-zinc-950/80 to-zinc-950/45',
          options: [
            { id: 'cut', label: '✂️ Dames Wassen & Knippen (€32,50)' },
            { id: 'color', label: '✨ Balayage & Styling (€85,00)' },
            { id: 'men', label: '💈 Heren Knippen & Fresh Up (€24,50)' }
          ],
          placeholder: 'Kies jouw favoriete stylist (bijv. Anouk of Sacha)...'
        };
      case 'green':
        return {
          accent: 'bg-emerald-500 hover:bg-emerald-600 ring-emerald-500/20',
          text: 'text-emerald-500',
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          border: 'border-emerald-500/20',
          gradient: 'from-emerald-950/90 via-zinc-950/80 to-zinc-950/45',
          options: [
            { id: 'aanleg', label: '🌿 Complete Tuinaanleg & Bestrating' },
            { id: 'onderhoud', label: '✂️ Periodiek Snoei- & Onderhoudswerk' },
            { id: 'ontwerp', label: '📐 3D Tuinontwerp op maat' }
          ],
          placeholder: 'Korte beschrijving van jouw tuin (bijv. 50m², veel zon)...'
        };
      case 'amber':
        return {
          accent: 'bg-amber-500 hover:bg-amber-600 ring-amber-500/20',
          text: 'text-amber-500',
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          border: 'border-amber-500/20',
          gradient: 'from-amber-950/90 via-zinc-950/80 to-zinc-950/45',
          options: [
            { id: 'tafel', label: '🍔 Diner reserveren (2 personen, vanavond)' },
            { id: 'borrel', label: '🍺 Borrel & Bites met vrienden' },
            { id: 'lunch', label: '☕ Gezellige lunch-reservering' }
          ],
          placeholder: 'Dieetwensen of opmerkingen (bijv. allergieën)...'
        };
      case 'blue':
        return {
          accent: 'bg-blue-500 hover:bg-blue-600 ring-blue-500/20',
          text: 'text-blue-500',
          badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          border: 'border-blue-500/20',
          gradient: 'from-blue-950/90 via-zinc-950/80 to-zinc-950/45',
          options: [
            { id: 'binnen', label: '🏠 Binnenschilderwerk & Muren sauzen' },
            { id: 'buiten', label: '🎨 Buitenschilderwerk (kozijnen & gevels)' },
            { id: 'advies', label: '🖌️ Deskundig Kleuradvies & Inspectie' }
          ],
          placeholder: 'Type woning (bijv. tussenwoning, hoekwoning)...'
        };
    }
  };

  const themeStyle = getThemeStyles();

  return (
    <div className="bg-zinc-950 rounded-[24px] border border-zinc-800 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] mt-3.5 transition-all duration-500 group-hover:border-zinc-700/80 relative">
      
      {/* 1. Browser Chrome / Window Header */}
      <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        
        {/* Three Mac Dots */}
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 border border-red-600/20 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 border border-yellow-600/20 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70 border border-green-600/20 inline-block" />
        </div>

        {/* Secure Address Bar */}
        <div className="bg-zinc-950 px-4 py-1 rounded-xl border border-zinc-850 text-[10px] text-zinc-400 font-mono flex items-center gap-1.5 justify-center max-w-[240px] w-full truncate shadow-inner">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span className="text-zinc-500 font-medium select-none">https://</span>
          <span className="text-zinc-200 font-medium truncate">{mockup.url}</span>
        </div>

        {/* Interactive Simulation Indicator Badge */}
        <div className="flex items-center gap-1.5 bg-brand-clay/10 border border-brand-clay/35 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-brand-clay tracking-wider uppercase animate-pulse select-none">
          <Sparkles className="w-3 h-3" />
          <span className="hidden sm:inline">KLIKBAAR PROTOTYPE</span>
          <span className="sm:hidden">PROTOTYPE</span>
        </div>
      </div>

      {/* 2. Interactive Viewport Canvas */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950 select-none group/viewport">
        
        {/* Hero Background Image */}
        <img 
          src={mockup.heroImage} 
          alt={mockup.heroTitle}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center scale-100 group-hover:scale-[1.04] transition-transform duration-1000 opacity-90 filter brightness-[0.85] contrast-[1.05]"
        />
        
        {/* High-Contrast Beautiful Visual Gradients */}
        <div className={`absolute inset-0 bg-gradient-to-t ${themeStyle.gradient} pointer-events-none`} />
        
        {/* Decorative Floating trust pill over the image (makes it look 100% genuine) */}
        <div className="absolute top-14 right-4 z-10 scale-90 sm:scale-100 bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10 flex items-center gap-1.5 shadow-lg">
          <MapPin className="w-3.5 h-3.5 text-brand-clay" />
          <span className="text-[10px] font-bold text-white tracking-tight">{mockup.trustBadge}</span>
        </div>

        {/* Top-aligned Website Menu Bar inside preview */}
        <div className="absolute top-0 inset-x-0 flex items-center justify-between px-5 py-3 border-b border-white/5 bg-black/40 backdrop-blur-md z-10">
          <div className="flex items-center gap-1">
            <span className="font-display font-black text-xs text-white tracking-tighter uppercase italic">{mockup.logo}</span>
          </div>
          
          <div className="flex gap-3 text-[9px] font-bold uppercase tracking-widest text-zinc-300">
            {mockup.navLinks.slice(0, 2).map((link) => (
              <span key={link} className="hover:text-white transition-colors cursor-pointer">{link}</span>
            ))}
          </div>
        </div>

        {/* Hero Content Panel */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 space-y-2 text-left z-10">
          
          {/* Slogan pill */}
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-bold tracking-wider text-white uppercase border border-white/15">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Nu geopend & beschikbaar</span>
          </div>

          <h4 className="font-display font-black text-base sm:text-lg md:text-xl text-white tracking-tight leading-[1.08] uppercase italic max-w-sm sm:max-w-md drop-shadow-md">
            {mockup.heroTitle}
          </h4>
          
          <p className="text-[10px] sm:text-xs text-zinc-200 max-w-sm sm:max-w-md leading-relaxed drop-shadow-sm font-medium">
            {mockup.heroSubtitle}
          </p>
          
          {/* Action Trigger Block */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
            
            {/* Pulsing CTA Button */}
            <div className="relative inline-block self-start">
              <button 
                onClick={handleCtaClick}
                className={`px-4.5 py-2.5 rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-xl transform active:scale-95 transition-all flex items-center gap-2 cursor-pointer group-hover/viewport:scale-105 ${themeStyle.accent}`}
              >
                <MousePointerClick className="w-3.5 h-3.5 animate-bounce" />
                <span>{mockup.ctaText}</span>
              </button>
              
              {/* Tooltip to encourage user interaction */}
              <div className="absolute top-full left-0 mt-1.5 whitespace-nowrap bg-brand-clay text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md shadow-lg pointer-events-none animate-bounce flex items-center gap-1 z-20">
                <span>Klik om te testen</span>
                <span className="inline-block">⚡</span>
              </div>
            </div>
            
            {/* Highlighted Micro Perks list */}
            <div className="flex flex-wrap gap-2 text-[8.5px] text-zinc-300 font-semibold font-mono">
              {mockup.features.slice(0, 2).map((feat, i) => (
                <div key={feat} className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded border border-white/5">
                  <Check className={`w-2.5 h-2.5 ${themeStyle.text} stroke-[3]`} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. SIMULATOR MODAL BACKDROP & DIALOG OVERLAY */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-md z-30 flex items-center justify-center p-4"
              onClick={resetSimulator}
            >
              <motion.div
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header of Popup */}
                <div className="bg-zinc-850 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 font-mono">Live Simulator</p>
                  </div>
                  <button 
                    onClick={resetSimulator}
                    className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {!submitted ? (
                  <form onSubmit={handleModalSubmit} className="p-4 space-y-4">
                    <div className="text-left space-y-1">
                      <h5 className="font-display font-black text-sm text-white uppercase italic tracking-tight">{mockup.interactiveTitle}</h5>
                      <p className="text-[10px] text-zinc-400">{mockup.interactiveSubtitle}</p>
                    </div>

                    {/* Dynamic Radios for selection */}
                    <div className="space-y-2">
                      <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-left">Maak een keuze</p>
                      <div className="grid grid-cols-1 gap-2">
                        {themeStyle.options.map((opt) => (
                          <label
                            key={opt.id}
                            className={`p-2.5 rounded-xl border text-left text-xs text-white font-medium cursor-pointer transition-all flex items-center justify-between ${
                              selectedOption === opt.id
                                ? 'bg-zinc-800 border-zinc-600'
                                : 'bg-zinc-900/40 border-zinc-850 hover:bg-zinc-900/80 hover:border-zinc-800'
                            }`}
                          >
                            <span className="truncate pr-2">{opt.label}</span>
                            <input
                              type="radio"
                              name="mockup-option"
                              value={opt.id}
                              checked={selectedOption === opt.id}
                              onChange={() => setSelectedOption(opt.id)}
                              className="accent-brand-clay h-3.5 w-3.5 shrink-0"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Supportive input details */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block">Extra informatie of opmerking</label>
                      <input
                        type="text"
                        value={extraVal}
                        onChange={(e) => setExtraVal(e.target.value)}
                        placeholder={themeStyle.placeholder}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-850 text-[11px] text-white rounded-xl focus:outline-none focus:border-zinc-700 placeholder-zinc-650"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!selectedOption}
                      className={`w-full py-2.5 rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-lg transition-all ${
                        selectedOption 
                          ? `${themeStyle.accent} cursor-pointer` 
                          : 'bg-zinc-850 text-zinc-500 border border-zinc-800 cursor-not-allowed'
                      }`}
                    >
                      Verstuur Vrijblijvende Demo
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 text-center space-y-4"
                  >
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 text-xl shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                      ✓
                    </div>

                    <div className="space-y-1">
                      <h5 className="font-display font-black text-sm text-white uppercase italic tracking-tight">Demo Succesvol!</h5>
                      <p className="text-[10.5px] text-zinc-400 max-w-xs mx-auto leading-relaxed">
                        Dit is hoe de bezoeker van jouw Oerang website direct online boekt of een offerte aanvraagt. Flitsend snel en 100% gericht op conversie!
                      </p>
                    </div>

                    {/* Receipt simulation */}
                    <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-850 text-left font-mono text-[9.5px] text-zinc-400 space-y-1 max-w-[280px] mx-auto">
                      <p className="text-brand-clay font-bold uppercase tracking-wider text-[8px] mb-1">Ontvangen Keuzes:</p>
                      <p><span className="text-zinc-600">Gekozen:</span> {themeStyle.options.find(o => o.id === selectedOption)?.label.slice(3)}</p>
                      {extraVal && <p><span className="text-zinc-600">Opmerking:</span> "{extraVal}"</p>}
                      <div className="border-t border-dashed border-zinc-800 my-1.5" />
                      <p className="text-[8px] text-zinc-500 text-center uppercase tracking-wider">Meteen gekoppeld aan e-mail & sms</p>
                    </div>

                    <button
                      onClick={resetSimulator}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-750 text-white rounded-lg text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Test Opnieuw
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

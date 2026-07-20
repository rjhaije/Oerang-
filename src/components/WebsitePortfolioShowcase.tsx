import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  Crown, 
  Lock, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  Eye, 
  Monitor, 
  Smartphone, 
  Globe, 
  ExternalLink,
  Laptop,
  CheckCircle2,
  Calendar,
  Hourglass,
  Tag
} from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data';
import { WebsiteContent } from './WebsiteContent';

// Define Tab Categories
type CategoryTab = 'ambacht_bouw' | 'diensten_lifestyle';

export function WebsitePortfolioShowcase() {
  const [activeTab, setActiveTab] = useState<CategoryTab>('ambacht_bouw');
  const [selectedAmbachtIdx, setSelectedAmbachtIdx] = useState<number>(0); // Default to Schildersbedrijf Van Herk
  const [selectedLifestyleIdx, setSelectedLifestyleIdx] = useState<number>(0); // Default to Haarsalon Nova
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Filter projects by tab category
  const ambachtProjects = PORTFOLIO_PROJECTS.filter(p => 
    p.category === 'Onderhoud & Bouw' || p.category === 'Ambacht & Voeding'
  );
  
  const lifestyleProjects = PORTFOLIO_PROJECTS.filter(p => 
    p.category !== 'Onderhoud & Bouw' && p.category !== 'Ambacht & Voeding'
  );

  const currentProjects = activeTab === 'ambacht_bouw' ? ambachtProjects : lifestyleProjects;
  const currentIdx = activeTab === 'ambacht_bouw' ? selectedAmbachtIdx : selectedLifestyleIdx;
  const setCurrentIdx = activeTab === 'ambacht_bouw' ? setSelectedAmbachtIdx : setSelectedLifestyleIdx;
  
  const currentProject = currentProjects[currentIdx] || currentProjects[0];

  // Helper to draw beautiful website mockups styled as high-end credit-card-like tabs
  const renderWebsiteCard = (project: PortfolioProject, index: number) => {
    const isSelected = index === currentIdx;
    const accentColor = project.colorHex;

    // Custom background designs for cards based on project
    let cardGradient = 'from-zinc-900 via-zinc-800 to-zinc-950';
    let brandSymbol = 'W';

    if (project.id === 'port_1') { // Schildersbedrijf
      cardGradient = 'from-blue-950 via-slate-900 to-zinc-950';
      brandSymbol = 'S';
    } else if (project.id === 'port_2') { // Bakker
      cardGradient = 'from-amber-950 via-orange-900 to-zinc-950';
      brandSymbol = 'B';
    } else if (project.id === 'port_3') { // Groenteman
      cardGradient = 'from-emerald-950 via-teal-900 to-zinc-950';
      brandSymbol = 'G';
    } else if (project.id === 'port_4') { // Kapsalon
      cardGradient = 'from-pink-950 via-purple-900 to-zinc-950';
      brandSymbol = 'H';
    } else if (project.id === 'port_5') { // Tandarts
      cardGradient = 'from-cyan-950 via-sky-900 to-zinc-950';
      brandSymbol = 'T';
    } else if (project.id === 'port_6') { // Aannemer
      cardGradient = 'from-orange-950 via-stone-900 to-zinc-950';
      brandSymbol = 'A';
    } else if (project.id === 'port_7') { // Fitness
      cardGradient = 'from-red-950 via-stone-900 to-zinc-950';
      brandSymbol = 'F';
    } else if (project.id === 'port_8') { // Slijterij
      cardGradient = 'from-violet-950 via-purple-900 to-zinc-950';
      brandSymbol = 'D';
    } else if (project.id === 'port_9') { // Slager
      cardGradient = 'from-rose-950 via-red-950 to-zinc-950';
      brandSymbol = 'S';
    } else if (project.id === 'port_10') { // Rijschool
      cardGradient = 'from-yellow-950/70 via-stone-900 to-zinc-950';
      brandSymbol = 'R';
    }

    return (
      <motion.div
        key={project.id}
        onClick={() => setCurrentIdx(index)}
        whileHover={{ scale: isSelected ? 1.05 : 0.98, rotateY: isSelected ? 3 : 0 }}
        className={`relative aspect-[1.58/1] w-52 sm:w-64 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-2xl flex-shrink-0 border ${
          isSelected 
            ? 'ring-4 ring-orange-500/30 scale-105 z-20 border-orange-500/50' 
            : 'opacity-50 hover:opacity-85 z-10 border-zinc-800'
        }`}
        id={`portfolio-card-${project.id}`}
      >
        {/* Color Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${cardGradient}`} />

        {/* Browser Mockup Glass Top Bar */}
        <div className="absolute inset-x-0 top-0 h-7 bg-black/40 border-b border-white/5 flex items-center justify-between px-3">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/70"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/70"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/70"></span>
          </div>
          <span className="text-[7.5px] font-mono text-zinc-500 font-medium tracking-wider">
            {project.title.toLowerCase().replace(/\s+/g, '')}.nl
          </span>
          <div className="w-3"></div>
        </div>

        {/* Diagonal premium stripe shimmer */}
        <div className="absolute inset-0 after:content-[''] after:absolute after:inset-0 after:translate-x-[-100%] after:animate-[shimmer_4s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:skew-x-[-15deg] overflow-hidden pointer-events-none"></div>

        {/* Card Content Header */}
        <div className="absolute inset-x-4 top-10 flex justify-between items-start">
          <div className="flex flex-col text-left">
            <span className="text-[10px] sm:text-xs font-black tracking-wider text-white uppercase truncate max-w-[150px]">
              {project.title}
            </span>
            <span className="text-[7px] sm:text-[8px] text-zinc-400 font-mono font-bold uppercase tracking-widest mt-0.5">
              {project.branch}
            </span>
          </div>
          
          {/* Logo Badge */}
          <div className="w-6 h-6 rounded-lg bg-black/45 flex items-center justify-center border border-white/10 shrink-0">
            <span className="text-white text-[10px] font-black italic" style={{ color: accentColor }}>
              {brandSymbol}
            </span>
          </div>
        </div>

        {/* Price & Delivery Badge center-left */}
        <div className="absolute left-4 top-[58%] -translate-y-1/2 flex flex-col gap-1 text-left">
          <div className="inline-flex items-center gap-1 bg-black/30 backdrop-blur-sm border border-white/5 px-2 py-0.5 rounded-md">
            <span className="text-[8px] font-mono text-orange-400 font-bold">{project.price}</span>
            <span className="text-[7px] text-zinc-400 font-medium">vaste prijs</span>
          </div>
          <div className="inline-flex items-center gap-1 bg-black/30 backdrop-blur-sm border border-white/5 px-2 py-0.5 rounded-md">
            <span className="text-[8px] font-mono text-emerald-400 font-bold">{project.deliveryTime}</span>
            <span className="text-[7px] text-zinc-400 font-medium">oplevering</span>
          </div>
        </div>

        {/* Cardholder name and premium signifier at the bottom */}
        <div className="absolute inset-x-4 bottom-3 flex justify-between items-end">
          <div className="flex flex-col text-left">
            <span className="text-[7px] text-zinc-500 font-semibold uppercase tracking-widest">
              MAATWERK LAYOUT
            </span>
            <span className="text-[8px] font-bold font-mono tracking-wider text-zinc-300 mt-0.5 uppercase">
              {project.category}
            </span>
          </div>
          
          {/* Premium Type */}
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black italic text-zinc-400">
              Responsive ✓
            </span>
          </div>
        </div>

        {/* Selected Accent border outline */}
        {isSelected && (
          <div className="absolute inset-0 border-2 border-orange-500/40 rounded-2xl pointer-events-none" />
        )}
      </motion.div>
    );
  };

  return (
    <section className="bg-zinc-950 border-t border-b border-zinc-900 py-16 px-4 sm:px-6 relative overflow-hidden text-left font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] bg-gradient-to-b from-orange-500/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-900">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-[10px] font-bold tracking-wider text-orange-500 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Maatwerk Portfolio</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase italic tracking-tighter leading-[1.0]">
              Interactieve <span className="text-orange-500">Website Layouts</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
              Geen standaard templates, maar prachtig ontworpen, razendsnelle websites die we echt hebben gemaakt. Selecteer een ontwerp hieronder en test de functionaliteiten direct live in het interactieve scherm!
            </p>
          </div>

          {/* Categorisatie Tab Switcher */}
          <div className="bg-zinc-900 p-1 rounded-2xl border border-zinc-800 flex items-center self-start md:self-auto shrink-0 shadow-inner">
            <button
              onClick={() => {
                setActiveTab('ambacht_bouw');
                setPreviewDevice('desktop');
              }}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'ambacht_bouw'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Ambacht &amp; Bouw</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('diensten_lifestyle');
                setPreviewDevice('desktop');
              }}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'diensten_lifestyle'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Lifestyle &amp; Zorg</span>
            </button>
          </div>
        </div>

        {/* Website Deck Slider */}
        <div className="space-y-4">
          <p className="text-[10px] font-black tracking-widest text-zinc-500 uppercase flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>Kies een gemaakt ontwerp om de details en live demo te laden:</span>
          </p>

          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-zinc-800 px-1 snap-x scroll-smooth">
            {currentProjects.map((project, index) => (
              <div key={project.id} className="snap-center">
                {renderWebsiteCard(project, index)}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Split Section (Details vs Interactive Preview Browser) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2"
          >
            
            {/* Left Column: Website Details & Pricing Info */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-zinc-900 border border-zinc-850 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
              
              <div className="space-y-5 text-left">
                
                {/* Header info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded border"
                      style={{ color: currentProject.colorHex, borderColor: `${currentProject.colorHex}33`, backgroundColor: `${currentProject.colorHex}11` }}
                    >
                      {currentProject.branch}
                    </span>
                    <span className="text-[9px] font-black text-white bg-emerald-600 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      100% Responsive
                    </span>
                  </div>
                  
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tighter uppercase italic leading-none">
                    {currentProject.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                    {currentProject.description}
                  </p>
                </div>

                {/* Key Metrics row */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-zinc-950/60 border border-zinc-850 p-3 rounded-xl flex flex-col gap-1">
                    <Tag className="w-4 h-4 text-orange-500" />
                    <span className="text-[9px] text-zinc-500 uppercase font-black tracking-wider">Vaste Prijs</span>
                    <span className="text-sm font-mono font-black text-white">{currentProject.price}</span>
                  </div>
                  <div className="bg-zinc-950/60 border border-zinc-850 p-3 rounded-xl flex flex-col gap-1">
                    <Hourglass className="w-4 h-4 text-orange-500" />
                    <span className="text-[9px] text-zinc-500 uppercase font-black tracking-wider">Oplevertijd</span>
                    <span className="text-sm font-mono font-black text-white">{currentProject.deliveryTime}</span>
                  </div>
                  <div className="bg-zinc-950/60 border border-zinc-850 p-3 rounded-xl flex flex-col gap-1">
                    <Zap className="w-4 h-4 text-emerald-500" />
                    <span className="text-[9px] text-zinc-500 uppercase font-black tracking-wider">Laadsnelheid</span>
                    <span className="text-sm font-mono font-black text-emerald-400">100/100</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    Inbegrepen in deze layout:
                  </h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>Volledig op maat gemaakt, passend bij jouw unieke huisstijl.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>Geïntegreerd interactief element (zoals prijsberekenaars of afsprakenplanners).</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>Optimale lokale vindbaarheid (SEO basisinrichting).</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>Betrouwbare hosting, SSL-certificaat en wekelijkse backups.</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Call to action at bottom */}
              <div className="border-t border-zinc-850 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Vindbaarheid &amp; Conversie</p>
                  <p className="text-xs font-semibold text-zinc-300">Gebouwd om bezoekers in klanten te veranderen.</p>
                </div>
                
                <button
                  onClick={() => {
                    const contactSec = document.getElementById('contact');
                    if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Kies dit ontwerp</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right Column: Embedded Interactive Live Browser Mockup */}
            <div className="lg:col-span-7 flex flex-col bg-zinc-900 border border-zinc-850 rounded-3xl overflow-hidden shadow-2xl min-h-[500px]">
              
              {/* Simulated Browser Frame Header */}
              <div className="bg-zinc-950 px-4 py-3 border-b border-zinc-850 flex items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-4">
                  {/* Close/Minimize/Maximize window dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  </div>
                  
                  {/* Simulated URL bar */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-1 text-zinc-400 font-mono text-[10px] sm:text-xs flex items-center gap-1.5 w-48 sm:w-72 truncate">
                    <Globe className="w-3 h-3 text-zinc-600" />
                    <span className="text-zinc-500">https://</span>
                    <span className="text-zinc-300 font-semibold">{currentProject.title.toLowerCase().replace(/\s+/g, '')}.nl</span>
                  </div>
                </div>

                {/* Device switches & External Link */}
                <div className="flex items-center gap-2">
                  <div className="bg-zinc-900 p-0.5 rounded-lg border border-zinc-800 flex items-center">
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-1.5 rounded transition-all cursor-pointer ${
                        previewDevice === 'desktop'
                          ? 'bg-zinc-850 text-white'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                      title="Desktop Weergave"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-1.5 rounded transition-all cursor-pointer ${
                        previewDevice === 'mobile'
                          ? 'bg-zinc-850 text-white'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                      title="Mobiele Weergave"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Simulated Screen Body Viewport */}
              <div className="flex-1 bg-zinc-950 relative overflow-hidden flex justify-center items-stretch p-4">
                
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>

                <div 
                  className={`relative flex-1 rounded-2xl overflow-hidden border border-zinc-850 shadow-inner bg-zinc-950 transition-all duration-500 ${
                    previewDevice === 'mobile' 
                      ? 'max-w-[340px] w-full mx-auto aspect-[9/16] h-[550px]' 
                      : 'w-full h-[550px]'
                  }`}
                >
                  {/* Browser viewport inner scrollable container */}
                  <div className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
                    <WebsiteContent projectId={currentProject.id} />
                  </div>

                  {/* Mobile Frame Overlay */}
                  {previewDevice === 'mobile' && (
                    <div className="absolute inset-0 border-4 border-zinc-800 rounded-2xl pointer-events-none shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]" />
                  )}
                </div>

              </div>

              {/* Status info bar */}
              <div className="bg-zinc-950 border-t border-zinc-850 px-4 py-2 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Interactieve weergave actief
                </span>
                <span>Probeer de forms &amp; calculators live!</span>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

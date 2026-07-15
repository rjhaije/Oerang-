import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SHOWCASE_STYLES, ShowcaseStyle } from '../data';
import { Sparkle, Check, Smartphone, Monitor } from 'lucide-react';

export default function StyleShowcase() {
  const [selectedStyle, setSelectedStyle] = useState<ShowcaseStyle>(SHOWCASE_STYLES[0]);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Mini mockup sample data based on selected style
  const renderMockup = () => {
    switch (selectedStyle.id) {
      case 'style_modern':
        return (
          <div className="flex flex-col h-full bg-slate-50 text-slate-800 transition-colors duration-500 font-sans">
            {/* Nav */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100 bg-white">
              <span className="font-bold tracking-tight text-slate-900 text-sm">Studio Balance</span>
              <div className="flex gap-2 text-[10px] text-slate-500 font-medium">
                <span>Over mij</span>
                <span>Tarieven</span>
                <span className="text-[#10b981] font-semibold">Boek Nu</span>
              </div>
            </div>
            {/* Hero */}
            <div className="flex-1 flex flex-col justify-center px-6 py-4 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#10b981] font-semibold mb-1">Mindfulness & Yoga</span>
              <h4 className="text-lg font-bold tracking-tight text-slate-900 leading-tight mb-2">
                Vind rust in een drukke wereld
              </h4>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto mb-4 leading-relaxed">
                Persoonlijke begeleiding en online cursussen om dichter bij jezelf te komen.
              </p>
              <div className="flex justify-center gap-2">
                <button className="px-3 py-1.5 bg-slate-900 text-white rounded text-[10px] font-medium hover:bg-slate-800 transition-colors">
                  Gratis intake
                </button>
                <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded text-[10px] font-medium bg-white">
                  Lees meer
                </button>
              </div>
            </div>
            {/* Visual element */}
            <div className="px-4 pb-4">
              <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <span className="text-emerald-500 text-xs">🌿</span>
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-semibold text-slate-800">Volgende groepsles</p>
                  <p className="text-[9px] text-slate-400">Morgen om 10:00 • 3 plekken over</p>
                </div>
                <span className="ml-auto text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">Actief</span>
              </div>
            </div>
          </div>
        );
      case 'style_warm':
        return (
          <div className="flex flex-col h-full bg-[#fdfbf7] text-amber-950 transition-colors duration-500">
            {/* Nav */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-amber-900/5 bg-[#fcf9f2]">
              <span className="font-serif font-bold text-amber-900 text-sm">Bakkerij De Korst</span>
              <div className="flex gap-2 text-[10px] text-amber-800/80 font-serif">
                <span>Ons Brood</span>
                <span>Winkels</span>
                <span className="text-[#d97706] font-semibold">Bestel</span>
              </div>
            </div>
            {/* Hero */}
            <div className="flex-1 flex flex-col justify-center px-6 py-4 text-center">
              <span className="text-[10px] italic text-[#d97706] mb-1">Sinds 1924 ambachtelijk gebakken</span>
              <h4 className="text-xl font-serif font-bold text-amber-900 leading-tight mb-2">
                Dagelijks vers, met passie bereid
              </h4>
              <p className="text-[11px] text-amber-800/70 max-w-xs mx-auto mb-4 leading-relaxed">
                Wij gebruiken uitsluitend lokale biologische granen en geven ons deeg 24 uur de tijd om te rijzen.
              </p>
              <div className="flex justify-center gap-2">
                <button className="px-3 py-1.5 bg-[#d97706] text-white rounded-md text-[10px] font-semibold shadow-xs hover:bg-amber-700 transition-colors">
                  Bekijk assortiment
                </button>
              </div>
            </div>
            {/* Decorative block */}
            <div className="px-4 pb-4">
              <div className="bg-[#f5ebd7] p-2.5 rounded-lg border border-amber-900/10 flex items-center justify-between text-left">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#d97706] font-bold">Aanbieding van de week</span>
                  <p className="text-[11px] font-bold text-amber-900">Desembrood van de maand</p>
                </div>
                <span className="text-xs font-serif font-bold text-[#d97706]">€ 3,95</span>
              </div>
            </div>
          </div>
        );
      case 'style_bold':
        return (
          <div className="flex flex-col h-full bg-[#0f172a] text-slate-100 transition-colors duration-500 font-sans">
            {/* Nav */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-slate-800 bg-[#0b1329]">
              <span className="font-black uppercase tracking-wider text-white text-sm">IRON GYM</span>
              <div className="flex gap-2 text-[10px] text-slate-300 font-bold uppercase tracking-wider">
                <span>Tarieven</span>
                <span className="text-[#ef4444]">Lid Worden</span>
              </div>
            </div>
            {/* Hero */}
            <div className="flex-1 flex flex-col justify-center px-6 py-4 text-center">
              <span className="inline-block px-2 py-0.5 bg-[#ef4444]/20 text-[#ef4444] text-[8px] font-black uppercase tracking-widest rounded mx-auto mb-2">
                No pain, no gain
              </span>
              <h4 className="text-2xl font-extrabold uppercase tracking-tight text-white leading-none mb-2">
                PUSH YOUR LIMITS
              </h4>
              <p className="text-[10px] text-slate-400 max-w-xs mx-auto mb-4 leading-relaxed font-semibold">
                De meest complete fitness in jouw regio. 24/7 geopend, gecertificeerde coaches en topapparatuur.
              </p>
              <div className="flex justify-center">
                <button className="px-4 py-2 bg-[#ef4444] text-white font-black text-[10px] uppercase tracking-wider rounded-none shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all transform hover:scale-105">
                  Proefles Boeken
                </button>
              </div>
            </div>
            {/* Gym metric block */}
            <div className="px-4 pb-4">
              <div className="bg-[#1e293b] p-2 rounded-md border border-slate-800 flex justify-around text-center">
                <div>
                  <p className="text-xs font-black text-white">45+</p>
                  <p className="text-[8px] text-slate-400 uppercase">Apparaten</p>
                </div>
                <div className="border-l border-slate-800"></div>
                <div>
                  <p className="text-xs font-black text-[#ef4444]">24/7</p>
                  <p className="text-[8px] text-slate-400 uppercase">Toegang</p>
                </div>
                <div className="border-l border-slate-800"></div>
                <div>
                  <p className="text-xs font-black text-white">100%</p>
                  <p className="text-[8px] text-slate-400 uppercase">Resultaat</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'style_fresh':
        return (
          <div className="flex flex-col h-full bg-[#fffbfe] text-neutral-800 transition-colors duration-500 font-sans">
            {/* Nav */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-pink-50 bg-white">
              <span className="font-bold tracking-tight text-neutral-900 text-sm">🌸 Bloesem Salon</span>
              <div className="flex gap-2 text-[10px] text-neutral-500 font-medium">
                <span>Diensten</span>
                <span>Over ons</span>
                <span className="text-[#ec4899] font-semibold">Afspraak</span>
              </div>
            </div>
            {/* Hero */}
            <div className="flex-1 flex flex-col justify-center px-6 py-4 text-center">
              <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-2">
                <Sparkle className="w-3.5 h-3.5 text-[#ec4899]" />
              </div>
              <h4 className="text-lg font-bold tracking-tight text-neutral-900 leading-tight mb-2">
                Stralend & ontspannen
              </h4>
              <p className="text-[11px] text-neutral-500 max-w-xs mx-auto mb-4 leading-relaxed">
                Gun jezelf een heerlijk moment van verwennerij. Gezichtsbehandelingen, massages en nagelstyling.
              </p>
              <div className="flex justify-center">
                <button className="px-4 py-1.5 bg-[#ec4899] text-white rounded-full text-[10px] font-medium shadow-sm hover:bg-pink-600 transition-colors">
                  Plan verwenmoment
                </button>
              </div>
            </div>
            {/* Review pill */}
            <div className="px-4 pb-4">
              <div className="bg-white py-2 px-3 rounded-full border border-pink-100 shadow-xs flex items-center justify-center gap-1">
                <span className="text-[#ec4899] text-[10px]">★★★★★</span>
                <span className="text-[9px] text-neutral-500 font-medium">"Altijd perfect verzorgd!" - Lisa</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div id="style-showcase" className="bg-white rounded-[32px] border border-brand-sand-dark shadow-xl p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Text & Selection */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-brand-sand-dark text-brand-moss rounded-full text-xs font-semibold mb-3">
              <Sparkle className="w-3.5 h-3.5 text-brand-clay animate-spin-slow" />
              <span>Kies je eigen stijl</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-display font-bold text-brand-forest tracking-tight">
              Kies de stijl die bij jouw onderneming past
            </h3>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Geen standaard dertien-in-een-dozijn sites. Oerang levert een stijl die past bij jouw branche, doelgroep en uitstraling. Klik op een stijl om de live simulatie te bekijken.
            </p>
          </div>

          <div className="space-y-3">
            {SHOWCASE_STYLES.map((style) => {
              const isSelected = selectedStyle.id === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 border flex items-center justify-between group ${
                    isSelected
                      ? 'bg-brand-forest border-brand-forest text-white shadow-lg'
                      : 'bg-brand-sand border-brand-sand-dark text-brand-charcoal hover:bg-brand-sand-dark hover:border-gray-300'
                  }`}
                >
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${isSelected ? 'text-brand-clay' : 'text-brand-moss'}`}>
                      {style.category}
                    </p>
                    <h4 className="font-display font-bold text-base">{style.name}</h4>
                    <p className={`text-xs mt-0.5 ${isSelected ? 'text-gray-200' : 'text-gray-500'}`}>
                      {style.tagline}
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-brand-clay text-white' : 'bg-white text-gray-300 group-hover:text-brand-clay'
                  }`}>
                    {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Live Preview Panel */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Header toolbar for device selection */}
          <div className="w-full max-w-md flex justify-between items-center mb-4 bg-brand-sand-dark p-1.5 rounded-lg border border-brand-sand-dark">
            <span className="text-[11px] font-bold text-brand-moss px-2 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-clay opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-clay"></span>
              </span>
              Oerang Ontwerpsimulator
            </span>
            
            <div className="flex gap-1 bg-white p-0.5 rounded-md shadow-xs">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'desktop'
                    ? 'bg-brand-forest text-white'
                    : 'text-gray-500 hover:text-brand-forest'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === 'mobile'
                    ? 'bg-brand-forest text-white'
                    : 'text-gray-500 hover:text-brand-forest'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobiel</span>
              </button>
            </div>
          </div>

          {/* Browser / Phone Shell container */}
          <div className="w-full flex justify-center items-center">
            <AnimatePresence mode="wait">
              {viewMode === 'desktop' ? (
                <motion.div
                  key="desktop-shell"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-lg aspect-video bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
                >
                  {/* Browser top-bar */}
                  <div className="bg-slate-100 px-4 py-2 flex items-center gap-2 border-b border-slate-200">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                    </div>
                    <div className="bg-white rounded text-[10px] text-gray-400 px-3 py-0.5 w-1/2 mx-auto text-center font-mono border border-slate-200 truncate">
                      jouw-bedrijf.oerang.nl
                    </div>
                  </div>
                  {/* Webpage Content */}
                  <div className="flex-1 overflow-hidden relative">
                    {renderMockup()}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="mobile-shell"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                  className="w-64 h-[420px] bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-800 relative flex flex-col overflow-hidden"
                >
                  {/* Phone notch */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-b-xl z-20"></div>
                  {/* Phone Screen inside */}
                  <div className="flex-1 bg-white rounded-[1.8rem] overflow-hidden flex flex-col relative pt-5 border border-slate-800">
                    {renderMockup()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Mockup Details List */}
          <div className="w-full max-w-md mt-6 bg-brand-sand p-4 rounded-xl border border-brand-sand-dark text-left">
            <p className="text-xs font-bold text-brand-moss uppercase tracking-wider mb-2">Kenmerken van deze stijl:</p>
            <div className="grid grid-cols-2 gap-2">
              {selectedStyle.mockupItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-clay" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

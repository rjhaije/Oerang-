import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CALCULATOR_OPTIONS, CalculatorOption } from '../data';
import { 
  Check, 
  Mail, 
  Phone, 
  Building2, 
  ChevronRight, 
  CornerDownRight, 
  HeartHandshake, 
  ShieldAlert, 
  BadgePercent, 
  Sparkles,
  Zap,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

export default function Calculator() {
  // Always select 'webdesign' and 'hosting' as default required options
  const [selectedIds, setSelectedIds] = useState<string[]>(['webdesign', 'hosting']);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [formData, setFormData] = useState({
    companyName: '',
    branch: '',
    fullName: '',
    email: '',
    phone: '',
    comments: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleToggleOption = (id: string) => {
    // Cannot toggle off basic options
    if (id === 'webdesign' || id === 'hosting') return;

    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedOptions = CALCULATOR_OPTIONS.filter((opt) => selectedIds.includes(opt.id));

  // Compute prices
  const totalSetup = selectedOptions.reduce((acc, opt) => acc + opt.setupPrice, 0);
  const totalMonthly = selectedOptions.reduce((acc, opt) => acc + opt.monthlyPrice, 0);

  // Traditional agency comparison estimation
  const traditionalSetup = 1499 + (selectedOptions.length - 2) * 200;
  const traditionalMonthly = 59 + (selectedOptions.length - 2) * 10;
  const savingsSetup = traditionalSetup - totalSetup;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.companyName.trim()) errors.companyName = 'Bedrijfsnaam is verplicht.';
    if (!formData.fullName.trim()) errors.fullName = 'Naam is verplicht.';
    if (!formData.email.trim()) {
      errors.email = 'E-mailadres is verplicht.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Vul een geldig e-mailadres in.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Telefoonnummer is verplicht.';
    } else if (!/^[0-9\-\+\s]{8,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Vul een geldig telefoonnummer in.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setStep(3);
    }
  };

  return (
    <div id="cost-calculator" className="bg-zinc-950 rounded-[32px] border border-zinc-800 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
      
      {/* Header bar with ultra-slick step indicators matching the screaming bento orange theme */}
      <div className="bg-zinc-900 px-6 py-6 md:px-8 border-b border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-brand-clay/10 border border-brand-clay/30 rounded-full text-[10px] font-bold tracking-wider text-brand-clay uppercase">
            <Sparkles className="w-3 h-3" />
            <span>Interactieve Configurator</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight leading-none uppercase italic">
            Ontwerp & Bereken <span className="text-brand-clay">Jouw Site</span>
          </h3>
          <p className="text-xs text-zinc-400">
            Stel jouw ideale budget website samen en zie direct live je investering. Vrijblijvend en transparant.
          </p>
        </div>
        
        {/* Modern Stepper Indicator */}
        <div className="flex items-center gap-2 md:gap-3 bg-zinc-950 p-2 rounded-2xl border border-zinc-800/80">
          <button 
            onClick={() => step > 1 && setStep(1)}
            disabled={step === 3}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              step === 1 
                ? 'bg-brand-clay text-white shadow-md shadow-orange-950/20' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <span className="w-5 h-5 rounded-lg bg-zinc-900 flex items-center justify-center text-[10px] font-mono border border-zinc-800">1</span>
            <span>Opties</span>
          </button>
          
          <div className="w-3 h-[1px] bg-zinc-800" />
          
          <button 
            onClick={() => step === 2 && setStep(2)}
            disabled={step === 3}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              step === 2 
                ? 'bg-brand-clay text-white shadow-md shadow-orange-950/20' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
            }`}
          >
            <span className="w-5 h-5 rounded-lg bg-zinc-900 flex items-center justify-center text-[10px] font-mono border border-zinc-800">2</span>
            <span>Gegevens</span>
          </button>
          
          <div className="w-3 h-[1px] bg-zinc-800" />
          
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            step === 3 
              ? 'bg-emerald-600 text-white' 
              : 'text-zinc-500'
          }`}>
            <span className="w-5 h-5 rounded-lg bg-zinc-900 flex items-center justify-center text-[10px] font-mono border border-zinc-800">3</span>
            <span>Klaar</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left column: Interactive form and option panels */}
        <div className="lg:col-span-7 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-950/20">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-options"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="font-display font-bold text-lg text-white uppercase italic">1. Breid je website uit met extra's</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    De basis is altijd volledig inbegrepen. Vink extra opties aan om jouw website direct van extra functies te voorzien.
                  </p>
                </div>

                {/* Categories */}
                {['basis', 'extra', 'groei'].map((cat) => {
                  const items = CALCULATOR_OPTIONS.filter((opt) => opt.category === cat);
                  const catLabel = cat === 'basis' 
                    ? 'Altijd inbegrepen basis' 
                    : cat === 'extra' 
                      ? 'Veelgekozen extra opties' 
                      : 'Conversieverhogers & groei';
                  
                  return (
                    <div key={cat} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-clay" />
                        <p className="text-[11px] font-black tracking-wider text-brand-clay uppercase font-display italic">{catLabel}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2.5">
                        {items.map((opt) => {
                          const isSelected = selectedIds.includes(opt.id);
                          const isRequired = opt.id === 'webdesign' || opt.id === 'hosting';
                          
                          return (
                            <div
                              key={opt.id}
                              onClick={() => handleToggleOption(opt.id)}
                              className={`p-4 rounded-2xl border text-left transition-all duration-300 flex gap-4 relative group ${
                                isSelected
                                  ? 'bg-zinc-900 border-zinc-700 shadow-[0_4px_20px_rgba(255,92,0,0.06)]'
                                  : 'bg-zinc-900/30 border-zinc-800/80 hover:border-zinc-750 hover:bg-zinc-900/50'
                              } ${isRequired ? 'cursor-default pointer-events-none' : 'cursor-pointer'}`}
                            >
                              {/* Icon container */}
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                                isSelected 
                                  ? 'bg-brand-clay/10 text-brand-clay border-brand-clay/30' 
                                  : 'bg-zinc-950 text-zinc-400 border-zinc-800 group-hover:text-white'
                              }`}>
                                <opt.icon className="w-5 h-5" />
                              </div>

                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h5 className="font-display font-bold text-sm text-white">{opt.name}</h5>
                                  {isRequired && (
                                    <span className="text-[8px] bg-brand-clay/15 text-brand-clay px-2 py-0.5 rounded-md font-bold uppercase tracking-wider border border-brand-clay/20">
                                      Standaard
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{opt.description}</p>
                                
                                {/* Cost badges */}
                                <div className="flex gap-3 mt-2.5 text-[11px] font-mono">
                                  {opt.setupPrice > 0 && (
                                    <span className="bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 text-zinc-300 font-medium">
                                      Setup: <span className="text-white font-bold">€{opt.setupPrice},-</span>
                                    </span>
                                  )}
                                  {opt.monthlyPrice > 0 && (
                                    <span className="bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 text-zinc-300 font-medium">
                                      Maandelijks: <span className="text-brand-clay font-bold">€{opt.monthlyPrice}/mnd</span>
                                    </span>
                                  )}
                                  {opt.setupPrice === 0 && opt.monthlyPrice === 0 && (
                                    <span className="bg-brand-clay/10 px-2 py-0.5 rounded border border-brand-clay/20 text-brand-clay font-black uppercase text-[9px] tracking-wider">
                                      Volledig Gratis
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Circular check box */}
                              <div className="shrink-0 flex items-start justify-end pt-0.5">
                                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                                  isSelected 
                                    ? 'bg-brand-clay border-brand-clay text-white shadow-sm shadow-orange-950/20' 
                                    : 'border-zinc-700 bg-zinc-950 group-hover:border-zinc-500'
                                }`}>
                                  {isSelected && <Check className="w-3 h-3 stroke-[3.5]" />}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Next step CTA */}
                <div className="pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-brand-clay text-white font-display font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-orange-950/30 hover:bg-orange-600 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Volgende stap: Gegevens invullen</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-form"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="font-display font-bold text-lg text-white uppercase italic">2. Ontvang jouw vrijblijvende offerte</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Vul je contactgegevens in. We sturen je direct een specificatie van je gekozen configuratie toe en bellen je voor een gratis adviesgesprek.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Bedrijfsnaam <span className="text-brand-clay">*</span></label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                        <input
                          type="text"
                          name="companyName"
                          placeholder="Bijv. Bakkerij Janssen"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-zinc-900 border text-white text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-clay focus:border-brand-clay placeholder-zinc-650 transition-colors ${
                            formErrors.companyName ? 'border-red-500/80 ring-1 ring-red-500/20' : 'border-zinc-800'
                          }`}
                        />
                      </div>
                      {formErrors.companyName && <p className="text-red-400 text-[10px] font-semibold">{formErrors.companyName}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Branche / Sector</label>
                      <input
                        type="text"
                        name="branch"
                        placeholder="Bijv. Horeca, ZZP Coach, Schilder"
                        value={formData.branch}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-clay focus:border-brand-clay placeholder-zinc-650 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Naam Contactpersoon <span className="text-brand-clay">*</span></label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Voor- en achternaam"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-zinc-900 border text-white text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-clay focus:border-brand-clay placeholder-zinc-650 transition-colors ${
                          formErrors.fullName ? 'border-red-500/80 ring-1 ring-red-500/20' : 'border-zinc-800'
                        }`}
                      />
                      {formErrors.fullName && <p className="text-red-400 text-[10px] font-semibold">{formErrors.fullName}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Telefoonnummer <span className="text-brand-clay">*</span></label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                        <input
                          type="text"
                          name="phone"
                          placeholder="Bijv. 0612345678"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-zinc-900 border text-white text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-clay focus:border-brand-clay placeholder-zinc-650 transition-colors ${
                            formErrors.phone ? 'border-red-500/80 ring-1 ring-red-500/20' : 'border-zinc-800'
                          }`}
                        />
                      </div>
                      {formErrors.phone && <p className="text-red-400 text-[10px] font-semibold">{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">E-mailadres <span className="text-brand-clay">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                      <input
                        type="email"
                        name="email"
                        placeholder="naam@voorbeeld.nl"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-zinc-900 border text-white text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-clay focus:border-brand-clay placeholder-zinc-650 transition-colors ${
                          formErrors.email ? 'border-red-500/80 ring-1 ring-red-500/20' : 'border-zinc-800'
                        }`}
                      />
                    </div>
                    {formErrors.email && <p className="text-red-400 text-[10px] font-semibold">{formErrors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Opmerkingen of specifieke wensen (Optioneel)</label>
                    <textarea
                      name="comments"
                      rows={3}
                      placeholder="Bijv. 'Ik heb al een domeinnaam' of 'Graag met een online reservering-systeem'."
                      value={formData.comments}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-clay focus:border-brand-clay placeholder-zinc-650 resize-none transition-colors"
                    />
                  </div>

                  {/* Anti-slop / safety trust seal */}
                  <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 text-xs text-zinc-400 flex gap-3">
                    <HeartHandshake className="w-5 h-5 text-brand-clay shrink-0" />
                    <span className="leading-relaxed">
                      <strong className="text-white">100% Vrijblijvende Aanvraag:</strong> Dit is een indicatieve configuratie. Je zit nergens aan vast. We controleren je aanvraag, adviseren je over de beste opties en sturen pas daarna een definitieve offerte.
                    </span>
                  </div>

                  {/* Nav buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-3.5 border border-zinc-800 font-display font-bold text-xs uppercase tracking-wider text-zinc-400 rounded-xl hover:text-white hover:bg-zinc-900 transition-colors"
                    >
                      Terug
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-brand-clay text-white font-display font-black text-xs uppercase tracking-widest rounded-xl shadow-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Vrijblijvende Aanvraag Versturen</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-10 px-4 space-y-6"
              >
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-2xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  ✓
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-display font-black text-xl text-white uppercase italic">Configuratie ontvangen!</h4>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Bedankt, <strong className="text-white">{formData.fullName}</strong>! We hebben je indicatieve aanvraag voor <strong className="text-white">{formData.companyName || 'jouw bedrijf'}</strong> succesvol ontvangen.
                  </p>
                </div>

                {/* Monospace invoice-style receipt box, revamped to look incredibly professional */}
                <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 text-left max-w-md mx-auto space-y-4 font-mono text-[11px] leading-relaxed relative">
                  <div className="absolute top-0 right-4 transform -translate-y-1/2 bg-brand-clay text-white px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest">
                    INDICATIE
                  </div>
                  
                  <div className="border-b border-dashed border-zinc-800 pb-2.5 text-center font-bold text-white uppercase tracking-wider text-xs">
                    === SPECIFICATIE CONFIGURATIE ===
                  </div>
                  
                  <div className="space-y-1 text-zinc-400">
                    <p><span className="text-zinc-500">Bedrijf:</span> {formData.companyName}</p>
                    {formData.branch && <p><span className="text-zinc-500">Branche:</span> {formData.branch}</p>}
                    <p><span className="text-zinc-500">E-mail:</span> {formData.email}</p>
                    <p><span className="text-zinc-500">Tel:</span> {formData.phone}</p>
                  </div>

                  <div className="border-b border-dashed border-zinc-800 my-2"></div>

                  <div className="space-y-1.5">
                    <p className="text-brand-clay font-bold uppercase text-[9px] tracking-wider mb-1">Geselecteerde Diensten:</p>
                    {selectedOptions.map((opt) => (
                      <div key={opt.id} className="flex justify-between text-zinc-300 text-[10px]">
                        <span>* {opt.name}</span>
                        <span className="text-zinc-400">
                          {opt.setupPrice > 0 ? `€${opt.setupPrice}` : ''}
                          {opt.setupPrice > 0 && opt.monthlyPrice > 0 ? ' + ' : ''}
                          {opt.monthlyPrice > 0 ? `€${opt.monthlyPrice}/m` : ''}
                          {opt.setupPrice === 0 && opt.monthlyPrice === 0 ? 'Gratis' : ''}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-b border-dashed border-zinc-800 my-2"></div>

                  <div className="space-y-1 font-bold text-xs">
                    <div className="flex justify-between text-white">
                      <span>Totale Setup (eenmalig):</span>
                      <span className="text-brand-clay">€{totalSetup},-</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Hosting & Backups:</span>
                      <span className="text-brand-clay">€{totalMonthly}/mnd</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Onze experts nemen binnen 24 uur (vaak al binnen een paar uur) contact met je op om je keuzes door te nemen en een definitief, vrijblijvend voorstel te doen.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setStep(1);
                      setSelectedIds(['webdesign', 'hosting']);
                    }}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-850 text-white rounded-xl text-xs font-bold border border-zinc-800 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Nieuwe berekening maken</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right column: Interactive real-time Receipt/Bill preview */}
        <div className="lg:col-span-5 bg-zinc-900/60 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h4 className="font-display font-black text-xs text-white uppercase tracking-widest italic flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-clay animate-pulse" />
                Live Prijsoverzicht
              </h4>
              <p className="text-[11px] text-zinc-500 mt-0.5">Direct bijgewerkt op basis van je selectie</p>
            </div>

            {/* Configured options receipt items list */}
            <div className="space-y-3 border-b border-zinc-800 pb-5">
              {selectedOptions.map((opt) => (
                <div key={opt.id} className="flex justify-between items-start text-xs text-zinc-300">
                  <div className="flex items-start gap-1.5 min-w-0">
                    <Check className="w-3.5 h-3.5 text-brand-clay shrink-0 mt-0.5" />
                    <span className="truncate font-medium">{opt.name}</span>
                  </div>
                  <div className="text-right shrink-0 ml-2 font-mono text-[11px]">
                    {opt.setupPrice > 0 && <span className="font-bold text-white">€{opt.setupPrice}</span>}
                    {opt.setupPrice > 0 && opt.monthlyPrice > 0 && <span className="text-zinc-650 mx-1">+</span>}
                    {opt.monthlyPrice > 0 && <span className="text-brand-clay font-bold">€{opt.monthlyPrice}/m</span>}
                    {opt.setupPrice === 0 && opt.monthlyPrice === 0 && <span className="text-emerald-500 font-bold uppercase text-[9px] tracking-wider">Gratis</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Dynamic Totals */}
            <div className="space-y-4">
              <div className="flex justify-between items-end bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/60">
                <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-wider font-display">Setupkosten</p>
                  <p className="text-[10px] text-zinc-500">Eenmalige investering</p>
                </div>
                <div className="text-right">
                  <span className="font-display font-black text-2xl text-white">€{totalSetup},-</span>
                  <p className="text-[9px] text-zinc-500 font-semibold mt-0.5">Excl. BTW</p>
                </div>
              </div>

              <div className="flex justify-between items-end bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/60">
                <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-wider font-display">Hosting & Support</p>
                  <p className="text-[10px] text-zinc-500">Maandelijkse kosten</p>
                </div>
                <div className="text-right">
                  <span className="font-display font-black text-xl text-brand-clay">€{totalMonthly},-</span>
                  <p className="text-[9px] text-zinc-500 font-semibold mt-0.5">Maandelijks opzegbaar</p>
                </div>
              </div>
            </div>

            {/* Gorgeous dynamic savings badge */}
            <div className="bg-orange-500/5 p-4 rounded-2xl border border-brand-clay/25 space-y-2 text-left relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-brand-clay/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-1.5">
                <BadgePercent className="w-4 h-4 text-brand-clay" />
                <span className="text-xs font-black text-white uppercase tracking-wider font-display italic">Jouw Oerang Voordeel</span>
              </div>
              
              <p className="text-[11px] text-zinc-400 leading-normal">
                Traditionele webdesignbureaus rekenen gemiddeld <strong className="text-white">€{traditionalSetup},-</strong> setup en <strong className="text-white">€{traditionalMonthly},-</strong> p.m. voor exact dezelfde kwaliteit.
              </p>

              <div className="bg-zinc-950/60 px-3 py-2 rounded-xl border border-zinc-850 flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-400">Je bespaart direct:</span>
                <span className="font-display font-black text-brand-clay text-sm">€{savingsSetup},-</span>
              </div>
            </div>
          </div>

          {/* Absolute Trust & Quality Checklist */}
          <div className="mt-6 pt-5 border-t border-zinc-800 space-y-2.5">
            <div className="flex items-center gap-2 text-[11px] text-zinc-300 font-medium">
              <div className="w-4 h-4 rounded-full bg-brand-clay/10 flex items-center justify-center shrink-0 border border-brand-clay/35">
                <Check className="w-2.5 h-2.5 text-brand-clay stroke-[3]" />
              </div>
              <span>Online binnen 14 dagen</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-300 font-medium">
              <div className="w-4 h-4 rounded-full bg-brand-clay/10 flex items-center justify-center shrink-0 border border-brand-clay/35">
                <Check className="w-2.5 h-2.5 text-brand-clay stroke-[3]" />
              </div>
              <span>100% Mobielvriendelijk (responsive)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-300 font-medium">
              <div className="w-4 h-4 rounded-full bg-brand-clay/10 flex items-center justify-center shrink-0 border border-brand-clay/35">
                <Check className="w-2.5 h-2.5 text-brand-clay stroke-[3]" />
              </div>
              <span>Volledig eigendom, geen wurgcontracten</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

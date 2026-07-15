import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CALCULATOR_OPTIONS, CalculatorOption } from '../data';
import { Check, Mail, Phone, Building2, ChevronRight, CornerDownRight, HeartHandshake, ShieldAlert, BadgePercent, Sparkles } from 'lucide-react';

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
    <div id="cost-calculator" className="bg-white rounded-[32px] border border-brand-sand-dark shadow-xl overflow-hidden">
      
      {/* Header bar / Step Progress indicators */}
      <div className="bg-brand-forest text-white px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-moss">
        <div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <span>Ontwerp & Bereken Jouw Site</span>
          </h3>
          <p className="text-xs text-gray-300 mt-1">Stel jouw ideale budget website samen en ontvang direct een heldere prijsopgave.</p>
        </div>
        
        {/* Step dots */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 1 ? 'bg-brand-clay text-white' : 'bg-brand-moss text-gray-300'
            }`}>1</span>
            <span className={`text-xs font-semibold ${step === 1 ? 'text-white' : 'text-gray-300'}`}>Opties</span>
          </div>
          <div className="w-6 h-[2px] bg-brand-moss" />
          <div className="flex items-center gap-1.5">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 2 ? 'bg-brand-clay text-white' : 'bg-brand-moss text-gray-300'
            }`}>2</span>
            <span className={`text-xs font-semibold ${step === 2 ? 'text-white' : 'text-gray-300'}`}>Gegevens</span>
          </div>
          <div className="w-6 h-[2px] bg-brand-moss" />
          <div className="flex items-center gap-1.5">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 3 ? 'bg-brand-clay text-white' : 'bg-brand-moss text-gray-300'
            }`}>3</span>
            <span className={`text-xs font-semibold ${step === 3 ? 'text-white' : 'text-gray-300'}`}>Klaar</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left: Interactive Section */}
        <div className="lg:col-span-7 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-brand-sand-dark">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-options"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="font-display font-bold text-lg text-brand-forest">1. Kies jouw gewenste onderdelen</h4>
                  <p className="text-xs text-gray-500 mt-1">De basis is altijd inbegrepen. Vink extra functionaliteiten aan om jouw site uit te breiden.</p>
                </div>

                {/* Categories */}
                {['basis', 'extra', 'groei'].map((cat) => {
                  const items = CALCULATOR_OPTIONS.filter((opt) => opt.category === cat);
                  const catLabel = cat === 'basis' ? 'Altijd inbegrepen (Basis)' : cat === 'extra' ? 'Extra Mogelijkheden' : 'Doorgroeien & Webshop';
                  
                  return (
                    <div key={cat} className="space-y-3">
                      <p className="text-[11px] font-bold tracking-widest text-brand-moss uppercase">{catLabel}</p>
                      
                      <div className="space-y-2">
                        {items.map((opt) => {
                          const isSelected = selectedIds.includes(opt.id);
                          const isRequired = opt.id === 'webdesign' || opt.id === 'hosting';
                          
                          return (
                            <div
                              key={opt.id}
                              onClick={() => handleToggleOption(opt.id)}
                              className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex gap-3 relative group ${
                                isSelected
                                  ? 'bg-brand-sand border-brand-moss/40 shadow-xs'
                                  : 'bg-white border-brand-sand-dark hover:border-gray-300 hover:bg-brand-sand/30'
                              } ${isRequired ? 'cursor-default pointer-events-none' : ''}`}
                            >
                              {/* Icon container */}
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-brand-forest text-white' : 'bg-brand-sand text-brand-moss'
                              }`}>
                                <opt.icon className="w-5 h-5" />
                              </div>

                              {/* Details */}
                              <div className="flex-1 text-left">
                                <div className="flex items-center gap-1.5">
                                  <h5 className="font-display font-bold text-sm text-brand-charcoal">{opt.name}</h5>
                                  {isRequired && (
                                    <span className="text-[9px] bg-brand-forest/10 text-brand-moss px-2 py-0.5 rounded-full font-bold">
                                      Vereist
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{opt.description}</p>
                                
                                {/* Cost breakdown label */}
                                <div className="flex gap-4 mt-2 text-xs font-semibold text-brand-moss">
                                  {opt.setupPrice > 0 && (
                                    <span>Setup: €{opt.setupPrice},-</span>
                                  )}
                                  {opt.monthlyPrice > 0 && (
                                    <span>Maandelijks: €{opt.monthlyPrice}/mnd</span>
                                  )}
                                  {opt.setupPrice === 0 && opt.monthlyPrice === 0 && (
                                    <span className="text-brand-clay font-bold">Gratis</span>
                                  )}
                                </div>
                              </div>

                              {/* Checkbox circle */}
                              <div className="shrink-0 flex items-start justify-end pt-1">
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                  isSelected 
                                    ? 'bg-brand-clay border-brand-clay text-white' 
                                    : 'border-gray-300 bg-white group-hover:border-brand-clay'
                                }`}>
                                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Continue button */}
                <div className="pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-brand-forest text-white font-display font-bold rounded-xl shadow-lg hover:bg-brand-moss transition-all flex items-center justify-center gap-2 group"
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
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="font-display font-bold text-lg text-brand-forest">2. Jouw contact- en bedrijfsgegevens</h4>
                  <p className="text-xs text-gray-500 mt-1">Vul deze gegevens in om jouw vrijblijvende offerte en een gratis adviesgesprek aan te vragen.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-moss uppercase mb-1">Bedrijfsnaam <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="companyName"
                          placeholder="Bijv. Bakkerij Janssen"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-brand-sand/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-moss ${
                            formErrors.companyName ? 'border-red-300 ring-1 ring-red-300' : 'border-brand-sand-dark'
                          }`}
                        />
                      </div>
                      {formErrors.companyName && <p className="text-red-500 text-[11px] mt-1 font-semibold">{formErrors.companyName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-moss uppercase mb-1">Branche / Sector</label>
                      <input
                        type="text"
                        name="branch"
                        placeholder="Bijv. Horeca, ZZP Coach, Schilder"
                        value={formData.branch}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-brand-sand-dark bg-brand-sand/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-moss"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-moss uppercase mb-1">Contactpersoon <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Voor- en achternaam"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border bg-brand-sand/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-moss ${
                          formErrors.fullName ? 'border-red-300 ring-1 ring-red-300' : 'border-brand-sand-dark'
                        }`}
                      />
                      {formErrors.fullName && <p className="text-red-500 text-[11px] mt-1 font-semibold">{formErrors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-moss uppercase mb-1">Telefoonnummer <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="phone"
                          placeholder="Bijv. 0612345678"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-brand-sand/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-moss ${
                            formErrors.phone ? 'border-red-300 ring-1 ring-red-300' : 'border-brand-sand-dark'
                          }`}
                        />
                      </div>
                      {formErrors.phone && <p className="text-red-500 text-[11px] mt-1 font-semibold">{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-moss uppercase mb-1">E-mailadres <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="naam@voorbeeld.nl"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-brand-sand/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-moss ${
                          formErrors.email ? 'border-red-300 ring-1 ring-red-300' : 'border-brand-sand-dark'
                        }`}
                      />
                    </div>
                    {formErrors.email && <p className="text-red-500 text-[11px] mt-1 font-semibold">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-moss uppercase mb-1">Heb je nog vragen of specifieke wensen? (Optioneel)</label>
                    <textarea
                      name="comments"
                      rows={3}
                      placeholder="Bijv. 'Ik heb hulp nodig met de teksten' of 'Ik heb al een domeinnaam bij Hostnet'."
                      value={formData.comments}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-sand-dark bg-brand-sand/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-moss resize-none"
                    />
                  </div>

                  {/* Safety note */}
                  <div className="bg-brand-sand p-3.5 rounded-xl border border-brand-sand-dark text-xs text-gray-600 flex gap-2">
                    <HeartHandshake className="w-5 h-5 text-brand-moss shrink-0" />
                    <span><strong>100% Vrijblijvend:</strong> Dit is een prijsindicatie en aanvraag. Je zit nergens aan vast. We bellen of mailen je om je wensen te bespreken en sturen pas daarna een definitief voorstel.</span>
                  </div>

                  {/* Nav buttons */}
                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-4 border border-brand-sand-dark font-display font-bold text-brand-moss rounded-xl hover:bg-brand-sand transition-all"
                    >
                      Terug
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-brand-clay text-white font-display font-bold rounded-xl shadow-lg hover:bg-amber-700 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Vrijblijvende Aanvraag Versturen</span>
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
                className="text-center py-12 px-4 space-y-6"
              >
                <div className="w-16 h-16 bg-brand-forest text-white rounded-full flex items-center justify-center mx-auto text-3xl shadow-xl">
                  🎉
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-2xl text-brand-forest">Aanvraag succesvol ontvangen!</h4>
                  <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    Bedankt, <strong className="text-brand-moss">{formData.fullName}</strong>! We hebben je indicatieve configuratie voor <strong className="text-brand-moss">{formData.companyName}</strong> in goede orde ontvangen.
                  </p>
                </div>

                <div className="bg-brand-sand p-6 rounded-xl border border-brand-sand-dark text-left max-w-md mx-auto space-y-3 font-mono text-xs">
                  <div className="border-b border-dashed border-gray-300 pb-2 text-center font-bold text-brand-forest text-sm">
                    SAMENVATTING CONFIGURATIE
                  </div>
                  
                  <div className="space-y-1 text-gray-600">
                    <p><span className="font-bold text-brand-charcoal">Bedrijf:</span> {formData.companyName}</p>
                    <p><span className="font-bold text-brand-charcoal">E-mail:</span> {formData.email}</p>
                    <p><span className="font-bold text-brand-charcoal">Telefoon:</span> {formData.phone}</p>
                  </div>

                  <div className="border-b border-dashed border-gray-300 my-2"></div>

                  <div className="space-y-1">
                    <p className="font-bold text-brand-moss mb-1 uppercase text-[10px]">Geselecteerde Opties:</p>
                    {selectedOptions.map((opt) => (
                      <div key={opt.id} className="flex justify-between text-gray-600 text-[11px]">
                        <span>• {opt.name}</span>
                        <span>
                          {opt.setupPrice > 0 ? `€${opt.setupPrice}` : ''}
                          {opt.setupPrice > 0 && opt.monthlyPrice > 0 ? ' + ' : ''}
                          {opt.monthlyPrice > 0 ? `€${opt.monthlyPrice}/m` : ''}
                          {opt.setupPrice === 0 && opt.monthlyPrice === 0 ? 'Gratis' : ''}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-b border-dashed border-gray-300 my-2"></div>

                  <div className="space-y-1 text-brand-forest font-bold text-sm">
                    <div className="flex justify-between">
                      <span>Totale Setup (eenmalig):</span>
                      <span>€{totalSetup},-</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maandelijkse Hosting/Backups:</span>
                      <span>€{totalMonthly},-</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  We nemen binnen 24 uur (vaak sneller!) telefonisch of per e-mail contact met je op om de details door te spreken en een definitieve offerte op te stellen.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setStep(1);
                      setSelectedIds(['webdesign', 'hosting']);
                    }}
                    className="px-6 py-2.5 bg-brand-forest text-white font-display font-bold rounded-lg text-xs hover:bg-brand-moss transition-all"
                  >
                    Nieuwe berekening starten
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Pricing Calculator Summary / Sticky Panel */}
        <div className="lg:col-span-5 bg-brand-sand p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h4 className="font-display font-bold text-base text-brand-forest uppercase tracking-wider">Prijsoverzicht</h4>
              <p className="text-xs text-gray-500 mt-0.5">Live bijgewerkt op basis van jouw selectie</p>
            </div>

            {/* Reciept list */}
            <div className="space-y-3.5 border-b border-brand-sand-dark pb-6">
              {selectedOptions.map((opt) => (
                <div key={opt.id} className="flex justify-between text-xs text-brand-charcoal">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-moss shrink-0 stroke-[3]" />
                    <span className="font-medium">{opt.name}</span>
                  </div>
                  <div className="text-right shrink-0">
                    {opt.setupPrice > 0 && <span className="font-bold">€{opt.setupPrice}</span>}
                    {opt.setupPrice > 0 && opt.monthlyPrice > 0 && <span className="text-gray-400 mx-1">+</span>}
                    {opt.monthlyPrice > 0 && <span className="text-brand-moss font-semibold">€{opt.monthlyPrice}/m</span>}
                    {opt.setupPrice === 0 && opt.monthlyPrice === 0 && <span className="text-brand-clay font-bold">Gratis</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Live totals */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[11px] font-bold text-brand-moss uppercase tracking-wider">Setupkosten</p>
                  <p className="text-xs text-gray-500">Eenmalige investering</p>
                </div>
                <div className="text-right">
                  <span className="font-display font-bold text-3xl text-brand-forest">€{totalSetup},-</span>
                  <p className="text-[9px] text-gray-400 font-semibold mt-0.5">Exclusief BTW</p>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[11px] font-bold text-brand-moss uppercase tracking-wider">Hosting & Support</p>
                  <p className="text-xs text-gray-500">Maandelijkse kosten</p>
                </div>
                <div className="text-right">
                  <span className="font-display font-bold text-2xl text-brand-moss">€{totalMonthly},-</span>
                  <p className="text-[9px] text-gray-400 font-semibold mt-0.5">Maandelijks opzegbaar</p>
                </div>
              </div>
            </div>

            {/* Savings Widget */}
            <div className="bg-[#fffbeb] p-4 rounded-xl border border-amber-200 space-y-2 text-left">
              <div className="flex items-center gap-1.5">
                <BadgePercent className="w-4 h-4 text-brand-clay" />
                <span className="text-xs font-bold text-amber-900">Jouw Oerang Voordeel</span>
              </div>
              
              <p className="text-xs text-amber-800 leading-normal">
                Traditionele webdesignbureaus rekenen gemiddeld <strong className="text-brand-clay">€{traditionalSetup},-</strong> setup en <strong className="text-brand-clay">€{traditionalMonthly},-</strong> per maand voor exact dezelfde functionaliteit.
              </p>

              <div className="bg-white px-3 py-1.5 rounded-lg border border-amber-100 flex justify-between items-center text-xs">
                <span className="font-semibold text-brand-moss">Je bespaart direct:</span>
                <span className="font-display font-bold text-brand-clay text-sm">€{savingsSetup},-</span>
              </div>
            </div>
          </div>

          {/* Core guarantee checklist */}
          <div className="mt-8 pt-6 border-t border-brand-sand-dark space-y-2">
            <div className="flex items-center gap-2 text-xs text-brand-moss font-semibold">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-clay" />
              <span>Geleverd binnen 14 dagen</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-moss font-semibold">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-clay" />
              <span>100% Mobielvriendelijk (responsive)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-brand-moss font-semibold">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-clay" />
              <span>Geen langlopende wurgcontracten</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { 
  X, 
  Smartphone, 
  Monitor, 
  Check 
} from 'lucide-react';
import { WebsiteContent } from './WebsiteContent';

interface InteractivePreviewProps {
  project: {
    id: string;
    title: string;
    category: string;
    branch: string;
    description: string;
    price: string;
    deliveryTime: string;
    colorHex: string;
  };
  device: 'desktop' | 'mobile';
  setDevice: (device: 'desktop' | 'mobile') => void;
  onClose: () => void;
  onSelectDesign: () => void;
}

export function InteractivePreview({ 
  project, 
  device, 
  setDevice, 
  onClose, 
  onSelectDesign 
}: InteractivePreviewProps) {
  return (
    <div id="interactive-preview-modal" className="fixed inset-0 z-50 flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      
      {/* Dynamic Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-lg">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2 rounded-xl bg-brand-clay/10 border border-brand-clay/20 text-brand-clay font-bold text-sm">
            Live Demo
          </div>
          <div>
            <h1 className="font-display font-black text-white text-base sm:text-lg uppercase italic tracking-tight leading-none">
              {project.title}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Branche: {project.branch} • Vaste prijs {project.price}
            </p>
          </div>
        </div>

        {/* Device Switcher & CTA's */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-800/80">
          
          {/* Desktop/Mobile buttons */}
          <div className="bg-zinc-950/80 p-0.5 rounded-xl border border-zinc-800 flex items-center shrink-0">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                device === 'desktop' 
                  ? 'bg-zinc-800 text-white font-bold' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Desktop Weergave"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                device === 'mobile' 
                  ? 'bg-zinc-800 text-white font-bold' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Mobiele Weergave"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSelectDesign}
              className="px-4 py-2 bg-brand-clay hover:bg-brand-clay-dark text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Kies dit ontwerp</span>
            </button>
            
            <button
              onClick={onClose}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl transition-all border border-zinc-700 cursor-pointer"
              title="Sluiten"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 bg-zinc-900/40 p-4 sm:p-6 overflow-y-auto flex items-center justify-center relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

        {/* Browser / Phone Wrapper */}
        <div 
          className={`transition-all duration-500 ease-in-out h-full max-h-[85vh] w-full flex flex-col bg-zinc-950 rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden ${
            device === 'mobile' 
              ? 'max-w-[375px] border-4 border-zinc-800 ring-4 ring-zinc-900 ring-offset-2 ring-offset-zinc-950' 
              : 'max-w-5xl'
          }`}
        >
          {/* Top Bar for Desktop */}
          {device === 'desktop' && (
            <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center justify-between shrink-0">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 block" />
              </div>
              <div className="bg-zinc-950 rounded-lg px-4 py-1 text-xs font-mono text-zinc-400 select-all border border-zinc-800 truncate max-w-[320px] sm:max-w-[400px]">
                https://www.{project.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.nl
              </div>
              <div className="w-12" />
            </div>
          )}

          {/* Top Bar for Mobile */}
          {device === 'mobile' && (
            <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex justify-between items-center text-[10px] text-zinc-400 font-mono shrink-0 select-none">
              <span>09:41</span>
              <div className="w-16 h-4 bg-zinc-950 rounded-full border border-zinc-850 mx-2 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
              </div>
              <div className="flex gap-1">
                <span>5G</span>
                <span>🔋</span>
              </div>
            </div>
          )}

          {/* --- ACTIVE SUB-WEBSITE HOMEPAGE (SCROLLING SCREEN) --- */}
          <div className="flex-1 overflow-y-auto bg-zinc-950 relative scrollbar-thin scrollbar-thumb-zinc-800">
            <WebsiteContent projectId={project.id} />
          </div>

        </div>
      </div>
      
      {/* Dynamic bottom action bar on wide screens */}
      <div className="bg-zinc-900 border-t border-zinc-800 p-3 flex justify-between items-center text-xs shrink-0 px-4 sm:px-6">
        <span className="text-zinc-500 font-medium hidden sm:inline">
          Ontdek de volledige navigatie, layouts en realistische interacties van dit budget template.
        </span>
        <button
          onClick={onSelectDesign}
          className="w-full sm:w-auto px-6 py-2.5 bg-brand-clay hover:bg-brand-clay-dark text-white text-xs font-extrabold rounded-xl uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-4 h-4 shrink-0" />
          <span>Ik kies dit ontwerp (€{project.price})</span>
        </button>
      </div>

    </div>
  );
}

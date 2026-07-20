import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  CheckCircle, 
  Calendar, 
  Clock, 
  User, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  ArrowRight, 
  Shield, 
  Info, 
  Flame, 
  Compass, 
  Car,
  Smile,
  Scissors,
  Calculator
} from 'lucide-react';

interface WebsiteContentProps {
  projectId: string;
}

export function WebsiteContent({ projectId }: WebsiteContentProps) {
  switch (projectId) {
    case 'port_1':
      return <SchildersbedrijfVanHerkContent />;
    case 'port_2':
      return <BakkerVanderLindenContent />;
    case 'port_3':
      return <GroenteFruitVersluisContent />;
    case 'port_4':
      return <HaarsalonNovaContent />;
    case 'port_5':
      return <TandartsenpraktijkContent />;
    case 'port_6':
      return <BouwbedrijfDeGrootContent />;
    case 'port_7':
      return <ApexGymContent />;
    case 'port_8':
      return <SlijterijDeDruifContent />;
    case 'port_9':
      return <SlagerijVreeswijkContent />;
    case 'port_10':
      return <RijschoolStartAndGoContent />;
    default:
      return null;
  }
}

// 1. SCHILDERSBEDRIJF VAN HERK CONTENT
function SchildersbedrijfVanHerkContent() {
  const [paintM2, setPaintM2] = useState<number>(50);
  const [paintType, setPaintType] = useState<'binnen' | 'buiten' | 'kozijnen'>('binnen');
  const [paintCalculatorResult, setPaintCalculatorResult] = useState<number | null>(null);
  const [paintFormSubmitted, setPaintFormSubmitted] = useState<boolean>(false);

  const calculatePaint = () => {
    let pricePerM2 = 6.50;
    if (paintType === 'buiten') pricePerM2 = 8.50;
    if (paintType === 'kozijnen') pricePerM2 = 14.00;
    setPaintCalculatorResult(Math.round(paintM2 * pricePerM2));
  };

  return (
    <div className="min-h-full flex flex-col text-sm text-slate-600 bg-white">
      {/* Navbar */}
      <header className="border-b border-slate-100 bg-white/90 px-4 py-3 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
        <span className="font-display font-black text-slate-900 text-base tracking-wide uppercase italic">
          Van Herk <span className="text-blue-600">Schilders</span>
        </span>
        <div className="flex gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <span className="text-slate-900">Home</span>
          <span className="hover:text-slate-900 cursor-pointer hidden sm:inline">Diensten</span>
          <span className="hover:text-slate-900 cursor-pointer">Projecten</span>
        </div>
      </header>

      {/* Hero */}
      <section className="py-8 px-4 bg-gradient-to-b from-blue-50/40 to-white border-b border-slate-100 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 space-y-3">
          <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider border border-blue-100/80">
            Utrecht &amp; Omstreken
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 uppercase italic leading-none">
            Schilderwerk dat tientallen jaren beschermt &amp; straalt
          </h2>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Professioneel binnenschilderwerk, buitenschilderwerk en houtrotrenovatie voor particulieren en bedrijven. Vaste scherpe tarieven en 5 jaar garantie.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button onClick={calculatePaint} className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] rounded-lg uppercase tracking-wider transition-all cursor-pointer">
              Bereken je prijs
            </button>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=300&q=80" 
          alt="Schilderwerk" 
          className="w-full sm:w-44 aspect-video sm:aspect-square rounded-2xl object-cover border border-blue-100 shadow-md brightness-100 shrink-0"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* Services */}
      <section className="py-6 px-4 space-y-4">
        <h3 className="text-center font-display font-black text-slate-900 uppercase italic text-sm">
          Onze Diensten
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden flex flex-col p-3 space-y-1.5 shadow-sm">
            <span className="text-lg">🏠</span>
            <h4 className="font-bold text-slate-900 text-xs">Binnenschilderwerk</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">Strakke muren, plafonds, deuren en kozijnen. Wij werken stofvrij.</p>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden flex flex-col p-3 space-y-1.5 shadow-sm">
            <span className="text-lg">☀️</span>
            <h4 className="font-bold text-slate-900 text-xs">Buitenschilderwerk</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">Optimale bescherming tegen weer en wind. Behoud de waarde.</p>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden flex flex-col p-3 space-y-1.5 shadow-sm">
            <span className="text-lg">🪵</span>
            <h4 className="font-bold text-slate-900 text-xs">Houtrot Herstel</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">Houtrot grondig herstellen in plaats van direct vervangen.</p>
          </div>
        </div>
      </section>

      {/* Interactive Calculator widget */}
      <section className="py-6 px-4 bg-slate-50/50 border-t border-b border-slate-100">
        <div className="max-w-md mx-auto bg-white border border-slate-100 p-4 rounded-xl space-y-3 shadow-md">
          <h4 className="font-display font-black text-slate-900 text-xs uppercase italic text-center">
            Bereken direct je offerte indicatie
          </h4>
          
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
              Geschat aantal m²: <span className="text-blue-600 font-mono font-black text-xs">{paintM2} m²</span>
            </label>
            <input 
              type="range" 
              min="10" 
              max="200" 
              value={paintM2} 
              onChange={(e) => {
                setPaintM2(parseInt(e.target.value));
                setPaintCalculatorResult(null);
              }}
              className="w-full accent-blue-600 h-1 bg-slate-100 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-bold text-slate-500 uppercase block">Type Werk</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['binnen', 'buiten', 'kozijnen'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setPaintType(type);
                    setPaintCalculatorResult(null);
                  }}
                  className={`py-1 px-1 text-[9px] font-bold rounded-md border uppercase transition-all cursor-pointer text-center ${
                    paintType === type 
                      ? 'bg-blue-600 text-white border-blue-600 shadow' 
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={calculatePaint}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer"
          >
            Indicatie Prijs Berekenen
          </button>

          {paintCalculatorResult !== null && (
            <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-lg text-center space-y-0.5 animate-fade-in">
              <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Geschatte Kosten</p>
              <p className="text-lg font-black text-slate-900 font-mono">€{paintCalculatorResult},-</p>
              
              {!paintFormSubmitted ? (
                <div className="mt-2 pt-1.5 border-t border-slate-100">
                  <button 
                    onClick={() => setPaintFormSubmitted(true)}
                    className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[8px] uppercase tracking-wider rounded transition-all cursor-pointer mx-auto block"
                  >
                    Ontvang formele offerte
                  </button>
                </div>
              ) : (
                <p className="text-[9px] text-emerald-600 font-bold mt-1.5 flex items-center justify-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Offerte aanvraag gereed!
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-6 px-4 text-center space-y-2">
        <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest block font-mono">★★★★★</span>
        <p className="text-[10px] italic text-slate-500 max-w-sm mx-auto leading-relaxed">
          "Prachtig resultaat. De schilders werkten uiterst netjes en snel!"
        </p>
        <p className="text-[8px] font-bold text-slate-900 uppercase">Fam. de Vries, Utrecht</p>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-50 border-t border-slate-100 p-3 text-center text-[9px] text-slate-400 space-y-0.5">
        <p>© Schildersbedrijf Van Herk. Alle rechten voorbehouden.</p>
        <p>KvK: 87462198 | Dorpsstraat 45, Utrecht</p>
      </footer>
    </div>
  );
}

// 2. WARME BAKKER VAN DER LINDEN CONTENT
function BakkerVanderLindenContent() {
  const [bakeryCart, setBakeryCart] = useState<{ [key: string]: number }>({});
  const [bakeryOrdered, setBakeryOrdered] = useState<boolean>(false);
  const bakeryItems = [
    { id: 'brood_1', name: 'Zuurdesem Volkoren', price: 3.45, desc: 'Knapperige korst, 100% natuurlijke rijping.', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=150&q=80' },
    { id: 'brood_2', name: 'Meergranen Waldkorn', price: 3.10, desc: 'Rijk aan zaden en granen, lekker stevig.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80' },
    { id: 'gebak_1', name: 'Limburgse vlaai (kersen)', price: 13.95, desc: 'Ambachtelijke zanddeegbodem en frisse kersen.', image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=150&q=80' },
    { id: 'snack_1', name: 'Brabants Worstenbroodje', price: 2.20, desc: 'Goed gekruid gehakt in zacht brooddeeg.', image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=150&q=80' }
  ];

  const totalCartCount = Object.keys(bakeryCart).reduce((sum, id) => sum + (bakeryCart[id] || 0), 0);

  return (
    <div className="min-h-full flex flex-col text-sm text-stone-700 bg-stone-50">
      <header className="border-b border-stone-150 bg-white px-4 py-3 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md shadow-sm">
        <span className="font-serif font-bold text-amber-800 text-base">
          🌾 Bakker Van der Linden
        </span>
        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest font-mono">
          Wagen ({totalCartCount})
        </span>
      </header>

      {/* Hero */}
      <section className="py-8 px-4 bg-gradient-to-b from-amber-50/40 to-stone-50 border-b border-stone-100 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 space-y-3">
          <span className="text-[9px] uppercase tracking-widest text-amber-700 font-bold">Ambachtelijk &amp; Smaakvol sinds 1984</span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-950 leading-tight">
            Kraakvers desembrood en heerlijk traditioneel banket
          </h2>
          <p className="text-[11px] text-stone-600 leading-relaxed">
            Elke ochtend om 03:00 uur staan onze bakkers in de warme bakkerij om voor jou het lekkerste brood te bakken.
          </p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80" 
          alt="Bakkerij" 
          className="w-full sm:w-44 aspect-video sm:aspect-square rounded-2xl object-cover border border-amber-100 shadow-sm brightness-100 shrink-0"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* Interactive Order Shop */}
      <section className="py-6 px-4 space-y-4">
        <div className="text-center">
          <h3 className="font-serif text-sm text-amber-950 font-bold">Direct Bestellen voor Afhalen</h3>
          <p className="text-[10px] text-stone-500">Plaats voor 17:00, haal morgen vanaf 08:00 uur vers af.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {bakeryItems.map((item) => {
            const count = bakeryCart[item.id] || 0;
            return (
              <div key={item.id} className="p-2.5 bg-white border border-stone-150/80 rounded-xl flex gap-3 items-center shadow-sm">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 rounded-lg object-cover shrink-0 border border-stone-100"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="space-y-0.5">
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="font-bold text-stone-900 text-[11px] truncate">{item.name}</h4>
                      <span className="text-[10px] text-amber-700 font-bold font-mono shrink-0">€{item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[9px] text-stone-500">Aantal</span>
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => {
                          if (count > 0) {
                            setBakeryCart(prev => ({ ...prev, [item.id]: count - 1 }));
                          }
                        }}
                        className="w-5 h-5 rounded bg-stone-100 text-stone-600 hover:bg-stone-200 flex items-center justify-center font-bold cursor-pointer"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="font-mono text-[10px] text-stone-800 font-bold w-3 text-center">{count}</span>
                      <button 
                        onClick={() => {
                          setBakeryCart(prev => ({ ...prev, [item.id]: count + 1 }));
                        }}
                        className="w-5 h-5 rounded bg-stone-100 text-stone-600 hover:bg-stone-200 flex items-center justify-center font-bold cursor-pointer"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Total & Order button */}
        {totalCartCount > 0 && (
          <div className="max-w-md mx-auto p-3 bg-amber-50/65 border border-amber-100 rounded-xl text-center space-y-2 animate-fade-in shadow-sm">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-stone-600 font-bold">Jouw Winkelwagen</span>
              <span className="font-mono text-stone-900 font-bold">
                Totaal: €
                {Object.entries(bakeryCart).reduce((acc: number, [id, count]: [string, any]) => {
                  const item = bakeryItems.find(i => i.id === id);
                  return acc + (item ? item.price * count : 0);
                }, 0).toFixed(2)}
              </span>
            </div>
            
            {!bakeryOrdered ? (
              <button 
                onClick={() => setBakeryOrdered(true)}
                className="w-full py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              >
                Bestelling Bevestigen
              </button>
            ) : (
              <div className="p-1.5 bg-emerald-50 border border-emerald-100 rounded-lg text-center">
                <p className="text-[10px] text-emerald-700 font-bold flex items-center justify-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Bestelling geplaatst!
                </p>
                <p className="text-[8px] text-stone-500 mt-0.5 font-medium">Haal morgen vanaf 08:00 uur vers af.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-stone-100 border-t border-stone-200 p-3 text-center text-[9px] text-stone-500 space-y-0.5">
        <p>© Warme Bakker Van der Linden. Alle rechten voorbehouden.</p>
        <p>Dorpsstraat 12, Leerdam | 📞 0345-123456</p>
      </footer>
    </div>
  );
}

// 3. GROENTE & FRUIT VERSLUIS CONTENT
function GroenteFruitVersluisContent() {
  const [selectedSeason, setSelectedSeason] = useState<'lente' | 'zomer' | 'herfst' | 'winter'>('zomer');
  const [boxSize, setBoxSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [fruitBoxOrdered, setFruitBoxOrdered] = useState<boolean>(false);

  const seasonalProduce = {
    lente: ['Hollandse Asperges', 'Rabarber', 'Jonge Spinazie', 'Bosvruchten'],
    zomer: ['Sappige Aardbeien', 'Zoete Kersen', 'Trostomaten', 'Watermeloen'],
    herfst: ['Boschampignons', 'Pompoen', 'Stoofperen', 'Boerenkool'],
    winter: ['Spruitjes', 'Wortelen', 'Handsinaasappels', 'Pastinaak']
  };

  const seasonalImages = {
    lente: 'https://images.unsplash.com/photo-1463121859909-013e6ca55a80?auto=format&fit=crop&w=300&q=80',
    zomer: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&w=300&q=80',
    herfst: 'https://images.unsplash.com/photo-1508247967583-7d982ea00926?auto=format&fit=crop&w=300&q=80',
    winter: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=300&q=80'
  };

  return (
    <div className="min-h-full flex flex-col text-sm text-slate-650 bg-white">
      <header className="border-b border-emerald-50 bg-white px-4 py-3 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md shadow-sm">
        <span className="font-bold text-emerald-600 text-base tracking-wide flex items-center gap-1">
          🍎 Versluis AGF
        </span>
        <span className="text-[10px] font-bold text-emerald-600 font-mono">MARKTPRIJZEN</span>
      </header>

      {/* Hero */}
      <section className="py-8 px-4 bg-gradient-to-b from-green-50/50 to-white border-b border-slate-100 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 space-y-3">
          <span className="px-2.5 py-0.5 rounded bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider border border-green-100/60 inline-block">
            Dagvers van het land
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 uppercase italic leading-none">
            Gezond &amp; vol vitaminen van Groenteman Versluis
          </h2>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Met meer dan 30 jaar passie selecteren wij dagelijks de lekkerste seizoensproducten voor jou.
          </p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80" 
          alt="Groenten" 
          className="w-full sm:w-44 aspect-video sm:aspect-square rounded-2xl object-cover border border-green-100/60 shadow-md brightness-100 shrink-0"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* Interactive Season Selection and contents */}
      <section className="py-6 px-4 space-y-4">
        <div className="text-center space-y-1">
          <h3 className="font-display font-black text-slate-900 uppercase italic text-xs">Ontdek Seizoensproducten</h3>
          <p className="text-[10px] text-slate-400">Klik op een seizoen om te ontdekken wat er geoogst is.</p>
        </div>

        {/* Season Tabs */}
        <div className="flex justify-center gap-1 max-w-md mx-auto">
          {(['lente', 'zomer', 'herfst', 'winter'] as const).map((season) => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`flex-1 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border cursor-pointer text-center transition-all ${
                selectedSeason === season 
                  ? 'bg-green-600 text-white border-green-600 shadow-md' 
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-350'
              }`}
            >
              {season}
            </button>
          ))}
        </div>

        {/* Seasonal fruits card with photo */}
        <div className="p-3 bg-white border border-slate-150 rounded-xl max-w-md mx-auto space-y-2 overflow-hidden shadow-sm">
          <img 
            src={seasonalImages[selectedSeason]} 
            alt={selectedSeason} 
            className="w-full h-24 object-cover rounded-lg border border-slate-100 brightness-100"
            referrerPolicy="no-referrer"
          />
          <p className="text-[10px] font-bold text-slate-900 uppercase tracking-wider text-center border-b border-slate-100 pb-1.5">
            ⭐ Vers geoogst in de {selectedSeason}:
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {seasonalProduce[selectedSeason].map((prod, i) => (
              <div key={i} className="flex items-center gap-1.5 p-1.5 bg-slate-50 rounded-lg border border-slate-100 text-[10px] text-slate-700">
                <span className="text-green-600 font-bold">✔</span>
                <span className="truncate">{prod}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vitamine Box Widget */}
        <div className="max-w-md mx-auto p-4 bg-slate-50/50 border border-slate-150 rounded-xl space-y-3 shadow-xs">
          <div className="text-center">
            <h4 className="font-bold text-slate-900 text-xs">Bestel de wekelijkse Vitaminebox</h4>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {(['small', 'medium', 'large'] as const).map((sz) => {
              const labels = { small: 'Persoonlijk', medium: 'Gezinsbox', large: 'Familie XL' };
              const prices = { small: '€14.99', medium: '€22.99', large: '€29.99' };
              return (
                <button
                  key={sz}
                  onClick={() => setBoxSize(sz)}
                  className={`p-1.5 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all ${
                    boxSize === sz 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <span className="text-[8px] font-bold uppercase truncate">{labels[sz]}</span>
                  <span className="text-[10px] font-black mt-0.5 font-mono">{prices[sz]}</span>
                </button>
              );
            })}
          </div>

          {!fruitBoxOrdered ? (
            <button 
              onClick={() => setFruitBoxOrdered(true)}
              className="w-full py-1.5 bg-green-600 hover:bg-green-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer"
            >
              Vitaminebox Reserveren
            </button>
          ) : (
            <div className="p-2 bg-emerald-50 border border-emerald-100 rounded-lg text-center animate-fade-in">
              <p className="text-[10px] text-emerald-700 font-bold flex items-center justify-center gap-1">
                <CheckCircle className="w-3 h-3" /> Reservering ontvangen!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-50 border-t border-slate-100 p-3 text-center text-[9px] text-slate-400 space-y-0.5">
        <p>© Groente &amp; Fruit Versluis. Alle rechten voorbehouden.</p>
        <p>Iedere woensdag (Utrecht Centrum) en zaterdag (Nieuwegein Markt).</p>
      </footer>
    </div>
  );
}

// 4. HAARSALON NOVA CONTENT
function HaarsalonNovaContent() {
  const [selectedTreatment, setSelectedTreatment] = useState<string>('knippen_styling');
  const [selectedStylist, setSelectedStylist] = useState<string>('Chantal');
  const [selectedTime, setSelectedTime] = useState<string>('11:00');
  const [selectedDate, setSelectedDate] = useState<string>('Morgen');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const treatmentPrices: { [key: string]: { name: string, price: number } } = {
    knippen_styling: { name: 'Knippen & Stylen (Dames)', price: 34.50 },
    knippen_heren: { name: 'Knippen & Wassen (Heren)', price: 28.00 },
    kleuren: { name: 'Volledige Kleuring / Balayage', price: 79.00 },
    treatment_special: { name: 'Haarmasker & Massage', price: 19.50 }
  };

  return (
    <div className="min-h-full flex flex-col text-sm text-neutral-750 bg-white">
      <header className="border-b border-rose-50 bg-white px-4 py-3 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md shadow-sm">
        <span className="font-display font-black text-rose-500 text-base uppercase italic tracking-wider">
          ✂ Salon Nova
        </span>
        <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest">AFSPRAAK</span>
      </header>

      {/* Hero */}
      <section className="py-8 px-4 bg-gradient-to-b from-rose-50/40 to-white border-b border-neutral-100 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 space-y-3">
          <span className="text-[9px] uppercase tracking-widest text-rose-600 font-mono font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-100 inline-block">
            Knippen &amp; Kleuren
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 uppercase italic leading-none">
            Ontsnap aan de hectiek en verwen je haar
          </h2>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Bij Haarsalon Nova luisteren we naar je wensen en geven deskundig, persoonlijk advies.
          </p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=300&q=80" 
          alt="Salon" 
          className="w-full sm:w-44 aspect-video sm:aspect-square rounded-2xl object-cover border border-rose-100 shadow-md brightness-100 shrink-0"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* Services/Prices Table */}
      <section className="py-6 px-4 space-y-4">
        <h3 className="font-display font-black text-center text-slate-900 uppercase italic text-xs">
          Behandelingen &amp; Tarieven
        </h3>
        <div className="max-w-md mx-auto space-y-2 bg-white p-3 border border-neutral-150 rounded-xl shadow-sm">
          {Object.entries(treatmentPrices).map(([id, item]) => (
            <div 
              key={id} 
              onClick={() => setSelectedTreatment(id)}
              className={`p-2.5 rounded-lg border flex justify-between items-center cursor-pointer transition-all duration-300 ${
                selectedTreatment === id 
                  ? 'bg-rose-50/60 border-rose-200 text-slate-900 shadow-xs' 
                  : 'bg-neutral-50/40 border-neutral-100 text-neutral-500 hover:border-neutral-250'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${selectedTreatment === id ? 'bg-rose-500' : 'bg-neutral-300'}`} />
                <span className="text-[11px] font-bold">{item.name}</span>
              </div>
              <span className="font-mono text-xs text-rose-750 font-black">€{item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Online Booking Widget */}
      <section className="py-6 px-4 bg-neutral-50/40 border-t border-b border-neutral-100">
        <div className="max-w-md mx-auto bg-white border border-neutral-150 p-4 rounded-xl space-y-3 shadow-md">
          <h4 className="font-display font-black text-slate-900 text-xs uppercase italic text-center">
            Boek direct online je afspraak
          </h4>

          <div className="space-y-2.5">
            <div>
              <label className="text-[8px] font-bold text-neutral-450 uppercase tracking-widest block mb-0.5">Geselecteerde Behandeling</label>
              <div className="p-1.5 bg-neutral-50 rounded-lg text-[10px] font-bold text-slate-800 border border-neutral-150">
                {treatmentPrices[selectedTreatment]?.name} — €{treatmentPrices[selectedTreatment]?.price.toFixed(2)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[8px] font-bold text-neutral-450 uppercase tracking-widest block mb-0.5">Stylist</label>
                <select 
                  value={selectedStylist} 
                  onChange={(e) => setSelectedStylist(e.target.value)}
                  className="w-full bg-white text-[10px] border border-neutral-200 p-1.5 rounded-lg text-slate-800 font-bold cursor-pointer"
                >
                  <option value="Chantal">Chantal</option>
                  <option value="Anouk">Anouk</option>
                  <option value="Geen voorkeur">Geen voorkeur</option>
                </select>
              </div>
              <div>
                <label className="text-[8px] font-bold text-neutral-450 uppercase tracking-widest block mb-0.5">Datum</label>
                <select 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-white text-[10px] border border-neutral-200 p-1.5 rounded-lg text-slate-800 font-bold cursor-pointer"
                >
                  <option value="Vandaag">Vandaag</option>
                  <option value="Morgen">Morgen</option>
                  <option value="Overmorgen">Overmorgen</option>
                </select>
              </div>
            </div>

            {/* Time slot picker */}
            <div>
              <label className="text-[8px] font-bold text-neutral-450 uppercase tracking-widest block mb-1">Kies een Tijdstip</label>
              <div className="grid grid-cols-4 gap-1">
                {['09:30', '11:00', '13:30', '15:00'].map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-1 rounded border text-[10px] font-mono font-bold transition-all cursor-pointer text-center ${
                      selectedTime === time 
                        ? 'bg-rose-600 border-rose-600 text-white shadow-md' 
                        : 'bg-neutral-50 border-neutral-200 text-neutral-500 hover:text-rose-600'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {!bookingConfirmed ? (
            <button 
              onClick={() => setBookingConfirmed(true)}
              className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow"
            >
              Afspraak Boeken ({selectedTime})
            </button>
          ) : (
            <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg text-center space-y-0.5">
              <p className="text-[10px] text-emerald-700 font-bold flex items-center justify-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Succesvol geboekt!
              </p>
              <p className="text-[9px] text-slate-600">
                {selectedDate} om <strong>{selectedTime}</strong> bij {selectedStylist}.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-neutral-50 border-t border-neutral-100 p-3 text-center text-[9px] text-neutral-400 space-y-0.5">
        <p>© Haarsalon Nova. Alle rechten voorbehouden.</p>
        <p>Marnixstraat 188, Utrecht | 📞 030-9876543</p>
      </footer>
    </div>
  );
}

// 5. TANDARTSENPRAKTIJK UTRECHT ZUID CONTENT
function TandartsenpraktijkContent() {
  const [dentistStep, setDentistStep] = useState<number>(1);
  const [dentistFormData, setDentistFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    insurance: 'Menzis',
    notes: ''
  });
  const [dentistRegistered, setDentistRegistered] = useState<boolean>(false);

  return (
    <div className="min-h-full flex flex-col text-sm text-slate-600 bg-white">
      <header className="border-b border-cyan-50 bg-white px-4 py-3 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md shadow-sm">
        <span className="font-bold text-cyan-600 text-base tracking-wide flex items-center gap-1">
          🦷 Tandartspraktijk Zuid
        </span>
        <span className="text-[9px] font-bold text-cyan-600 font-mono">
          ☎ 030-1112222
        </span>
      </header>

      {/* Hero */}
      <section className="py-8 px-4 bg-gradient-to-b from-cyan-50/40 to-white border-b border-slate-100 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 space-y-3">
          <span className="px-2.5 py-0.5 rounded bg-cyan-50 text-cyan-700 text-[10px] font-bold uppercase tracking-wider border border-cyan-100/60 inline-block">
            Moderne Mondzorg
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            Rustgevende, professionele tandzorg voor het gezin
          </h2>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Bij Utrecht Zuid nemen we de tijd voor angstige patiënten en kinderen. Moderne behandelkamers.
          </p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=300&q=80" 
          alt="Tandarts" 
          className="w-full sm:w-44 aspect-video sm:aspect-square rounded-2xl object-cover border border-cyan-100 shadow-md brightness-100 shrink-0"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* Patient Registration Form */}
      <section className="py-6 px-4">
        <div className="max-w-md mx-auto bg-slate-50/50 border border-slate-150 p-4 rounded-xl space-y-3 shadow-xs">
          <div className="text-center">
            <h3 className="font-bold text-slate-900 text-xs">Online Inschrijven</h3>
            <p className="text-[9px] text-slate-400">Meld u direct en eenvoudig aan als nieuwe patiënt.</p>
          </div>

          {!dentistRegistered ? (
            <div className="space-y-2.5">
              {dentistStep === 1 && (
                <div className="space-y-2.5 animate-fade-in">
                  <p className="text-[8px] text-cyan-600 font-bold uppercase tracking-widest font-mono">Stap 1: Contactgegevens</p>
                  <div className="space-y-1">
                    <label className="text-[8px] text-slate-500 uppercase">Naam</label>
                    <input 
                      type="text" 
                      placeholder="Jan de Vries" 
                      value={dentistFormData.name}
                      onChange={(e) => setDentistFormData({ ...dentistFormData, name: e.target.value })}
                      className="w-full bg-white border border-slate-200 p-1.5 rounded-lg text-[11px] text-slate-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] text-slate-500 uppercase">E-mail</label>
                    <input 
                      type="email" 
                      placeholder="jan@outlook.com" 
                      value={dentistFormData.email}
                      onChange={(e) => setDentistFormData({ ...dentistFormData, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 p-1.5 rounded-lg text-[11px] text-slate-800"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      if (dentistFormData.name && dentistFormData.email) setDentistStep(2);
                    }}
                    className="w-full py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-xs"
                  >
                    Volgende stap
                  </button>
                </div>
              )}

              {dentistStep === 2 && (
                <div className="space-y-2.5 animate-fade-in">
                  <p className="text-[8px] text-cyan-600 font-bold uppercase tracking-widest font-mono">Stap 2: Medische Info</p>
                  <div className="space-y-1">
                    <label className="text-[8px] text-slate-500 uppercase">Geboortedatum</label>
                    <input 
                      type="text" 
                      placeholder="12-05-1988" 
                      value={dentistFormData.birthdate}
                      onChange={(e) => setDentistFormData({ ...dentistFormData, birthdate: e.target.value })}
                      className="w-full bg-white border border-slate-200 p-1.5 rounded-lg text-[11px] text-slate-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] text-slate-500 uppercase">Zorgverzekeraar</label>
                    <select 
                      value={dentistFormData.insurance}
                      onChange={(e) => setDentistFormData({ ...dentistFormData, insurance: e.target.value })}
                      className="w-full bg-white border border-slate-200 p-1.5 rounded-lg text-[11px] text-slate-800 cursor-pointer"
                    >
                      <option value="Menzis">Menzis</option>
                      <option value="Zilveren Kruis">Zilveren Kruis</option>
                      <option value="VGZ">VGZ</option>
                      <option value="Cz">CZ</option>
                    </select>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button 
                      onClick={() => setDentistStep(1)}
                      className="flex-1 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                    >
                      Terug
                    </button>
                    <button 
                      onClick={() => setDentistRegistered(true)}
                      className="flex-1 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                    >
                      Inschrijven
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-center space-y-1 animate-fade-in">
              <p className="text-[11px] text-emerald-700 font-bold flex items-center justify-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Aanmelding ontvangen!
              </p>
              <p className="text-[9px] text-slate-500 leading-relaxed">
                Hartelijk dank, <strong>{dentistFormData.name}</strong>. Wij nemen binnen 2 werkdagen contact op.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-50 border-t border-slate-100 p-3 text-center text-[9px] text-slate-400 space-y-0.5">
        <p>© Tandartsenpraktijk Utrecht Zuid. Alle rechten voorbehouden.</p>
        <p>Inschrijvingen goedgekeurd volgens BIG-registratie.</p>
      </footer>
    </div>
  );
}

// 6. BOUWBEDRIJF DE GROOT CONTENT
function BouwbedrijfDeGrootContent() {
  const [selectedGalleryProject, setSelectedGalleryProject] = useState<number>(0);
  const builderProjects = [
    { title: 'Moderne Dakkapel Utrecht', desc: 'Plaatsing binnen 1 dag, hoogwaardige isolatie en onderhoudsvrij kunststof.', category: 'Renovatie', before: 'Oude donkere zolder', after: 'Lichte extra slaapkamer', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80' },
    { title: 'Uitbouw Woonhuis Nieuwegein', desc: 'Royale uitbreiding van de woonkeuken met glazen lichtstraat en harmonica schuifpui.', category: 'Aanbouw', before: 'Kleine dichte keuken', after: 'Lichte leefkeuken van 35m²', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=300&q=80' },
    { title: 'Totaalrenovatie Jaren 30 Woning', desc: 'Volledige modernisering met behoud van authentieke details.', category: 'Totaalbouw', before: 'Verouderd klushuis', after: 'Herenhuis met energielabel A', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=300&q=80' }
  ];

  return (
    <div className="min-h-full flex flex-col text-sm text-stone-700 bg-white">
      <header className="border-b border-orange-50 bg-white px-4 py-3 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md shadow-sm">
        <span className="font-display font-black text-orange-600 text-base uppercase tracking-wide italic">
          🏗 Bouwbedrijf De Groot
        </span>
        <span className="text-[9px] font-bold text-orange-600 font-mono">
          ☎ 06-12345678
        </span>
      </header>

      {/* Hero */}
      <section className="py-8 px-4 bg-gradient-to-b from-orange-50/40 to-white border-b border-stone-100 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 space-y-3">
          <span className="px-2.5 py-0.5 rounded bg-orange-50 text-orange-700 text-[10px] font-bold uppercase tracking-wider border border-orange-100 inline-block">
            Aannemer &amp; Bouwexpert
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-black text-stone-900 uppercase italic leading-none">
            Bouwen, verbouwen &amp; verduurzamen
          </h2>
          <p className="text-[11px] text-stone-550 leading-relaxed">
            Voor al uw verbouw, aanbouw en renovatiewerkzaamheden in de regio. Transparante planning en budget.
          </p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1503387762458-bf6a2064003e?auto=format&fit=crop&w=300&q=80" 
          alt="Bouw" 
          className="w-full sm:w-44 aspect-video sm:aspect-square rounded-2xl object-cover border border-orange-100 shadow-md brightness-100 shrink-0"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* Interactive Project Portfolio Slider */}
      <section className="py-6 px-4 space-y-4">
        <div className="text-center space-y-0.5">
          <h3 className="font-display font-black text-stone-900 uppercase italic text-xs">Onze Gerealiseerde Projecten</h3>
          <p className="text-[10px] text-stone-450">Klik op een categorie om de transformatie te bekijken.</p>
        </div>

        {/* Project selection Buttons */}
        <div className="flex flex-wrap gap-1.5 justify-center max-w-md mx-auto">
          {builderProjects.map((proj, i) => (
            <button
              key={i}
              onClick={() => setSelectedGalleryProject(i)}
              className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                selectedGalleryProject === i 
                  ? 'bg-orange-600 text-white border-orange-600 shadow-md' 
                  : 'bg-stone-50 text-stone-500 border-stone-200 hover:border-stone-300 shadow-xs'
              }`}
            >
              {proj.category}
            </button>
          ))}
        </div>

        {/* Active project card with photo */}
        <div className="max-w-md mx-auto bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm animate-fade-in flex flex-col">
          <img 
            src={builderProjects[selectedGalleryProject].image} 
            alt={builderProjects[selectedGalleryProject].title} 
            className="w-full h-32 object-cover brightness-100 border-b border-stone-100"
            referrerPolicy="no-referrer"
          />
          <div className="p-3.5 space-y-3">
            <div className="space-y-0.5">
              <h4 className="font-bold text-stone-900 text-[11px] uppercase">{builderProjects[selectedGalleryProject].title}</h4>
              <p className="text-[10px] text-stone-500 leading-normal">{builderProjects[selectedGalleryProject].desc}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 bg-red-50/50 border border-red-100/60 rounded-lg space-y-0.5">
                <span className="text-[8px] uppercase font-bold text-red-650 font-mono">Voor:</span>
                <p className="text-stone-500 font-medium truncate">{builderProjects[selectedGalleryProject].before}</p>
              </div>
              <div className="p-2 bg-emerald-50/50 border border-emerald-100/60 rounded-lg space-y-0.5">
                <span className="text-[8px] uppercase font-bold text-emerald-650 font-mono">Na:</span>
                <p className="text-emerald-700 font-black truncate">{builderProjects[selectedGalleryProject].after}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-stone-50 border-t border-stone-100 p-3 text-center text-[9px] text-stone-400">
        <p>© Bouwbedrijf De Groot. Kwaliteitsgarantie sinds 2008.</p>
      </footer>
    </div>
  );
}

// 7. APEX FITNESS & GYM CONTENT
function ApexGymContent() {
  const [gymDuration, setGymDuration] = useState<'month' | 'year'>('year');
  const [gymAccess, setGymAccess] = useState<'all' | 'offpeak'>('all');
  const [gymRegistered, setGymRegistered] = useState<boolean>(false);

  return (
    <div className="min-h-full flex flex-col text-sm text-slate-700 bg-white">
      <header className="border-b border-rose-100 bg-white px-4 py-3 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md shadow-sm">
        <span className="font-display font-black text-rose-600 text-base uppercase italic tracking-wider">
          ⚡ Apex Fitness
        </span>
        <span className="text-[9px] font-bold text-rose-600 font-mono uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
          24/7 LIVE
        </span>
      </header>

      {/* Hero */}
      <section className="py-8 px-4 bg-gradient-to-b from-rose-50/20 to-white border-b border-slate-150 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 uppercase italic leading-none">
            Stop met smoesjes. Start jouw transformatie.
          </h2>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            De modernste krachtapparatuur, cardio-zone en wekelijkse groepslessen onder begeleiding.
          </p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=300&q=80" 
          alt="Gym" 
          className="w-full sm:w-44 aspect-video sm:aspect-square rounded-2xl object-cover border border-rose-100 shadow-md brightness-100 shrink-0"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* Membership Price Calculator */}
      <section className="py-6 px-4 space-y-4">
        <div className="text-center">
          <h3 className="font-display font-black text-slate-900 uppercase italic text-xs">Bereken je lidmaatschap</h3>
          <p className="text-[9px] text-slate-450">Kies jouw wekelijkse fitness tarief.</p>
        </div>

        <div className="max-w-md mx-auto bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-3 shadow-xs">
          {/* Contract duration selection */}
          <div className="space-y-1">
            <label className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block">Looptijd</label>
            <div className="grid grid-cols-2 gap-1.5">
              <button 
                onClick={() => setGymDuration('month')}
                className={`py-1.5 text-[9px] font-bold rounded-md border uppercase transition-all cursor-pointer text-center ${
                  gymDuration === 'month' 
                    ? 'bg-rose-600 border-rose-600 text-white shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 shadow-2xs'
                }`}
              >
                Maandelijkse
              </button>
              <button 
                onClick={() => setGymDuration('year')}
                className={`py-1.5 text-[9px] font-bold rounded-md border uppercase transition-all cursor-pointer text-center ${
                  gymDuration === 'year' 
                    ? 'bg-rose-600 border-rose-600 text-white shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 shadow-2xs'
                }`}
              >
                1 Jaar Vast
              </button>
            </div>
          </div>

          {/* Access time selector */}
          <div className="space-y-1">
            <label className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block">Tijden</label>
            <div className="grid grid-cols-2 gap-1.5">
              <button 
                onClick={() => setGymAccess('all')}
                className={`py-1.5 text-[9px] font-bold rounded-md border uppercase transition-all cursor-pointer text-center ${
                  gymAccess === 'all' 
                    ? 'bg-rose-600 border-rose-600 text-white shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 shadow-2xs'
                }`}
              >
                24/7 Toegang
              </button>
              <button 
                onClick={() => setGymAccess('offpeak')}
                className={`py-1.5 text-[9px] font-bold rounded-md border uppercase transition-all cursor-pointer text-center ${
                  gymAccess === 'offpeak' 
                    ? 'bg-rose-600 border-rose-600 text-white shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 shadow-2xs'
                }`}
              >
                Daluren
              </button>
            </div>
          </div>

          {/* Weekly price output */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg text-center space-y-2 shadow-xs">
            <p className="text-[8px] text-slate-400 uppercase font-bold tracking-widest">Totaal per week:</p>
            <div className="text-xl font-mono font-black text-slate-900">
              €
              {(() => {
                let base = gymDuration === 'year' ? 6.99 : 8.99;
                if (gymAccess === 'offpeak') base -= 2.00;
                return base.toFixed(2);
              })()}
            </div>
            
            {!gymRegistered ? (
              <button 
                onClick={() => setGymRegistered(true)}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold uppercase rounded-lg tracking-wider transition-all cursor-pointer w-full shadow-sm"
              >
                Inschrijven &amp; Starten
              </button>
            ) : (
              <div className="p-1 bg-emerald-50 border border-emerald-100 rounded-lg text-[9px] text-emerald-700 font-bold flex items-center justify-center gap-1 animate-fade-in">
                <CheckCircle className="w-3 h-3" /> Welkom bij Apex Gym!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-50 border-t border-slate-100 p-3 text-center text-[9px] text-slate-400">
        <p>© Apex Fitness &amp; Gym. No excuses, only results.</p>
      </footer>
    </div>
  );
}

// 8. SLIJTERIJ & WIJNHANDEL DE DRUIF CONTENT
function SlijterijDeDruifContent() {
  const [selectedFoodPairing, setSelectedFoodPairing] = useState<'vis' | 'vlees' | 'pasta' | 'dessert'>('vis');
  const wineRecommendations = {
    vis: { wine: 'Chablis Premier Cru', type: 'Witte wijn', description: 'Frisse, mineralige Chardonnay. Perfect bij oesters en vis.', price: '€19.95', image: 'https://images.unsplash.com/photo-1553122912-78d9bd61b229?auto=format&fit=crop&w=300&q=80' },
    vlees: { wine: 'Barolo DOCG Classico', type: 'Rode wijn', description: 'Krachtige, complexe Nebbiolo met stevige tannines. Geweldig bij wild.', price: '€29.50', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=300&q=80' },
    pasta: { wine: 'Chianti Classico Riserva', type: 'Rode wijn', description: 'Elegante Sangiovese met sappige zuren en kersenaroma.', price: '€14.95', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80' },
    dessert: { wine: 'Sauternes Réserve', type: 'Dessertwijn', description: 'Rijke, honingzoete edelzoete wijn met tonen van gedroogde abrikozen.', price: '€22.50', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=300&q=80' }
  };

  return (
    <div className="min-h-full flex flex-col text-sm text-slate-700 bg-white">
      <header className="border-b border-purple-50 bg-white px-4 py-3 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md shadow-sm">
        <span className="font-serif font-bold text-purple-700 text-base">
          🍇 Slijterij De Druif
        </span>
        <span className="text-[8px] text-purple-600 font-bold uppercase tracking-widest bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100">
          NIX 18
        </span>
      </header>

      {/* Hero */}
      <section className="py-8 px-4 bg-gradient-to-b from-purple-50/30 to-white border-b border-slate-100 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 space-y-2">
          <span className="text-[9px] text-purple-600 font-serif font-bold italic block">Sinds 1902</span>
          <h2 className="text-xl sm:text-2xl font-serif text-slate-900 leading-tight">
            Ontdek exclusieve wijnen &amp; ambachtelijke speciaalbieren
          </h2>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80" 
          alt="Wijn" 
          className="w-full sm:w-44 aspect-video sm:aspect-square rounded-2xl object-cover border border-purple-100 shadow-md brightness-100 shrink-0"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* Wine & Food Pairing Assistant */}
      <section className="py-6 px-4 space-y-4">
        <div className="text-center space-y-0.5">
          <h3 className="font-serif text-sm text-slate-900 font-bold">Wijn &amp; Spijs Hulp</h3>
          <p className="text-[10px] text-slate-450">Wat eten we vanavond? Vind direct de match.</p>
        </div>

        {/* Food buttons */}
        <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
          {(['vis', 'vlees', 'pasta', 'dessert'] as const).map((food) => {
            const icons = { vis: '🐟', vlees: '🥩', pasta: '🍝', dessert: '🍰' };
            return (
              <button
                key={food}
                onClick={() => setSelectedFoodPairing(food)}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                  selectedFoodPairing === food 
                    ? 'bg-purple-600 border-purple-600 text-white shadow-md' 
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-350 shadow-2xs'
                }`}
              >
                <span className="text-base mb-0.5">{icons[food]}</span>
                <span className="text-[8px] font-bold uppercase">{food}</span>
              </button>
            );
          })}
        </div>

        {/* Wine recommendation result with image */}
        <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm animate-fade-in flex flex-col">
          <img 
            src={wineRecommendations[selectedFoodPairing].image} 
            alt={wineRecommendations[selectedFoodPairing].wine} 
            className="w-full h-24 object-cover brightness-100 border-b border-slate-100"
            referrerPolicy="no-referrer"
          />
          <div className="p-3.5 space-y-2">
            <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100 text-[8px] font-mono font-bold uppercase tracking-wider">
              {wineRecommendations[selectedFoodPairing].type}
            </span>
            <div className="flex justify-between items-baseline gap-1 pt-0.5">
              <h4 className="font-serif text-xs text-slate-900 font-bold">{wineRecommendations[selectedFoodPairing].wine}</h4>
              <span className="text-xs text-purple-700 font-mono font-bold shrink-0">{wineRecommendations[selectedFoodPairing].price}</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-normal">{wineRecommendations[selectedFoodPairing].description}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-50 border-t border-slate-100 p-3 text-center text-[9px] text-slate-400">
        <p>© Slijterij &amp; Wijnhandel De Druif. Sinds 1902.</p>
      </footer>
    </div>
  );
}

// 9. AMBACHTELIJKE SLAGERIJ VREESWIJK CONTENT
function SlagerijVreeswijkContent() {
  const [bbqGuests, setBbqGuests] = useState<number>(10);
  const [bbqType, setBbqType] = useState<'budget' | 'ambacht' | 'deluxe'>('ambacht');
  const [bbqOrdered, setBbqOrdered] = useState<boolean>(false);

  const bbqImages = {
    budget: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=300&q=80',
    ambacht: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80',
    deluxe: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80'
  };

  const getBbqSpecs = () => {
    const prices = { budget: 13.50, ambacht: 17.50, deluxe: 24.50 };
    const contents = {
      budget: '4 stukken vlees p.p. (Gemarineerde speklap, barbecueworst, kipsatéspies, hamburger). Inclusief knoflooksaus, satésaus en stokbrood.',
      ambacht: '5 stukken vlees p.p. (Varkenshaasspies, runderburger, kipsaté, kogelbiefspies, runderfakkel). Inclusief 3 sauzen, aardappelsalade en stokbrood.',
      deluxe: '5 stukken premium vlees p.p. (Ribeye steak, lamskotelet, XL Gambaspies, kipsaté, varkenshaassaté). Inclusief aioli, 4 sauzen en luxe broden.'
    };
    return {
      pricePerPerson: prices[bbqType],
      total: prices[bbqType] * bbqGuests,
      content: contents[bbqType]
    };
  };

  return (
    <div className="min-h-full flex flex-col text-sm text-stone-700 bg-white">
      <header className="border-b border-red-50 bg-white px-4 py-3 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md shadow-sm">
        <span className="font-bold text-red-750 text-base uppercase tracking-wider flex items-center gap-1">
          🥩 Slagerij Vreeswijk
        </span>
        <span className="text-[10px] font-bold text-red-650">CATERING</span>
      </header>

      {/* Hero */}
      <section className="py-8 px-4 bg-gradient-to-b from-red-50/30 to-white border-b border-stone-100 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 space-y-2">
          <span className="text-[9px] uppercase tracking-widest text-stone-500 font-black block">Ambachtelijke kwaliteit</span>
          <h2 className="text-xl sm:text-2xl font-display font-black text-stone-900 uppercase italic leading-none">
            Eerlijk vlees, vakkundig gesneden en met passie
          </h2>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80" 
          alt="Slagerij" 
          className="w-full sm:w-44 aspect-video sm:aspect-square rounded-2xl object-cover border border-red-100 shadow-md brightness-100 shrink-0"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* BBQ Catering Calculator */}
      <section className="py-6 px-4 space-y-4">
        <div className="text-center">
          <h3 className="font-display font-black text-stone-900 uppercase italic text-xs">Plan jouw BBQ of Catering</h3>
          <p className="text-[9px] text-stone-450">Kies je pakket en bereken de kosten.</p>
        </div>

        <div className="max-w-md mx-auto bg-stone-50 border border-stone-150 p-4 rounded-xl space-y-3 shadow-xs">
          {/* Number of guests */}
          <div className="space-y-1">
            <label className="text-[9px] font-bold text-stone-500 uppercase block">Aantal gasten: <span className="text-red-750 font-mono font-black text-xs">{bbqGuests} personen</span></label>
            <input 
              type="range" 
              min="5" 
              max="100" 
              value={bbqGuests} 
              onChange={(e) => setBbqGuests(parseInt(e.target.value))}
              className="w-full accent-red-700 h-1 bg-stone-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* BBQ package type */}
          <div className="space-y-1">
            <label className="text-[9px] text-stone-500 uppercase block mb-0.5">Klasse</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['budget', 'ambacht', 'deluxe'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setBbqType(type)}
                  className={`py-1.5 text-[8px] font-bold rounded-md border uppercase transition-all cursor-pointer text-center ${
                    bbqType === type 
                      ? 'bg-red-700 border-red-700 text-white shadow-sm' 
                      : 'bg-white border-stone-200 text-stone-500 hover:border-stone-300 shadow-2xs'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Package Food Photo */}
          <img 
            src={bbqImages[bbqType]} 
            alt={`BBQ`} 
            className="w-full h-24 object-cover rounded-lg border border-stone-200 brightness-100 shadow-2xs transition-all duration-300"
            referrerPolicy="no-referrer"
          />

          {/* Calculation Output details */}
          <div className="p-3 bg-white border border-stone-200 rounded-lg space-y-2 shadow-sm">
            <div className="flex justify-between items-center text-[10px] border-b border-stone-100 pb-1">
              <span className="text-stone-400">p.p.</span>
              <span className="font-mono text-stone-900 font-bold">€{getBbqSpecs().pricePerPerson.toFixed(2)}</span>
            </div>
            
            <p className="text-[9px] text-stone-550 leading-normal text-left">
              {getBbqSpecs().content}
            </p>

            <div className="pt-1.5 flex justify-between items-center text-xs font-bold border-t border-stone-100">
              <span className="text-stone-900">Totaalprijs:</span>
              <span className="text-red-750 font-mono font-black text-sm">€{getBbqSpecs().total.toFixed(2)}</span>
            </div>

            {!bbqOrdered ? (
              <button 
                onClick={() => setBbqOrdered(true)}
                className="w-full py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-xs"
              >
                Catering Reserveren
              </button>
            ) : (
              <div className="p-1.5 bg-emerald-50 border border-emerald-100 rounded-lg text-center">
                <p className="text-[10px] text-emerald-700 font-bold flex items-center justify-center gap-0.5">
                  <CheckCircle className="w-3.5 h-3.5" /> Opgeslagen!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-stone-50 border-t border-stone-100 p-3 text-center text-[9px] text-stone-400">
        <p>© Ambachtelijke Slagerij Vreeswijk. Worstmakers pur sang.</p>
      </footer>
    </div>
  );
}

// 10. RIJSCHOOL START & GO CONTENT
function RijschoolStartAndGoContent() {
  const [selectedLessonPack, setSelectedLessonPack] = useState<'brons' | 'zilver' | 'goud'>('zilver');
  const [rijschoolSubmitted, setRijschoolSubmitted] = useState<boolean>(false);

  const rijschoolPacks = {
    brons: { name: 'Pakket Brons', price: '€999', lessons: '15 lessen', exam: 'Inclusief praktijkexamen', advice: 'Ideaal voor herstarters.' },
    zilver: { name: 'Pakket Zilver', price: '€1649', lessons: '28 lessen', exam: 'Inclusief Tussentijdse Toets', advice: 'Perfect voor de gemiddelde leerling. Hoogste slagingskans!' },
    goud: { name: 'Pakket Goud', price: '€2199', lessons: '38 lessen', exam: 'Inclusief Tussentijdse Toets & examen', advice: 'Optimale zekerheid.' }
  };

  return (
    <div className="min-h-full flex flex-col text-sm text-slate-700 bg-white">
      <header className="border-b border-amber-50 bg-white px-4 py-3 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md shadow-sm">
        <span className="font-display font-black text-amber-600 text-base uppercase tracking-wider">
          🚗 Start &amp; Go
        </span>
        <span className="text-[10px] font-mono text-amber-600 font-bold bg-amber-50 border border-amber-100/60 px-1.5 py-0.5 rounded">
          Slaging: 94%
        </span>
      </header>

      {/* Hero */}
      <section className="py-8 px-4 bg-gradient-to-b from-amber-50/30 to-white border-b border-slate-100 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 space-y-3">
          <span className="px-2.5 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider border border-amber-100 inline-block">
            In één keer slagen
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 uppercase italic leading-none">
            Persoonlijke &amp; stressvrije rijlessen op jouw tempo
          </h2>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Bij Start &amp; Go rij je altijd in een moderne lesauto met dezelfde gekwalificeerde instructeur.
          </p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=300&q=80" 
          alt="Rijles" 
          className="w-full sm:w-44 aspect-video sm:aspect-square rounded-2xl object-cover border border-amber-100 shadow-md brightness-100 shrink-0"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* Interactive Package Selector */}
      <section className="py-6 px-4 space-y-4">
        <div className="text-center space-y-0.5">
          <h3 className="font-display font-black text-slate-900 uppercase italic text-xs">Onze Rijles Pakketten</h3>
          <p className="text-[10px] text-slate-450">Klik op een pakket om de details en advies te bekijken.</p>
        </div>

        {/* Pack buttons */}
        <div className="grid grid-cols-3 gap-1.5 max-w-md mx-auto">
          {(['brons', 'zilver', 'goud'] as const).map((pack) => (
            <button
              key={pack}
              onClick={() => setSelectedLessonPack(pack)}
              className={`p-1.5 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all ${
                selectedLessonPack === pack 
                  ? 'bg-amber-500 border-amber-500 text-slate-950 font-black shadow-md' 
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-350 shadow-2xs'
              }`}
            >
              <span className="text-[8px] uppercase tracking-wide font-bold">
                {pack === 'zilver' ? '⭐ Zilver' : pack}
              </span>
              <span className="text-[10px] font-mono font-black mt-0.5">
                {rijschoolPacks[pack].price}
              </span>
            </button>
          ))}
        </div>

        {/* Active pack details box with photo */}
        <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm animate-fade-in flex flex-col">
          <img 
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=300&q=80" 
            alt="Modern Driving Experience" 
            className="w-full h-24 object-cover brightness-100 border-b border-slate-100"
            referrerPolicy="no-referrer"
          />
          <div className="p-3.5 space-y-2.5 text-center">
            <h4 className="font-display font-black text-slate-900 text-xs uppercase italic">
              {rijschoolPacks[selectedLessonPack].name} — {rijschoolPacks[selectedLessonPack].price}
            </h4>

            <div className="text-[10px] text-slate-500 space-y-0.5">
              <p className="font-bold text-slate-800">✓ {rijschoolPacks[selectedLessonPack].lessons}</p>
              <p className="font-bold text-slate-800">✓ {rijschoolPacks[selectedLessonPack].exam}</p>
              <p className="text-[9px] text-slate-400 italic mt-1 leading-normal">
                {rijschoolPacks[selectedLessonPack].advice}
              </p>
            </div>

            {!rijschoolSubmitted ? (
              <button 
                onClick={() => setRijschoolSubmitted(true)}
                className="w-full py-1.5 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-amber-400 transition-all cursor-pointer shadow"
              >
                Gratis Proefles Aanvragen
              </button>
            ) : (
              <div className="p-2 bg-emerald-50 border border-emerald-100 rounded-lg">
                <p className="text-[10px] text-emerald-700 font-bold flex items-center justify-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Aangevraagd!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-50 border-t border-slate-100 p-3 text-center text-[9px] text-slate-400">
        <p>© Rijschool Start &amp; Go. Rijkserkend opleider.</p>
      </footer>
    </div>
  );
}

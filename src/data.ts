import { 
  Globe, 
  Mail, 
  Search, 
  Smartphone, 
  Database, 
  ShieldCheck, 
  PenTool, 
  ShoppingBag, 
  Clock, 
  BadgeCheck, 
  Sparkles, 
  MessageSquareText, 
  TrendingUp,
  Briefcase,
  UtensilsCrossed,
  Sparkle,
  Paintbrush
} from 'lucide-react';

export interface CalculatorOption {
  id: string;
  name: string;
  description: string;
  setupPrice: number;
  monthlyPrice: number;
  icon: any;
  category: 'basis' | 'extra' | 'groei';
}

export interface ShowcaseStyle {
  id: string;
  name: string;
  tagline: string;
  category: string;
  primaryColor: string;
  accentColor: string;
  darkBg: boolean;
  mockupItems: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  branch: string;
  description: string;
  price: string;
  deliveryTime: string;
  colorHex: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  initials: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const CALCULATOR_OPTIONS: CalculatorOption[] = [
  // Basis
  {
    id: 'webdesign',
    name: 'Uniek Webdesign',
    description: 'Volledig op maat ontworpen in jouw huisstijl, geoptimaliseerd voor desktop en mobiel.',
    setupPrice: 299,
    monthlyPrice: 0,
    icon: Paintbrush,
    category: 'basis'
  },
  {
    id: 'hosting',
    name: 'Hosting & Domeinnaam',
    description: 'Betrouwbare hosting, .nl domeinnaam en wekelijkse backups om je site veilig te houden.',
    setupPrice: 0,
    monthlyPrice: 15,
    icon: Globe,
    category: 'basis'
  },
  // Extra features
  {
    id: 'contact_form',
    name: 'Interactief Contactformulier',
    description: 'Laat bezoekers eenvoudig contact opnemen of direct een terugbelverzoek achterlaten.',
    setupPrice: 39,
    monthlyPrice: 0,
    icon: Mail,
    category: 'extra'
  },
  {
    id: 'seo_basic',
    name: 'SEO Basis Optimalisatie',
    description: 'Basis Google optimalisatie (meta tags, sitemap, titels) zodat je direct lokaal vindbaar bent.',
    setupPrice: 79,
    monthlyPrice: 0,
    icon: Search,
    category: 'extra'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Chat-knop',
    description: 'Direct contact met jouw klanten via een handige WhatsApp knop op elke pagina.',
    setupPrice: 29,
    monthlyPrice: 0,
    icon: MessageSquareText,
    category: 'extra'
  },
  // Groei features
  {
    id: 'cms',
    name: 'Eenvoudig Beheersysteem (CMS)',
    description: 'Zelf teksten en foto’s aanpassen met een super simpele editor, zonder technische kennis.',
    setupPrice: 99,
    monthlyPrice: 5,
    icon: PenTool,
    category: 'groei'
  },
  {
    id: 'booking_system',
    name: 'Online Afsprakensysteem',
    description: 'Laat klanten direct een afspraak inplannen in jouw agenda (ideaal voor kappers, coaches, therapeuten).',
    setupPrice: 149,
    monthlyPrice: 10,
    icon: Clock,
    category: 'groei'
  },
  {
    id: 'ecommerce',
    name: 'Mini-Webshop',
    description: 'Verkoop tot 20 producten direct online met iDEAL integratie via Stripe of Mollie.',
    setupPrice: 249,
    monthlyPrice: 15,
    icon: ShoppingBag,
    category: 'groei'
  }
];

export const SHOWCASE_STYLES: ShowcaseStyle[] = [
  {
    id: 'style_modern',
    name: 'De Minimalist',
    tagline: 'Schoon, rustgevend en modern',
    category: 'ZZP, Coaches & Therapeuten',
    primaryColor: 'bg-[#1e293b]',
    accentColor: '#10b981',
    darkBg: false,
    mockupItems: ['Minimalistisch logo', 'Zachte tinten', 'Elegante schreefloze lettertypes', 'Rustige witruimtes']
  },
  {
    id: 'style_warm',
    name: 'De Ambachtsman',
    tagline: 'Warm, organisch en ambachtelijk',
    category: 'Horeca, Bakkers, Bouw & Renovatie',
    primaryColor: 'bg-[#1e140d]',
    accentColor: '#d97706',
    darkBg: true,
    mockupItems: ['Echte, warme sfeer', 'Elegante serif details', 'Foto-georiënteerd', 'Handgetekende iconen']
  },
  {
    id: 'style_bold',
    name: 'De Krachtpatser',
    tagline: 'Stoer, strak en resultaatgericht',
    category: 'Sportscholen, Autobedrijven & Schilders',
    primaryColor: 'bg-[#0f172a]',
    accentColor: '#ef4444',
    darkBg: true,
    mockupItems: ['Contrastrijke buttons', 'Duidelijke teksten', 'Groot lettertype', 'Snel overzicht van diensten']
  },
  {
    id: 'style_fresh',
    name: 'De Creatieveling',
    tagline: 'Fris, vrolijk en benaderbaar',
    category: 'Salons, Creatievelingen & Scholen',
    primaryColor: 'bg-[#fafaf9]',
    accentColor: '#ec4899',
    darkBg: false,
    mockupItems: ['Zachte pastelkleuren', 'Speelse vormen', 'Fotogalerij met ronde hoeken', 'Social media integratie']
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'port_1',
    title: 'Kapsalon Haarstudio Nova',
    category: 'Schoonheid & Verzorging',
    branch: 'Haarstudio',
    description: 'Een frisse, responsive website inclusief een online afsprakensysteem zodat klanten direct kunnen boeken.',
    price: '€447',
    deliveryTime: '10 dagen',
    colorHex: '#ec4899'
  },
  {
    id: 'port_2',
    title: 'Hovenier Groen & Co',
    category: 'Bouw & Tuin',
    branch: 'Hoveniersbedrijf',
    description: 'Prachtige fotogalerij van gerealiseerde tuinen, een duidelijk overzicht van diensten en een offerteaanvraag-formulier.',
    price: '€378',
    deliveryTime: '12 dagen',
    colorHex: '#10b981'
  },
  {
    id: 'port_3',
    title: 'Café De Buurman',
    category: 'Horeca & Recreatie',
    branch: 'Eetcafé / Bar',
    description: 'Sfeervolle website met een eenvoudig aanpasbare menukaart, openingstijden en Google Maps integratie.',
    price: '€338',
    deliveryTime: '8 dagen',
    colorHex: '#d97706'
  },
  {
    id: 'port_4',
    title: 'Van Dam Schilderwerken',
    category: 'Onderhoud & Bouw',
    branch: 'Schildersbedrijf',
    description: 'Professionele website gericht op lokaal vertrouwen, met duidelijke reviews, werkwijze en WhatsApp knop.',
    price: '€328',
    deliveryTime: '7 dagen',
    colorHex: '#3b82f6'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test_1',
    name: 'Anouk van Dam',
    role: 'Eigenaresse',
    company: 'Haarstudio Nova',
    rating: 5,
    text: 'Voorheen regelde ik afspraken via WhatsApp, dat kostte me uren per week. Oerang heeft een prachtige budget website gebouwd met een geïntegreerd afsprakensysteem. Mijn klanten boeken nu direct zelf. De investering had ik er binnen één maand al uit!',
    initials: 'AD'
  },
  {
    id: 'test_2',
    name: 'Mark Groen',
    role: 'Oprichter',
    company: 'Hovenier Groen & Co',
    rating: 5,
    text: 'Ik zocht een simpele website zonder maandelijks honderden euro’s kwijt te zijn. Oerang leverde precies dat: een professionele uitstraling, snel geleverd en duidelijke communicatie. Geen gedoe, gewoon goede service.',
    initials: 'MG'
  },
  {
    id: 'test_3',
    name: 'Sander de Buurman',
    role: 'Eigenaar',
    company: 'Café De Buurman',
    rating: 5,
    text: 'Onze menukaart verandert regelmatig. Dankzij het handige beheersysteem van Oerang pas ik dit nu binnen 2 minuten zelf aan op mijn telefoon. Echt een aanrader voor elke kleine ondernemer!',
    initials: 'SB'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq_1',
    question: 'Hoe kan een website zo goedkoop zijn bij Oerang?',
    answer: 'Wij geloven dat een goede website niet de hoofdprijs hoeft te kosten. Door te werken met geoptimaliseerde basistemplates en een efficiënte werkwijze, besparen we kostbare ontwerptijd. Zo krijg jij een professionele en snelle website, zonder onnodige kosten.'
  },
  {
    id: 'faq_2',
    question: 'Zit ik vast aan een langlopend contract?',
    answer: 'Nee, absoluut niet. De website is na oplevering 100% jouw eigendom. Wij bieden optioneel betrouwbare hosting en onderhoud aan vanaf €15 per maand (inclusief domeinnaam en backups), maandelijks opzegbaar. Geen verborgen kleine lettertjes.'
  },
  {
    id: 'faq_3',
    question: 'Is de website goed vindbaar in Google?',
    answer: 'Ja! Elke website die wij bouwen is technisch geoptimaliseerd voor zoekmachines (SEO). De laadsnelheid is razendsnel en de site is 100% mobielvriendelijk, wat Google erg belangrijk vindt. Wil je extra scoren? Dan raden we ons SEO Basis pakket aan.'
  },
  {
    id: 'faq_4',
    question: 'Kan ik de website later zelf aanpassen?',
    answer: 'Zeker. Als je kiest voor de CMS uitbreiding, installeren we een uiterst gebruiksvriendelijk beheersysteem. Je krijgt een korte video-uitleg en kunt daarna zelf eenvoudig teksten, foto’s of menukaarten aanpassen.'
  },
  {
    id: 'faq_5',
    question: 'Hoe lang duurt het voordat mijn website live staat?',
    answer: 'Zodra we alle teksten, logo’s en foto’s van jou hebben ontvangen, gaan we direct aan de slag. Gemiddeld staat een budget website binnen 7 tot 14 werkdagen volledig online.'
  },
  {
    id: 'faq_6',
    question: 'Wat als ik nog geen logo of tekst heb?',
    answer: 'Geen probleem! Oerang kan je hierbij helpen. We kunnen tegen een kleine meerprijs een passend basislogo ontwerpen of professionele, Google-vriendelijke teksten voor je schrijven. Vraag gerust naar de mogelijkheden!'
  }
];

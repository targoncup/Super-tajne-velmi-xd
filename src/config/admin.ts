// Admin configuration
export const ADMIN_CONFIG = {
  password: 'targon2024admin',
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};

// Registration data structure
export interface TeamRegistration {
  id: string;
  timestamp: number;
  teamName: string;
  teamTag: string;
  captainName: string;
  captainEmail: string;
  captainPhone: string;
  captainDiscord: string;
  players: Array<{
    name: string;
    summonerName: string;
    role: string;
    nationality: string;
  }>;
  substitutes: Array<{
    name: string;
    summonerName: string;
    role: string;
    nationality: string;
  }>;
  coach: {
    name: string;
    email: string;
    experience: string;
  };
  agreeToRules: boolean;
  agreeToStreaming: boolean;
  status: 'pending' | 'approved' | 'rejected';
  notes: string;
}

// Content structure for editing
export interface SiteContent {
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    registerButtonText: string;
    watchTrailerText: string;
    featuresTitle: string;
    featuresSubtitle: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    championsTitle: string;
    championsSubtitle: string;
    champions: Array<{
      season: string;
      team: string;
      prize: string;
      place: string;
    }>;
    statsEnabled: boolean;
    stats: {
      teams: string;
      teamsLabel: string;
      prizePool: string;
      prizePoolLabel: string;
      viewers: string;
      viewersLabel: string;
      countries: string;
      countriesLabel: string;
    };
  };
  tournament: {
    title: string;
    subtitle: string;
    description: string;
    prizePool: string;
    registrationDeadline: string;
    registerButtonText: string;
    rulesButtonText: string;
  };
  rules: {
    title: string;
    subtitle: string;
    description: string;
  };
  champions: {
    title: string;
    subtitle: string;
    description: string;
  };
  register: {
    title: string;
    subtitle: string;
    description: string;
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
  };
  navigation: {
    tournament: string;
    register: string;
    rules: string;
    champions: string;
    contact: string;
  };
  footer: {
    description: string;
    copyright: string;
  };
}

// Default content
export const DEFAULT_CONTENT: SiteContent = {
  home: {
    heroTitle: 'TARGON CUP',
    heroSubtitle: 'OFICIÁLNÍ MISTROVSTVÍ',
    heroDescription: 'Ultimátní League of Legends turnaj, kde se rodí legendy a šampioni povstávají, aby si nárokovali svůj trůn mezi hvězdami.',
    registerButtonText: 'Registrovat Nyní',
    watchTrailerText: 'Sledovat Trailer',
    featuresTitle: 'Proč Zvolit Targon Cup?',
    featuresSubtitle: 'Zažijte vrchol kompetitivního League of Legends s profesionální organizací a obrovskými odměnami.',
    features: [
      {
        icon: 'DollarSign',
        title: 'Obrovské Odměny',
        description: 'Největší prize pool v historii českých a slovenských League of Legends turnajů'
      },
      {
        icon: 'Shield',
        title: 'Profesionální Organizace',
        description: 'Turnaj organizovaný podle nejvyšších standardů s kvalifikovanými rozhodčími'
      },
      {
        icon: 'Users',
        title: 'Elitní Konkurence',
        description: 'Soutěžte proti nejlepším týmům z České republiky a Slovenska'
      },
      {
        icon: 'Star',
        title: 'Živé Vysílání',
        description: 'Všechny zápasy jsou vysílány živě s profesionálním komentářem'
      }
    ],
    championsTitle: 'Síň Šampiónů',
    championsSubtitle: 'Legendy, které dosáhly velikosti',
    champions: [
      { season: 'Léto 2024', team: 'Celestial Guardians', prize: '$25,000', place: '1.' },
      { season: 'Jaro 2024', team: 'Starforge Legends', prize: '$20,000', place: '1.' },
      { season: 'Zima 2023', team: 'Cosmic Reapers', prize: '$15,000', place: '1.' }
    ],
    welcomeMessage: 'Vítejte v nejprestižnějším League of Legends turnaji',
    announcementText: 'Registrace pro Zimní Mistrovství 2024 jsou nyní otevřené!',
    callToActionText: 'Připojte se k tisícům hráčů a dokažte svou hodnotu',
    statsEnabled: true,
    stats: {
      teams: '500+',
      teamsLabel: 'Registrovaných Týmů',
      prizePool: '$75K',
      prizePoolLabel: 'Celkový Prize Pool',
      viewers: '50K+',
      viewersLabel: 'Živých Diváků',
      countries: '12',
      countriesLabel: 'Zemí',
    },
  },
  tournament: {
    title: 'Zimní Mistrovství 2024',
    subtitle: 'DALŠÍ TURNAJ',
    description: 'Ultimátní test dovedností a strategie. 64 elitních týmů soutěží o slávu a největší prize pool v historii turnaje.',
    prizePool: '$50,000',
    registrationDeadline: '15. Pro',
    registerButtonText: 'Registrovat Tým',
    rulesButtonText: 'Zobrazit Pravidla',
  },
  rules: {
    title: 'Pravidla Turnaje',
    subtitle: 'OFICIÁLNÍ PRAVIDLA',
    description: 'Kompletní sada pravidel a předpisů pro všechny účastníky Targon Cup',
  },
  champions: {
    title: 'Síň Šampiónů',
    subtitle: 'SÍNĚ SLÁVY',
    description: 'Legendy, které dosáhly velikosti a navždy si zajistily místo v historii Targon Cup',
  },
  register: {
    title: 'Registrace do Targon Cup',
    subtitle: 'REGISTRACE TÝMU',
    description: 'Připojte se k nejprestižnějšímu League of Legends turnaji a dokažte svou hodnotu mezi hvězdami',
  },
  contact: {
    title: 'Kontakt',
    subtitle: 'KONTAKTUJTE NÁS',
    description: 'Máte otázky ohledně turnaje? Potřebujete pomoc s registrací? Jsme tu pro vás!',
  },
  navigation: {
    tournament: 'Turnaj',
    register: 'Registrace',
    rules: 'Pravidla',
    champions: 'Šampioni',
    contact: 'Kontakt',
  },
  footer: {
    description: 'Prémiová série League of Legends turnajů. Připojte se k nebeské soutěži a dokažte svou hodnotu mezi hvězdami.',
    copyright: 'Všechna práva vyhrazena. League of Legends je ochranná známka společnosti Riot Games, Inc.',
  },
};
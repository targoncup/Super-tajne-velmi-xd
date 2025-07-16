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
    welcomeMessage: string;
    announcementText: string;
    callToActionText: string;
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
    scheduleTitle: string;
    scheduleItems: Array<{
      phase: string;
      title: string;
      dates: string;
      description: string;
    }>;
    prizeDistributionTitle: string;
    prizes: Array<{
      place: string;
      amount: string;
      color: string;
    }>;
  };
  rules: {
    title: string;
    subtitle: string;
    description: string;
    sections: Array<{
      title: string;
      icon: string;
      items: Array<string>;
      note?: string;
    }>;
    downloadButtonText: string;
  };
  champions: {
    title: string;
    subtitle: string;
    description: string;
    mvpTitle: string;
    mvpSubtitle: string;
    recordsTitle: string;
    recordsSubtitle: string;
    records: Array<{
      title: string;
      value: string;
      description: string;
      icon: string;
    }>;
  };
  register: {
    title: string;
    subtitle: string;
    description: string;
    requirementsTitle: string;
    requirements: Array<string>;
    teamInfoTitle: string;
    captainTitle: string;
    playersTitle: string;
    substitutesTitle: string;
    coachTitle: string;
    termsTitle: string;
    submitButtonText: string;
    successTitle: string;
    successMessage: string;
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    contactMethods: Array<{
      title: string;
      description: string;
      contact: string;
      available: string;
      icon: string;
    }>;
    departments: Array<{
      title: string;
      email: string;
      description: string;
      icon: string;
    }>;
    formTitle: string;
    officeTitle: string;
    officeAddress: Array<string>;
    workingHoursTitle: string;
    workingHours: Array<{
      day: string;
      hours: string;
    }>;
    faqTitle: string;
    faqItems: Array<{
      question: string;
      answer: string;
    }>;
  };
  navigation: {
    tournament: string;
    register: string;
    rules: string;
    champions: string;
    contact: string;
    logoText: string;
    logoSubtext: string;
  };
  footer: {
    description: string;
    copyright: string;
    logoText: string;
    logoSubtext: string;
    tournamentLinks: Array<{
      text: string;
      href: string;
    }>;
    socialTitle: string;
  };
  admin: {
    loginTitle: string;
    loginSubtitle: string;
    passwordLabel: string;
    loginButtonText: string;
    dashboardTitle: string;
    registrationsTitle: string;
    contentTitle: string;
    settingsTitle: string;
    logoutText: string;
    statsLabels: {
      total: string;
      pending: string;
      approved: string;
      rejected: string;
    };
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
    scheduleTitle: 'Harmonogram Turnaje',
    scheduleItems: [
      {
        phase: '1',
        title: 'Registrace',
        dates: '1. listopadu - 15. prosince',
        description: 'Týmy se registrují a odevzdávají potřebné dokumenty'
      },
      {
        phase: '2',
        title: 'Skupinová Fáze',
        dates: '20. prosince - 5. ledna',
        description: '64 týmů rozděleno do 8 skupin po 8 týmech'
      },
      {
        phase: '3',
        title: 'Playoff',
        dates: '10. ledna - 25. ledna',
        description: 'Top 32 týmů v double elimination bracketu'
      }
    ],
    prizeDistributionTitle: 'Rozdělení Cen',
    prizes: [
      { place: '1. Místo', amount: '$25,000', color: 'yellow' },
      { place: '2. Místo', amount: '$15,000', color: 'gray' },
      { place: '3. Místo', amount: '$7,500', color: 'orange' },
      { place: '4. Místo', amount: '$2,500', color: 'blue' }
    ],
  },
  rules: {
    title: 'Pravidla Turnaje',
    subtitle: 'OFICIÁLNÍ PRAVIDLA',
    description: 'Kompletní sada pravidel a předpisů pro všechny účastníky Targon Cup',
    sections: [
      {
        title: 'Struktura Ligy',
        icon: 'Trophy',
        items: [
          'Počet týmů: 8–10',
          'Splity: Dva ročně – Jarní, Letní a Zimní',
          'Základní část: Double Round Robin (každý s každým 2×)',
          'Formát zápasu: Best of 3',
          'Playoffs: Top 6 týmů postupuje do vyřazovací části',
          'Formát Playoffs: Double Elimination – Best of 5'
        ]
      },
      {
        title: 'Systém Bodování',
        icon: 'Target',
        items: [
          'Výhra 2:0 = 3 body',
          'Výhra 2:1 = 2 body',
          'Prohra 1:2 = 1 bod',
          'Prohra 0:2 = 0 bodů'
        ],
        note: 'Při shodě rozhoduje výsledek vzájemných zápasů'
      }
    ],
    downloadButtonText: 'Stáhnout Kompletní Pravidla (PDF)',
  },
  champions: {
    title: 'Síň Šampiónů',
    subtitle: 'SÍNĚ SLÁVY',
    description: 'Legendy, které dosáhly velikosti a navždy si zajistily místo v historii Targon Cup',
    mvpTitle: 'MVP Hráči',
    mvpSubtitle: 'Nejlepší hráči z každé sezóny',
    recordsTitle: 'Turnajové Rekordy',
    recordsSubtitle: 'Nejlepší výkony v historii Targon Cup',
    records: [
      {
        title: 'Nejrychlejší výhra',
        value: '18 min',
        description: 'Cosmic Reapers vs Thunder Wolves',
        icon: 'Trophy'
      },
      {
        title: 'Nejvyšší KDA',
        value: '15.2',
        description: 'ReaperADC (Zima 2023)',
        icon: 'Award'
      }
    ],
  },
  register: {
    title: 'Registrace do Targon Cup',
    subtitle: 'REGISTRACE TÝMU',
    description: 'Připojte se k nejprestižnějšímu League of Legends turnaji a dokažte svou hodnotu mezi hvězdami',
    requirementsTitle: 'Požadavky pro Registraci',
    requirements: [
      'Minimálně 3 hráči CZ/SK národnosti',
      '5 hlavních hráčů + 2 náhradníci',
      'Všichni hráči Diamond+ rank',
      'Registrační poplatek: 500 CZK',
      'Souhlas s pravidly turnaje',
      'Logo a název týmu (schválení)'
    ],
    teamInfoTitle: 'Informace o Týmu',
    captainTitle: 'Kapitán Týmu',
    playersTitle: 'Hlavní Sestava (5 hráčů)',
    substitutesTitle: 'Náhradníci (2 hráči)',
    coachTitle: 'Trenér (volitelné)',
    termsTitle: 'Souhlas s Podmínkami',
    submitButtonText: 'Registrovat Tým',
    successTitle: 'Registrace Úspěšná!',
    successMessage: 'Váš tým byl úspěšně zaregistrován. Obdržíte potvrzovací email s dalšími instrukcemi.',
  },
  contact: {
    title: 'Kontakt',
    subtitle: 'KONTAKTUJTE NÁS',
    description: 'Máte otázky ohledně turnaje? Potřebujete pomoc s registrací? Jsme tu pro vás!',
    contactMethods: [
      {
        title: 'Email',
        description: 'Obecné dotazy a podpora',
        contact: 'info@targoncup.cz',
        available: '24/7',
        icon: 'Mail'
      },
      {
        title: 'Discord',
        description: 'Komunitní podpora a chat',
        contact: 'discord.gg/targoncup',
        available: '24/7',
        icon: 'MessageCircle'
      },
      {
        title: 'Telefon',
        description: 'Naléhavé záležitosti',
        contact: '+420 123 456 789',
        available: 'Po-Pá 9:00-17:00',
        icon: 'Phone'
      }
    ],
    departments: [
      {
        title: 'Registrace Týmů',
        email: 'registrace@targoncup.cz',
        description: 'Pomoc s registrací a dokumenty',
        icon: 'Users'
      },
      {
        title: 'Technická Podpora',
        email: 'tech@targoncup.cz',
        description: 'Technické problémy a herní záležitosti',
        icon: 'Shield'
      },
      {
        title: 'Mediální Dotazy',
        email: 'media@targoncup.cz',
        description: 'Tiskové zprávy a partnerství',
        icon: 'Headphones'
      }
    ],
    formTitle: 'Napište nám',
    officeTitle: 'Naše Kancelář',
    officeAddress: [
      'Targon Cup s.r.o.',
      'Wenceslas Square 1',
      '110 00 Praha 1',
      'Česká republika'
    ],
    workingHoursTitle: 'Pracovní Doba',
    workingHours: [
      { day: 'Pondělí - Pátek', hours: '9:00 - 17:00' },
      { day: 'Sobota', hours: '10:00 - 14:00' },
      { day: 'Neděle', hours: 'Zavřeno' }
    ],
    faqTitle: 'FAQ',
    faqItems: [
      {
        question: 'Kdy začíná registrace?',
        answer: 'Registrace je otevřena od 1. listopadu do 15. prosince.'
      },
      {
        question: 'Kolik stojí registrace?',
        answer: 'Registrační poplatek je 500 CZK na tým.'
      },
      {
        question: 'Jak rychle odpovídáte?',
        answer: 'Obvykle do 24 hodin, během turnajů do 2 hodin.'
      }
    ],
  },
  navigation: {
    tournament: 'Turnaj',
    register: 'Registrace',
    rules: 'Pravidla',
    champions: 'Šampioni',
    contact: 'Kontakt',
    logoText: 'Targon Cup',
    logoSubtext: 'OFICIÁLNÍ',
  },
  footer: {
    description: 'Prémiová série League of Legends turnajů. Připojte se k nebeské soutěži a dokažte svou hodnotu mezi hvězdami.',
    copyright: 'Všechna práva vyhrazena. League of Legends je ochranná známka společnosti Riot Games, Inc.',
    logoText: 'Targon Cup',
    logoSubtext: 'OFICIÁLNÍ',
    tournamentLinks: [
      { text: 'Rozvrh', href: '/tournament' },
      { text: 'Registrace', href: '/register' },
      { text: 'Pravidla', href: '/rules' },
      { text: 'Pavouk', href: '#' }
    ],
    socialTitle: 'Sledujte Nás',
  },
  admin: {
    loginTitle: 'Admin Přístup',
    loginSubtitle: 'Zadejte heslo pro přístup k administraci',
    passwordLabel: 'Heslo',
    loginButtonText: 'Přihlásit se',
    dashboardTitle: 'Dashboard',
    registrationsTitle: 'Registrace Týmů',
    contentTitle: 'Správa Obsahu',
    settingsTitle: 'Nastavení',
    logoutText: 'Odhlásit se',
    statsLabels: {
      total: 'Celkem Registrací',
      pending: 'Čekající',
      approved: 'Schválené',
      rejected: 'Zamítnuté',
    },
  },
  },
};
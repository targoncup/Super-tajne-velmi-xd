export const ADMIN_CONFIG = {
  password: 'admin123',
  sessionTimeout: 30 * 60 * 1000 // 30 minutes
};

export interface Player {
  name: string;
  summonerName: string;
  role: string;
  nationality: string;
}

export interface Coach {
  name: string;
  email: string;
  experience: string;
}

export interface TeamRegistration {
  id?: string;
  teamName: string;
  teamTag: string;
  captainName: string;
  captainEmail: string;
  captainDiscord: string;
  players: Player[];
  substitutes: Player[];
  coach: Coach;
  agreeToRules: boolean;
  agreeToStreaming: boolean;
  logo?: {
    name: string;
    type: string;
    size: number;
    data: string; // base64 encoded
  } | null;
  createdAt?: string;
}

export interface SiteContent {
  home: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    welcomeMessage: string;
    heroTitle: string;
    announcementText: string;
    heroDescription: string;
    callToActionText: string;
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
      name: string;
      year: string;
      image: string;
      description: string;
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
  navigation: {
    home: string;
    tournament: string;
    register: string;
    rules: string;
    champions: string;
    contact: string;
  };
  footer: {
    title: string;
    description: string;
    copyright: string;
  };
  tournament: {
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
}

export const DEFAULT_CONTENT: SiteContent = {
  home: {
    title: "Targon Cup 2025",
    subtitle: "Největší český League of Legends turnaj",
    description: "Připojte se k největšímu českému a slovenskému League of Legends turnaji roku 2025. Bojujte o titul mistra a ceny v hodnotě přes 100 000 Kč!",
    cta: "Registrovat Tým",
    welcomeMessage: "Vítejte na Targon Cup 2025",
    heroTitle: "Targon Cup 2025",
    announcementText: "Registrace jsou otevřené!",
    heroDescription: "Připojte se k největšímu českému a slovenskému League of Legends turnaji roku 2025. Bojujte o titul mistra a ceny v hodnotě přes 100 000 Kč!",
    callToActionText: "Připojte se k turnaji",
    registerButtonText: "Registrovat Tým",
    watchTrailerText: "Sledovat Trailer",
    featuresTitle: "Proč se zúčastnit?",
    featuresSubtitle: "Objevte výhody účasti v Targon Cup 2025",
    features: [
      {
        icon: "Trophy",
        title: "Vysoké výhry",
        description: "Bojujte o ceny v hodnotě přes 100 000 Kč"
      },
      {
        icon: "Users",
        title: "Profesionální prostředí",
        description: "Turnaj organizovaný podle nejvyšších standardů"
      },
      {
        icon: "Zap",
        title: "Live stream",
        description: "Vaše zápasy budou vysílány tisícům diváků"
      }
    ],
    championsTitle: "Šampioni",
    championsSubtitle: "Vítězové předchozích ročníků",
    champions: [
      {
        name: "Team Alpha",
        year: "2024",
        image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg",
        description: "Vítězové prvního ročníku Targon Cup"
      },
      {
        name: "Team Beta",
        year: "2023",
        image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
        description: "Legendární tým s neporazitelnou strategií"
      }
    ],
    statsEnabled: true,
    stats: {
      teams: "128",
      teamsLabel: "Registrovaných týmů",
      prizePool: "100 000 Kč",
      prizePoolLabel: "Celková výhra",
      viewers: "50 000",
      viewersLabel: "Diváků online",
      countries: "15",
      countriesLabel: "Zemí"
    }
  },
  navigation: {
    home: "Domů",
    tournament: "Turnaj",
    register: "Registrace",
    rules: "Pravidla",
    champions: "Šampioni",
    contact: "Kontakt"
  },
  footer: {
    title: "Targon Cup 2025",
    description: "Největší český League of Legends turnaj",
    copyright: "© 2025 Targon Cup. Všechna práva vyhrazena."
  },
  tournament: {
    title: "Turnaj",
    subtitle: "Informace o turnaji",
    description: "Vše co potřebujete vědět o Targon Cup 2025"
  },
  register: {
    title: "Registrace",
    subtitle: "Registrace týmu",
    description: "Zaregistrujte svůj tým do Targon Cup 2025"
  },
  contact: {
    title: "Kontakt",
    subtitle: "Kontaktujte nás",
    description: "Máte dotazy? Neváhejte nás kontaktovat"
  },
  rules: {
    title: "Pravidla",
    subtitle: "Pravidla turnaje",
    description: "Oficiální pravidla Targon Cup 2025"
  },
  champions: {
    title: "Šampioni",
    subtitle: "Hall of Fame",
    description: "Vítězové předchozích ročníků"
  }
};
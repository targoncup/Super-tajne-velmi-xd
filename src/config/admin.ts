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
  captainPhone: string;
  captainDiscord: string;
  players: Player[];
  substitutes: Player[];
  coach: Coach;
  agreeToRules: boolean;
  agreeToStreaming: boolean;
  createdAt?: string;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
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
  hero: {
    title: "Targon Cup 2025",
    subtitle: "Největší český League of Legends turnaj",
    description: "Připojte se k největšímu českému a slovenskému League of Legends turnaji roku 2025. Bojujte o titul mistra a ceny v hodnotě přes 100 000 Kč!",
    cta: "Registrovat Tým"
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
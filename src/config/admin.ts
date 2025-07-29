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
  captainPhone?: string;
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
  navigation: {
    home: string;
    tournament: string;
    groups: string;
    register: string;
    rules: string;
    champions: string;
    contact: string;
    pageVisibility: {
      home: boolean;
      tournament: boolean;
      groups: boolean;
      groups: boolean;
      register: boolean;
      rules: boolean;
      champions: boolean;
      contact: boolean;
    };
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
  groups: {
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
        icon: "DollarSign",
        title: "Poznej nové lidi",
        description: "Najdi spoluhráče, soupeře i nové kámoše – komunita je základ!"
      },
      {
        icon: "Star",
        title: "Ukaž, co v tobě je",
        description: "Nemusíš být pro, abys zazářil – překvap všechny a vystup z davu!"
      },
      {
        icon: "Camera",
        title: "Live stream",
        description: "Vaše zápasy budou vysílány tisícům diváků"
      },
      {
        icon: "Trophy",
        title: "Vyhraj cool ceny",
        description: "Mega super TCO pohár a medaile"
      }
    ],
    championsTitle: "Šampioni",
    championsSubtitle: "Vítězové předchozích ročníků",
    champions: [
      {
        season: "Léto 2024",
        team: "Celestial Guardians",
        prize: "100 000 Kč",
        place: "1"
      },
      {
        season: "Jaro 2024",
        team: "Starforge Legends",
        prize: "75 000 Kč",
        place: "1"
      },
      {
        season: "Zima 2023",
        team: "Cosmic Reapers",
        prize: "50 000 Kč",
        place: "1"
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
    groups: "Skupiny",
    register: "Registrace",
    rules: "Pravidla",
    champions: "Šampioni",
    contact: "Kontakt",
    pageVisibility: {
      home: true,
      tournament: true,
      groups: true,
      groups: true,
      register: true,
      rules: true,
      champions: true,
      contact: true
    }
  },
  footer: {
    title: "Targon Cup 2025",
    description: "Největší český League of Legends turnaj",
    copyright: "© 2025 Targon Cup, Všechna práva vyhrazena."
  },
  tournament: {
    title: "Turnaj",
    subtitle: "Informace o turnaji",
    description: "Vše co potřebujete vědět o Targon Cup 2025",
    prizePool: "100,000 Kč",
    registrationDeadline: "31. Leden",
    registerButtonText: "Registrovat Tým",
    rulesButtonText: "Zobrazit Pravidla"
  },
  register: {
    title: "Registrace",
    subtitle: "Registrace týmu",
    description: "Zaregistrujte svůj tým do Targon Cup 2025",
    requirementsTitle: "Požadavky pro Registraci",
    requirements: [
      "Minimálně 3 hráči CZ/SK národnosti",
      "5 hlavních hráčů + 2 náhradníci",
      "Všichni hráči Gold+ rank",
      "Souhlas s pravidly turnaje",
      "Logo a název týmu (schválení)"
    ],
    teamInfoTitle: "Informace o Týmu",
    captainTitle: "Kapitán Týmu",
    playersTitle: "Hlavní Sestava (5 hráčů)",
    substitutesTitle: "Náhradníci (až 2)",
    coachTitle: "Trenér (volitelné)",
    termsTitle: "Souhlasy",
    submitButtonText: "Registrovat Tým",
    successTitle: "Registrace Úspěšná!",
    successMessage: "Váš tým byl úspěšně zaregistrován. Obdržíte potvrzovací email s dalšími instrukcemi."
  },
  groups: {
    title: "Skupiny",
    subtitle: "Turnajové skupiny",
    description: "Aktuálne postavenie týmov v skupinovej fáze",
    formatTitle: "Formát Turnaja",
    formatSubtitle: "Ako funguje skupinová fáza",
    qualificationInfo: {
      advance: "1.-2. miesto: Postup do playoff",
      eliminate: "3.-4. miesto: Vypadnutie"
    },
    formatCards: [
      {
        title: "Skupinová Fáze",
        description: "Každý s každým (Round Robin)",
        icon: "Gamepad2"
      },
      {
        title: "Bodovanie",
        description: "3 body za výhru, 0 za prehru",
        icon: "Trophy"
      },
      {
        title: "Postup",
        description: "Top 2 z každej skupiny",
        icon: "Crown"
      }
    ]
  },
  contact: {
    title: "Kontakt",
    subtitle: "Kontaktujte nás",
    description: "Máte dotazy? Neváhejte nás kontaktovat",
    contactMethods: [
      {
        title: "Email",
        description: "Obecné dotazy a podpora",
        contact: "https://discord.gg/c9pRsbYCt2",
        available: "24/7",
        icon: "Mail"
      },
      {
        title: "Discord",
        description: "Komunitní podpora a chat",
        contact: "https://discord.gg/c9pRsbYCt2",
        available: "24/7",
        icon: "MessageCircle"
      }
    ],
    departments: [
      {
        title: "Registrace Týmů",
        email: "https://discord.gg/c9pRsbYCt2",
        description: "Pomoc s registrací a dokumenty",
        icon: "Users"
      },
      {
        title: "Technická Podpora",
        email: "https://discord.gg/c9pRsbYCt2",
        description: "Technické problémy a herní záležitosti",
        icon: "Shield"
      },
      {
        title: "Mediální Dotazy",
        email: "https://discord.gg/c9pRsbYCt2",
        description: "Tiskové zprávy a partnerství",
        icon: "Headphones"
      }
    ],
    formTitle: "Kontaktní Formulář",
    workingHoursTitle: "Pracovní Doba",
    workingHours: [
      { day: "Pondělí - Pátek", hours: "9:00 - 17:00" },
      { day: "Sobota", hours: "10:00 - 14:00" },
      { day: "Neděle", hours: "Zavřeno" }
    ]
  },
  rules: {
    title: "Pravidla",
    subtitle: "Pravidla turnaje",
    description: "Oficiální pravidla Targon Cup 2025",
    sections: [
      {
        title: "Struktura Ligy",
        icon: "Trophy",
        items: [
          "Počet týmů: 8–10",
          "Splity: Dva ročně – Jarní, Letní a Zimní na EUNE",
          "Základní část: Double Round Robin (každý s každým 2×)",
          "Formát zápasu: Best of 3 (Fearless)",
          "Playoffs: Top 6 týmů postupuje do vyřazovací části",
          "Formát Playoffs: Double Elimination – Best of 5 (Fearless)"
        ],
        note: ""
      },
      {
        title: "Systém Bodování",
        icon: "Target",
        items: [
          "Výhra 2:0 = 3 body",
          "Výhra 2:1 = 2 body",
          "Prohra 1:2 = 1 bod",
          "Prohra 0:2 = 0 bodů"
        ],
        note: "Při shodě rozhoduje: Výsledek vzájemných zápasů, Tiebreak zápas(y), Čas potřebný k výhře"
      },
      {
        title: "Pravidla pro Týmy",
        icon: "Users",
        items: [
          "Velikost soupisky: 7 hráčů (5 hlavních, 2 náhradníci)",
          "Trenér: Každý tým může mít trenéra",
          "Občanství: Min. 3 hráči CZ/SK",
          "Přestupy: Povoleny pouze mezi splity",
          "Registrace: Logo, název a barvy před sezónou"
        ],
        note: ""
      },
      {
        title: "Technické Podmínky",
        icon: "Gamepad2",
        items: [
          "Žádná externí komunikace během zápasu",
          "Schválené headsety a software",
          "Dozor administrátorů ligy",
          "Streaming pouze s povolením admina"
        ],
        note: ""
      },
      {
        title: "Chování a Disciplína",
        icon: "Shield",
        items: [
          "Zakázáno: Hate speech, trolling, griefing",
          "Verbální útoky na streamu nebo sociálních sítích"
        ],
        note: "Tresty: Varování, pokuty, suspendace, vyloučení"
      },
      {
        title: "Draftovací Pravidla",
        icon: "Target",
        items: [
          "Standardní Riot Games Ban/Pick formát",
          "Draft za přítomnosti rozhodčího",
          "Trenéři komunikují pouze během draftu"
        ],
        note: ""
      },
      {
        title: "Správa Ligy",
        icon: "Crown",
        items: [
          "Změny pravidel podléhají správě ligy",
          "Týmy se účastní diskusí mezi splity",
          "Právo vyloučit za závažné porušení"
        ],
        note: ""
      },
      {
        title: "Identita Týmu",
        icon: "Star",
        items: [
          "Název týmu, logo a dresy nesmí obsahovat urážlivé výrazy",
          "Žádná politická, náboženská sdělení",
          "Žádné napodobeniny jiných značek"
        ],
        note: "Veškerý vizuál musí být schválen organizátory před sezónou"
      },
      {
        title: "Záskoky a Náhrady",
        icon: "Users",
        items: [
          "Náhradník může být nasazen mezi hrami",
          "Hráč musí být oficiálně zaregistrován",
          "Dočasný záskok při technickém výpadku"
        ],
        note: "Týmy se musí dostavit včas, mediální povinnosti jsou závazné"
      }
    ],
    downloadButtonText: "Stáhnout Kompletní Pravidla (PDF)"
  },
  champions: {
    title: "Šampioni",
    subtitle: "Hall of Fame",
    description: "Vítězové předchozích ročníků",
    mvpTitle: "MVP Hráči",
    mvpSubtitle: "Nejlepší hráči z každé sezóny",
    recordsTitle: "Turnajové Rekordy",
    recordsSubtitle: "Nejlepší výkony v historii Targon Cup",
    records: [
      {
        title: "Nejrychlejší výhra",
        value: "18 min",
        description: "Cosmic Reapers vs Thunder Wolves",
        icon: "Trophy"
      },
      {
        title: "Nejvyšší KDA",
        value: "15.2",
        description: "ReaperADC (Zima 2023)",
        icon: "Award"
      },
      {
        title: "Nejvíce damage",
        value: "45,230",
        description: "CelestialADC (Léto 2024)",
        icon: "Star"
      },
      {
        title: "Nejvíce titulů",
        value: "3",
        description: "Cosmic Reapers organizace",
        icon: "Crown"
      }
    ]
  }
};
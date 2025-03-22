const missionData = [
  {
    id: "daily-play-cards",
    title: "Invocador Dedicado",
    description: "Jogue 10 cartas em partidas.",
    type: "daily",
    requirements: [
      { type: "playCards", amount: 10 }
    ],
    rewards: {
      gold: 100,
      experience: 50
    },
    expiresAt: null
  },
  {
    id: "daily-wins",
    title: "Campeão do Dia",
    description: "Vença 3 partidas.",
    type: "daily",
    requirements: [
      { type: "winMatches", amount: 3 }
    ],
    rewards: {
      gold: 150,
      experience: 100
    },
    expiresAt: null
  },
  {
    id: "weekly-collect-rare",
    title: "Colecionador de Raridades",
    description: "Colete 3 cartas raras ou superiores.",
    type: "weekly",
    requirements: [
      { type: "collectCards", amount: 3, rarity: "RARE" }
    ],
    rewards: {
      gold: 300,
      experience: 200,
      pack: 1
    },
    expiresAt: null
  },
  {
    id: "campaign-luz-1",
    title: "Caminho da Luz: Início",
    description: "Complete o primeiro capítulo da campanha Luz.",
    type: "campaign",
    requirements: [
      { type: "completeCampaign", campaignId: "luz-chapter-1" }
    ],
    rewards: {
      gold: 500,
      experience: 300,
      card: "luz-guardian"
    },
    expiresAt: null
  },
  {
    id: "campaign-trevas-1",
    title: "Abraçando as Sombras",
    description: "Complete o primeiro capítulo da campanha Trevas.",
    type: "campaign",
    requirements: [
      { type: "completeCampaign", campaignId: "trevas-chapter-1" }
    ],
    rewards: {
      gold: 500,
      experience: 300,
      card: "trevas-necromancer"
    },
    expiresAt: null
  }
];

const eventData = [
  {
    id: "festival-of-light",
    title: "Festival da Luz Eterna",
    description: "Celebre o solstício com cartas de Luz exclusivas e missões especiais.",
    startDate: "2025-03-20T00:00:00Z",
    endDate: "2025-04-03T23:59:59Z",
    rewards: {
      card: "luz-archangel",
      cardback: "solstice-light",
      gold: 1000
    },
    missions: [
      {
        id: "event-play-luz",
        title: "Campeão da Luz",
        description: "Vença 5 partidas usando um deck da facção LUZ.",
        requirements: [
          { type: "winMatches", amount: 5, faction: "LUZ" }
        ],
        rewards: {
          gold: 300,
          experience: 200
        }
      },
      {
        id: "event-collect-light",
        title: "Arauto da Aurora",
        description: "Colete 5 cartas da facção LUZ.",
        requirements: [
          { type: "collectCards", amount: 5, faction: "LUZ" }
        ],
        rewards: {
          gold: 200,
          pack: "luz-special-pack"
        }
      }
    ],
    specialRules: [
      "Cartas de LUZ custam 1 de mana a menos durante o evento",
      "Lacaios de LUZ recebem +1/+1 quando invocados"
    ],
    leaderboard: true
  },
  {
    id: "darkness-rising",
    title: "A Ascensão das Trevas",
    description: "A escuridão se espalha pelo reino. Novas cartas das Trevas foram liberadas!",
    startDate: "2025-04-10T00:00:00Z",
    endDate: "2025-04-24T23:59:59Z",
    rewards: {
      card: "trevas-overlord",
      cardback: "dark-abyss",
      gold: 1000
    },
    missions: [
      {
        id: "event-trevas-win",
        title: "Subjugador das Sombras",
        description: "Vença 5 partidas usando um deck da facção TREVAS.",
        requirements: [
          { type: "winMatches", amount: 5, faction: "TREVAS" }
        ],
        rewards: {
          gold: 300,
          experience: 200
        }
      }
    ],
    specialRules: [
      "Quando um lacaio morre, causa 1 de dano ao herói inimigo",
      "Cartas de TREVAS ganham 'Estertor: Compre uma carta' durante o evento"
    ],
    leaderboard: true
  }
];

const tournamentData = [
  {
    id: "spring-championship",
    title: "Campeonato da Primavera",
    description: "Prove seu valor no primeiro grande torneio da temporada!",
    startDate: "2025-04-01T10:00:00Z",
    endDate: "2025-04-05T18:00:00Z",
    maxParticipants: 64,
    format: "single-elimination",
    restrictions: {
      deckLimitPerFaction: 1,
      bannedCards: ["luz-archangel", "trevas-overlord"]
    },
    prizes: [
      {
        position: "1st",
        rewards: {
          gold: 10000,
          exclusiveCard: "spring-champion",
          title: "Campeão da Primavera"
        }
      },
      {
        position: "2nd",
        rewards: {
          gold: 5000,
          packs: 10
        }
      },
      {
        position: "3rd-4th",
        rewards: {
          gold: 2500,
          packs: 5
        }
      }
    ]
  }
];

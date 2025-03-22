const cardCollection = [
  // LUZ FACTION - MINIONS
  {
    id: "luz-guardian",
    name: "Guardião da Aurora",
    type: "minion",
    rarity: "RARE",
    faction: "LUZ",
    cost: 4,
    attack: 3,
    health: 5,
    description: "Provocar. Quando um aliado for curado, receba +1/+1.",
    flavorText: "Sua armadura reflete o nascer do sol, cegando os inimigos e inspirando aliados.",
    abilities: ["taunt", "healing_synergy"],
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "luz-healer",
    name: "Sacerdotisa da Luz",
    type: "minion",
    rarity: "COMMON",
    faction: "LUZ",
    cost: 2,
    attack: 1,
    health: 3,
    description: "Grito de Guerra: Restaura 2 de vida a um personagem aliado.",
    abilities: ["battlecry", "heal"],
    effect: {
      type: "heal",
      amount: 2,
      target: "friendly"
    },
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "luz-avenger",
    name: "Vingador Celestial",
    type: "minion",
    rarity: "EPIC",
    faction: "LUZ",
    cost: 6,
    attack: 5,
    health: 5,
    description: "Grito de Guerra: Causa dano igual ao seu Ataque a um lacaio inimigo.",
    abilities: ["battlecry", "damage"],
    effect: {
      type: "damage",
      amount: "self_attack",
      target: "enemy_minion"
    },
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "luz-archangel",
    name: "Arcanjo Purificador",
    type: "minion",
    rarity: "LEGENDARY",
    faction: "LUZ",
    cost: 8,
    attack: 7,
    health: 7,
    description: "Grito de Guerra: Restaura toda a vida de seus outros lacaios. Eles ganham Escudo Divino.",
    abilities: ["battlecry", "heal", "divine_shield"],
    effect: {
      type: "heal",
      amount: "full",
      target: "all_friendly_minions"
    },
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "luz-squire",
    name: "Escudeiro Luminoso",
    type: "minion",
    rarity: "COMMON",
    faction: "LUZ",
    cost: 1,
    attack: 1,
    health: 2,
    description: "Escudo Divino",
    abilities: ["divine_shield"],
    artist: "Equipe Arcane Convergence"
  },
  
  // LUZ FACTION - SPELLS
  {
    id: "luz-blessing",
    name: "Bênção Sagrada",
    type: "spell",
    rarity: "COMMON",
    faction: "LUZ",
    cost: 3,
    description: "Conceda +2/+2 a um lacaio aliado e restaure 2 de vida ao seu herói.",
    effect: {
      type: "buff_and_heal",
      buff: {
        attack: 2,
        health: 2,
        target: "friendly_minion"
      },
      heal: {
        amount: 2,
        target: "hero"
      }
    },
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "luz-smite",
    name: "Julgamento Divino",
    type: "spell",
    rarity: "UNCOMMON",
    faction: "LUZ",
    cost: 4,
    description: "Causa 3 de dano a todos os lacaios inimigos.",
    effect: {
      type: "damage",
      amount: 3,
      target: "all_enemy_minions"
    },
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "luz-revival",
    name: "Ressurreição Divina",
    type: "spell",
    rarity: "EPIC",
    faction: "LUZ",
    cost: 7,
    description: "Invoque um lacaio aliado que morreu nesta partida.",
    effect: {
      type: "revive",
      target: "friendly_minion"
    },
    artist: "Equipe Arcane Convergence"
  },
  
  // TREVAS FACTION - MINIONS
  {
    id: "trevas-assassin",
    name: "Assassino das Sombras",
    type: "minion",
    rarity: "UNCOMMON",
    faction: "TREVAS",
    cost: 3,
    attack: 4,
    health: 2,
    description: "Furtividade. Grito de Guerra: Causa 2 de dano a um lacaio inimigo.",
    abilities: ["stealth", "battlecry", "damage"],
    effect: {
      type: "damage",
      amount: 2,
      target: "enemy_minion"
    },
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "trevas-cultist",
    name: "Cultista da Escuridão",
    type: "minion",
    rarity: "COMMON",
    faction: "TREVAS",
    cost: 2,
    attack: 2,
    health: 2,
    description: "Estertor: Compre uma carta.",
    abilities: ["deathrattle", "draw"],
    effect: {
      type: "draw",
      amount: 1
    },
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "trevas-necromancer",
    name: "Necromante Sombrio",
    type: "minion",
    rarity: "RARE",
    faction: "TREVAS",
    cost: 5,
    attack: 3,
    health: 4,
    description: "Grito de Guerra: Invoque um lacaio aliado que morreu nesta partida com 1 de vida.",
    abilities: ["battlecry", "revive"],
    effect: {
      type: "revive",
      target: "friendly_minion",
      health: 1
    },
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "trevas-overlord",
    name: "Senhor do Abismo",
    type: "minion",
    rarity: "LEGENDARY",
    faction: "TREVAS",
    cost: 8,
    attack: 8,
    health: 8,
    description: "Sempre que um lacaio inimigo morre, ganhe +2/+2.",
    abilities: ["power_from_death"],
    effect: {
      type: "buff_on_enemy_death",
      buff: {
        attack: 2,
        health: 2
      }
    },
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "trevas-imp",
    name: "Diabrete Voraz",
    type: "minion",
    rarity: "COMMON",
    faction: "TREVAS",
    cost: 1,
    attack: 2,
    health: 1,
    description: "Estertor: Cause 1 de dano ao herói inimigo.",
    abilities: ["deathrattle", "damage"],
    effect: {
      type: "damage",
      amount: 1,
      target: "enemy_hero"
    },
    artist: "Equipe Arcane Convergence"
  },
  
  // TREVAS FACTION - SPELLS
  {
    id: "trevas-curse",
    name: "Maldição Ancestral",
    type: "spell",
    rarity: "UNCOMMON",
    faction: "TREVAS",
    cost: 3,
    description: "Escolha um lacaio. Ao final do seu turno, ele recebe 2 de dano.",
    effect: {
      type: "curse",
      damage: 2,
      duration: "permanent",
      target: "any_minion"
    },
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "trevas-drain",
    name: "Dreno Vital",
    type: "spell",
    rarity: "COMMON",
    faction: "TREVAS",
    cost: 2,
    description: "Cause 2 de dano a um personagem e restaure 2 de vida ao seu herói.",
    effect: {
      type: "drain",
      amount: 2,
      target: "any_character"
    },
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "trevas-apocalypse",
    name: "Apocalipse Sombrio",
    type: "spell",
    rarity: "EPIC",
    faction: "TREVAS",
    cost: 6,
    description: "Destrua todos os lacaios. Para cada lacaio aliado destruído, cause 2 de dano ao herói inimigo.",
    effect: {
      type: "destroy_all_and_damage",
      damage_per_friendly: 2,
      target: "enemy_hero"
    },
    artist: "Equipe Arcane Convergence"
  },
  
  // NEUTRO FACTION - MINIONS
  {
    id: "neutro-golem",
    name: "Golem Elemental",
    type: "minion",
    rarity: "COMMON",
    faction: "NEUTRO",
    cost: 3,
    attack: 3,
    health: 4,
    description: "Provocar",
    abilities: ["taunt"],
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "neutro-mercenary",
    name: "Mercenário Viajante",
    type: "minion",
    rarity: "COMMON",
    faction: "NEUTRO",
    cost: 2,
    attack: 3,
    health: 2,
    description: "Sem habilidades especiais.",
    abilities: [],
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "neutro-explorer",
    name: "Explorador Arcano",
    type: "minion",
    rarity: "UNCOMMON",
    faction: "NEUTRO",
    cost: 4,
    attack: 2,
    health: 3,
    description: "Grito de Guerra: Descubra uma carta.",
    abilities: ["battlecry", "discover"],
    effect: {
      type: "discover",
      amount: 1
    },
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "neutro-dragon",
    name: "Dragão Primordial",
    type: "minion",
    rarity: "LEGENDARY",
    faction: "NEUTRO",
    cost: 9,
    attack: 8,
    health: 10,
    description: "Não pode ser alvo de feitiços ou poderes heroicos.",
    abilities: ["elusive"],
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "neutro-sage",
    name: "Sábio dos Elementos",
    type: "minion",
    rarity: "RARE",
    faction: "NEUTRO",
    cost: 5,
    attack: 4,
    health: 4,
    description: "Grito de Guerra: Descubra um feitiço de qualquer facção.",
    abilities: ["battlecry", "discover"],
    effect: {
      type: "discover",
      cardType: "spell"
    },
    artist: "Equipe Arcane Convergence"
  },
  
  // NEUTRO FACTION - SPELLS
  {
    id: "neutro-potion",
    name: "Poção de Conhecimento",
    type: "spell",
    rarity: "COMMON",
    faction: "NEUTRO",
    cost: 2,
    description: "Compre uma carta.",
    effect: {
      type: "draw",
      amount: 1
    },
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "neutro-transform",
    name: "Transmutação Arcana",
    type: "spell",
    rarity: "RARE",
    faction: "NEUTRO",
    cost: 4,
    description: "Transforme um lacaio em um lacaio aleatório de mesmo custo.",
    effect: {
      type: "transform",
      target: "any_minion",
      into: "random_same_cost"
    },
    artist: "Equipe Arcane Convergence"
  },
  {
    id: "neutro-discovery",
    name: "Descoberta Mística",
    type: "spell",
    rarity: "UNCOMMON",
    faction: "NEUTRO",
    cost: 1,
    description: "Descubra uma carta de qualquer facção.",
    effect: {
      type: "discover",
      filter: "any"
    },
    artist: "Equipe Arcane Convergence"
  }
];

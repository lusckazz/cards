const rarityConfigs = {
  COMMON: { 
    weight: 65,
    color: '#909090',
    dropRate: 0.65
  },
  UNCOMMON: { 
    weight: 25,
    color: '#3cba54',
    dropRate: 0.25
  },
  RARE: { 
    weight: 8,
    color: '#4885ed',
    dropRate: 0.08
  },
  EPIC: { 
    weight: 1.7,
    color: '#db3236',
    dropRate: 0.017
  },
  LEGENDARY: { 
    weight: 0.3,
    color: '#f4c20d',
    dropRate: 0.003
  }
};

const cardTypes = ['minion', 'spell'];
const factions = ['LUZ', 'TREVAS', 'NEUTRO'];

const cardSystem = {
  cards: [],
  
  generateCard(cardData) {
    return {
      id: cardData.id || crypto.randomUUID(),
      name: cardData.name,
      type: cardData.type,
      rarity: cardData.rarity,
      faction: cardData.faction,
      cost: cardData.cost,
      description: cardData.description,
      flavorText: cardData.flavorText || "",
      image: cardData.image || `assets/cards/${cardData.faction.toLowerCase()}_${cardData.type}.png`,
      artist: cardData.artist || "Equipe Arcane Convergence",
      
      attack: cardData.type === 'minion' ? cardData.attack : null,
      health: cardData.type === 'minion' ? cardData.health : null,
      abilities: cardData.abilities || [],
      effect: cardData.effect || null
    };
  },
  
  initializeCardSet(cardDataArray) {
    this.cards = cardDataArray.map(cardData => this.generateCard(cardData));
    return this.cards;
  },
  
  getCardsByRarity(rarity) {
    return this.cards.filter(card => card.rarity === rarity);
  },
  
  getCardsByFaction(faction) {
    return this.cards.filter(card => card.faction === faction);
  },
  
  getCardsByType(type) {
    return this.cards.filter(card => card.type === type);
  },
  
  getCardById(id) {
    return this.cards.find(card => card.id === id);
  }
};

const gachaSystem = {
  pullCard() {
    const rarity = this.determineRarity();
    const availableCards = cardSystem.getCardsByRarity(rarity);
    
    if (availableCards.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    return availableCards[randomIndex];
  },
  
  determineRarity() {
    const randomValue = Math.random() * 100;
    let cumulativeWeight = 0;
    
    for (const rarity in rarityConfigs) {
      cumulativeWeight += rarityConfigs[rarity].weight;
      if (randomValue <= cumulativeWeight) {
        return rarity;
      }
    }
    
    return 'COMMON';
  },
  
  pullPack(packSize = 5) {
    const cards = [];
    
    for (let i = 0; i < packSize; i++) {
      cards.push(this.pullCard());
    }
    
    return cards;
  }
};

const playerCollection = {
  cards: {},
  decks: {},
  
  addCard(userId, cardId) {
    if (!this.cards[userId]) {
      this.cards[userId] = {};
    }
    
    if (!this.cards[userId][cardId]) {
      this.cards[userId][cardId] = 0;
    }
    
    this.cards[userId][cardId]++;
    return this.cards[userId][cardId];
  },
  
  getCollection(userId) {
    return this.cards[userId] || {};
  },
  
  createDeck(userId, deckName, cardIds) {
    if (!this.decks[userId]) {
      this.decks[userId] = {};
    }
    
    this.decks[userId][deckName] = cardIds;
    return this.decks[userId][deckName];
  },
  
  updateDeck(userId, deckName, cardIds) {
    if (!this.decks[userId] || !this.decks[userId][deckName]) {
      return false;
    }
    
    this.decks[userId][deckName] = cardIds;
    return true;
  },
  
  getDeck(userId, deckName) {
    if (!this.decks[userId] || !this.decks[userId][deckName]) {
      return null;
    }
    
    return this.decks[userId][deckName];
  },
  
  getAllDecks(userId) {
    return this.decks[userId] || {};
  }
};
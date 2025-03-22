const game = {
  config: {
    playerStartingHealth: 30,
    maxDeckSize: 30,
    minDeckSize: 20,
    maxHandSize: 7,
    startingHandSize: 5,
    maxBoardSize: 5,
    manaPerTurn: 1,
    maxMana: 10
  },
  
  state: {
    currentPlayer: null,
    turnNumber: 0,
    players: {},
    activeEvents: [],
    gamePhase: 'WAITING'
  },
  
  initialize(player1Id, player2Id) {
    this.state.players[player1Id] = this.createPlayerState(player1Id);
    this.state.players[player2Id] = this.createPlayerState(player2Id);
    this.state.currentPlayer = player1Id;
    this.state.turnNumber = 1;
    this.state.gamePhase = 'STARTED';
    
    this.drawStartingHands();
    return this.state;
  },
  
  createPlayerState(playerId) {
    return {
      id: playerId,
      health: this.config.playerStartingHealth,
      mana: 0,
      maxMana: 0,
      deck: [],
      hand: [],
      board: [],
      graveyard: [],
      effects: []
    };
  },
  
  drawStartingHands() {
    Object.keys(this.state.players).forEach(playerId => {
      for (let i = 0; i < this.config.startingHandSize; i++) {
        this.drawCard(playerId);
      }
    });
  },
  
  drawCard(playerId) {
    const player = this.state.players[playerId];
    if (player.deck.length === 0) {
      player.health -= 1;
      return null;
    }
    
    if (player.hand.length >= this.config.maxHandSize) {
      const discardedCard = player.deck.shift();
      player.graveyard.push(discardedCard);
      return discardedCard;
    }
    
    const card = player.deck.shift();
    player.hand.push(card);
    return card;
  },
  
  startTurn(playerId) {
    const player = this.state.players[playerId];
    player.maxMana = Math.min(player.maxMana + 1, this.config.maxMana);
    player.mana = player.maxMana;
    this.drawCard(playerId);
    this.state.currentPlayer = playerId;
    this.state.turnNumber++;
    return this.state;
  },
  
  playCard(playerId, cardIndex, targetInfo) {
    const player = this.state.players[playerId];
    if (playerId !== this.state.currentPlayer) return false;
    
    const card = player.hand[cardIndex];
    if (!card || player.mana < card.cost) return false;
    
    player.mana -= card.cost;
    player.hand.splice(cardIndex, 1);
    
    if (card.type === 'minion') {
      if (player.board.length >= this.config.maxBoardSize) return false;
      player.board.push({...card, canAttack: false, currentHealth: card.health});
    } else if (card.type === 'spell') {
      this.resolveSpellEffects(card, playerId, targetInfo);
      player.graveyard.push(card);
    }
    
    return true;
  },
  
  attack(playerId, attackerIndex, targetInfo) {
    const player = this.state.players[playerId];
    if (playerId !== this.state.currentPlayer) return false;
    
    const attacker = player.board[attackerIndex];
    if (!attacker || !attacker.canAttack) return false;
    
    const targetPlayer = this.state.players[targetInfo.playerId];
    
    if (targetInfo.isPlayer) {
      targetPlayer.health -= attacker.attack;
    } else {
      const target = targetPlayer.board[targetInfo.index];
      if (!target) return false;
      
      target.currentHealth -= attacker.attack;
      attacker.currentHealth -= target.attack;
      
      if (target.currentHealth <= 0) {
        targetPlayer.board.splice(targetInfo.index, 1);
        targetPlayer.graveyard.push(target);
      }
      
      if (attacker.currentHealth <= 0) {
        player.board.splice(attackerIndex, 1);
        player.graveyard.push(attacker);
      }
    }
    
    attacker.canAttack = false;
    this.checkGameEnd();
    return true;
  },
  
  endTurn(playerId) {
    if (playerId !== this.state.currentPlayer) return false;
    
    const nextPlayerId = Object.keys(this.state.players).find(id => id !== playerId);
    player.board.forEach(card => card.canAttack = true);
    
    return this.startTurn(nextPlayerId);
  },
  
  resolveSpellEffects(card, casterId, targetInfo) {
    switch(card.effect.type) {
      case 'damage':
        this.dealDamage(targetInfo, card.effect.amount);
        break;
      case 'heal':
        this.heal(targetInfo, card.effect.amount);
        break;
      case 'draw':
        for (let i = 0; i < card.effect.amount; i++) {
          this.drawCard(casterId);
        }
        break;
    }
  },
  
  dealDamage(targetInfo, amount) {
    const targetPlayer = this.state.players[targetInfo.playerId];
    
    if (targetInfo.isPlayer) {
      targetPlayer.health -= amount;
    } else {
      const target = targetPlayer.board[targetInfo.index];
      if (!target) return;
      
      target.currentHealth -= amount;
      
      if (target.currentHealth <= 0) {
        targetPlayer.board.splice(targetInfo.index, 1);
        targetPlayer.graveyard.push(target);
      }
    }
    
    this.checkGameEnd();
  },
  
  heal(targetInfo, amount) {
    const targetPlayer = this.state.players[targetInfo.playerId];
    
    if (targetInfo.isPlayer) {
      targetPlayer.health = Math.min(targetPlayer.health + amount, this.config.playerStartingHealth);
    } else {
      const target = targetPlayer.board[targetInfo.index];
      if (!target) return;
      
      target.currentHealth = Math.min(target.currentHealth + amount, target.health);
    }
  },
  
  checkGameEnd() {
    for (const playerId in this.state.players) {
      if (this.state.players[playerId].health <= 0) {
        this.state.gamePhase = 'ENDED';
        this.state.winner = Object.keys(this.state.players).find(id => id !== playerId);
      }
    }
  }
};

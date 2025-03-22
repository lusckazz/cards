const missionSystem = {
  missions: [],
  playerProgress: {},
  
  createMission(missionData) {
    return {
      id: missionData.id || crypto.randomUUID(),
      title: missionData.title,
      description: missionData.description,
      type: missionData.type, // 'daily', 'weekly', 'campaign', 'event'
      requirements: missionData.requirements,
      rewards: missionData.rewards,
      expiresAt: missionData.expiresAt || null,
      isAvailable: missionData.isAvailable || true
    };
  },
  
  initializeMissions(missionDataArray) {
    this.missions = missionDataArray.map(data => this.createMission(data));
  },
  
  getAvailableMissions(userId, type = null) {
    return this.missions.filter(mission => {
      return mission.isAvailable && 
             (!type || mission.type === type) &&
             (!mission.expiresAt || new Date(mission.expiresAt) > new Date()) &&
             (!this.playerProgress[userId] || !this.playerProgress[userId][mission.id] || 
              !this.playerProgress[userId][mission.id].completed);
    });
  },
  
  getPlayerMissionProgress(userId, missionId) {
    if (!this.playerProgress[userId] || !this.playerProgress[userId][missionId]) {
      return null;
    }
    
    return this.playerProgress[userId][missionId];
  },
  
  updateMissionProgress(userId, missionId, progress) {
    if (!this.playerProgress[userId]) {
      this.playerProgress[userId] = {};
    }
    
    if (!this.playerProgress[userId][missionId]) {
      this.playerProgress[userId][missionId] = {
        completed: false,
        currentProgress: {}
      };
    }
    
    const mission = this.missions.find(m => m.id === missionId);
    if (!mission) return false;
    
    const playerMission = this.playerProgress[userId][missionId];
    Object.assign(playerMission.currentProgress, progress);
    
    const allRequirementsMet = this.checkRequirementCompletion(
      mission.requirements, 
      playerMission.currentProgress
    );
    
    if (allRequirementsMet) {
      playerMission.completed = true;
      playerMission.completedAt = new Date().toISOString();
      
      return {
        completed: true,
        rewards: mission.rewards
      };
    }
    
    return {
      completed: false,
      currentProgress: playerMission.currentProgress
    };
  },
  
  checkRequirementCompletion(requirements, progress) {
    for (const req of requirements) {
      switch (req.type) {
        case 'playCards':
          if (!progress.playedCards || progress.playedCards < req.amount) {
            return false;
          }
          break;
        case 'winMatches':
          if (!progress.wins || progress.wins < req.amount) {
            return false;
          }
          break;
        case 'collectCards':
          if (!progress.collectedCards || 
              (req.rarity && progress.collectedCards.filter(c => c.rarity === req.rarity).length < req.amount) ||
              (!req.rarity && progress.collectedCards.length < req.amount)) {
            return false;
          }
          break;
        case 'useAbility':
          if (!progress.abilitiesUsed || progress.abilitiesUsed[req.abilityName] < req.amount) {
            return false;
          }
          break;
        case 'completeCampaign':
          if (!progress.completedCampaigns || !progress.completedCampaigns.includes(req.campaignId)) {
            return false;
          }
          break;
      }
    }
    
    return true;
  },
  
  claimRewards(userId, missionId) {
    const progress = this.getPlayerMissionProgress(userId, missionId);
    if (!progress || !progress.completed) {
      return false;
    }
    
    const mission = this.missions.find(m => m.id === missionId);
    if (!mission) return false;
    
    if (progress.rewardsClaimed) {
      return false;
    }
    
    progress.rewardsClaimed = true;
    return mission.rewards;
  }
};

const eventSystem = {
  events: [],
  
  createEvent(eventData) {
    return {
      id: eventData.id || crypto.randomUUID(),
      title: eventData.title,
      description: eventData.description,
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      rewards: eventData.rewards,
      missions: eventData.missions || [],
      specialRules: eventData.specialRules || [],
      leaderboard: eventData.leaderboard || false
    };
  },
  
  initializeEvents(eventDataArray) {
    this.events = eventDataArray.map(data => this.createEvent(data));
  },
  
  getActiveEvents() {
    const now = new Date();
    return this.events.filter(event => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      return startDate <= now && now <= endDate;
    });
  },
  
  getUpcomingEvents() {
    const now = new Date();
    return this.events.filter(event => {
      const startDate = new Date(event.startDate);
      return startDate > now;
    }).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  },
  
  getEventMissions(eventId) {
    const event = this.events.find(e => e.id === eventId);
    if (!event) return [];
    
    return event.missions;
  }
};

const tournamentSystem = {
  tournaments: [],
  participants: {},
  matches: {},
  
  createTournament(tournamentData) {
    return {
      id: tournamentData.id || crypto.randomUUID(),
      title: tournamentData.title,
      description: tournamentData.description,
      startDate: tournamentData.startDate,
      endDate: tournamentData.endDate,
      maxParticipants: tournamentData.maxParticipants || 32,
      format: tournamentData.format || 'single-elimination',
      restrictions: tournamentData.restrictions || {},
      prizes: tournamentData.prizes || []
    };
  },
  
  initializeTournaments(tournamentDataArray) {
    this.tournaments = tournamentDataArray.map(data => this.createTournament(data));
  },
  
  registerPlayer(tournamentId, userId, deckId) {
    const tournament = this.tournaments.find(t => t.id === tournamentId);
    if (!tournament) return false;
    
    if (!this.participants[tournamentId]) {
      this.participants[tournamentId] = [];
    }
    
    if (this.participants[tournamentId].length >= tournament.maxParticipants) {
      return false;
    }
    
    if (this.participants[tournamentId].some(p => p.userId === userId)) {
      return false;
    }
    
    this.participants[tournamentId].push({
      userId,
      deckId,
      registered: new Date().toISOString(),
      score: 0,
      active: true
    });
    
    return true;
  },
  
  generateBracket(tournamentId) {
    const tournament = this.tournaments.find(t => t.id === tournamentId);
    if (!tournament) return false;
    
    const participants = this.participants[tournamentId] || [];
    if (!participants.length) return false;
    
    const matches = [];
    const rounds = Math.ceil(Math.log2(participants.length));
    
    if (tournament.format === 'single-elimination') {
      const totalSlots = Math.pow(2, rounds);
      const byes = totalSlots - participants.length;
      
      // First round creation with byes
      for (let i = 0; i < totalSlots / 2; i++) {
        const player1Idx = i;
        const player2Idx = totalSlots - 1 - i;
        
        const match = {
          id: crypto.randomUUID(),
          tournamentId,
          round: 1,
          matchNumber: i + 1,
          player1: player1Idx < participants.length ? participants[player1Idx].userId : null,
          player2: player2Idx < participants.length ? participants[player2Idx].userId : null,
          winner: null,
          loser: null,
          score: null,
          nextMatchId: null,
          completed: false
        };
        
        // Automatic win for byes
        if (match.player1 && !match.player2) {
          match.winner = match.player1;
          match.completed = true;
        } else if (!match.player1 && match.player2) {
          match.winner = match.player2;
          match.completed = true;
        }
        
        matches.push(match);
      }
      
      // Create subsequent rounds
      for (let r = 2; r <= rounds; r++) {
        const matchesInRound = Math.pow(2, rounds - r);
        for (let i = 0; i < matchesInRound; i++) {
          const match = {
            id: crypto.randomUUID(),
            tournamentId,
            round: r,
            matchNumber: i + 1,
            player1: null,
            player2: null,
            winner: null,
            loser: null,
            score: null,
            nextMatchId: null,
            completed: false
          };
          
          // Link to next round
          if (r < rounds) {
            const nextRoundMatchIndex = Math.floor(i / 2);
            match.nextMatchId = matches.find(m => 
              m.round === r + 1 && m.matchNumber === nextRoundMatchIndex + 1
            )?.id;
          }
          
          matches.push(match);
        }
      }
      
      // Connect matches between rounds
      for (const match of matches) {
        if (match.round < rounds) {
          const nextRoundMatchIndex = Math.floor((match.matchNumber - 1) / 2);
          const nextRoundMatch = matches.find(m => 
            m.round === match.round + 1 && m.matchNumber === nextRoundMatchIndex + 1
          );
          if (nextRoundMatch) {
            match.nextMatchId = nextRoundMatch.id;
          }
        }
      }
    }
    
    this.matches[tournamentId] = matches;
    return matches;
  },
  
  completeMatch(tournamentId, matchId, winnerId, score) {
    if (!this.matches[tournamentId]) return false;
    
    const match = this.matches[tournamentId].find(m => m.id === matchId);
    if (!match) return false;
    
    if (match.completed) return false;
    
    if (winnerId !== match.player1 && winnerId !== match.player2) {
      return false;
    }
    
    match.completed = true;
    match.winner = winnerId;
    match.loser = winnerId === match.player1 ? match.player2 : match.player1;
    match.score = score;
    
    // Update next match if exists
    if (match.nextMatchId) {
      const nextMatch = this.matches[tournamentId].find(m => m.id === match.nextMatchId);
      if (nextMatch) {
        if (!nextMatch.player1) {
          nextMatch.player1 = winnerId;
        } else {
          nextMatch.player2 = winnerId;
        }
      }
    }
    
    // Update participant score
    const participant = this.participants[tournamentId].find(p => p.userId === winnerId);
    if (participant) {
      participant.score += 1;
    }
    
    return true;
  },
  
  getTournamentResults(tournamentId) {
    const tournament = this.tournaments.find(t => t.id === tournamentId);
    if (!tournament) return null;
    
    const participants = this.participants[tournamentId] || [];
    const sortedParticipants = [...participants].sort((a, b) => b.score - a.score);
    
    const finalMatch = this.matches[tournamentId]?.find(m => 
      m.round === Math.ceil(Math.log2(participants.length)) && m.completed
    );
    
    return {
      tournamentId,
      title: tournament.title,
      winner: finalMatch?.winner || null,
      runnerUp: finalMatch?.loser || null,
      participants: sortedParticipants,
      completed: finalMatch?.completed || false
    };
  }
};
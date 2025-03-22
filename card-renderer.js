class CardRenderer {
  constructor(container) {
    this.container = container;
  }
  
  renderCard(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.dataset.id = card.id;
    cardElement.dataset.rarity = card.rarity;
    cardElement.dataset.faction = card.faction;
    cardElement.dataset.type = card.type;
    
    const rarity = rarityConfigs[card.rarity];
    cardElement.style.borderColor = rarity.color;
    
    const cardContent = `
      <div class="card-header" style="background-color: ${rarity.color}20">
        <div class="card-cost">${card.cost}</div>
        <div class="card-name">${card.name}</div>
      </div>
      <div class="card-image" style="background-image: url('${card.image}')"></div>
      <div class="card-body">
        <div class="card-description">${card.description}</div>
        <div class="card-flavor">${card.flavorText || ""}</div>
      </div>
      <div class="card-footer">
        ${card.type === 'minion' ? 
          `<div class="card-attack">${card.attack}</div>
           <div class="card-health">${card.health}</div>` : 
          ''}
        <div class="card-faction">${card.faction}</div>
      </div>
    `;
    
    cardElement.innerHTML = cardContent;
    this.container.appendChild(cardElement);
    
    return cardElement;
  }
  
  renderCollection(cards) {
    this.container.innerHTML = '';
    cards.forEach(card => this.renderCard(card));
  }
  
  renderPack(cards) {
    this.container.innerHTML = '';
    
    const packElement = document.createElement('div');
    packElement.className = 'card-pack';
    
    cards.forEach(card => {
      const cardElement = this.renderCard(card);
      cardElement.classList.add('pack-card');
      packElement.appendChild(cardElement);
    });
    
    this.container.appendChild(packElement);
    
    setTimeout(() => {
      packElement.classList.add('opened');
    }, 500);
    
    return packElement;
  }
}

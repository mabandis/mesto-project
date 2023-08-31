export class Card {
  constructor(data, templateSelector, userId, ownerData, cardZoom, cardDelete, cardLike, cardRemoveLike) {
    this.card = data;
    this.template = templateSelector;
    this.userId = userId;
    this.cardId = ownerData.cardId;
    this.ownerId = ownerData.ownerId;

    this.cardImage = this.card.link;
    this.cardName = this.card.name;

    this.cardOpened = cardZoom;
    this.cardDelete = cardDelete;
    this.setLike = cardLike;
    this.removeLike = cardRemoveLike;
  }

  getTemplate() {
    return document.querySelector(this.template).content.querySelector('.element').cloneNode(true);
  }

  removeCard() {
    this.cardElement.remove();
    this.cardElement = null;
  }

  checkMyLike() {
    return this.likes.find((userLike) => userLike._id === this.userId)
  }

  renderLike(card) {
    this.likes = card.likes;
    if (this.likes === 0) {
      this.elementLikeCounter.textContent = ''
    } else {
      this.elementLikeCounter.textContent = this.likes.length;
    }

    if(this.checkMyLike()) {
      this.elementLike.classList.add('element__like-icon-active');
    } else {
      this.elementLike.classList.remove('element__like-icon-active');
    }
  }

  interactLike() {
    if(this.checkMyLike()) {
      this.removeLike(this.cardId);
    } else {
      this.setLike(this.cardId);
    }
  }

   
  makeCard() {
    this.cardElement = this.getTemplate();
    this.elementImage = this.cardElement.querySelector('.element__image');
    this.elementName = this.cardElement.querySelector('.element__title');
    this.elementLike = this.cardElement.querySelector('.element__like-icon');
    this.elementLikeCounter = this.cardElement.querySelector('.element__munber-of-likes');
    this.elementDel = this.cardElement.querySelector('.element__delete-button');
    
    this.elementImage.src = this.cardImage;
    this.elementImage.alt = this.cardName;
    this.elementName.textContent = this.cardName;
    
    this.renderLike(this.card);

    this.setEventListeners();
    
    return this.cardElement;
    
  }

  setEventListeners = () => {
    this.elementLike.addEventListener('click', () => {this.interactLike()});
    this.elementImage.addEventListener('click', () => {this.cardOpened(this.cardImage, this.cardName)});
    if(this.userId === this.ownerId) {
      this.elementDel.addEventListener('click', () => {this.cardDelete(this.cardId)});
    } else {
      this.elementDel.remove()
    }
   }

}






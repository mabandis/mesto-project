export class Card {
  constructor(data, templateSelector, userId, ownerData, cardZoom, cardDelete, cardLike, cardRemoveLike) {
    this._card = data;
    this._template = templateSelector;
    this._userId = userId;
    this._cardId = ownerData.cardId;
    this._ownerId = ownerData.ownerId;

    this._cardImage = this._card.link;
    this._cardName = this._card.name;

    this._cardOpened = cardZoom;
    this._cardDelete = cardDelete;
    this._setLike = cardLike;
    this._removeLike = cardRemoveLike;
  }

  _getTemplate() {
    return document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _checkMyLike() {
    return this._likes.find((userLike) => userLike._id === this._userId)
  }

  renderLike(card) {
    this._likes = card.likes;
    if (this._likes.length === 0) {
      this.elementLikeCounter.textContent = ''
    } else {
      this.elementLikeCounter.textContent = this._likes.length;
    }

    if(this._checkMyLike()) {
      this._elementLike.classList.add('element__like-icon-active');
    } else {
      this._elementLike.classList.remove('element__like-icon-active');
    }
  }
_
  _interactLike() {
    if(this._checkMyLike()) {
      this._removeLike(this._cardId);
    } else {
      this._setLike(this._cardId);
    }
  }

   
  makeCard() {
    this._cardElement = this._getTemplate();
    this._elementImage = this._cardElement.querySelector('.element__image');
    this._elementName = this._cardElement.querySelector('.element__title');
    this._elementLike = this._cardElement.querySelector('.element__like-icon');
    this.elementLikeCounter = this._cardElement.querySelector('.element__munber-of-likes');
    this._elementDel = this._cardElement.querySelector('.element__delete-button');
    
    this._elementImage.src = this._cardImage;
    this._elementImage.alt = this._cardName;
    this._elementName.textContent = this._cardName;
    
    this.renderLike(this._card);

    this._setEventListeners();
    
    return this._cardElement;
    
  }

  _setEventListeners = () => {
    this._elementLike.addEventListener('click', () => {this._interactLike()});
    this._elementImage.addEventListener('click', () => {this._cardOpened(this._cardImage, this._cardName)});
    if(this._userId === this._ownerId) {
      this._elementDel.addEventListener('click', () => {this._cardDelete(this._cardId)});
    } else {
      this._elementDel.remove()
    }
   }

}






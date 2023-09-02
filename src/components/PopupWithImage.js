import {Popup} from './Popup'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImgText = this._popupElement.querySelector('.popup__img-title');
    this._popupImg = this._popupElement.querySelector('.element__popup-image');
  }

  open(data) {
    super.open()
    this._popupImgText.textContent = data.name;
    this._popupImg.src = data.link;
    this._popupImg.alt = data.name;
  }

}

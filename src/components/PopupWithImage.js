import {Popup} from './Popup'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImgText = this.popupElement.querySelector('.popup__img-title');
    this.popupImg = this.popupElement.querySelector('.element__popup-image');
  }

  open(data) {
    super.open()
    this.popupImgText.textContent = data.name;
    this.popupImg.src = data.link;
    this.popupImg.alt = data.name;
  }

}

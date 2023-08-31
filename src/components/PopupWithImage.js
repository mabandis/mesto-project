import {Popup} from './Popup'

export class PopupWhithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupImgText = this.popupElement.querySelector('.popup__img-title');
    this.popupImg = this.popupElement.querySelector('.element__popup-image');
  }

  open(text, image) {
    super.open()
    this.popupImgText.textContent = text;
    this.popupImg.src = image;
    this.popupImg.alt = text;
  }

}

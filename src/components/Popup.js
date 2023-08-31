export class Popup {
    constructor(popupSelector) {
      this.popupElement = document.querySelector(popupSelector);
    }

    open() {
      this.popupElement.classList.add('popup_opened');
      document.addEventListener('keydown', this.escClosePopup);
    }

    close() {
      this.popupElement.classList.remove('popup_opened');
      document.removeEventListener('keydown', this.escClosePopup);
    }

    escClosePopup(evt) {
        if (evt.key === 'Escape') {
          this.close();
        }
    }

    setPopupEventListeners() {
      this.popupElement.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__cancelling-button')) {
          this.close();
        }  
      })
    }
}
export class Popup {
    constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
    }

    open() {
      this._popupElement.classList.add('popup_opened');
      document.addEventListener('keydown', this._escClosePopup);
    }

    close() {
      this._popupElement.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._escClosePopup);
    }

    _escClosePopup = (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    }

    setPopupEventListeners() {
      this._popupElement.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__cancelling-button')) {
          this.close();
        }  
      })
    }
}
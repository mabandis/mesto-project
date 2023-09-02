import {Popup} from './Popup';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {formSubmitFunction}) {
    super(popupSelector);
    this._formSubmitFunction = formSubmitFunction;
    this._popupForm = this._popupElement.querySelector('.popup__form');
    this._inputPopupList = Array.from(this._popupForm.querySelectorAll('.popup__field'));
    this._submitButton = this._popupForm.querySelector('.popup__submit');
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const formInput = {};
    
    this._inputPopupList.forEach((inputElement) => {
      formInput[inputElement.name] = inputElement.value;
    })
    
    return formInput;
  }

  setPopupEventListeners() {
    super.setPopupEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitFunction(this._getInputValues());
    })
  }

  changeButtonText() {
    this._submitButton.textContent = 'Сохранение...';
  }
  
  buttonDefaultText() {
    this._submitButton.textContent = this._submitButtonText;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

}
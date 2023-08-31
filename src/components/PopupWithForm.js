import {Popup} from './Popup';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {formSubmitFunction}) {
    super(popupSelector);
    this._formSubmitFunction = formSubmitFunction;
    this.popupForm = this.popupElement.querySelector('.popup__form');
    this.inputPopupList = Array.from(this.popupForm.querySelectorAll('.popup__field'));
    this.submitButton = this.popupForm.querySelector('.popup__submit');
    this.submitButtonText = this.submitButton.textContent;
  }

  _getInputValues() {
    const formInput = {};
    
    this.inputPopupList.forEach(inputElement => {
      formInput[inputElement.name] = inputElement.value;
    });
    return formInput;
  }

  setPopupEventListeners() {
    super.setPopupEventListeners();
    this.popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitFunction(this._getInputValues());
    })
  }

  changeButtonText() {
    this.submitButton.textContent = 'Сохранение...';
  }
  
  buttonDefaultText() {
    this.submitButton.textContent = this.submitButtonText;
  }

  close() {
    super.close();
    this.popupForm.reset();
  }

}
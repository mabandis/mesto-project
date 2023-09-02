export class FormValidate {
  constructor(settingOfValid, formItem) {
    this._settingOfValid = settingOfValid;
    this._formItem = formItem;
    this._submitButton = this._formItem.querySelector(this._settingOfValid.submitButtonSelector);
    this._inputList = Array.from(this._formItem.querySelectorAll(this._settingOfValid.inputSelector));
  }

  _showInputError(inputItem, errorMessage) {
    const errorElement = this._formItem.querySelector(`.${inputItem.id}-error`);
    inputItem.classList.add(this._settingOfValid.inputErrorClass); 
    errorElement.classList.add(this._settingOfValid.errorClass);
    errorElement.textContent = errorMessage; 
  }

  _hideInputError(inputItem) {
    const errorElement = this._formItem.querySelector(`.${inputItem.id}-error`);
    inputItem.classList.remove(this._settingOfValid.inputErrorClass);
    errorElement.classList.remove(this._settingOfValid.errorClass);
    errorElement.textContent = '';
  }

  reset() {
    this._inputList.forEach((inputItem) => {
      this._hideInputError(inputItem);
    })
    this._toggleButtonState();
  }

  _checkInputValidity(inputItem) {
    if(!inputItem.validity.valid) {
      this._showInputError(inputItem, inputItem.validationMessage);
    } else {
      this._hideInputError(inputItem);
    }
  }

  _setEventListener() {
    this._toggleButtonState();
    this._inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkInputValidity(inputItem);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputItem) => {
      return !inputItem.validity.valid
    });
  }

  enableValidation() {
    this._setEventListener();
  }

  _disableButton() {
    this._submitButton.setAttribute('disabled', 'true');
    this._submitButton.classList.add(this._settingOfValid.inactiveButtonClass);
  }

  _enableButton() {
    this._submitButton.classList.remove(this._settingOfValid.inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._disableButton()
    } else {
      this._enableButton()
    }
  }

}
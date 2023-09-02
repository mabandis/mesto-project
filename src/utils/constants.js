export const enableValidationForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
};

export const editProfileButton = document.querySelector('.profile__edit-button');
export const nameEdit = document.querySelector('#profile-name-field');
export const aboutEdit = document.querySelector('#profile-text-field')
export const avatarProfileButton = document.querySelector('.profile__avatar-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const popupProfile = document.querySelector('#edit_popup');
export const popupAvatar = document.querySelector('#avatar_popup');
export const popupCard = document.querySelector('#add_popup');
export const profileForm = popupProfile.querySelector('.popup__form');
export const avatarForm = popupAvatar.querySelector('.popup__form');
export const cardForm = popupCard.querySelector('.popup__form');

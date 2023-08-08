import '../pages/index.css';
import {popups, openPopup, closePopup, addPopup, editPopup} from "../components/modal";
import {templateCardSection,} from "../components/card";
import {enableValidation} from "../components/validate";


  popups.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        closePopup(popup)
      }
    });
  })
  

const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");
const profileInputName = document.querySelector('input[id="profile-name-field"]');
const profileInputText = document.querySelector('input[id="profile-text-field"]');

editProfileButton.addEventListener("click", () => {
    openPopup(editPopup)
    profileInputText.value = profileText.textContent;
    profileInputName.value = profileName.textContent;
});


addProfileButton.addEventListener("click", () => {
    openPopup(addPopup)
});


const userEditForm = document.querySelector("#edit-form");

userEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  closePopup(evt.target.closest('.popup'))
  profileText.textContent = profileInputText.value;
  profileName.textContent = profileInputName.value;
});


const cardInputName = document.querySelector('input[id="card-name-field"]');
const cardInputLink = document.querySelector('input[id="card-link-field"]');
const userAddForm = document.querySelector("#add-form");

userAddForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  templateCardSection.prepend(createCard (cardInputName.value, cardInputLink.value))
  closePopup(evt.target.closest('.popup'))
  userAddForm.reset();
});


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
});





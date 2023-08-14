import '../pages/index.css';
import {popups, openPopup, closePopup, avatarSubmitButton, createCardButton,handleProfileFormSubmit, editProfileSubmitButton, handleCardFormSubmit, handleAvatarSubmit, addPopup, editPopup, avatarPopup} from "../components/modal";
import {templateCardSection, createCard} from "../components/card";
import {enableValidation} from "../components/validate";
import {checkResponse, getProfile, getInitialCards, apiConfig} from "../components/api";
import {addCard} from "../components/card";
import {renderingProfile, userId} from "../components/utils";

Promise.all([getProfile(apiConfig), getInitialCards(apiConfig)])
  .then(([userData, cards]) => {
    let initialCards = Array.from(cards.reverse());
    initialCards.forEach(elem => {
      addCard(elem);
    })
    renderingProfile(userData);
  })
  .catch((err) => {
    console.log(err);
  });


  popups.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup')) {
        closePopup(popup)
      }
    });
  })


  avatarSubmitButton.addEventListener('submit', handleAvatarSubmit);

  createCardButton.addEventListener('submit', handleCardFormSubmit);

  editProfileSubmitButton.addEventListener('submit', handleProfileFormSubmit);






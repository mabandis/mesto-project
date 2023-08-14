import '../pages/index.css';
import {popups, openPopup, closePopup, profileText, profileName, openAvatarButton, addProfileButton, profileInputText, profileInputName, editProfileButton, avatarSubmitButton, createCardButton, handleProfileFormSubmit, closeProfileButtons, editProfileSubmitButton, handleCardFormSubmit, handleAvatarSubmit, userEditForm, addCardForm, avatarForm, addPopup, editPopup, avatarPopup} from "../components/modal";
import {templateCardSection, createCard} from "../components/card";
import {enableValidation} from "../components/validate";
import {checkResponse, getProfile, getInitialCards, apiConfig} from "../components/api";
import {addCard} from "../components/card";
import {renderingProfile, user} from "../components/utils";

Promise.all([getProfile(apiConfig), getInitialCards(apiConfig)])
  .then(([userData, cards]) => {
    renderingProfile(userData);
    const initialCards = Array.from(cards.reverse());
    initialCards.forEach(elem => {
      addCard(elem);
    })
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


  closeProfileButtons.forEach ( button => {
    button.addEventListener ("click", (evt) => {
        closePopup(evt.target.closest('.popup'))
    })
})


editProfileButton.addEventListener("click", () => {
  openPopup(editPopup)
  profileInputText.value = profileText.textContent;
  profileInputName.value = profileName.textContent;
});


addProfileButton.addEventListener("click", () => {
  openPopup(addPopup)
});


openAvatarButton.addEventListener("click", () => {
  openPopup(avatarPopup)
});



  avatarForm.addEventListener('submit', handleAvatarSubmit);

  addCardForm.addEventListener('submit', handleCardFormSubmit);

  userEditForm.addEventListener('submit', handleProfileFormSubmit);






import {closeByEscape} from "../components/utils";
import {addCard} from "../components/card";
import {editProfile, api, editAvatar, postCard} from "../components/api";
import {renderingProfile, user} from "../components/utils";


const popups = document.querySelectorAll('.popup')
const editPopup = document.querySelector("#edit_popup");
const imgPopup = document.querySelector("#img_popup");
const popupImg = document.querySelector(".element__popup-image")
const popupImgTitle = document.querySelector(".popup__img-title");
const closeProfileButtons = document.querySelectorAll(".popup__cancelling-button");


function openPopup (popup) {
    popup.classList.add("popup_opened")
    document.addEventListener('keydown', closeByEscape)
};

function closePopup (popup) {
    popup.classList.remove("popup_opened")
    document.removeEventListener('keydown', closeByEscape)
};


const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");
const openAvatarButton = document.querySelector(".profile__avatar-button");
const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");
const avatar = document.querySelector(".profile__avatar")


const userEditForm = document.querySelector("#edit-form");
const addCardForm = document.querySelector("#add-form");
const avatarForm = document.querySelector("#avatar-form");

// userEditForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   closePopup(evt.target.closest('.popup'))
//   profileText.textContent = profileInputText.value;
//   profileName.textContent = profileInputName.value;
// });
  


//______________________________________________________новый код___________________________________________________//



  

  const editProfileSubmitButton = document.querySelector(".popup__profile-button")
  const profileInputName = document.querySelector('input[id="profile-name-field"]');
  const profileInputText = document.querySelector('input[id="profile-text-field"]');

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    editProfileSubmitButton.textContent = "Сохранение...";
    api.editProfile(profileInputName, profileInputText)
      .then((res) => {
        renderingProfile(res);
        closePopup(editPopup);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editProfileSubmitButton.textContent = "Сохранить";
      });
  }
  
  
  
  const createCardButton = document.querySelector(".popup__card-button");
  const namePlaceInput = document.querySelector('#card-name-field');
  const linkPlaceInput = document.querySelector('#card-link-field');
  const addPopup = document.querySelector("#add_popup");

  function handleCardFormSubmit(evt) {
    evt.preventDefault();
    createCardButton.textContent = "Сохранение..."
    const card = {};
    card.name = namePlaceInput.value;
    card.link = linkPlaceInput.value;
    postCard(card, apiConfig)
      .then(res => {
        addCard(res);
        closePopup(addPopup);
        evt.target.reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        createCardButton.textContent = 'Создать';
      });
  }

  
  const avatarSubmitButton = document.querySelector('.popup__avatar-button')
  const avatarPopup = document.querySelector("#avatar_popup");
  const avatarInput = document.querySelector("#avatar-link-field");

  function handleAvatarSubmit(evt) {
    evt.preventDefault();
    avatarSubmitButton.textContent = "Сохранение...";
    api.editAvatar(avatarInput)
      .then((res) => {
        renderingProfile(res);
        closePopup(avatarPopup);
        evt.target.reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarSubmitButton.textContent = "Сохранить";
      })
  }
  
  
  

export {popups, openPopup, closePopup, handleProfileFormSubmit, handleCardFormSubmit, handleAvatarSubmit, profileText, profileName, openAvatarButton, addProfileButton, profileInputName, profileInputText, closeProfileButtons, editProfileButton, userEditForm, addCardForm, avatarForm, editPopup, addPopup, imgPopup, avatarPopup, popupImg, popupImgTitle, avatar, avatarSubmitButton, createCardButton, editProfileSubmitButton};



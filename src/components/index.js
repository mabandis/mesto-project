import '../pages/index.css';
import {popups, openPopup, closePopup, profileText, profileName, openAvatarButton, addProfileButton, profileInputText, profileInputName, editProfileButton, avatarSubmitButton, createCardButton, handleProfileFormSubmit, closeProfileButtons, editProfileSubmitButton, handleCardFormSubmit, handleAvatarSubmit, userEditForm, addCardForm, avatarForm, addPopup, editPopup, avatarPopup} from "../components/modal";
import {enableValidation} from "./validate";
import { api } from './Api';
import { Card } from "./Card";
import { Section } from './Section';
import { PopupWhithImage } from './PopupWithImage';
import {renderingProfile} from "./utils";

// const userId = "9f4abc1b7c1883549cb0c976";
let userId;

const renderCard = function (data) {
  const cardItem = new Card(data, '#element-template', userId, {cardId: data._id, ownerId: data.owner._id},
  (text, image) => {
    popupImage.open(text, image);
  },
  (cardId) => {
    api.deleteCard(cardId)
      .then(() => {cardItem.removeCard()})
      .catch((err) => {
        console.log(err);
      })
  },
  (cardId) => {
    api.putLike(cardId)
      .then((cardId) => {cardItem.renderLike(cardId)})
      .catch((err) => {
        console.log(err);
      })
  },
  (cardId) => {
    api.deleteLike(cardId)
      .then((cardId) => {cardItem.renderLike(cardId)})
      .catch((err) => {
        console.log(err);
      })
    }
  )
  return cardItem.makeCard();
}

const renderInitialCards = new Section({
  renderer: (data) => {
    renderInitialCards.addItem(renderCard(data));
  }
}, '.elements');

const popupImage = new PopupWhithImage('#img_popup');
popupImage.setPopupEventListeners();

Promise.all([api.getProfile(), api.getInitialCard()])
  .then(([userData, data]) => {
    userId = userData._id;
    renderingProfile(userData);
    renderInitialCards.renderItems(data.reverse());
  })
  .catch((err) => {
    console.log(err);
  })

//   popups.forEach(popup => {
//     popup.addEventListener('mousedown', (evt) => {
//       if (evt.target.classList.contains('popup')) {
//         closePopup(popup)
//       }
//     });
//   })


//   closeProfileButtons.forEach ( button => {
//     button.addEventListener ("click", (evt) => {
//         closePopup(evt.target.closest('.popup'))
//     })
// })


// editProfileButton.addEventListener("click", () => {
//   openPopup(editPopup)
//   profileInputText.value = profileText.textContent;
//   profileInputName.value = profileName.textContent;
// });


// addProfileButton.addEventListener("click", () => {
//   openPopup(addPopup)
// });


// openAvatarButton.addEventListener("click", () => {
//   openPopup(avatarPopup)
// });



//   avatarForm.addEventListener('submit', handleAvatarSubmit);

//   addCardForm.addEventListener('submit', handleCardFormSubmit);

//   userEditForm.addEventListener('submit', handleProfileFormSubmit);






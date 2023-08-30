import '../pages/index.css';
import {popups, openPopup, closePopup, profileText, profileName, openAvatarButton, addProfileButton, profileInputText, profileInputName, editProfileButton, avatarSubmitButton, createCardButton, handleProfileFormSubmit, closeProfileButtons, editProfileSubmitButton, handleCardFormSubmit, handleAvatarSubmit, userEditForm, addCardForm, avatarForm, addPopup, editPopup, avatarPopup} from "../components/modal";
import {enableValidation} from "./validate";
import {api} from "./Api";
import {Card} from "./Card";
import { Section } from './Section';
import {renderingProfile, user} from "./utils";

let userId;

const renderCard = function (data) {
  const cardItem = new Card(data, '#element-template', userId, {cardId: data._id, ownerId: data.owner._id}, {});

  return cardItem.makeCard();
}

const renderInitialCards = new Section({
  renderer: (data) => {
    renderInitialCards.addItem(renderCard(data));
  }
}, '.elements');


Promise.all([api.getProfile(), api.getInitialCard()])
  .then(([userData, data]) => {
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






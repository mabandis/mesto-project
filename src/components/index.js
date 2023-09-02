import '../pages/index.css';
import { editProfileButton, nameEdit, aboutEdit, avatarProfileButton, addCardButton } from '../utils/constants';
import {enableValidation} from "./validate";
import { api } from './Api';
import { Card } from "./Card";
import { Section } from './Section';
import { PopupWithImage } from './PopupWithImage';
import { PopupWithForm } from './PopupWithForm'; 
import { UserInfo } from './UserInfo';


let userId;

const renderCard = function (data) {
  const cardItem = new Card(data, '#element-template', userId, {cardId: data._id, ownerId: data.owner._id},
  () => {
    popupImage.open({name:data.name, link:data.link});
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

const popupImage = new PopupWithImage('#img_popup');
popupImage.setPopupEventListeners();

const userInfo = new UserInfo ({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__text', 
  avatarSelector: '.profile__avatar'
})

Promise.all([api.getProfile(), api.getInitialCard()])
  .then(([userData, data]) => {
    userId = userData._id;
    userInfo.editUserInfo({ name: userData.name, text: userData.about });
    userInfo.editUserAvatar(userData.avatar)
    renderInitialCards.renderItems(data.reverse());
  })
  .catch((err) => {
    console.log(err);
  })

const popupEditProfile = new PopupWithForm ('#edit_popup', {
  formSubmitFunction: (userData) => {popupEditProfile.changeButtonText();
     api.editProfile(userData)
     .then((res) => {
      userInfo.editUserInfo({ name: res.name, text: res.about });
      popupEditProfile.close()
     })
     .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.buttonDefaultText()
    }) 
  }
})
popupEditProfile.setPopupEventListeners()

const popupEditAvatar = new PopupWithForm('#avatar_popup', {
  formSubmitFunction: (userData) => {popupEditAvatar.changeButtonText(); 
    api.editAvatar(userData)
      .then((res) => {
        userInfo.editUserAvatar(res.avatar);
        popupEditAvatar.close();
      })
      .catch((err) => { 
        console.log(err); 
      })
      .finally(() => {
        popupEditAvatar.buttonDefaultText();
      })
  }
});
popupEditAvatar.setPopupEventListeners();



const popupCard = new PopupWithForm('#add_popup', {
  formSubmitFunction: (userData) => { popupCard.changeButtonText(); 
    api.postCard({ name: userData.addname, link: userData.addlink })
      .then((data) => {
        renderInitialCards.addItem(renderCard(data));
        popupCard.close();
      })
      .catch((err) => { 
        console.log(err);
      })
      .finally(() => {
        popupCard.buttonDefaultText();
      })
  }
});
popupCard.setPopupEventListeners();

//обработчики на кнопки на сайте

editProfileButton.addEventListener('click', function() {
  popupEditProfile.open();
  const currentUserInfo = userInfo.getUserInfo();
  nameEdit.value = currentUserInfo.name;
  aboutEdit.value = currentUserInfo.text;
});

avatarProfileButton.addEventListener('click', function () {
  popupEditAvatar.open();
});

addCardButton.addEventListener('click', function () {
  popupCard.open();
});







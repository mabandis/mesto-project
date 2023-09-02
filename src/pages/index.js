import '../pages/index.css';
import { editProfileButton, nameEdit, aboutEdit, avatarProfileButton, addCardButton, enableValidationForm,
profileForm, avatarForm, cardForm } from '../utils/constants';
import { Api } from '../components/Api';
import { Card } from '../components/Card';
import { Section } from '../components/Section';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm'; 
import { UserInfo } from '../components/UserInfo';
import { FormValidate } from '../components/FormValidate';

const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-27',
  headers: {
    authorization: '37a7ba40-eb6a-4212-b4ef-3f20a061a16d',
    'Content-Type': 'application/json'
  }
})

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
  popupProfileValidate.reset();
  const currentUserInfo = userInfo.getUserInfo();
  nameEdit.value = currentUserInfo.name;
  aboutEdit.value = currentUserInfo.text;
});

avatarProfileButton.addEventListener('click', function () {
  popupEditAvatar.open();
  popupAvatarValidate.reset();
});

addCardButton.addEventListener('click', function () {
  popupCard.open();
  popupCardValidate.reset();
});

// Валидация

const popupProfileValidate = new FormValidate (enableValidationForm, profileForm);
popupProfileValidate.enableValidation();

const popupAvatarValidate = new FormValidate (enableValidationForm, avatarForm);
popupAvatarValidate.enableValidation();

const popupCardValidate = new FormValidate (enableValidationForm, cardForm);
popupCardValidate.enableValidation();

 





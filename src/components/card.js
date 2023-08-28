import {openPopup, imgPopup, popupImg, popupImgTitle} from "../components/modal";
import {api} from "../components/api";
import { user } from "../components/utils";

class Card {
  constructor(data, templateSelector) {
    this.card = data; // проверить
    this.template = templateSelector;

    this.cardImage = this.card.link;
    this.cardName = this.card.name;
  }

  getTemplate() {
    return document.querySelector(this.template).content.querySelector('.element').cloneNode(true);
  }

  makeCard() {
    this.cardElement = this.getTemplate();
    this.elementImage = this.cardElement.querySelector('.element__image');
    this.elementName = this.cardElement.querySelector('.element__title');
    this.elementLike = this.cardElement.querySelector('.element__like-icon');
    this.elementLikeCounter = this.cardElement.querySelector('.element__munber-of-likes');
    this.elementDel = this.cardElement.querySelector('.element__delete-button');
    
    this.elementImage.src = this.cardImage;
    this.elementImage.alt = this.cardName;
    this.elementName.textContent = this.cardName;
    // доделать обработчики здесь перед return
    return this.cardElement;
  }

}

// const templateCardSection = document.querySelector(".elements"); 
// function setLikeDOM(likes, newLikes, likeButton) {
//   likeButton.classList.add("element__like-icon-active");
//   likeButton.classList.remove("element__like-icon");
//   likes.textContent = newLikes.likes.length;
// }

// function removeLikeDOM(likes, newLikes, likeButton) {
//   likeButton.classList.add("element__like-icon");
//   likeButton.classList.remove("element__like-icon-active");
//   likes.textContent = newLikes.likes.length;
// }


// function createCard(elem) {
//   const templateCardContainer = document.querySelector("#element-template").content;
//   const cardElement = templateCardContainer.querySelector('.element').cloneNode(true);
//   const cardImage = cardElement.querySelector('.element__image');
//   const likes = cardElement.querySelector('.element__munber-of-likes');
//   const deleteButton = cardElement.querySelector('.element__delete-button');
//   cardElement.querySelector('.element__title').textContent = elem.name;
//   cardImage.src = elem.link;
//   cardImage.alt = elem.name;
//   likes.textContent = elem.likes.length;
  
//   const likeButton = cardElement.querySelector('.element__like-icon');
  
//   if (elem.likes.some(obj => obj._id == user.id)) {
//     likeButton.classList.add("element__like-icon-active");
//   }
//   likeButton.addEventListener('click', () => {
//     if (likeButton.classList.contains('element__like-icon-active')) {
//       api.deleteLike(elem)
//         .then(res => {
//           removeLikeDOM(likes, res, likeButton)
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//     else {
//       api.putLike(elem)
//         .then(res => {
//           setLikeDOM(likes, res, likeButton)
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }

//   });


//   if (elem.owner._id == user.id) {
//     deleteButton.addEventListener('click', () => {
//       const card = deleteButton.closest('.element');
//       api.deleteCard(elem)
//         .then(res => {
//           console.log(res);
//           card.remove()
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     });
//   }
//   else {
//     deleteButton.remove();
//   }
  
//   cardImage.addEventListener('click', () => {
//     openPopup(imgPopup);
//     popupImg.src = elem.link;
//     popupImg.alt = elem.name;
//     popupImgTitle.textContent = elem.name;
//   });
//   return cardElement;
// }


// function addCard(item) {
//   const cardElement = createCard(item);
//   templateCardSection.prepend(cardElement);
// }

// export { addCard, removeLikeDOM, setLikeDOM, createCard, templateCardSection};





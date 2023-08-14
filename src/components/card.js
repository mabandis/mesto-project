import {openPopup, imgPopup, popupImg, popupImgTitle} from "../components/modal";
import {apiConfig, putLike, deleteLike, deleteCard} from "../components/api";
import {userId } from "../components/utils";

// const initialCards = [
//     {
//       name: 'Архыз',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//     },
//     {
//       name: 'Челябинская область',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//     },
//     {
//       name: 'Иваново',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     },
//     {
//       name: 'Камчатка',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//     {
//       name: 'Холмогорский район',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//     },
//     {
//       name: 'Байкал',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//     }
//   ];


// const templateCardContainer = document.querySelector("#element-template").content;
// const templateCardSection = document.querySelector(".elements");

// function createCard (name, link) {
//   const copyCard = templateCardContainer.querySelector(".element").cloneNode(true);
//   const copyImg = copyCard.querySelector(".element__image");

//   copyImg.alt = name;
//   copyImg.src = link;

//   copyCard.querySelector(".element__title").textContent = name;

//   const likeIcon = copyCard.querySelector(".element__like-icon");
//   likeIcon.addEventListener("click", (evt) => {
//     const list = evt.target.classList;
//     if (list.contains('element__like-icon-active')) {      
//       // active 
//       list.remove("element__like-icon-active")
//       list.add("element__like-icon")
//    } else { 
//       // inactive 
//       list.add("element__like-icon-active")
//       list.remove("element__like-icon")
//    }
//     })

//   const deleteCardButton = copyCard.querySelector(".element__delete-button");
//   deleteCardButton.addEventListener("click", (evt) => {
//     evt.target.closest('.element').remove()
//   })

//   copyImg.addEventListener("click", (evt) => {
//     openPopup(imgPopup)
//     popupImg.setAttribute("src", link);
//     popupImg.setAttribute("alt", name);
//     popupImgTitle.textContent = name;
//   })

//   return copyCard
// }


// function startRendering() {
//   for (let item of initialCards) {
//     templateCardSection.prepend(createCard (item.name, item.link))
//   }
// }
// startRendering()



// export {templateCardContainer, templateCardSection, startRendering, createCard};



//__________________________________новый код___________________________________// 



const templateCardSection = document.querySelector(".elements"); 
function setLikeDOM(likes, newLikes, likeButton) {
  likeButton.classList.add("element__like-icon-active");
  likeButton.classList.remove("element__like-icon");
  likes.textContent = newLikes.likes.length;
}

function removeLikeDOM(likes, newLikes, likeButton) {
  likeButton.classList.add("element__like-icon");
  likeButton.classList.remove("element__like-icon-active");
  likes.textContent = newLikes.likes.length;
}

//функция создания карточки
function createCard(elem) {
  const templateCardContainer = document.querySelector("#element-template").content;
  const cardElement = templateCardContainer.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const likes = cardElement.querySelector('.element__munber-of-likes');
  const deleteButton = cardElement.querySelector('.element__delete-button');
  cardElement.querySelector('.element__title').textContent = elem.name;
  cardImage.src = elem.link;
  cardImage.alt = elem.name;
  likes.textContent = elem.likes.length;
  //добавляем сразу слушатели событий для лайка и корзины
  const likeButton = cardElement.querySelector('.element__like-icon');
  //проверка, стоит ли лайк нашего пользователя на карточке
  if (elem.likes.some(obj => obj._id == userId)) {
    likeButton.classList.add("element__like-icon-active");
  }
  likeButton.addEventListener('click', () => {
    if (likeButton.classList.contains('element__like-icon-active')) {
      deleteLike(elem, apiConfig)
        .then(res => {
          removeLikeDOM(likes, res, likeButton)
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      putLike(elem, apiConfig)
        .then(res => {
          setLikeDOM(likes, res, likeButton)
        })
        .catch((err) => {
          console.log(err);
        });
    }

  });
  if (elem.owner._id == userId) {
    deleteButton.addEventListener('click', () => {
      const card = deleteButton.closest('.element');
      deleteCard(elem, apiConfig)
        .then(res => {
          console.log(res);
          card.remove()
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  else {
    deleteButton.remove();
  }
  //добавляем функцию открытия попапа с картинкой
  cardImage.addEventListener('click', () => {
    openPopup(imgPopup);
    popupImg.src = elem.link;
    popupImg.alt = elem.name;
    popupImgTitle.textContent = elem.name;
  });
  return cardElement;
}

//функция добавления карточки
function addCard(item) {
  const cardElement = createCard(item);
  templateCardSection.prepend(cardElement);
}

export { addCard, removeLikeDOM, setLikeDOM, createCard, templateCardSection};





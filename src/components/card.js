import {openPopup, imgPopup, popupImg, popupImgTitle} from "../components/modal";


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


const templateCardContainer = document.querySelector("#element-template").content;
const templateCardSection = document.querySelector(".elements");

function createCard (name, link) {
  const copyCard = templateCardContainer.querySelector(".element").cloneNode(true);
  const copyImg = copyCard.querySelector(".element__image");

  copyImg.alt = name;
  copyImg.src = link;

  copyCard.querySelector(".element__title").textContent = name;

  const likeIcon = copyCard.querySelector(".element__like-icon");
  likeIcon.addEventListener("click", (evt) => {
    const list = evt.target.classList;
    if (list.contains('element__like-icon-active')) {      
      // active 
      list.remove("element__like-icon-active")
      list.add("element__like-icon")
   } else { 
      // inactive 
      list.add("element__like-icon-active")
      list.remove("element__like-icon")
   }
    })

  const deleteCardButton = copyCard.querySelector(".element__delete-button");
  deleteCardButton.addEventListener("click", (evt) => {
    evt.target.closest('.element').remove()
  })

  copyImg.addEventListener("click", (evt) => {
    openPopup(imgPopup)
    popupImg.setAttribute("src", link);
    popupImg.setAttribute("alt", name);
    popupImgTitle.textContent = name;
  })

  return copyCard
}


function startRendering() {
  for (let item of initialCards) {
    templateCardSection.prepend(createCard (item.name, item.link))
  }
}
startRendering()



export {templateCardContainer, templateCardSection, startRendering, createCard};




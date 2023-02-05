const editProfileButton = document.querySelector(".profile__edit-button");
const addProfileButton = document.querySelector(".profile__add-button");


const editPopup = document.querySelector("#edit_popup");
const addPopup = document.querySelector("#add_popup");
const imgPopup = document.querySelector("#img_popup");


const closeProfileButton = document.querySelectorAll(".popup__cancelling-button");

closeProfileButton.forEach ( button => {
    button.addEventListener ("click", (evt) => {
        closePopup(evt.target.closest('.popup'))
    })
})


function openPopup (popup) {
    popup.classList.add("popup_opened")
};

function closePopup (popup) {
    popup.classList.remove("popup_opened")
};

editProfileButton.addEventListener("click", () => {
    openPopup(editPopup)
});

addProfileButton.addEventListener("click", () => {
    openPopup(addPopup)
});



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
    let popupImg = document.querySelector(".element__popup-image")
    openPopup(imgPopup)
    popupImg.setAttribute("src", link);
    popupImg.setAttribute("alt", name);
    document.querySelector(".popup__img-title").textContent = name;
  })

  return copyCard
}


function startRendering() {
  for (let item of initialCards) {
    templateCardSection.prepend(createCard (item.name, item.link))
  }
}
startRendering()

const addUserCard = document.querySelector(".popup__submit-card-button");
const cardInputName = document.querySelector('input[id="card-name-field"]');
const cardInputLink = document.querySelector('input[id="card-link-field"]');

addUserCard.addEventListener("click", (evt) => {
  evt.preventDefault();
  templateCardSection.prepend(createCard (cardInputName.value, cardInputLink.value))
  closePopup(evt.target.closest('.popup'))
})

let profileName = document.querySelector(".profile__name");
let profileText = document.querySelector(".profile__text");
const addUserProfile = document.querySelector(".popup__submit-profile-button");
const profileInputName = document.querySelector('input[id="profile-name-field"]');
const profileInputText = document.querySelector('input[id="profile-text-field"]');

addUserProfile.addEventListener("click", (evt) => {
  evt.preventDefault();

  closePopup(evt.target.closest('.popup'))

  profileText.textContent = profileInputText.value;
  profileName.textContent = profileInputName.value;
})





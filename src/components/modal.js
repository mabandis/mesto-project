import {closeByEscape} from "../components/utils";


const popups = document.querySelectorAll('.popup')
const editPopup = document.querySelector("#edit_popup");
const addPopup = document.querySelector("#add_popup");
const imgPopup = document.querySelector("#img_popup");
const popupImg = document.querySelector(".element__popup-image")
const popupImgTitle = document.querySelector(".popup__img-title");
const closeProfileButtons = document.querySelectorAll(".popup__cancelling-button");

closeProfileButtons.forEach ( button => {
    button.addEventListener ("click", (evt) => {
        closePopup(evt.target.closest('.popup'))
    })
})

function openPopup (popup) {
    popup.classList.add("popup_opened")
    document.addEventListener('keydown', closeByEscape)
};

function closePopup (popup) {
    popup.classList.remove("popup_opened")
    document.removeEventListener('keydown', closeByEscape)
};

export {popups, openPopup, closePopup, editPopup, addPopup, imgPopup, popupImg, popupImgTitle};


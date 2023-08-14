import {closePopup} from "../components/modal";
import { profileName, profileText, avatar } from './modal.js';


function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openPopup = document.querySelector('.popup_opened');
      closePopup(openPopup)
    };
};
  

const user = {id:undefined};

const renderingProfile = (obj) => {
    profileName.textContent = obj.name;
    profileText.textContent = obj.about;
    avatar.src = obj.avatar;
    user.id = obj._id;
}

 
export {closeByEscape, renderingProfile, user};
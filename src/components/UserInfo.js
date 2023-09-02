export class UserInfo {
    constructor ({nameSelector, descriptionSelector, avatarSelector}) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
      return {
        name: this._name.textContent,
        text: this._description.textContent
      }
    }

    editUserInfo({ name, text }) {
        this._name.textContent = name;
        this._description.textContent = text;
    }

    editUserAvatar(link) {
        this._avatar.src = link;
    }
}
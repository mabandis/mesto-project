export class UserInfo {
    constructor ({nameSelector, descriptionSelector, avatarSelector}) {
        this.name = document.querySelector(nameSelector);
        this.description = document.querySelector(descriptionSelector);
        this.avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
      return {
        getName: this.name.textContent,
        getDescription: this.description.textContent
      }
    }

    editUserInfo({ getName, getDescription }) {
        this.name.textContent = getName;
        this.description.textContent = getDescription;
    }

    editUserAvatar(avatarSrc) {
        this.avatar.src = avatarSrc;
    }
}
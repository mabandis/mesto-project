export class UserInfo {
    constructor ({nameSelector, descriptionSelector, avatarSelector}) {
        this.name = document.querySelector(nameSelector);
        this.description = document.querySelector(descriptionSelector);
        this.avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
      return {
        name: this.name.textContent,
        text: this.description.textContent
      }
    }

    editUserInfo({ name, text }) {
        this.name.textContent = name;
        this.description.textContent = text;
    }

    editUserAvatar(link) {
        this.avatar.src = link;
    }
}
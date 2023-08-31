class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getProfile() {
    return fetch(`${this.baseUrl}/users/me`, {headers: this.headers})
    .then(this.checkResponse)
  }

  getInitialCard() {
    return fetch(`${this.baseUrl}/cards`, {headers: this.headers})
    .then(this.checkResponse)
  }

  editProfile(nameInput, jobInput) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: nameInput.value,
        about: jobInput.value
      })
    })
    .then(this.checkResponse)  
  }

  editAvatar(avatarInput) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarInput.value
      })
    })
    .then(this.checkResponse) 
  }
  
  postCard(elem) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: elem.name,
        link: elem.link,
      })
    })
    .then(this.checkResponse)  
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(this.checkResponse)
  }

  putLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(this.checkResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this.baseUrl}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this.checkResponse)
  }

}

export const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-27/',
  headers: {
    authorization: '37a7ba40-eb6a-4212-b4ef-3f20a061a16d',
    'Content-Type': 'application/json'
  }
})

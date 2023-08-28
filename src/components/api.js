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
    .then(res => { return this.checkResponse(res) })
  }

  getInitialCard() {
    return fetch(`${this.baseUrl}/cards`, {headers: this.headers})
    .then(res => { return this.checkResponse(res) })
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
    .then(res => { return this.checkResponse(res) })  
  }
}

export const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-27/',
  headers: {
    authorization: '37a7ba40-eb6a-4212-b4ef-3f20a061a16d',
    'Content-Type': 'application/json'
  }
})
  
// const editAvatar = (avatarInput, apiConfig) => {
//     return fetch(apiConfig.address + 'users/me/avatar', {
//       method: 'PATCH',
//       headers: apiConfig.headers,
//       body: JSON.stringify({
//         avatar: avatarInput.value
//       })
//     })
//       .then(res => checkResponse(res))
//   }  

  
  
// const postCard = (elem, apiConfig) => {
//     return fetch(apiConfig.address + 'cards', {
//       method: 'POST',
//       headers: apiConfig.headers,
//       body: JSON.stringify({
//         name: elem.name,
//         link: elem.link,
//       })
//     })
//       .then(res => checkResponse(res))
//   }
  
  
// const deleteCard = (card, apiConfig) => {
//     return fetch(apiConfig.address + `cards/${card._id}`, {
//       method: 'DELETE',
//       headers: apiConfig.headers
//     })
//       .then(res => checkResponse(res))
//   }

  
// const putLike = (card, apiConfig) => {
//     return fetch(apiConfig.address + `cards/likes/${card._id}`, {
//       method: 'PUT',
//       headers: apiConfig.headers
//     })
//       .then(res => checkResponse(res))
//   }
  

// const deleteLike = (card, apiConfig) => {
//     return fetch(apiConfig.address + `cards/likes/${card._id}`, {
//       method: 'DELETE',
//       headers: apiConfig.headers
//     })
//       .then(res => checkResponse(res))
//   }

// export {apiConfig, checkResponse, getProfile, editProfile, editAvatar, getInitialCards, postCard, deleteCard, putLike, deleteLike};



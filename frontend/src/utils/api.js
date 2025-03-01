class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //------------pega as cards da API
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
      })
      .catch((err) => console.error(`Error: ${err.getMessage()}`));
  }

  //------------ atualiza Avatar ----------------
  profilePictureUpdate(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "content-Security-policy": "default-src 'self' *.tripleten.com",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
      })
      .catch((err) => console.error(`Error: ${err.getMessage()}`));
  }

  //--------pega informações do perfil
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
      })
      .catch((err) => console.error(`Error: ${err.getMessage()}`));
  }
  /*   getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: { Authorization: `Bearer ${token}`, ...this._headers },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
      })
      .catch((err) => console.error(`Error: ${err.getMessage()}`));
  } */

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
      })
      .catch((err) => console.error(`Error: ${err.getMessage()}`));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.deleteLike(cardId);
    }
    return this.isLiked(cardId);
  }

  isLiked(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
      })
      .catch((err) => console.error(`Error: ${err.getMessage()}`));
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
      })
      .catch((err) => console.error(`Error: ${err.getMessage()}`));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
      })
      .catch((err) => console.error(`Error: ${err.getMessage()}`));
  }

  editUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
      })
      .catch((err) => console.error(`Error: ${err.getMessage()}`));
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // se o servidor retornar um erro, rejeite a promessa
      })
      .catch((err) => console.error(`Error: ${err.getMessage()}`));
  }
}

// outros métodos para trabalhar com a API

const api = new Api({
  baseUrl: "https://web-project-api-full-6rlu.onrender.com",
  headers: {
    authorization: "e5cf33dd-4022-4526-883f-23d5af256088",
    "Content-Type": "application/json",
  },
});

/* const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-14",
  headers: {
    authorization: "e255bcaf-9aa3-4e45-a23a-da684d7fa67f",
    "Content-Type": "application/json",
  },
}); */

export default api;

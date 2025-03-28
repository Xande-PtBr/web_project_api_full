import { getToken } from "./token";
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  //------------pega as cards da API
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: getHeaders(),
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
      headers: getHeaders(),
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
      headers: getHeaders(),
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
      headers: { Authorization: `Bearer ${token}`, ...getHeaders() },
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
      headers: getHeaders(),
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
      headers: getHeaders(),
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
      headers: getHeaders(),
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
      headers: getHeaders(),
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
      headers: getHeaders(),
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
      headers: getHeaders(),
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

const getHeaders = () => {
  const token = getToken(); // Pega o token atualizado
  return {
    authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};
// outros métodos para trabalhar com a API

const api = new Api({
  /*  baseUrl: "http://localhost:3001", */
  baseUrl: "https://web-project-api-full-6rlu.onrender.com",
  /* headers: getHeaders(), */
});

export default api;

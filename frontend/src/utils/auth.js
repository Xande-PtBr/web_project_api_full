export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

export const getUserAuth = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "content-Security-policy": "default-src 'self' *.tripleten.com",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export const authorize = ({ email, password }) => {
  // Uma solicitação POST é enviada para /auth/local.
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // Os parâmetros são envolvidos em um objeto, convertidos em uma string
    // JSON e enviados no body da solicitação.
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

// A função register aceita os dados necessários como argumentos
// e envia uma solicitação POST ao endpoint especificado.
export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

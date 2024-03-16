const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-7",
  headers: {
    authorization: "cae27cf2-a4c3-44d6-bba0-db38265eacc9",
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

//изменение данных о пользователе
export function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => getResponseData(res));
}

// добавление карточек
export function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => getResponseData(res));
}

// запрос информации о пользователе
export function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "GET",
  }).then((res) => getResponseData(res));
}

//запрос карточек
export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "GET",
  }).then((res) => getResponseData(res));
}

//удаление карточек
export function removeCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    headers: config.headers,
    method: "DELETE",
  }).then((res) => getResponseData(res));
}

//постановка лайка
export function addLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,
    method: "PUT",
  }).then((res) => getResponseData(res));
}

//удаление лайка
export function removeLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,
    method: "DELETE",
  }).then((res) => getResponseData(res));
}

//запрос на замену аватара
export function editAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then((res) => getResponseData(res));
}

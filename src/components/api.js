const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-7",
  headers: {
    authorization: "cae27cf2-a4c3-44d6-bba0-db38265eacc9",
    "Content-Type": "application/json",
  },
};

//изменение данных о пользователе
export function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject("Не удалось отредактировать данные профиля");
    }
  });
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
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject("Не удалось добавить новую карточку");
    }
  });
}

// запрос информации о пользователе
export function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "GET",
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject("Не удалось получить данные профиля");
    }
  });
}

//запрос карточек
export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "GET",
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject("Не удалось получить список карточек");
    }
  });
}

//удаление карточек
export function removeCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    headers: config.headers,
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject("Не удалось удалить карточку");
    }
  });
}

//постановка лайка
export function addLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,
    method: "PUT",
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject("Не удалось поставить like");
    }
  });
}

//удаление лайка
export function removeLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    headers: config.headers,
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject("Не удалось удалить like");
    }
  });
}

//запрос на замену аватара
export function editAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject("Не удалось отредактировать аватар");
    }
  });
}

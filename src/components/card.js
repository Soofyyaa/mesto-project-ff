 const cardTemplate = document.getElementById("card-template").content; // @todo: Темплейт карточки
// @todo: Функция создания карточки с лайком, удалением и открытием картинки
export function createCard(
  element,
  removeCard,
  likeCardCallback,
  openImagePopup,
  profileId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const delButton = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const countLike = cardElement.querySelector(".like-count");

  cardElement.querySelector(".card__title").textContent = element.name;
  cardImg.src = element.link;
  cardImg.alt = element.name;
  countLike.textContent = element.likes.length;

  cardImg.addEventListener("click", (evt) => {
    openImagePopup(element.link, element.name);
  });

  if (element.likes.some((like) => like._id === profileId)) {
    likeCard(buttonLike);
  }

  if (profileId === element.owner._id) {
    delButton.addEventListener("click", (evt) => {
      removeCard(cardElement, element._id);
    });
  } else {
    delButton.remove();
  }
  buttonLike.addEventListener("click", (evt) => {
    likeCardCallback(buttonLike, element._id, countLike);
  });

  return cardElement;
}

// Функция лайка карточки
export function likeCard(buttonLike) {
  buttonLike.classList.toggle("card__like-button_is-active");
}

//Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

export function isActiveLikeButton(buttonLike) {
  if (buttonLike.classList.contains("card__like-button_is-active")) {
    return true;
  } else {
    return false;
  }
}

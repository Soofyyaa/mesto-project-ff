import { cardTemplate } from "/src/index";

// @todo: Функция создания карточки с лайком, удалением и открытием картинки
function addCard(element, deleteCard, likeCard, openImagePopup) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const delButton = cardElement.querySelector(".card__delete-button");
  const buttonLike = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__title").textContent = element.name;
  cardImg.src = element.link;
  cardImg.alt = element.name;

  cardImg.addEventListener("click", (evt) => {
    openImagePopup(cardImg);
  });

  delButton.addEventListener("click", (evt) => {
    deleteCard(cardElement);
  });

  buttonLike.addEventListener("click", (evt) => {
    likeCard(buttonLike);
  });

  return cardElement;
}

// Функция лайка карточки
function likeCard(buttonLike) {
  buttonLike.classList.toggle("card__like-button_is-active");
}

//Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

export { addCard, deleteCard, likeCard };

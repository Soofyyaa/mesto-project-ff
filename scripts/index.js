const cardTemplate = document.getElementById("card-template").content; // @todo: Темплейт карточки

const content = document.querySelector(".content"); // @todo: DOM узлы
const placesList = content.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(element, del) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const delButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = element.name;
  cardImg.src = element.link;
  cardImg.alt = element.name;

  delButton.addEventListener("click", del);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  placesList.append(addCard(item, deleteCard));
});

import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { addCard as createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

//Поиск элементов, кнопок и попапов
const cardTemplate = document.getElementById("card-template").content; // @todo: Темплейт карточки
const content = document.querySelector(".content"); // @todo: DOM узлы
const placesList = content.querySelector(".places__list"); //список карточек
const typeImage = document.querySelector(".popup_type_image"); //попап открытия  картинки
const popupImage = document.querySelector(".popup__image"); //картинка для большого попапа
const captionPopup = document.querySelector(".popup__caption"); //подпись к большому попапу
const closeButtons = document.querySelectorAll(".popup__close"); //кнопки крестика, закрывающие ЛЮБОЙ попап
const nameTitle = document.querySelector(".profile__title"); // имя в профиле
const jobTitle = document.querySelector(".profile__description"); //занятие в профиле
const formElement = document.forms["edit-profile"]; //Находим  форму профиля
const nameInput = formElement.elements.name; //Находим поле имени
const jobInput = formElement.elements.description; //Находим поле занятия
const formCard = document.forms["new-place"]; //Находим  форму создания карточки
const nameNewCard = formCard.elements["place-name"]; //Находим поле названия города
const imageNewCard = formCard.elements.link; //Находим поле для ссылки на картинку
const buttonAddButton = document.querySelector(".profile__add-button"); //кнопка добавления новой карточки
const newPlace = document.querySelector(".popup_type_new-card"); // вытащили элемент с классом попапа создания новой карточки
const buttonProfile = document.querySelector(".profile__edit-button"); //кнопка класса попапа профиля
const popupTypeEdit = document.querySelector(".popup_type_edit"); //вытащили элемент с классом попапа профиля

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  placesList.append(createCard(item, deleteCard, likeCard, openImagePopup));
});

//Функция, закрывающая попап, который открыт
function closeButtonPopup() {
  const popupOpen = document.querySelector(".popup_is-opened");
  closePopup(popupOpen);
}

//перебор и вешание слушателя, на каждый элемент массива с кнопками закрытия
closeButtons.forEach(function (item) {
  item.addEventListener("click", closeButtonPopup);
});

//Функция открытия большого попапа
function openImagePopup(cardImg) {
  popupImage.src = cardImg.src;
  popupImage.alt = cardImg.alt;
  captionPopup.textContent = cardImg.alt;
  openPopup(typeImage);
}

//слушатель открытия попапа профиля
buttonProfile.addEventListener("click", () => {
  openPopup(popupTypeEdit);
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;
});

// слушатель открытия попапа для создания новой карточки
buttonAddButton.addEventListener("click", () => {
  openPopup(newPlace);
});

// Обработчик «отправки» формы в профиле
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  nameTitle.textContent = name;
  jobTitle.textContent = job;
  closeButtonPopup(popupTypeEdit);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmitProfile);

// Обработчик «отправки» формы для новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  const namePlace = nameNewCard.value;
  const imagePlace = imageNewCard.value;
  const newCard = {
    name: namePlace,
    link: imagePlace,
  };
  const addNewCard = createCard(newCard, deleteCard, likeCard, openImagePopup);

  placesList.prepend(addNewCard);
  closeButtonPopup(newPlace);
  formCard.reset();
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formCard.addEventListener("submit", addNewCard);

export { cardTemplate };

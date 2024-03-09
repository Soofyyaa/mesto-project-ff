import "./pages/index.css";
import {
  createCard,
  deleteCard,
  likeCard,
  isActiveLikeButton,
} from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import {
  getProfile,
  getCards,
  editProfile,
  addCard,
  removeCard,
  addLike,
  removeLike,
  editAvatar,
} from "./components/api.js";

import {
  validationConfig,
  isValid,
  enableValidation,
  clearValidation,
} from "./components/validation.js";

//Поиск элементов, кнопок и попапов
export const cardTemplate = document.getElementById("card-template").content; // @todo: Темплейт карточки
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
const profileImg = document.querySelector(".profile__image"); //картиночка профиля))
const popupAvatar = document.querySelector(".popup_change_avatar"); // вытащили попап замены аватара
const formAvatar = document.forms["change_avatar"]; //форма аватара
const inputAvatar = formAvatar.elements.link; //Находим поле для ссылки на картинку аватара
const buttonSaveProfile = formElement.querySelector(".popup__button"); //кнопка сохранения профиля
const buttonSaveNewCard = formCard.querySelector(".popup__button"); //кнопка сохранения новой карточки
const buttonSaveAvatar = popupAvatar.querySelector(".popup__button"); //кнопка сохранения аватара
let profileId;

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

//слушатель открытия попапа редактирования аватара
profileImg.addEventListener("click", () => {
  openPopup(popupAvatar);
  clearValidation(popupAvatar, validationConfig);
});

//слушатель открытия попапа профиля
buttonProfile.addEventListener("click", () => {
  openPopup(popupTypeEdit);
  nameInput.value = nameTitle.textContent;
  jobInput.value = jobTitle.textContent;
  clearValidation(popupTypeEdit, validationConfig);
});

// слушатель открытия попапа для создания новой карточки
buttonAddButton.addEventListener("click", () => {
  openPopup(newPlace);
  clearValidation(newPlace, validationConfig);
});

// Обработчик «отправки» формы в профиле
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  buttonSaveProfile.textContent = "Сохранение...";
  editProfile(nameInput.value, jobInput.value)
    .then((profile) => {
      initialProfile(profile);
      closeButtonPopup(popupTypeEdit);
    })
    .catch((errorMessage) => console.log(errorMessage))
    .finally((profile) => {
      buttonSaveProfile.textContent = "Сохранить";
    });
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmitProfile);

// Обработчик «отправки» формы для новой карточки
function addNewCardHandler(evt) {
  evt.preventDefault();
  buttonSaveNewCard.textContent = "Сохранение...";
  addCard(nameNewCard.value, imageNewCard.value)
    .then((card) => {
      const addNewCard = createCard(
        card,
        removeCardCallback,
        likeCardCallback,
        openImagePopup,
        profileId
      );

      placesList.prepend(addNewCard);
      closeButtonPopup(newPlace);
      formCard.reset();
    })
    .catch((errorMessage) => console.log(errorMessage))
    .finally((card) => {
      buttonSaveProfile.textContent = "Сохранить";
    });
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formCard.addEventListener("submit", addNewCardHandler);

function addNewAvatarHandler(evt) {
  evt.preventDefault();
  buttonSaveAvatar.textContent = "Сохранение...";
  editAvatar(inputAvatar.value)
    .then((avatar) => {
      initialAvatar(avatar);
      closeButtonPopup(popupAvatar);
      formAvatar.reset();
    })
    .catch((errorMessage) => console.log(errorMessage))
    .finally((avatar) => {
      buttonSaveProfile.textContent = "Сохранить";
    });
}

formAvatar.addEventListener("submit", addNewAvatarHandler);

function initialAvatar(url) {
  profileImg.style.backgroundImage = `url(${url.avatar})`;
}

function initialProfile(profile) {
  nameTitle.textContent = profile.name;
  jobTitle.textContent = profile.about;
  profileImg.style.backgroundImage = `url(${profile.avatar})`;
  profileId = profile._id;
}

function initialCards(cards) {
  cards.forEach(function (item) {
    placesList.append(
      createCard(
        item,
        removeCardCallback,
        likeCardCallback,
        openImagePopup,
        profileId
      )
    );
  });
}

Promise.all([getProfile(), getCards()])
  .then(([profile, cards]) => {
    initialProfile(profile);
    initialCards(cards);
  })
  .catch(() => {
    console.log("Не удалось загрузить данные профиля и карточки");
  });

function removeCardCallback(element, id) {
  removeCard(id)
    .then(() => {
      deleteCard(element);
    })
    .catch((errorMessage) => console.log(errorMessage));
}

function likeCardCallback(buttonLike, cardId, likeCountElement) {
  if (isActiveLikeButton(buttonLike)) {
    removeLike(cardId)
      .then((card) => {
        likeCard(buttonLike);
        likeCountElement.textContent = card.likes.length;
      })
      .catch((errorMessage) => console.log(errorMessage));
  } else {
    addLike(cardId)
      .then((card) => {
        likeCard(buttonLike);
        likeCountElement.textContent = card.likes.length;
      })
      .catch((errorMessage) => console.log(errorMessage));
  }
}

enableValidation(validationConfig);

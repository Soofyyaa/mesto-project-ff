//Функция открытый попап
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc); // слушатель esc на открытый попап
  document.addEventListener("click", closePopupOverlay); //слушатель оверлея на открытый попап
}

//Функция закрытый попап
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc); //удаление esc слушателя при закрытом попапе
  document.removeEventListener("click", closePopupOverlay); //удаление оверлей слушателя при закрытом попапе
}

//Функция закрытия попапа на esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

//Функция закрытия попапа на overlay
function closePopupOverlay(evt) {
  const popup = document.querySelector(".popup_is-opened");
  if (popup === evt.target) {
    closePopup(popup);
  }
}

export { openPopup, closePopup };

import "./pages/index.css";
import { initialCards } from "./cards";
import { addCard, deleteCard } from "./card";
import { openPopup, openImagePopup } from "./modal";

const logoImage = new URL("./images/logo.svg", import.meta.url);
const profileImage = new URL("./images/avatar.jpg", import.meta.url);

const profileSection = document.querySelector(".content");
const headerLogo = document.querySelector(".header__logo");
const profileAvatar = document.querySelector(".profile__image");
const placesList = document.querySelector(".places__list");
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPicture = imagePopup.querySelector('.popup__image');

const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector(".places__item.card");

headerLogo.src = logoImage;
profileAvatar.style.backgroundImage = `url(${profileImage})`;

initialCards.forEach((card) => {
  addCard(placesList, cardElement, card.name, card.link, deleteCard);
});

profileSection.addEventListener("click", (evt) => {
  const target = evt.target;
  if (target.classList.contains('profile__add-button')) {
    openPopup(newCardPopup);
  } else if (target.classList.contains('profile__edit-button')) {
    openPopup(editPopup);
  } else if (target.classList.contains('card__image')) {
    openImagePopup(imagePopup, imagePopupPicture, target);
  }
});

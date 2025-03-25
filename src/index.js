import "./pages/index.css";
import { initialCards } from "./cards";
import { addCard, handleCardLikeButton } from "./card";
import { openPopup, closePopup } from "./modal";

const headerLogo = document.querySelector(".header__logo");
const logoImage = new URL("./images/logo.svg", import.meta.url);

const profileSection = document.querySelector(".profile");
const profileImage = new URL("./images/avatar.jpg", import.meta.url);
const profileAvatar = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editPopup = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms["edit-profile"];
const editProfileNameField = editProfileForm.elements.name;
const editProfileDescriptionField = editProfileForm.elements.description;

const newCardPopup = document.querySelector(".popup_type_new-card");
const newPlaceForm = document.forms["new-place"];
const newPlaceNameField = newPlaceForm.elements["place-name"];
const newPlaceLinkField = newPlaceForm.elements.link;

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupPicture = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector(".places__item.card");

function openImagePopup(evt) {
  const sourceImage = evt.target;
  imagePopupPicture.src = sourceImage.src;
  imagePopupPicture.alt = sourceImage.alt;
  imagePopupCaption.textContent = sourceImage.alt;
  openPopup(imagePopup);
}

function openEditProfilePopup() {
  editProfileNameField.value = profileTitle.textContent;
  editProfileDescriptionField.value = profileDescription.textContent;
  openPopup(editPopup);
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = editProfileNameField.value;
  profileDescription.textContent = editProfileDescriptionField.value;
  closePopup(editPopup);
}

function submitnewPlaceForm(evt) {
  evt.preventDefault();
  addCard(
    placesList,
    cardElement,
    newPlaceNameField.value,
    newPlaceLinkField.value,
    openImagePopup,
    handleCardLikeButton,
    true
  );
  closePopup(newCardPopup);
  newPlaceForm.reset();
}

editProfileForm.addEventListener("submit", submitEditProfileForm);
newPlaceForm.addEventListener("submit", submitnewPlaceForm);

profileSection.addEventListener("click", (evt) => {
  const target = evt.target;
  if (target.classList.contains("profile__add-button")) {
    openPopup(newCardPopup);
  } else if (target.classList.contains("profile__edit-button")) {
    openEditProfilePopup();
  }
});

headerLogo.src = logoImage;
profileAvatar.style.backgroundImage = `url(${profileImage})`;

initialCards.forEach((card) => {
  addCard(placesList, cardElement, card.name, card.link, openImagePopup, handleCardLikeButton);
});

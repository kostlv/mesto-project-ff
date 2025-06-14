import "./pages/index.css";
import { initialCards } from "./cards";
import { createCard, handleCardLikeButton } from "./card";
import { openPopup, closePopup } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import {
  getUserInfo,
  getInitialCards,
  editProfileRequest,
  addCardRequest,
  editAvatar,
} from "./api";

const headerLogo = document.querySelector(".header__logo");
const logoImage = new URL("./images/logo.svg", import.meta.url);

const profileSection = document.querySelector(".profile");
const profileAvatar = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editPopup = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms["edit-profile"];
const editProfileNameField = editProfileForm.elements.name;
const editProfileDescriptionField = editProfileForm.elements.description;
const editProfileSubmitButton = editProfileForm.querySelector(".popup__button");

const newCardPopup = document.querySelector(".popup_type_new-card");
const newPlaceForm = document.forms["new-place"];
const newPlaceNameField = newPlaceForm.elements["place-name"];
const newPlaceLinkField = newPlaceForm.elements.link;
const newPlaceSubmitButton = newPlaceForm.querySelector(".popup__button");

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupPicture = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = document.forms["edit-avatar"];
const avatarLinkField = avatarForm.elements.link;
const avatarSubmitButton = avatarForm.querySelector(".popup__button");

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector(".places__item.card");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_is-disabled",
  inputErrorClass: "popup__input_is-invalid",
  errorClass: "popup__input-error_is-active",
};

function changeButtonStateToLoading(button) {
  button.textContent = "Сохранение...";
}

function resetButtonState(button) {
  button.textContent = "Сохранить";
}

function addCard(
  cardsList,
  template,
  title,
  imagelink,
  likesCount,
  imageClickFunction,
  likeButtonFunction,
  cardId,
  cardOwnerId,
  currentUserId,
  likesArray,
  putBefore = false
) {
  const filledCard = createCard(
    template,
    title,
    imagelink,
    likesCount,
    imageClickFunction,
    likeButtonFunction,
    cardId,
    cardOwnerId,
    currentUserId,
    likesArray
  );
  putBefore ? cardsList.prepend(filledCard) : cardsList.append(filledCard);
}

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
  clearValidation(editProfileForm, validationConfig);
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  changeButtonStateToLoading(editProfileSubmitButton);
  editProfileRequest(
    editProfileNameField.value,
    editProfileDescriptionField.value
  )
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup();
      resetButtonState(editProfileSubmitButton);
    })
    .catch((err) => {
      console.log(err);
    });
}

function submitnewPlaceForm(evt) {
  evt.preventDefault();
  changeButtonStateToLoading(newPlaceSubmitButton);
  addCardRequest(newPlaceNameField.value, newPlaceLinkField.value)
    .then((res) => {
      addCard(
        placesList,
        cardElement,
        res.name,
        res.link,
        res.likes.length,
        openImagePopup,
        handleCardLikeButton,
        res["_id"],
        res.owner["_id"],
        res.owner["_id"],
        res.likes,
        true
      );
      closePopup();
      resetButtonState(newPlaceSubmitButton);
      newPlaceForm.reset();
      clearValidation(newPlaceForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    });
}

function submitEditAvatarForm(evt) {
  evt.preventDefault();
  changeButtonStateToLoading(avatarSubmitButton);
  editAvatar(avatarLinkField.value)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      closePopup();
      resetButtonState(avatarSubmitButton);
      avatarForm.reset();
      clearValidation(avatarForm, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    });
}

editProfileForm.addEventListener("submit", submitEditProfileForm);
newPlaceForm.addEventListener("submit", submitnewPlaceForm);
avatarForm.addEventListener("submit", submitEditAvatarForm);

profileSection.addEventListener("click", (evt) => {
  const target = evt.target;
  if (target.classList.contains("profile__add-button")) {
    openPopup(newCardPopup);
  } else if (target.classList.contains("profile__edit-button")) {
    openEditProfilePopup();
  } else if (target.classList.contains("profile__image")) {
    openPopup(avatarPopup);
  }
});

headerLogo.src = logoImage;

Promise.all([getUserInfo(), getInitialCards()])
  .then((res) => {
    profileAvatar.style.backgroundImage = `url(${res[0].avatar})`;
    profileTitle.textContent = res[0].name;
    profileDescription.textContent = res[0].about;

    res[1].forEach((card) => {
      addCard(
        placesList,
        cardElement,
        card.name,
        card.link,
        card.likes.length,
        openImagePopup,
        handleCardLikeButton,
        card["_id"],
        card.owner["_id"],
        res[0]["_id"],
        card.likes
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);

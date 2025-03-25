export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  addListenersToPopup(popup);
}

export function openImagePopup(popup, imageElement, sourceElement) {
  imageElement.src = sourceElement.src;
  imageElement.alt = sourceElement.alt;
  openPopup(popup);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  removeListenersFromPopup(popup);
}

function addListenersToPopup(popup) {
  popup.addEventListener("click", (evt) => handlePopupClose(evt, popup));
  document.addEventListener("keydown", (evt) => handlePopupClose(evt, popup));
}

function removeListenersFromPopup(popup) {
  popup.removeEventListener("click", (evt) => handlePopupClose(evt, popup));
  document.removeEventListener("keydown", (evt) => handlePopupClose(evt, popup));
}

function handlePopupClose(evt, popup) {
  const target = evt.target;
  if (target.classList.contains("popup__close")) {
    closePopup(popup);
  } else if (target.classList.contains("popup")) {
    closePopup(popup);
  } else if (evt.key === "Escape") {
    closePopup(popup);
  }
}

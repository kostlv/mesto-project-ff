export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  addListenersToPopup(popup);
}

export function closePopup() {
  const openedPopup = document.querySelector(".popup_is-opened");
  openedPopup.classList.remove("popup_is-opened");
  removeListenersFromPopup(openedPopup);
}

function handlePopupClose(evt) {
  const target = evt.target;
  if (target.classList.contains("popup__close")) {
    closePopup();
  } else if (target.classList.contains("popup")) {
    closePopup();
  } else if (evt.key === "Escape") {
    closePopup();
  }
}

function addListenersToPopup(popup) {
  popup.addEventListener("click", handlePopupClose);
  document.addEventListener("keydown", handlePopupClose);
}

function removeListenersFromPopup(popup) {
  popup.removeEventListener("click", handlePopupClose);
  document.removeEventListener("keydown", handlePopupClose);
}
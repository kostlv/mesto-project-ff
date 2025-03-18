const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector(".places__item.card");

function addCard(title, imagelink, cardDeleteFunction) {
  const cardInstance = cardElement.cloneNode(true);
  const deleteButton = cardInstance.querySelector(".card__delete-button");

  cardInstance.querySelector(".card__image").src = imagelink;
  cardInstance.querySelector(".card__title").textContent = title;

  deleteButton.addEventListener("click", () => {
    cardDeleteFunction(cardInstance);
  });

  placesList.append(cardInstance);
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach((card) => {
  addCard(card.name, card.link, deleteCard);
});

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector(".places__item.card");

function createCard(title, imagelink, cardDeleteFunction) {
  const cardInstance = cardElement.cloneNode(true);
  const deleteButton = cardInstance.querySelector(".card__delete-button");
  const cardImage = cardInstance.querySelector(".card__image");

  cardImage.src = imagelink;
  cardImage.alt = title;
  cardInstance.querySelector(".card__title").textContent = title;

  deleteButton.addEventListener("click", () => {
    cardDeleteFunction(cardInstance);
  });

  return cardInstance;
}

function addCard(title, imagelink, cardDeleteFunction) {
  const filledCard = createCard(title, imagelink, cardDeleteFunction);
  placesList.append(filledCard);
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach((card) => {
  addCard(card.name, card.link, deleteCard);
});

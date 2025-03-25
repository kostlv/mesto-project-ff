export function createCard(template, title, imagelink, cardDeleteFunction) {
  const cardInstance = template.cloneNode(true);
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

export function addCard(cardsList, template, title, imagelink, cardDeleteFunction) {
  const filledCard = createCard(template, title, imagelink, cardDeleteFunction);
  cardsList.append(filledCard);
}

export function deleteCard(card) {
  card.remove();
}
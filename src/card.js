export function deleteCard(card) {
  card.remove();
}

function createCard(template, title, imagelink, imageClickFunction, likeButtonFunction) {
  const cardInstance = template.cloneNode(true);
  const deleteButton = cardInstance.querySelector(".card__delete-button");
  const cardImage = cardInstance.querySelector(".card__image");
  const likeButton = cardInstance.querySelector(".card__like-button");

  cardImage.src = imagelink;
  cardImage.alt = title;
  cardInstance.querySelector(".card__title").textContent = title;

  deleteButton.addEventListener("click", () => {
    deleteCard(cardInstance);
  });

  cardImage.addEventListener("click", imageClickFunction);
  likeButton.addEventListener("click", likeButtonFunction);

  return cardInstance;
}

export function addCard(
  cardsList,
  template,
  title,
  imagelink,
  imageClickFunction,
  likeButtonFunction,
  putBefore = false
) {
  const filledCard = createCard(template, title, imagelink, imageClickFunction, likeButtonFunction);
  putBefore ? cardsList.prepend(filledCard) : cardsList.append(filledCard);
}

export function handleCardLikeButton(evt) {
  const button = evt.target;
  button.classList.toggle("card__like-button_is-active");
}

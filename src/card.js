import { deleteCardRequest, addLikeToCard, removeLikeFromCard } from "./api";

export function deleteCard(card, cardId) {
  deleteCardRequest(cardId).then(() => card.remove());
}

export function createCard(
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
) {
  const cardInstance = template.cloneNode(true);
  const deleteButton = cardInstance.querySelector(".card__delete-button");
  const cardImage = cardInstance.querySelector(".card__image");
  const likeButton = cardInstance.querySelector(".card__like-button");
  const likesCounter = cardInstance.querySelector(".card__likes-count");
  cardImage.src = imagelink;
  cardImage.alt = title;
  cardInstance.querySelector(".card__title").textContent = title;
  likesCounter.textContent = likesCount;

  if (cardOwnerId === currentUserId) {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardInstance, cardId);
    });
  } else {
    deleteButton.remove();
  }

  likeButtonFunction(
    cardId,
    currentUserId,
    likeButton,
    likesCounter,
    likesArray
  );

  cardImage.addEventListener("click", imageClickFunction);
  likeButton.addEventListener("click", () => {
    likeButtonFunction(cardId, currentUserId, likeButton, likesCounter);
  });

  return cardInstance;
}

export function handleCardLikeButton(
  cardId,
  currentUserId,
  likeButton,
  likesCounter,
  likesArray = false
) {
  if (likesArray) {
    if (likesArray.some((like) => like["_id"] === currentUserId)) {
      likeButton.classList.add("card__like-button_is-active");
    }
  } else {
    if (!likeButton.classList.contains("card__like-button_is-active")) {
      addLikeToCard(cardId).then((res) => {
        likesCounter.textContent = res.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      });
    } else {
      removeLikeFromCard(cardId).then((res) => {
        likesCounter.textContent = res.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      });
    }
  }
}

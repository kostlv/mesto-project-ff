export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formItem) => {
    setInputListeners(formItem, validationConfig);
  });
}

export function clearValidation(formItem, validationConfig) {
  const fieldsList = Array.from(formItem.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formItem.querySelector(validationConfig.submitButtonSelector);
  fieldsList.forEach((field) => {
    checkInputValidity(formItem, field, validationConfig);
    hideInputError(formItem, field, validationConfig);
  });
  toggleButtonState(fieldsList, buttonElement, validationConfig);
}

function setInputListeners(formItem, validationConfig) {
  const fieldsList = Array.from(formItem.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formItem.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(fieldsList, buttonElement, validationConfig);
  fieldsList.forEach((field) => {
    field.addEventListener("input", () => {
      checkInputValidity(formItem, field, validationConfig);
      toggleButtonState(fieldsList, buttonElement, validationConfig);
    });
  });
}

function checkInputValidity(formItem, field, validationConfig) {
  if (field.validity.patternMismatch) {
    field.setCustomValidity(field.dataset.errorMessage);
  } else {
    field.setCustomValidity("");
  }

  if (!field.validity.valid) {
    showInputError(formItem, field, field.validationMessage, validationConfig);
  } else {
    hideInputError(formItem, field, validationConfig);
  }
}

function showInputError(formItem, field, errorMessage, validationConfig) {
  const errorSpan = formItem.querySelector(`.${field.name}-input-error`);
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add(validationConfig.errorClass);
  field.classList.add(validationConfig.inputErrorClass);
}

function hideInputError(formItem, field, validationConfig) {
  const errorSpan = formItem.querySelector(`.${field.name}-input-error`);
  errorSpan.textContent = "";
  errorSpan.classList.remove(validationConfig.errorClass);
  field.classList.remove(validationConfig.inputErrorClass);
}

function hasInvalidInput(fieldsList) {
  return fieldsList.some((field) => {
    return !field.validity.valid;
  });
}

function toggleButtonState(fieldsList, buttonElement, validationConfig) {
  if (hasInvalidInput(fieldsList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

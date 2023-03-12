const passwordInput = document.getElementById("password");
const showPasswordCheckbox = document.getElementById("show-password-checkbox");
const flashMessages = document.querySelectorAll(".flash-message");

showPasswordCheckbox.addEventListener("change", () => {
  if (showPasswordCheckbox.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

flashMessages.forEach((flashMessage) => {
  setTimeout(() => {
    flashMessage.remove();
  }, 3000);
});

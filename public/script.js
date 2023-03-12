const passwordInput = document.getElementById("password");
const showPasswordCheckbox = document.getElementById("show-password-checkbox");
const flashMessages = document.querySelectorAll(".flash-message");

try {
  showPasswordCheckbox.addEventListener("change", () => {
    if (showPasswordCheckbox.checked) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });
} catch (err) {
  console.log(err);
}

flashMessages.forEach((flashMessage) => {
  setTimeout(() => {
    flashMessage.remove();
  }, 1500);
});

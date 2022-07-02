const submitBtn = document.getElementById("submit")
const userName = document.getElementById("username")
const userPassword = document.getElementById("password")
const passwordConfirmation = document.getElementById("confirmation")
const termsCheckbox = document.getElementById("agree")
const requirements = document.getElementById("prerequisites")
const accepted = document.getElementById("accepted")
const minLength = document.getElementById("min-length")
const maxLength = document.getElementById("max-length")
const passwordRequirements = document.getElementById("prerequisites-pass")
const confirmPassContainer = document.getElementById("prerequisites-confirm")
const acceptedPassword = document.getElementById("accepted-pass")
const minLengthPassword = document.getElementById("min-length-pass")
const mismatch = document.getElementById("mismatch")
const agreeLabel = document.getElementById("agree-label")
const successModal = document.getElementById("success-modal")
const termsAndCoModal = document.getElementById("terms-and-co")
const closeBtn = document.getElementById("close")

// Prevent default submit
submitBtn.addEventListener("click", e => {
  e.preventDefault()

  acceptedTerms()
})

agreeLabel.addEventListener("click", () => {
  termsAndCoModal.classList.remove("hide")
})

closeBtn.addEventListener("click", () => {
  termsAndCoModal.classList.add("hide")
})

// Check if username is valid => 8 characters min.
function checkUserName() {
  const userNameLenght = Object.keys(userName.value).length
  if (userNameLenght >= 8 && userNameLenght <= 16) {
    requirements.classList.remove("hide")
    requirements.classList.add("accepted-reqs")
    accepted.classList.remove("hide")
    userPassword.classList.remove("disabled")
    passwordConfirmation.classList.remove("disabled")
    maxLength.classList.add("hide")
    minLength.classList.add("hide")
  } else if (userNameLenght > 16) {
    requirements.classList.remove("hide")
    requirements.classList.add("incorrect")
    accepted.classList.add("hide")
    maxLength.classList.remove("hide")
  } else if (userNameLenght === 0 || userNameLenght < 8) {
    requirements.classList.remove("hide")
    requirements.classList.add("incorrect")
    accepted.classList.add("hide")
    minLength.classList.remove("hide")
  }
}

// Check if password meets requirements.
function checkPassword() {
  const userPasswordLength = Object.keys(userPassword.value).length
  const confirmationLength = Object.keys(passwordConfirmation.value).length

  if (userPasswordLength >= 14 && userPasswordLength === confirmationLength) {
    passwordRequirements.classList.remove("hide")
    confirmPassContainer.classList.add("hide")
    acceptedPassword.classList.remove("hide")
    minLengthPassword.classList.add("hide")
    confirmPassContainer.classList.remove("hide")
    acceptedPassword.classList.remove("hide")
    mismatch.classList.add("hide")
    agreeLabel.classList.add("blink_me")
    termsCheckbox.classList.remove("disabled")
  } else if (userPasswordLength < 14) {
    acceptedPassword.classList.add("hide")
    confirmPassContainer.classList.add("hide")
    passwordRequirements.classList.remove("hide")
    minLengthPassword.classList.remove("hide")
  } else if (userPasswordLength != confirmationLength) {
    confirmPassContainer.classList.remove("hide")
    acceptedPassword.classList.add("hide")
    minLengthPassword.classList.add("hide")
    mismatch.classList.remove("hide")
  }
}

function acceptedTerms() {
  const isChecked = termsCheckbox.checked
  if (isChecked === true) {
    successModal.classList.remove("hide")
  } else {
    alert("You should read the terms and conditions first.")
  }
}

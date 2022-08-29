const lightRed = document.getElementById("red-light")
const lightYellow = document.getElementById("yellow-light")
const lightGreen = document.getElementById("green-light")
const btnNormal = document.getElementById("normal")
const btnInt = document.getElementById("intermittent")
const btnCrazy = document.getElementById("crazy")
const btnRetry = document.getElementById("retry")

btnRetry.addEventListener("click", () => {
  location.reload()
})

btnNormal.addEventListener("click", () => {
  lightChangeNormal(2000)
    .then(() => {
      lightRed.style.backgroundColor = "red"
      return lightChangeNormal(2000)
    })
    .then(() => {
      lightYellow.style.backgroundColor = "yellow"
      return lightChangeNormal(4000)
    })
    .then(() => {
      lightGreen.style.backgroundColor = "#66ff00"
      return lightChangeNormal(6000)
    })
})

btnInt.addEventListener("click", () => {
  setInterval(() => {
    lightYellow.style.backgroundColor = "yellow"
  }, 1000)

  setInterval(() => {
    lightYellow.style.backgroundColor = ""
  }, 2000)
})

function lightChangeNormal(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

btnCrazy.addEventListener("click", () => {
  const randomNumber1 = Math.floor(Math.random() * 2000)
  const randomNumber2 = Math.floor(Math.random() * 4000)
  const randomNumber3 = Math.floor(Math.random() * 2500)
  const randomNumber4 = Math.floor(Math.random() * 3500)
  const randomNumber5 = Math.floor(Math.random() * 2500)
  const randomNumber6 = Math.floor(Math.random() * 5000)

  // Red
  setInterval(() => {
    lightRed.style.backgroundColor = "red"
  }, randomNumber1)

  setInterval(() => {
    lightRed.style.backgroundColor = ""
  }, randomNumber2)
  // Yellow
  setInterval(() => {
    lightYellow.style.backgroundColor = "yellow"
  }, randomNumber3)

  setInterval(() => {
    lightYellow.style.backgroundColor = ""
  }, randomNumber4)
  // Green
  setInterval(() => {
    lightGreen.style.backgroundColor = "#66ff00"
  }, randomNumber5)

  setInterval(() => {
    lightGreen.style.backgroundColor = "green"
  }, randomNumber6)
})

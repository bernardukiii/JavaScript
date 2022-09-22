const firstDate = document.getElementById("initial-date")
const btnCalc = document.getElementById("btn-calc")
const warning = document.getElementById("warning-1")

const counterYear = document.getElementById("year-count")
const counterMonth = document.getElementById("month-count")
const counterDay = document.getElementById("day-count")
const counterHour = document.getElementById("hour-count")
const counterMinute = document.getElementById("min-count")
const counterSecond = document.getElementById("sec-count")

function dropdownOption () {
  var select = document.getElementById("select-field")
  var selectValue = select.options[select.selectedIndex].value

  firstDate.classList.remove("unclickable")

  if (selectValue != "count" && selectValue != "count-down") {
    alert("chose")
    
  } else if (firstDate.value == "") {
    warning.classList.remove("hidden")
    btnCalc.classList.remove("hidden")

  } else {
    warning.classList.add("hidden")
  }

  btnCalc.addEventListener("click", () => {
    const firstDateValue = firstDate.value
    console.log(firstDateValue)
    if (firstDateValue != "") {
      warning.classList.add("hidden")
      if (selectValue === "count") {
        substractDates()
      } else {
        countDown()
      }
    } else {
      alert("Oops, it appears you input an invalid date. Please check your chosen date.")
    }
  })
}


function substractDates () {
  
  setInterval(() => {
    const departureDate = new Date(firstDate.value)
    const actualDate = new Date()
    const miliseconds = actualDate - departureDate
    // years = milliseconds ÷ 31,556,952,000 -- Convert miliseconds to years.
    var years = Math.trunc(miliseconds / 31556952000)
    // months = milliseconds ÷ 2,629,746,000 -- Convert miliseconds to months.
    var months = Math.trunc(miliseconds / 2629746000)
    // days = days = milliseconds ÷ 86,400,000 -- Convert milisecond to days.
    var days = Math.trunc(miliseconds / 86400000)
    // hours = hours = milliseconds ÷ 3,600,000
    var hours = Math.trunc(miliseconds / 3600000)
    // minutes = minutes = milliseconds ÷ 60,000 -- Convert miliseconds to minutes.
    var minutes = Math.trunc(miliseconds / 60000)
    // seconds = seconds = miliseconds ÷ 1,000 -- Convert miliseconds to seconds.
    var seconds = Math.trunc(miliseconds / 1000)
    // Dividing the remainders by the unit of what we want to get.
    months %= 12
    days %= 29
    hours %= 24
    minutes %= 60
    seconds %= 60

    counterYear.innerHTML = years
    counterMonth.innerHTML = months
    counterDay.innerHTML = days
    counterHour.innerHTML = hours
    counterMinute.innerHTML = minutes
    counterSecond.innerHTML = seconds

  }, 1000)
}

function countDown () {
  setInterval(() => {
    const departureDate = new Date(firstDate.value)
    const actualDate = new Date()
    const miliseconds = departureDate - actualDate
    // years = milliseconds ÷ 31,556,952,000 -- Convert miliseconds to years.
    var years = Math.trunc(miliseconds / 31556952000)
    // months = milliseconds ÷ 2,629,746,000 -- Convert miliseconds to months.
    var months = Math.trunc(miliseconds / 2629746000)
    // days = days = milliseconds ÷ 86,400,000 -- Convert milisecond to days.
    var days = Math.trunc(miliseconds / 86400000)
    // hours = hours = milliseconds ÷ 3,600,000
    var hours = Math.trunc(miliseconds / 3600000)
    // minutes = minutes = milliseconds ÷ 60,000 -- Convert miliseconds to minutes.
    var minutes = Math.trunc(miliseconds / 60000)
    // seconds = seconds = miliseconds ÷ 1,000 -- Convert miliseconds to seconds.
    var seconds = Math.trunc(miliseconds / 1000)
    // Dividing the remainders by the unit of what we want to get.
    months %= 12
    days %= 29
    hours %= 24
    minutes %= 60
    seconds %= 60

    counterYear.innerHTML = years
    counterMonth.innerHTML = months
    counterDay.innerHTML = days
    counterHour.innerHTML = hours
    counterMinute.innerHTML = minutes
    counterSecond.innerHTML = seconds
  }, 1000)
}
const counterYear = document.getElementById("year-count")
const counterMonth = document.getElementById("month-count")
const counterDay = document.getElementById("day-count")
const counterHour = document.getElementById("hour-count")
const counterMinute = document.getElementById("min-count")
const counterSecond = document.getElementById("sec-count")

const departureDate = new Date("10-11-2020")

setInterval(() => {
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

  console.log(years + " year(s)")
  console.log(months + " month(s)")
  console.log(days + " day(s)")

  counterYear.innerHTML = years + " " + "y"
  counterMonth.innerHTML = months + " " + "m"
  counterDay.innerHTML = days + " " + "d"
  counterHour.innerHTML = hours + " " + "h"
  counterMinute.innerHTML = minutes + " " + "m"
  counterSecond.innerHTML = seconds + " " + "s"
}, 1000)

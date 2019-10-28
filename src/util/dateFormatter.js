export default (targetDate = null) => {
  const date = targetDate ? new Date(targetDate) : new Date();;

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  }
}

export const parseZeroPadding = (num) => {
  return (`0${num}`).slice(-2);
}

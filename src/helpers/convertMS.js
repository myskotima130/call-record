export const convertMS = milliseconds => {
  let day, hours, minutes, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minutes = Math.floor(seconds / 60);
  seconds %= 60;
  hours = Math.floor(minutes / 60);
  minutes %= 60;
  day = Math.floor(hours / 24);
  hours %= 24;

  seconds = seconds < 10 && seconds > 0 ? `0${seconds}` : seconds;
  minutes = minutes < 10 && minutes > 0 ? `0${minutes}` : minutes;
  hours = hours < 10 && hours > 0 ? `0${hours}` : hours;

  return `${hours ? `${hours}:` : ""}${minutes ? `${minutes}:` : "00:"}${
    seconds ? seconds : "00"
  }`;
};

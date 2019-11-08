const convertToTwoDigit = time => (time < 10 && time > 0 ? `0${time}` : time);

export const convertMS = milliseconds => {
  let hours, minutes, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minutes = Math.floor(seconds / 60);
  hours = Math.floor(minutes / 60);
  seconds %= 60;
  minutes %= 60;
  hours %= 24;

  seconds = convertToTwoDigit(seconds);
  minutes = convertToTwoDigit(minutes);
  hours = convertToTwoDigit(hours);

  return `${hours ? `${hours}:` : ""}${minutes ? `${minutes}:` : "00:"}${
    seconds ? seconds : "00"
  }`;
};

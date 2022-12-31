export const unixNow = () => {
  return Math.floor(Date.now() / 1000);
};

export const ifNonZero = (time: number, annotation: string) => {
  return time > 0 ? `${time}${annotation}` : "";
};

export const getCountDownString = (target: number): string => {
  let distance = target - Date.now();
  if (distance <= 0) {
    return "";
  }
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return `${ifNonZero(days, "d")} ${ifNonZero(hours, "h")} ${ifNonZero(
    minutes,
    "m"
  )} ${ifNonZero(seconds, "s")}`;
};

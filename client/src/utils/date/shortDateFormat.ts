export const shortDateFormat = (dateTimeString) => {
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return `${year}.${formatNumber(month)}.${formatNumber(day)}/${formatNumber(
    hours,
  )}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
};

export const formatTime = (date) => {
  const dateParsed = new Date(date);
  const formatter = new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return formatter.format(dateParsed);
};

export const formatDate = (date) => {
  const dateParsed = new Date(date);
  const formatter = new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(dateParsed);
};

export const formatDateAndTime = (date) => {
  return formatDate(date) + " " + formatTime(date);
} 
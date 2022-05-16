// Zerofill
function zerofill(n) {
  return n.toString().padStart(2, 0);
}

// Returs the date in YYYY-MM-DD format from date
function getDateISO(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${zerofill(date.getMonth() + 1)}-${zerofill(date.getDate())}`;
}

// Returns the time in HH:MM:SS format from a date
function getTimeISO(dateString) {
  const date = new Date(dateString);
  return `${zerofill(date.getHours())}:${zerofill(date.getMinutes())}:${zerofill(date.getSeconds())}`;
}

export { getDateISO, getTimeISO };

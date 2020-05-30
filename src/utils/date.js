function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export function format(a, withTime) {
  return withTime
    ? `${a.getFullYear()}-${a.getMonth() +
    1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
    : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
}


export function addDashYYYYMMDD(dateString) {
  dateString = dateString.toString();
  return `${dateString.substr(0, 4)}-${dateString.substr(4, 2)}-${dateString.substr(6, 2)}`;
}


export function fromYYYYMMDD(dateString) {
  dateString = dateString.toString();
  return new Date(`${dateString.substr(0, 4)}-${dateString.substr(4, 2)}-${dateString.substr(6, 2)}`)
}

export function toYYYYMMDD(date) {
  // let date = new Date().getMilliseconds;
  return "" + date.getFullYear()
    + pad(date.getMonth() + 1, 2)
    + pad(date.getDate(), 2)
}
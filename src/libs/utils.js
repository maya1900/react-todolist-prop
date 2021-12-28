function _addZero (value) {
  return value < 10 ? '0' + value : value
}
function formatDateTime (timestamp) {
  const date = new Date(timestamp)
  const y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    i = date.getMinutes(),
    s = date.getSeconds()
  return `${y}年${m}月${d}日 ${_addZero(h)}:${_addZero(i)}:${_addZero(s)}`
}

export  {
  formatDateTime
}
export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  delay,
  timeSince,
  isImage,
  hexToRgbA,
  dueDateTimeFormat,
  dueDateFormat,
}

function makeId(length = 6) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

//prettier-ignore
function makeLorem(size = 100) {
  var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
  var txt = '';
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)] + ' ';
  }
  return txt;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function delay(ms = 1500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000)

  var interval = seconds / 31536000

  if (interval > 1) {
    if (Math.floor(interval) === 1) return 'a year ago'
    return Math.floor(interval) + ' years ago'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    if (Math.floor(interval) === 1) return 'a month ago'
    return Math.floor(interval) + ' months ago'
  }
  interval = seconds / 86400
  if (interval > 1) {
    if (Math.floor(interval) === 1) return 'a day ago'
    return Math.floor(interval) + ' days ago'
  }
  interval = seconds / 3600
  if (interval > 1) {
    if (Math.floor(interval) === 1) return 'an hour ago'
    return Math.floor(interval) + ' hours ago'
  }
  interval = seconds / 60
  if (interval > 1) {
    if (Math.floor(interval) === 1) return 'Just now'
    return Math.floor(interval) + ' minutes ago'
  }
  if (Math.floor(seconds) === 0) return 'Just now'
  return Math.floor(seconds) + ' seconds ago'
}

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
}

function hexToRgbA(hex) {
  var c
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.5)'
  }
  throw new Error('Bad Hex')
}

function dueDateTimeFormat(dueDate) {
  const currYear = new Date().getFullYear()
  const dueYear = new Date(dueDate).getFullYear()
  let strDate = ''
  strDate += `${new Date(dueDate).toLocaleString('en-US', { day: 'numeric' })} `
  strDate += `${new Date(dueDate).toLocaleString('en-US', { month: 'short' })} at `
  if (dueYear !== currYear) {
    strDate += `${dueYear} `
  }
  strDate += `${new Date(dueDate)
    .toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    .toLocaleUpperCase()}`
  return strDate
}

function dueDateFormat(dueDate) {
  let strDate = ''
  strDate += `${new Date(dueDate).toLocaleString('en-US', { day: 'numeric' })} `
  strDate += `${new Date(dueDate).toLocaleString('en-US', { month: 'short' })}`
  return strDate
}

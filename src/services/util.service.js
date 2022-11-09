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
  getModalPosition,
  getModalPositionOnTop,
  handleDragStart,
  handleDragUpdate,
  handleDragEnd,
  isBackgroundDark,
}

function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

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
    return (
      'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.5)'
    )
  }
  throw new Error('Bad Hex')
}

function dueDateTimeFormat(dueDate) {
  const currYear = new Date().getFullYear()
  const dueYear = new Date(dueDate).getFullYear()
  let strDate = ''
  strDate += `${new Date(dueDate).toLocaleString('en-US', { day: 'numeric' })} `
  strDate += `${new Date(dueDate).toLocaleString('en-US', {
    month: 'short',
  })} at `
  if (dueYear !== currYear) {
    strDate += `${dueYear} `
  }
  strDate += `${new Date(dueDate)
    .toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    .toLocaleUpperCase()}`
  return strDate
}

function dueDateFormat(dueDate) {
  let strDate = ''
  strDate += `${new Date(dueDate).toLocaleString('en-US', { day: 'numeric' })} `
  strDate += `${new Date(dueDate).toLocaleString('en-US', { month: 'short' })}`
  return strDate
}

function getModalPosition(type, ref) {
  const rect = ref.current.getBoundingClientRect()
  const pos = { bottom: rect.bottom + 8, left: rect.left }
  if (window.innerWidth - rect.right < 150) pos.left -= 130
  if (window.innerHeight - rect.bottom < 450) pos.bottom -= 200
  // Position is different for the filter and account modals
  if (type === 'Filter' || type === 'Account') {
    pos.right = 5
    pos.bottom += 8
  }
  return pos
}

function getModalPositionOnTop(ref) {
  const rect = ref.current.getBoundingClientRect()
  const pos = { top: rect.top - 8, left: rect.left - 2.5 }
  return pos
}

function handleDragStart(event, draggedDOM) {
  const { clientHeight, clientWidth } = draggedDOM
  const sourceIndex = event.source.index
  let clientX
  let clientY

  if (event.type === 'group') {
    clientX =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft) +
      [...draggedDOM.parentNode.children]
        .slice(0, sourceIndex)
        .reduce((total, curr) => {
          return (
            total +
            curr.clientWidth +
            parseFloat(getComputedStyle(curr).marginRight)
          )
        }, 0) -
      draggedDOM.parentNode.scrollLeft

    clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode))
  }

  return {
    clientHeight,
    clientWidth,
    clientX,
    clientY,
  }
}

function handleDragUpdate(event, draggedDOM) {
  const { clientHeight, clientWidth } = draggedDOM
  const destinationIndex = event.destination.index
  const sourceIndex = event.source.index
  let clientX = 0
  let clientY = 0

  const childrenArray = [...draggedDOM.parentNode.children]
  const movedItem = childrenArray[sourceIndex]
  childrenArray.splice(sourceIndex, 1)

  let updatedArray = [
    ...childrenArray.slice(0, destinationIndex),
    movedItem,
    ...childrenArray.slice(destinationIndex + 1),
  ]

  if (event.type === 'group') {
    clientX =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        return total + curr.clientWidth + 8
      }, 0) -
      draggedDOM.parentNode.scrollLeft
    clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode))
  }

  return { clientHeight, clientWidth, clientX, clientY }
}

function handleDragEnd(newBoard, destination, source, type) {
  const newBoardGroups = Array.from(newBoard.groups) // breaks pointer so we don't change the final object we send

  // reorder groups in the group list
  if (type === 'group') {
    // relocating the group in the groups array and sends the new board with updated groups array
    newBoardGroups.splice(source.index, 1)
    newBoardGroups.splice(destination.index, 0, newBoard.groups[source.index])
    newBoard.groups = newBoardGroups
    return newBoard

    // reorder tasks across the groups
  } else if (type === 'task') {
    const prevGroupIdx = newBoardGroups.findIndex(
      (group) => group.id === source.droppableId
    )
    const newGroupIdx = newBoardGroups.findIndex(
      (group) => group.id === destination.droppableId
    )
    const prevGroup = newBoardGroups[prevGroupIdx]
    const newGroup = newBoardGroups[newGroupIdx]

    // in case relocating task in the same group
    if (prevGroupIdx === newGroupIdx) {
      // in case the new task index is smaller
      if (destination.index < source.index) {
        newGroup.tasks.splice(
          destination.index,
          0,
          newBoard.groups[prevGroupIdx].tasks[source.index]
        )
        prevGroup.tasks.splice(source.index + 1, 1)

        // in case the new task index is bigger
      } else {
        newGroup.tasks.splice(
          destination.index + 1,
          0,
          newBoard.groups[prevGroupIdx].tasks[source.index]
        )
        prevGroup.tasks.splice(source.index, 1)
      }
      // in case new task location is on different group
    } else {
      newGroup.tasks.splice(
        destination.index,
        0,
        newBoard.groups[prevGroupIdx].tasks[source.index]
      )
      prevGroup.tasks.splice(source.index, 1)
    }

    newBoard.groups[newGroupIdx] = newGroup
    newBoard.groups[prevGroupIdx] = prevGroup
    return newBoard
  }
}

function isBackgroundDark(color) {
  if (!color) return

  let r
  let g
  let b
  if (color.match(/^rgb/)) {
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    )

    r = color[1]
    g = color[2]
    b = color[3]
  } else {
    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'))

    r = color >> 16
    g = (color >> 8) & 255
    b = color & 255
  }

  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))

  if (hsp > 127.5) {
    return false
  } else {
    return true
  }
}

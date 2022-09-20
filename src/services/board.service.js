import { storageService } from './async-storage.service.js'
import { store } from '../store/store'
import { board } from '../board.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'board'
const BASE_URL = `board/`
const boardChannel = new BroadcastChannel('boardChannel')
const gBoards = [
  board,
  {
    _id: 'b102',
    title: 'Second board',
    style: { background: 'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/ef2b36f0a6fced5b25ba500c55ae3016/photo-1513185041617-8ab03f83d6c5.jpg")' },
    isStarred: false,
    groups: []
  },
  {
    _id: 'b103',
    title: 'Third board',
    style: {
      background: 'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/656x960/4fef784b2b03ad256991ab304fcdac2e/photo-1662715593284-14fdf66c1202.jpg")',
      backgroundColor: 'rgb(81, 152, 57)',
    },
    isStarred: true,
    groups: []
  },
  {
    _id: 'b104',
    title: 'Fourth board',
    style: {
      background: 'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/386209d5ee33d0c24fc340a53f16cfe4/photo-1663011109441-6948af4a0b80.jpg")',
      backgroundColor: 'rgb(81, 152, 57)',
    },
    isStarred: false,
    groups: []
  },
  {
    _id: 'b105',
    title: 'Fifth board',
    style: {
      background: 'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/f7d6fa45ef3ecdf5429c9ce73175f5a2/photo-1660551772352-0855c10356b1.jpg")',
      backgroundColor: 'rgb(81, 152, 57)',
    },
    isStarred: true,
    groups: []
  },
]

  ; (() => {
    boardChannel.addEventListener('message', (ev) => {
      store.dispatch(ev.data)
    })
  })()

export const boardService = {
  query,
  getById,
  save,
  remove,
  handleDragEnd
}
// window.cs = boardService

async function query(filterBy) {
  try {
    return await httpService.get(BASE_URL, filterBy)
    let boards = await storageService.query(STORAGE_KEY)
    if (!boards || !boards.length) {
      storageService.postMany(STORAGE_KEY, gBoards)
      boards = gBoards
    }
    return boards
  }
  catch (err) {
    console.log('err: Cannot get boards ', err)
  }
}

function getById(boardId) {
  return httpService.get(BASE_URL + boardId)
  return storageService.get(STORAGE_KEY, boardId)
  // return axios.get(`/api/board/${boardId}`)
}

async function remove(boardId) {
  return httpService.delete(BASE_URL + boardId)
  await storageService.remove(STORAGE_KEY, boardId)
  // boardChannel.postMessage(getActionRemoveBoard(boardId))
}

async function save(board) {

  if (board._id) {
    console.log('INSIDE PUT')
    return httpService.put(BASE_URL + board._id, board)
    return await storageService.put(STORAGE_KEY, board)
    // boardChannel.postMessage(getActionUpdateBoard(savedBoard))

  } else {
    console.log('INSIDE POST')
    return httpService.post(BASE_URL, board)
    return await storageService.post(STORAGE_KEY, board)
    // boardChannel.postMessage(getActionAddBoard(savedBoard))
  }
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
    const prevGroupIdx = newBoardGroups.findIndex(group => group.id === source.droppableId)
    const newGroupIdx = newBoardGroups.findIndex(group => group.id === destination.droppableId)
    const prevGroup = newBoardGroups[prevGroupIdx]
    const newGroup = newBoardGroups[newGroupIdx]

    // in case relocating task in the same group
    if (prevGroupIdx === newGroupIdx) {
      // in case the new task index is smaller
      if (destination.index < source.index) {
        newGroup.tasks.splice(destination.index, 0, newBoard.groups[prevGroupIdx].tasks[source.index])
        prevGroup.tasks.splice(source.index + 1, 1)

        // in case the new task index is bigger
      } else {
        newGroup.tasks.splice(destination.index + 1, 0, newBoard.groups[prevGroupIdx].tasks[source.index])
        prevGroup.tasks.splice(source.index, 1)
      }
      // in case new task location is on different group
    } else {
      newGroup.tasks.splice(destination.index, 0, newBoard.groups[prevGroupIdx].tasks[source.index])
      prevGroup.tasks.splice(source.index, 1)
    }

    newBoard.groups[newGroupIdx] = newGroup
    newBoard.groups[prevGroupIdx] = prevGroup
    return newBoard
  }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))

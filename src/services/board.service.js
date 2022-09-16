import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { getActionRemoveBoard, getActionAddBoard, getActionUpdateBoard } from '../store/board.actions.js'
import { store } from '../store/store'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs

const STORAGE_KEY = 'board'
const boardChannel = new BroadcastChannel('boardChannel')
const board = {
  _id: 'b101',
  title: 'Robot dev proj',
  archivedAt: 1589983468418,
  createdAt: 1589983468418,
  isStarred: false,
  createdBy: {
    _id: 'u101',
    fullname: 'Abi Abambi',
    imgUrl: 'http://some-img',
  },
  style: { background: 'url("https://techcrunch.com/wp-content/uploads/2020/11/GettyImages-1150039017.jpg?w=1390&crop=1")' },
  labels: [
    {
      id: 'l101',
      title: 'Done',
      color: '#61bd4f',
    },
    {
      id: 'l102',
      title: 'Progress',
      color: '#61bd33',
    },
  ],
  members: [
    {
      _id: 'u101',
      fullname: 'Tal Tarablus',
      imgUrl: 'https://www.google.com',
    },
  ],
  groups: [
    {
      id: 'g101',
      title: 'Group 1',
      archivedAt: 1589983468418,
      tasks: [
        {
          id: 'c101',
          title: 'Replace logo',
        },
        {
          id: 'c102',
          title: 'Add Samples',
        },
      ],
      style: {},
    },
    {
      id: 'g102',
      title: 'Group 2',
      tasks: [
        {
          id: 'c103',
          title: 'Do that',
          archivedAt: 1589983468418,
        },
        {
          id: 'c104',
          title: 'Help me',
          status: 'in-progress',
          description: 'description',
          comments: [
            {
              id: 'ZdPnm',
              txt: 'also @yaronb please CR this',
              createdAt: 1590999817436.0,
              byMember: {
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'YEhmF',
              title: 'Checklist',
              todos: [
                {
                  id: '212jX',
                  title: 'To Do 1',
                  isDone: false,
                },
              ],
            },
          ],
          memberIds: ['u101'],
          labelIds: ['l101', 'l102'],
          createdAt: 1590999730348,
          dueDate: 16156215211,
          byMember: {
            _id: 'u101',
            username: 'Tal',
            fullname: 'Tal Tarablus',
            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
          },
          style: {
            bgColor: '#26de81',
          },
        },
      ],
      style: {},
    },
  ],
  activities: [
    {
      id: 'a101',
      txt: 'Changed Color',
      createdAt: 154514,
      byMember: {
        _id: 'u101',
        fullname: 'Abi Abambi',
        imgUrl: 'http://some-img',
      },
      task: {
        id: 'c101',
        title: 'Replace Logo',
      },
    },
  ],
}
const gBoards = [
  board,
  {
    _id: 'b102',
    title: 'Second board',
    style: { background: 'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/ef2b36f0a6fced5b25ba500c55ae3016/photo-1513185041617-8ab03f83d6c5.jpg")' },
    isStarred: false,
  },
  {
    _id: 'b103',
    title: 'Third board',
    style: {
      background: 'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/656x960/4fef784b2b03ad256991ab304fcdac2e/photo-1662715593284-14fdf66c1202.jpg")',
      backgroundColor: 'rgb(81, 152, 57)',
    },
    isStarred: true,
  },
  {
    _id: 'b104',
    title: 'Fourth board',
    style: {
      background: 'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/386209d5ee33d0c24fc340a53f16cfe4/photo-1663011109441-6948af4a0b80.jpg")',
      backgroundColor: 'rgb(81, 152, 57)',
    },
    isStarred: false,
  },
  {
    _id: 'b105',
    title: 'Fifth board',
    style: {
      background: 'url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/f7d6fa45ef3ecdf5429c9ce73175f5a2/photo-1660551772352-0855c10356b1.jpg")',
      backgroundColor: 'rgb(81, 152, 57)',
    },
    isStarred: true,
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
  addItem,
  removeItem
}

// window.cs = boardService

async function query(filterBy) {
  try {
    let boards = await storageService.query(STORAGE_KEY)
    if (!boards || !boards.length) {
      console.log('inside if')
      storageService.postMany(STORAGE_KEY, gBoards)
      boards = gBoards
    }

    return boards
  } catch (err) { }
}

function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId)
  // return axios.get(`/api/board/${boardId}`)
}

async function remove(boardId) {
  await storageService.remove(STORAGE_KEY, boardId)
  // boardChannel.postMessage(getActionRemoveBoard(boardId))
}

async function save(board) {
  var savedBoard
  if (board._id) {
    console.log('INSIDE PUT')
    savedBoard = await storageService.put(STORAGE_KEY, board)
    // boardChannel.postMessage(getActionUpdateBoard(savedBoard))
  } else {
    console.log('INSIDE POST')
    // Later, owner is set by the backend
    // board.owner = userService.getLoggedinUser()
    savedBoard = await storageService.post(STORAGE_KEY, board)
    // boardChannel.postMessage(getActionAddBoard(savedBoard))
  }
  return savedBoard
}

async function addItem(title, groupId, boardId) {
  //get from the store?
  const board = await boardService.getById(boardId)
  if (groupId) {
    const group = board.groups.find(group => group.id === groupId)
    group.tasks.push({ title, id: utilService.makeId() })
  } else {
    board.groups.push({ title, id: utilService.makeId(), tasks: [] })
  }
  return board
}

async function removeItem(groupId, taskId, boardId) {
  //get from the store?
  const board = await boardService.getById(boardId)
  if (taskId) {
    const group = board.groups.find(group => group.id === groupId)
    group.tasks = group.tasks.filter(task => task.id !== taskId)
  } else {
    board.groups = board.groups.filter(group => group.id !== groupId)
  }
  return board
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))

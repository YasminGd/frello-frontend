import { httpService } from './http.service.js'

// const STORAGE_KEY = 'board'
const BASE_URL = `board/`

export const boardService = {
  query,
  getById,
  save,
  remove,
  handleDragEnd,
  getBoardForDisplay
}

async function query(filterBy) {
  try {
    return await httpService.get(BASE_URL, filterBy)
    // let boards = await storageService.query(STORAGE_KEY)
    // if (!boards || !boards.length) {
    // storageService.postMany(STORAGE_KEY, gBoards)
    // boards = gBoards
    // }
    // return boards
  } catch (err) {
    console.log('err: Cannot get boards ', err)
  }
}

function getById(boardId) {
  return httpService.get(BASE_URL + boardId)
  // return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
  return httpService.delete(BASE_URL + boardId)
  // await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
  if (board._id) {
    console.log('INSIDE PUT')
    return httpService.put(BASE_URL + board._id, board)
    // return await storageService.put(STORAGE_KEY, board)
  } else {
    console.log('INSIDE POST')
    return httpService.post(BASE_URL, board)
    // return await storageService.post(STORAGE_KEY, board)
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
    const prevGroupIdx = newBoardGroups.findIndex((group) => group.id === source.droppableId)
    const newGroupIdx = newBoardGroups.findIndex((group) => group.id === destination.droppableId)
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


function getBoardForDisplay(board, filter) {
  let filteredBoard = structuredClone(board)
  let filterCopy = structuredClone(filter)
  if (filter.txt) {
    const regex = new RegExp(filter.txt, 'i')
    filteredBoard.groups = filteredBoard.groups.map(group => ({ ...group, tasks: group.tasks.filter(task => regex.test(task.title)) }))
  }
  if (filter.members && filter.members.length) {
    if (filter.members.includes('no-members')) {
      filterCopy.members.splice(filter.members.indexOf('no-members'), 1)
      filteredBoard.groups = filteredBoard.groups.map(group => ({ ...group, tasks: group.tasks.filter(task => !task.memberIds || !task.memberIds.length || filterCopy.members.some(memberId => task.memberIds.includes(memberId))) }))
    } else {
      filteredBoard.groups = filteredBoard.groups.map(group => ({ ...group, tasks: group.tasks.filter(task => filter.members.some(memberId => task.memberIds?.includes(memberId))) }))
    }
  }
  if (filter.labels && filter.labels.length) {
    if (filter.labels.includes('no-labels')) {
      filterCopy.labels.splice(filter.labels.indexOf('no-labels'), 1)
      filteredBoard.groups = filteredBoard.groups.map(group => ({ ...group, tasks: group.tasks.filter(task => !task.labelIds || !task.labelIds.length || filterCopy.labels.some(labelId => task.labelIds.includes(labelId))) }))
    } else {
      filteredBoard.groups = filteredBoard.groups.map(group => ({ ...group, tasks: group.tasks.filter(task => filter.labels.some(labelId => task.labelIds?.includes(labelId))) }))
    }
  }
  return filteredBoard
}

// function getBoardForDisplay(board, filter) {
//   let filteredBoard = structuredClone(board)

//   if (filter) {
//     if (filter.txt) {
//       const regex = new RegExp(filter.txt, 'i')
//       filteredBoard.groups = filteredBoard.groups.map(group => ({ ...group, tasks: group.tasks.filter(task => regex.test(task.title)) }))
//     }

//     let groupsWithNoMembers = filteredBoard.groups
//     if (filter['no-members']) groupsWithNoMembers = filteredBoard.groups.map(group => ({ ...group, tasks: group.tasks.filter(task => !task.memberIds || !task.memberIds.length) }))

//     let groupsWithMembers = filteredBoard.groups
//     if (filter.members && filter.members.length) groupsWithMembers = filteredBoard.groups.map(group => ({ ...group, tasks: group.tasks.filter(task => filter.members.some(memberId => task.memberIds?.includes(memberId))) }))

//     let groupsWithNoLabels = filteredBoard.groups
//     if (filter['no-labels']) groupsWithNoLabels = filteredBoard.groups.map(group => ({ ...group, tasks: group.tasks.filter(task => !task.labelIds || !task.labelIds.length) }))

//     let groupsWithLabels = filteredBoard.groups
//     if (filter.labels && filter.labels.length) groupsWithLabels = filteredBoard.groups.map(group => ({ ...group, tasks: group.tasks.filter(task => filter.labels.some(labelId => task.labelIds?.includes(labelId))) }))

//     filteredBoard.groups = Array.from(new Set([...groupsWithNoMembers, ...groupsWithMembers, ...groupsWithNoLabels, ...groupsWithLabels]))
//   }

//   return filteredBoard
// }
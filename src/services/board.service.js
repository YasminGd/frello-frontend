import { httpService } from './http.service.js'

// const STORAGE_KEY = 'board'
const BASE_URL = `board/`

export const boardService = {
  query,
  getById,
  save,
  remove,
  getBoardForDisplay,
  removeUserFromAllTasks,
  getNumberOfTasks
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

//!! Do not delete, important for future filter improvments
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

function removeUserFromAllTasks(groups, userId) {
  groups.forEach(group =>
    group.tasks = group.tasks.map(task => task.memberIds ?
      { ...task, memberIds: task.memberIds.filter(memberId => memberId !== userId) }
      : task))
  return groups
}

function getNumberOfTasks(groups) {
  let tasksLength = 0
  groups.forEach(group => group.tasks.forEach( task => tasksLength++))
  return tasksLength
}
import { storageService } from './async-storage.service'
import { boardService } from './board.service'
import { utilService } from './util.service'
const STORAGE_KEY = 'board'

export const taskService = {
  update,
  add,
  remove,
  addImg,
  addChecklist
  // query,
  // getById,
  // save,
  // remove,
}

async function update(board, groupId, task) {
  const groupIdx = board.groups.findIndex((group) => group.id === groupId)
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => currTask.id === task.id)
  board.groups[groupIdx].tasks.splice(taskIdx, 1, task)

  try {
    return await storageService.put(STORAGE_KEY, board)
  } catch (err) {
    console.log('cannot update task', err)
  }
}

async function add(title, groupId, board) {
  const group = board.groups.find((group) => group.id === groupId)
  group.tasks.push({ title, id: utilService.makeId() })

  try {
    return await storageService.put(STORAGE_KEY, board)
  } catch (err) {
    console.log('cannot add task', err)
  }

  return board
}

async function remove(groupId, taskId, board) {
  const group = board.groups.find((group) => group.id === groupId)
  group.tasks = group.tasks.filter((task) => task.id !== taskId)

  try {
    return await storageService.put(STORAGE_KEY, board)
  } catch (err) {
    console.log('cannot delete task', err)
  }

  return board
}

async function addImg(imgUrl, task, groupId, board) {
  const attachmentImage = {
    id: utilService.makeId(),
    createdAt: Date.now(),
    url: imgUrl,
    name: 'Attachment Image',
  }

  // Check if can be merged to updateTask function !!
  const groupIdx = board.groups.findIndex((group) => group.id === groupId)
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => currTask.id === task.id)
  board.groups[groupIdx].tasks[taskIdx].attachments.push(attachmentImage)

  try {
    return await storageService.put(STORAGE_KEY, board)
  } catch (err) {
    console.log('cannot add img', err)
  }
}

async function addChecklist(title, taskId, groupId, board) {
  const checklist = {
    id: utilService.makeId(),
    todos: [],
    title
  }

  const group = board.groups.find(group => group.id === groupId)
  const task = group.tasks.find(task => task.id === taskId)
  if (task.checklists) task.checklists.push(checklist)
  else task.checklists = [checklist]

  try {
    return await storageService.put(STORAGE_KEY, board)
  } catch (err) {
    console.log('cannot add checklist', err)
  }
}

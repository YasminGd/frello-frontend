import { activityService } from './activity.service'
import { utilService } from './util.service'

export const taskService = {
  update,
  add,
  remove,
  addImg,
  addChecklist,
  addTodo,
  cleanTasksLabelIds
}

function update(board, groupId, task, activityTxt) {
  const groupIdx = board.groups.findIndex((group) => group.id === groupId)
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => currTask.id === task.id)
  board.groups[groupIdx].tasks.splice(taskIdx, 1, task)
  if (activityTxt) board = activityService.addActivity(activityTxt, task, board, null)

  return board
}

function add(title, groupId, board) {
  const group = board.groups.find((group) => group.id === groupId)
  group.tasks.push({ title, id: utilService.makeId() })
  return activityService.addActivity(`added ${title} to ${group.title}`, null, board)
}

function remove(groupId, taskId, board) {
  const group = board.groups.find((group) => group.id === groupId)
  const task = group.tasks.find((task) => task.id === taskId)
  group.tasks = group.tasks.filter((task) => task.id !== taskId)
  return activityService.addActivity(`removed ${task.title}`, null, board)
}

function addImg(imgUrl, task, groupId, board) {
  const attachmentImage = {
    id: utilService.makeId(),
    createdAt: Date.now(),
    url: imgUrl,
    name: 'Attachment Image',
  }

  const groupIdx = board.groups.findIndex((group) => group.id === groupId)
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => currTask.id === task.id)
  if (!board.groups[groupIdx].tasks[taskIdx].attachments) board.groups[groupIdx].tasks[taskIdx].attachments = []
  board.groups[groupIdx].tasks[taskIdx].attachments.push(attachmentImage)

  const urlName = attachmentImage.url.split('/').pop()
  return activityService.addActivity(`attached ${urlName} to ${task.title}`, null, board)
}

function addChecklist(title, taskId, groupId, board) {
  const checklist = {
    id: utilService.makeId(),
    todos: [],
    title
  }

  const group = board.groups.find(group => group.id === groupId)
  const task = group.tasks.find(task => task.id === taskId)
  if (task.checklists) task.checklists.push(checklist)
  else task.checklists = [checklist]

  return activityService.addActivity(`added ${title} to ${task.title}`, task, board)
}

function addTodo(title, checkListId, groupId, taskId, board) {
  const todo = {
    id: utilService.makeId(),
    isDone: false,
    title
  }

  const group = board.groups.find(group => group.id === groupId)
  const task = group.tasks.find(task => task.id === taskId)
  const checklist = task.checklists.find(checklist => checklist.id === checkListId)
  checklist.todos.push(todo)

  return board
}

function cleanTasksLabelIds(board, labelId) {
  board.groups.forEach(group => {
    group.tasks.forEach(task => {
      if (!task.labelIds || !task.labelIds.length) return
      const labelIdIdx = task.labelIds?.findIndex(currLabelId => currLabelId === labelId)
      if (labelIdIdx === 0 || labelIdIdx) task.labelIds.splice(labelIdIdx, 1)
    })
  })
  return board
}
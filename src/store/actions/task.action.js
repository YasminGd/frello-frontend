import { taskService } from '../../services/task.service'
import { getActionUpdateBoard } from './board.action'

export function updateTask(groupId, task, activityTxt, boardMember) {
  return async (dispatch, getState) => {
    try {
      const board = getState().boardModule.board
      const savedBoard = await taskService.update(board, groupId, task, activityTxt, boardMember)
      dispatch(getActionUpdateBoard(structuredClone(savedBoard)))

    } catch (err) {
      console.log('Cannot update task', err)
    }
  }
}

export function addTask(title, groupId) {
  return async (dispatch, getState) => {
    try {
      const board = getState().boardModule.board
      const user = getState().userModule.user
      const savedBoard = await taskService.add(title, groupId, board, user)
      dispatch(getActionUpdateBoard({ ...savedBoard }))

    } catch (err) {
      console.log('Cannot add task', err)
    }
  }
}

export function addImg(imgUrl, task, groupId) {
  return async (dispatch, getState) => {
    try {
      const board = getState().boardModule.board
      const user = getState().userModule.user
      const savedBoard = await taskService.addImg(imgUrl, task, groupId, board, user)
      dispatch(getActionUpdateBoard({ ...savedBoard }))

    } catch (err) {
      console.log('Cannot add image', err)
    }
  }
}

export function addChecklist(title, taskId, groupId) {
  return async (dispatch, getState) => {
    try {
      const board = getState().boardModule.board
      const user = getState().userModule.user
      const savedBoard = await taskService.addChecklist(title, taskId, groupId, board, user)
      dispatch(getActionUpdateBoard({ ...savedBoard }))

    } catch (err) {
      console.log('Cannot add checklist', err)
    }
  }
}

export function removeTask(groupId, taskId) {
  return async (dispatch, getState) => {
    try {
      const board = getState().boardModule.board
      const savedBoard = await taskService.remove(groupId, taskId, board)
      dispatch(getActionUpdateBoard({ ...savedBoard }))

    } catch (err) {
      console.log('Cannot remove task', err)
    }
  }
}

export function addNewTodo(title, checkListId, taskId, groupId) {
  return async (dispatch, getState) => {
    try {
      const board = getState().boardModule.board
      const savedBoard = await taskService.addTodo(title, checkListId, groupId, taskId, board)
      dispatch(getActionUpdateBoard({ ...savedBoard }))

    } catch (err) {
      console.log('Cannot add todo', err)
    }
  }
}

import { boardService } from '../../services/board.service'
import { taskService } from '../../services/task.service'
import { getActionUpdateBoard } from './board.action'

export function updateTask(groupId, task, activityTxt, boardMember) {
  return async (dispatch, getState) => {
    const prevBoard = getState().boardModule.board
    const board = structuredClone(prevBoard)
    const updatedBoard = taskService.update(board, groupId, task, activityTxt, boardMember)
    dispatch(getActionUpdateBoard(updatedBoard))
    try {
      await boardService.save(updatedBoard)
    }
    catch (err) {
      dispatch(getActionUpdateBoard({ ...prevBoard }))
      console.log('Cannot update task', err)
    }
  }
}

export function addTask(title, groupId) {
  return async (dispatch, getState) => {
    const prevBoard = getState().boardModule.board
    const board = structuredClone(prevBoard)
    const updatedBoard = taskService.add(title, groupId, board)
    dispatch(getActionUpdateBoard(updatedBoard))

    try {
      await boardService.save(updatedBoard)
    }
    catch (err) {
      dispatch(getActionUpdateBoard({ ...prevBoard }))
      console.log('Cannot add task', err)
    }
  }
}

export function removeTask(groupId, taskId) {
  return async (dispatch, getState) => {
    const prevBoard = getState().boardModule.board
    const board = structuredClone(prevBoard)
    const updatedBoard = taskService.remove(groupId, taskId, board)
    dispatch(getActionUpdateBoard(updatedBoard))

    try {
      await boardService.save(updatedBoard)
    }
    catch (err) {
      dispatch(getActionUpdateBoard({ ...prevBoard }))
      console.log('Cannot remove task', err)
    }
  }
}

export function addImg(imgUrl, task, groupId) {
  return async (dispatch, getState) => {
    const prevBoard = getState().boardModule.board
    const board = structuredClone(prevBoard)
    const updatedBoard = taskService.addImg(imgUrl, task, groupId, board)
    dispatch(getActionUpdateBoard(updatedBoard))

    try {
      await boardService.save(updatedBoard)
    }
    catch (err) {
      dispatch(getActionUpdateBoard({ ...prevBoard }))
      console.log('Cannot add image', err)
    }
  }
}

export function addChecklist(title, taskId, groupId) {
  return async (dispatch, getState) => {
    const prevBoard = getState().boardModule.board
    const board = structuredClone(prevBoard)
    const updatedBoard = taskService.addChecklist(title, taskId, groupId, board)
    dispatch(getActionUpdateBoard(updatedBoard))

    try {
      await boardService.save(updatedBoard)
    }
    catch (err) {
      dispatch(getActionUpdateBoard({ ...prevBoard }))
      console.log('Cannot add checklist', err)
    }
  }
}

export function addNewTodo(title, checkListId, taskId, groupId) {
  return async (dispatch, getState) => {
    const prevBoard = getState().boardModule.board
    const board = structuredClone(prevBoard)
    const updatedBoard = taskService.addTodo(title, checkListId, groupId, taskId, board)
    dispatch(getActionUpdateBoard(updatedBoard))

    try {
      await boardService.save(updatedBoard)
    }
    catch (err) {
      dispatch(getActionUpdateBoard({ ...prevBoard }))
      console.log('Cannot add todo', err)
    }
  }
}

import { taskService } from '../../services/task.service'

export function updateTask(groupId, task) {
  return async (dispatch, getState) => {
    try {
      const board = getState().boardModule.board
      const savedBoard = await taskService.update(board, groupId, task)
      const newBoard = { ...savedBoard }
      dispatch({ type: 'UPDATE_BOARD', board: newBoard })
    } catch (err) {
      console.log('Cannot update task', err)
    }
  }
}

export function addTask(title, groupId) {
  return async (dispatch, getState) => {
    try {
      const board = getState().boardModule.board
      const savedBoard = await taskService.add(title, groupId, board)
      dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
    } catch (err) {
      console.log('Cannot add task', err)
    }
  }
}

export function addImg(imgUrl, task, groupId) {
  return async (dispatch, getState) => {
    try {
      const board = getState().boardModule.board
      const savedBoard = await taskService.addImg(imgUrl, task, groupId, board)
      const newBoard = { ...savedBoard }
      dispatch({ type: 'UPDATE_BOARD', board: newBoard })
    } catch (err) {
      console.log('Cannot add image', err)
    }
  }
}

export function removeTask(groupId, taskId) {
  return async (dispatch, getState) => {
    try {
      const board = getState().boardModule.board
      const savedBoard = await taskService.remove(groupId, taskId, board)
      const newBoard = { ...savedBoard }
      dispatch({ type: 'UPDATE_BOARD', board: newBoard })
    } catch (err) {
      console.log('Cannot remove task', err)
    }
  }
}

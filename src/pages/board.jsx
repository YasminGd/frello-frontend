import { Routes, Route } from 'react-router-dom'
import { TaskDetails } from './task-details.jsx'
import { BoardHeader } from '../cmps/board-header.jsx'
import { GroupList } from '../cmps/group-list.jsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBoard, loadBoards, updateBoard } from '../store/actions/board.action'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { addTask, removeTask } from '../store/actions/task.action'
import { addGroup, removeGroup } from '../store/actions/group.action'
import { boardService } from '../services/board.service.js'

export const Board = () => {
  const board = useSelector((state) => state.boardModule.board)
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!board) dispatch(getBoard(params.boardId))
    else {
      dispatch(loadBoards())
      dispatch({ type: 'SET_BOARD_FROM_STATE', boardId: params.boardId, })
    }
  }, [])

  const addItem = (title, groupId) => {
    if (groupId) {
      dispatch(addTask(title, groupId, board._id))
    }
    else {
      dispatch(addGroup(title))
    }
  }

  const removeItem = (groupId, taskId) => {
    if (taskId) dispatch(removeTask(groupId, taskId))
    else dispatch(removeGroup(groupId))
  }

  const onDragStart = () => { }

  //prettier-ignore
  const onDragEnd = (result) => {
    const { destination, source, type } = result

    if (!destination) return

    // if position is same as before return
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) return

    const newBoard = { ...board }
    const updatedBoard = boardService.handleDragEnd(newBoard, destination, source, type)
    dispatch(updateBoard(updatedBoard))
  }

  if (!board) return
  return (
    <section className="board">
      <BoardHeader />
      <DragDropContext
        // onDragStart={onDragStart}
        // onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <GroupList board={board} addItem={addItem} removeItem={removeItem} />
      </DragDropContext>
      <Routes>
        <Route path=":groupId/:taskId" element={<TaskDetails />} />
      </Routes>
    </section>
  )
}

import { Routes, Route } from 'react-router-dom'
import { TaskDetails } from './task-details.jsx'
import { BoardHeader } from '../cmps/board-header.jsx'
import { GroupList } from '../cmps/group-list.jsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadBoards, updateBoard } from '../store/actions/board.action'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { addTask, removeTask } from '../store/actions/task.action'
import { addGroup, removeGroup } from '../store/actions/group.action'

export const Board = () => {
  const board = useSelector((state) => state.boardModule.board)
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadBoards())
    setTimeout(
      () =>
        dispatch({
          type: 'SET_BOARD',
          boardId: params.boardId,
        }),
      300
    )
  }, [])

  const addItem = (title, groupId) => {
    if (groupId) dispatch(addTask(title, groupId, board._id))
    else dispatch(addGroup(title))
  }

  const removeItem = (groupId, taskId) => {
    if (taskId) dispatch(removeTask(groupId, taskId))
    else dispatch(removeGroup(groupId))
  }

  const onDragStart = () => {

  }

  const onDragEnd = (result) => {
    console.log('onDragEnd ~ result', result)
    // reorder out column
    const { destination, source, type, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if (type === 'group') {
      const newBoard = { ...board }
      const newBoardGroups = Array.from(newBoard.groups)
      newBoardGroups.splice(source.index, 1)
      newBoardGroups.splice(destination.index, 0, newBoard.groups[source.index])

      newBoard.groups = newBoardGroups
      dispatch(updateBoard(newBoard))

    } else if (type === 'task') {

    }
  }

  if (!board) return <h1>Loading</h1>
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

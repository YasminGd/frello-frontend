import { Routes, Route } from 'react-router-dom'
import { TaskDetails } from './task-details.jsx'
import { BoardHeader } from '../cmps/board/board-header.jsx'
import { GroupList } from '../cmps/board/group-list.jsx'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBoard, updateBoard } from '../store/actions/board.action'
import { DragDropContext } from 'react-beautiful-dnd'
import { addTask, removeTask } from '../store/actions/task.action'
import { addGroup, removeGroup } from '../store/actions/group.action'
import { boardService } from '../services/board.service.js'
import { Loader } from '../cmps/global/loader.jsx'
import { socketService } from '../services/socket.service.js'
import { unsplashService } from '../services/unsplash.service.js'

export const Board = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const board = useSelector((state) => state.boardModule.board)

  useEffect(() => {
    dispatch(getBoard(params.boardId))
    socketService.emit('join-board', params.boardId)
  }, [])

  useEffect(() => {
    socketService.on('update-board', socketUpdateBoard)
  }, [])

  const socketUpdateBoard = (updatedBoard) => {
    dispatch({ type: 'UPDATE_BOARD', board: updatedBoard })
  }

  const getBoardStyle = () => {
    if (!board) return
    if (board?.style.background) return { background: `url('${board.style.background}') center center / cover` }
    else if (board?.style.backgroundColor) return { backgroundColor: `${board.style.backgroundColor}` }
    return { backgroundColor: `pink` }
  }

  const addItem = (title, groupId) => {
    if (groupId) dispatch(addTask(title, groupId, board._id))
    else dispatch(addGroup(title))
  }

  const removeItem = (groupId, taskId) => {
    if (taskId) dispatch(removeTask(groupId, taskId))
    else dispatch(removeGroup(groupId))
  }

  const changeTitle = (title) => {
    board.title = title
    dispatch(updateBoard(board))
  }

  const changeBackground = ({background, backgroundColor, thumbnail}) => {
    board.style = {background, backgroundColor, thumbnail}
    dispatch(updateBoard(board))
  }

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

  const style = getBoardStyle()

  return (
    <section className="board" style={style}>
      {!board ? (
        <Loader />
      ) : (
        <React.Fragment>
          <BoardHeader changeBackground={changeBackground} changeTitle={changeTitle} />
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
        </React.Fragment>
      )}
    </section>
  )
}

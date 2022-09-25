import { Routes, Route } from 'react-router-dom'
import { TaskDetails } from './task-details.jsx'
import { BoardHeader } from '../cmps/board/board-header.jsx'
import { GroupList } from '../cmps/board/group-list.jsx'
import React, { useEffect, useState } from 'react'
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
import { activityService } from '../services/activity.service.js'

export const Board = () => {
  const board = useSelector((state) => state.boardModule.board)
  const [filterBy, setFilterBy] = useState({})
  const filteredBoard = boardService.getBoardForDisplay(board, filterBy)
  
  const dispatch = useDispatch()
  const params = useParams()
  // for DND placeholder
  const queryAttr = "data-rbd-drag-handle-draggable-id"
  const [placeholderProps, setPlaceholderProps] = useState({})
  // console.log('Board ~ placeholderProps', placeholderProps)

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

  const changeBackground = ({ background, backgroundColor, thumbnail }) => {
    board.style = { background, backgroundColor, thumbnail }
    dispatch(updateBoard(board))
  }

  const getDraggedDom = draggableId => {
    const domQuery = `[${queryAttr}='${draggableId}']`
    const draggedDOM = document.querySelector(domQuery)

    return draggedDOM
  }

  // Calculates the position of the dragged element placeholder
  const onDragStart = (event) => {
    const draggedDOM = getDraggedDom(event.draggableId)
    if (!draggedDOM) return
    const sourceIndex = event.source.index
    const { clientHeight, clientWidth } = draggedDOM

    var clientX =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft) +
      [...draggedDOM.parentNode.children]
        .slice(0, sourceIndex)
        .reduce((total, curr) => {
          return total + curr.clientWidth + 8
        }, 0) - draggedDOM.parentNode.scrollLeft

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode)),
      clientX

    })
  }

  // Calculates the updated position of the dragged element placeholder
  const onDragUpdate = event => {
    if (!event.destination) return
    const draggedDOM = getDraggedDom(event.draggableId)
    if (!draggedDOM) return

    const { clientHeight, clientWidth } = draggedDOM
    const destinationIndex = event.destination.index
    const sourceIndex = event.source.index

    const childrenArray = [...draggedDOM.parentNode.children]
    const movedItem = childrenArray[sourceIndex]
    childrenArray.splice(sourceIndex, 1)

    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1)
    ]

    var clientX =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft) +
      updatedArray
        .slice(0, destinationIndex)
        .reduce((total, curr) => {
          return total + curr.clientWidth + 8
        }, 0) - draggedDOM.parentNode.scrollLeft

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode)),
      clientX

    })
  }

  //prettier-ignore
  const onDragEnd = (result) => {
    const { destination, source, type } = result
    console.log(destination, source , type);

    if (!destination) return
    setPlaceholderProps({})
    const draggedDOM = getDraggedDom(result.draggableId)

    // if position is same as before return
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) return

    const newBoard = { ...board }
    let updatedBoard = boardService.handleDragEnd(newBoard, destination, source, type)
    if(type === 'task' && (destination.droppableId !== source.droppableId)) {
      const sourceGroup = updatedBoard.groups.find(group => group.id === source.droppableId)
      const destinationGroup = updatedBoard.groups.find(group => group.id === destination.droppableId)
      const task = destinationGroup.tasks[destination.index]
      updatedBoard = activityService.addActivity(`moved ${task.title} from ${sourceGroup.title} to ${destinationGroup.title}`, task, updatedBoard)
    }
    // const updatedBoardWithActivity = activityService.addActivity(`moved ${} from ${} to ${}`)
    dispatch(updateBoard(updatedBoard))
    // draggedDOM.parentElement.style.position = 'static'
  }

  const updateFilter = (filter) => {
    setFilterBy(filter)
    console.log(filter);
  }

  const style = getBoardStyle()

  return (
    <section className="board" style={style}>
      {!board ? (
        <Loader />
      ) : (
        <React.Fragment>
          <BoardHeader changeBackground={changeBackground} changeTitle={changeTitle} updateFilter={updateFilter} filterBy={filterBy}/>
          <DragDropContext
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
          >
            <GroupList placeholderProps={placeholderProps} board={filteredBoard} addItem={addItem} removeItem={removeItem} />
          </DragDropContext>
          <Routes>
            <Route path=":groupId/:taskId" element={<TaskDetails />} />
          </Routes>
        </React.Fragment>
      )}
    </section>
  )
}

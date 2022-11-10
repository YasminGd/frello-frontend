import { Routes, Route } from 'react-router-dom'
import { TaskDetails } from './task-details.jsx'
import { BoardHeader } from '../cmps/board/board-header.jsx'
import { GroupList } from '../cmps/board/group/group-list.jsx'
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
import { activityService } from '../services/activity.service.js'
import { Dashboard } from '../cmps/board/dashboard.jsx'
import { utilService } from '../services/util.service.js'
import { Fragment } from 'react'
import { QuickEdit } from 'cmps/board/quick-edit/quick-edit.jsx'

export const Board = () => {
    const board = useSelector((state) => state.boardModule.board)
    const [filterBy, setFilterBy] = useState({})
    const [quickEdit, setQuickEdit] = useState(null)
    const filteredBoard = boardService.getBoardForDisplay(board, filterBy)

    const dispatch = useDispatch()
    const params = useParams()
    // for DND placeholder
    const queryAttr = 'data-rbd-drag-handle-draggable-id'
    const [placeholderProps, setPlaceholderProps] = useState({})
    const isBackgroundDark = utilService.isBackgroundDark(
        board?.style?.backgroundColor
    )

    useEffect(() => {
        // TODO: If line 38 commented, change between boards wont render title
        if (board) dispatch({ type: 'SET_BOARD', boardId: null })
        dispatch(getBoard(params.boardId))
        socketService.emit('join-board', params.boardId)
    }, [params.boardId])

    useEffect(() => {
        socketService.on('update-board', socketUpdateBoard)
    }, [])

    function socketUpdateBoard(updatedBoard) {
        dispatch({ type: 'UPDATE_BOARD', board: updatedBoard })
    }

    const getBoardStyle = () => {
        if (!board) return
        if (board?.style.background)
            return {
                background: `url('${board.style.background}') center center / cover`,
            }
        else if (board?.style.backgroundColor)
            return { backgroundColor: `${board.style.backgroundColor}` }
        // In case there are no background image and color
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

    const getDraggedDom = (draggableId) => {
        const domQuery = `[${queryAttr}='${draggableId}']`
        const draggedDOM = document.querySelector(domQuery)

        return draggedDOM
    }

    // Calculates the position of the dragged element placeholder
    const onDragStart = (event) => {
        const draggedDOM = getDraggedDom(event.draggableId)
        if (!draggedDOM) return
        const placeholderProps = utilService.handleDragStart(event, draggedDOM)
        setPlaceholderProps(placeholderProps)
    }

    // Calculates the updated position of the dragged element placeholder
    const onDragUpdate = (event) => {
        if (!event.destination) return
        const draggedDOM = getDraggedDom(event.draggableId)
        if (!draggedDOM) return
        const placeholderProps = utilService.handleDragUpdate(event, draggedDOM)
        setPlaceholderProps(placeholderProps)
    }

    //prettier-ignore
    const onDragEnd = (result) => {
        const { destination, source, type } = result

        if (!destination) return
        setPlaceholderProps({})

        // if position is same as before return
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) return

        const newBoard = { ...board }
        let updatedBoard = utilService.handleDragEnd(newBoard, destination, source, type)
        if (type === 'task' && (destination.droppableId !== source.droppableId)) {
            const sourceGroup = updatedBoard.groups.find(group => group.id === source.droppableId)
            const destinationGroup = updatedBoard.groups.find(group => group.id === destination.droppableId)
            const task = destinationGroup.tasks[destination.index]
            updatedBoard = activityService.addActivity(`moved ${task.title} from ${sourceGroup.title} to ${destinationGroup.title}`, task, updatedBoard)
        }
        dispatch(updateBoard(updatedBoard))
    }

    const updateFilter = (filter) => {
        setFilterBy({ ...filter })
    }

    const style = getBoardStyle()

    return (
        <Fragment>
            <section className="board" style={style}>
                {!board ? (
                    <Loader />
                ) : (
                    <React.Fragment>
                        <BoardHeader
                            changeBackground={changeBackground}
                            changeTitle={changeTitle}
                            updateFilter={updateFilter}
                            filterBy={filterBy}
                            isBackgroundDark={isBackgroundDark}
                        />
                        <DragDropContext
                            onDragStart={onDragStart}
                            onDragUpdate={onDragUpdate}
                            onDragEnd={onDragEnd}
                        >
                            <GroupList
                                placeholderProps={placeholderProps}
                                board={filteredBoard}
                                addItem={addItem}
                                removeItem={removeItem}
                                quickEdit={quickEdit}
                                setQuickEdit={setQuickEdit}
                                isBackgroundDark={isBackgroundDark}
                            />
                        </DragDropContext>
                        <Routes>
                            <Route path=":groupId/:taskId" element={<TaskDetails />} />
                            <Route path="dashboard" element={<Dashboard />} />
                        </Routes>
                    </React.Fragment>
                )}
            </section>
            {quickEdit && (
                <QuickEdit
                    pos={quickEdit.pos}
                    task={quickEdit.task}
                    groupId={quickEdit.groupId}
                    setQuickEdit={setQuickEdit}
                />
            )}
        </Fragment>
    )
}

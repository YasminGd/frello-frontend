import { Routes, Route } from 'react-router-dom'
import { TaskDetails } from './task-details.jsx'
import { BoardHeader } from '../cmps/board-header.jsx'
import { GroupList } from '../cmps/group-list.jsx'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { loadBoards, addItemToBoard } from '../store/actions/board.action'


export const Board = () => {
  const board = useSelector(state => state.boardModule.board)
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadBoards())
    setTimeout(() => dispatch({
      type: 'SET_BOARD',
      boardId: params.boardId
    }), 300)

  }, [])

  const addItem = (title, groupId) => {
    dispatch(addItemToBoard(title, groupId, board._id))
  }

  // const board = useSelector(state => state.boardModule.boards.filter(board => board._id === ))

  if (!board) return <h1>Loading</h1>
  return (
    <section className="board">
      <BoardHeader />
      <GroupList board={board} addItem={addItem} />
      <Routes>
        <Route path="task/:id" element={<TaskDetails />} />
      </Routes>
    </section>
  )
}

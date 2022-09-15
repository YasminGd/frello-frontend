import { Routes, Route } from 'react-router-dom'
import { TaskDetails } from './task-details.jsx'
import { BoardHeader } from '../cmps/board-header.jsx'

export const Board = () => {
  return (
    <section className="board">
      <BoardHeader />
      <Routes>
        <Route path="task/:id" element={<TaskDetails />} />
      </Routes>
    </section>
  )
}

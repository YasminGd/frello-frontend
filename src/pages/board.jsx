import { Routes, Route } from 'react-router-dom'
import { TaskDetails } from './task-details.jsx'

export const Board = () => {
  return (
    <section className="board-app">
      <h1>Board App</h1>
      <Routes>
        <Route path="task/:id" element={<TaskDetails />} />
      </Routes>
    </section>
  )
}

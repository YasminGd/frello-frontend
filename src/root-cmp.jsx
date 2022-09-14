import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/app-header.jsx'
import { Home } from './pages/home'
import { Workspace } from './pages/workspace'
import './assets/styles/main.scss'
import { Board } from './pages/board'

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main className="container">
        <Routes>
          {/* <Route path="user/:id" element={<UserDetails />} /> */}
          <Route path="" element={<Home />} />
          <Route path="workspace" element={<Workspace />} />
          <Route path="board/*" element={<Board />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

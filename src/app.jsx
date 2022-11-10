import { Route, Routes } from 'react-router-dom'
import { AppHeader } from './components/global/app-header.jsx'
import { Home } from './views/home'
import { Workspace } from './views/workspace'
import 'assets/styles/main.scss'
import { Board } from './views/board'
import { LoginSignup } from './views/login-signup.jsx'

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main className="container">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="user/:status" element={<LoginSignup />} />
          <Route path="workspace" element={<Workspace />} />
          <Route path="board/:boardId/*" element={<Board />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

import {Home} from './pages/home.jsx'
import { Workspace } from './pages/workspace.jsx'
import { BoardApp } from './pages/board-app.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <Home />,
        label: 'Home',
    },
    {
        path: 'workspace',
        component: <Workspace />,
        label: 'Workspace'
    },
    {
        path: 'board-app',
        component: <BoardApp />,
        label: 'Board app'
    }
]

export default routes
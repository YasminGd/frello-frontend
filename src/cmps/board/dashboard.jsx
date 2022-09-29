import { IoCloseOutline } from "react-icons/io5"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { dashboardService } from "../../services/dashboard.service"
ChartJS.register(ArcElement, Tooltip, Legend)

export const Dashboard = () => {
    const navigate = useNavigate()
    const board = useSelector(state => state.boardModule.board)
    const tasksByStatusData = dashboardService.getTasksByStatus(board.groups)

    return (
        <section className="dashboard">
            <button className='btn-close' onClick={() => { navigate(-1) }}><IoCloseOutline /></button>
            <h1>{board.title}</h1>

            <div className="charts-container">
                <div className="task-per-status">
                    <h3>Tasks by status</h3>
                    <Doughnut data={tasksByStatusData} />
                </div>
            </div>
        </section>
    )
}
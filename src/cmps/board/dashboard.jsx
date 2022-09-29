import { IoCloseOutline } from "react-icons/io5"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Doughnut, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, BarElement, LinearScale, CategoryScale } from 'chart.js'
import { dashboardService } from "../../services/dashboard.service"
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export const Dashboard = () => {
    const navigate = useNavigate()
    const board = useSelector(state => state.boardModule.board)
    const tasksByStatusData = dashboardService.getTasksByStatus(board.groups)
    const tasksByMember = dashboardService.getTasksByMember(board.groups, board.members)

    const options = {
        responsive: true,
        plugins: {
            legend: false,
            title: {
                display: true,
            }
        }
    }

    return (
        <section className="dashboard">
            <button className='btn-close' onClick={() => { navigate(-1) }}><IoCloseOutline /></button>
            <h1>{board.title}</h1>

            <div className="charts-container">
                <div className="task-by-status">
                    <h3>Tasks by status</h3>
                    <Doughnut data={tasksByStatusData} />
                </div>
                <div className="task-per-member">
                    <h3>Tasks per member</h3>
                    <Bar options={options} data={tasksByMember} />
                </div>
            </div>
        </section>
    )
}
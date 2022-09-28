import { IoCloseOutline } from "react-icons/io5"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const navigate = useNavigate()
    const board = useSelector(state => state.boardModule.board)

    return (
        <section className="dashboard">
            <button className='btn-close' onClick={() => { navigate(-1) }}><IoCloseOutline /></button>
            <h1>{board.title}</h1>
        </section>
    )
}
import { useState } from "react"
import { IoChevronBack, IoCloseOutline } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { updateBoard } from "../../store/actions/board.action"
import { MassageList } from "./massage-list"

export const Chat = ({ setIsChatOpen }) => {
    const user = useSelector(state => state.userModule.user)
    let board = useSelector(state => state.boardModule.board)
    const [massage, setMassage] = useState("")
    const dispatch = useDispatch()

    const onAddMassage = ev => {
        ev.preventDefault()
        const massageForBoard = {
            user,
            msg: massage,
        }
        if (board.massages)
            board = { ...board, massages: [...board.massages, massageForBoard] }
        else board = { ...board, massages: [massageForBoard] }
        dispatch(updateBoard(board))
        setMassage("")
        const elMassages = document.getElementsByClassName("massage-list")[0]
        setTimeout(() => (elMassages.scrollTop = elMassages.scrollHeight), 100)
    }

    return (
        <section className="chat">
            <header>
                <p>{board.title}</p>
                <IoCloseOutline onClick={() => setIsChatOpen(false)} />
            </header>
            <MassageList massages={board.massages} />
            <section className="user">
                <div className="img-container">
                    <img src={user.imgUrl} />
                </div>
                <form onSubmit={onAddMassage}>
                    <input
                        value={massage}
                        onChange={({ target }) => setMassage(target.value)}
                    />
                </form>
            </section>
        </section>
    )
}

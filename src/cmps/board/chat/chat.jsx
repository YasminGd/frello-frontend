import { useState } from "react"
import { IoCloseOutline } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { updateBoard } from "../../../store/actions/board.action"
import { MessageList } from "./message-list"

export const Chat = ({ setIsChatOpen }) => {
    const user = useSelector(state => state.userModule.user)
    let board = useSelector(state => state.boardModule.board)
    console.log('Chat ~ board', board)
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()

    const onAddMessage = ev => {
        ev.preventDefault()
        const messageForBoard = {
            user,
            msg: message,
        }
        if (board.messages)
            board = { ...board, messages: [...board.messages, messageForBoard] }
        else board = { ...board, messages: [messageForBoard] }
        dispatch(updateBoard(board))
        setMessage("")
        const elMessages = document.getElementsByClassName("message-list")[0]
        setTimeout(() => (elMessages.scrollTop = elMessages.scrollHeight), 100)
    }

    return (
        <section className="chat">
            <header>
                <p>{board.title}</p>
                <IoCloseOutline onClick={() => setIsChatOpen(false)} />
            </header>
            <MessageList messages={board.messages} />
            <section className="user">
                <div className="img-container">
                    <img src={user.imgUrl} alt="user" />
                </div>
                <form onSubmit={onAddMessage}>
                    <input
                        value={message}
                        onChange={({ target }) => setMessage(target.value)}
                    />
                </form>
            </section>
        </section>
    )
}

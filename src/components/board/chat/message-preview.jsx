import { useSelector } from "react-redux"
import { utilService } from "../../../services/util.service"

export const MessagePreview = ({ message }) => {
    const user = useSelector(state => state.userModule.user)
    const board = useSelector(state => state.boardModule.board)

    const getBackgroundColor = () => {
        const style = {}
        if (user.fullname === message.user.fullname) {
            style.backgroundColor = board.style.backgroundColor
            if (utilService.isBackgroundDark(board.style.backgroundColor)) style.color = `#ffffff`
        }
        return style
    }

    return <section className="message-preview">
        <div className="img-container">
            <img src={message.user.imgUrl} alt="user" />
        </div>
        <div className={`body`} style={getBackgroundColor()}>
            <p className="name">{user.fullname === message.user.fullname ? 'Me' : message.user.fullname}</p>
            <p className="msg">{message.msg}</p>
        </div>
    </section>
}
import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"

export const MassagePreview = ({ massage }) => {
    const user = useSelector(state => state.userModule.user)
    const board = useSelector(state => state.boardModule.board)

    const getBackgroundColor = () => {
        const style ={}
        if(user.fullname === massage.user.fullname) {
            style.backgroundColor = board.style.backgroundColor
            if(utilService.isBackgroundDark(board.style.backgroundColor)) style.color = `#ffffff`
        }
        return style
    }

    return <section className="massage-preview">
        <div className="img-container">
                <img src={massage.user.imgUrl} />
            </div>
            <div className={`body`} style={getBackgroundColor()}>
                <p className="name">{user.fullname === massage.user.fullname ? 'Me' : massage.user.fullname}</p>
                <p className="msg">{massage.msg}</p>
            </div>
    </section>
}
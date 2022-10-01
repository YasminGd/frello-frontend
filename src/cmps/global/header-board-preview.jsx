import { Link } from "react-router-dom"

export const HeaderBoardPreview = ({ board, setActionModal }) => {
    const getBackgroundStyle = () => {
        return board.style.thumbnail ? {backgroundImage: `url(${board.style.thumbnail})`} : {backgroundColor: board.style.backgroundColor}
    }
    return <Link key={board._id} to={`/board/${board._id}`} onClick={() => setActionModal(null)}>
        <section className="header-board-preview">
            <div className={`img-container`} style={getBackgroundStyle()}>
            </div>
            <div className="description">
                <h2>{board.title}</h2>
            </div>
        </section>
    </Link>
}
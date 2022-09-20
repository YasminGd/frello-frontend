import { Link } from 'react-router-dom'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export const BoardPreview = ({ board, onToggleStarred }) => {
  return (
    <Link key={board._id} to={`/board/${board._id}`}>
      <section
        className="board-preview"
        style={{
          background: `${board.style?.background} center center / cover`,
          backgroundColor: `${board.style?.backgroundColor}`,
        }}
      >
        <div className="board-preview-details">
          <h3>{board.title}</h3>
          <div className="board-star">
            {board.isStarred ? (
              <AiFillStar className="starred" onClick={(ev) => onToggleStarred(ev, board._id)} />
            ) : (
              <AiOutlineStar onClick={(ev) => onToggleStarred(ev, board._id)} />
            )}
          </div>
        </div>
      </section>
    </Link>
  )
}

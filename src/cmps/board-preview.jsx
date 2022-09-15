import { Link } from 'react-router-dom'

export const BoardPreview = ({ board }) => {
  console.log(`board:`, board)
  return (
    <Link key={board._id} to={`/board/${board._id}`}>
      <section className="board-preview" style={{ background: `${board.style.background}`, backgroundColor: `${board.style.backgroundColor}` }}>
        <div className="board-preview-details">
          <h3>{board.title}</h3>
        </div>
      </section>
    </Link>
  )
}

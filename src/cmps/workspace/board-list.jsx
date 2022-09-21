import { BoardPreview } from "./board-preview"

export const BoardList = ({ boards, onToggleStarred }) => {
  return (
    <section className="board-list">
      {boards.map((board) => (
        <BoardPreview key={board._id} board={board} onToggleStarred={onToggleStarred} />
      ))}
    </section>
  )
}

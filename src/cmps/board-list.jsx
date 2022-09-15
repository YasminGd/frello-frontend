import { BoardPreview } from './board-preview'

export const BoardList = ({ boards }) => {
  return (
    <section className="board-list">
      {boards.map((board) => (
        <BoardPreview key={board._id} board={board} />
      ))}
    </section>
  )
}

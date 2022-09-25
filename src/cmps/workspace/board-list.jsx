import { useRef } from 'react'
import { BoardPreview } from './board-preview'

export const BoardList = ({ boards, onToggleStarred, newBoard, onOpenActionModal }) => {
  const btnAddBoardRef = useRef()

  return (
    <section className="board-list">
      {newBoard && (
        <div
          ref={btnAddBoardRef}
          onClick={() => {
            onOpenActionModal('Create board', btnAddBoardRef)
          }}
          className="new-board"
        >
          Create new board
        </div>
      )}
      {boards.map((board) => (
        <BoardPreview key={board._id} board={board} onToggleStarred={onToggleStarred} />
      ))}
    </section>
  )
}

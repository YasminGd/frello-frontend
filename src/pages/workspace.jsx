import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards, updateBoard, setBoard } from '../store/actions/board.action'
import { BoardList } from '../cmps/board-list'
import { AiOutlineStar, AiOutlineClockCircle } from 'react-icons/ai'

export const Workspace = () => {
  const boards = useSelector((state) => state.boardModule.boards)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadBoards())
    dispatch(dispatch({
      type: 'SET_BOARD',
      boardId: null,
    }))
  }, [])

  const onToggleStarred = (ev, boardId) => {
    ev.preventDefault()
    const board = boards.find((board) => board._id === boardId)
    board.isStarred = !board.isStarred
    dispatch(updateBoard(board))
  }

  const getStarredBoards = () => {
    return boards.filter((board) => board.isStarred)
  }

  return (
    <section className="workspace">
      <section className="all-boards">
        <section className="starred-boards">
          <div className="title">
            <AiOutlineStar className="title-icon" />
            <h3>Starred boards</h3>
          </div>
          <div className="boards-container">
            <BoardList boards={getStarredBoards()} onToggleStarred={onToggleStarred} />
          </div>
        </section>
        <section className="recent-boards">
          <div className="title">
            <AiOutlineClockCircle className="title-icon" />
            <h3>Recently viewed</h3>
          </div>
          <div className="boards-container">
            <BoardList boards={boards} onToggleStarred={onToggleStarred} />
          </div>
        </section>
      </section>
    </section>
  )
}

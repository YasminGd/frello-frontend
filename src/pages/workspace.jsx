import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards } from '../store/actions/board.action'
import { BoardList } from '../cmps/board-list'

export const Workspace = () => {
  const boards = useSelector((state) => state.boardModule.boards)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadBoards())
  })

  return (
    <section className="workspace">
      <BoardList boards={boards} />
    </section>
  )
}

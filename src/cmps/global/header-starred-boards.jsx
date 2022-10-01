import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { loadBoards } from '../../store/actions/board.action'
import { HeaderBoardList } from './header-board-list'
import { Loader } from './loader'

export const HeaderStarredBoards = ({ setActionModal }) => {
  const boards = useSelector((state) => state.boardModule.boards)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!boards || !boards.length) dispatch(loadBoards())
  }, [])

  const getStarredBoards = () => {
    return boards.filter((board) => board.isStarred)
  }

  if (!boards || !boards.length)
    return (
      <section className="loader-container">
        <Loader />
      </section>
    )
  return (
    <section className="header-boards">
      <HeaderBoardList boards={getStarredBoards()} setActionModal={setActionModal} />
    </section>
  )
}

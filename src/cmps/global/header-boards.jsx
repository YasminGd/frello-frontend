import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { loadBoards } from "../../store/actions/board.action"
import { HeaderBoardList } from "./header-board-list"
import { Loader } from "./loader"

export const HeaderBoards = ({ setActionModal }) => {
    const boards = useSelector(state => state.boardModule.boards)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!boards || !boards.length) dispatch(loadBoards())
    }, [])

    if (!boards || !boards.length) return <Loader />
    return <section className="header-boards">
        <p>Your Boards</p>
        <HeaderBoardList boards={boards} setActionModal={setActionModal}/>
    </section>
}
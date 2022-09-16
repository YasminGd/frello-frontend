import { useRef } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { updateBoard } from "../store/actions/board.action"

export const BoardHeader = () => {
    const board = useSelector(state => state.boardModule.board)
    const [boardTitle, setBoardTitle] = useState(board.title)

    const dispatch = useDispatch()

    const handleChange = ({ target }) => {
        const { value } = target
        setBoardTitle(value)
    }

    const setTitle = () => {
        board.title = boardTitle
        dispatch(updateBoard(board))
    }


    return <section className="board-header">
        <textarea value={boardTitle} onChange={handleChange} onBlur={setTitle}></textarea>
    </section>
}
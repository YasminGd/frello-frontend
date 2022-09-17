import { useRef } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { updateBoard } from '../store/actions/board.action'
import { BsThreeDots } from 'react-icons/bs'
import { BoardSideMenu } from './board-side-menu'
import { ActionModal } from './action-modal'

export const BoardHeader = () => {
    const board = useSelector((state) => state.boardModule.board)
    const [boardTitle, setBoardTitle] = useState(board.title)
    const [width, setWidth] = useState(displayTextWidth(boardTitle))
    const [sideMenuWidth, setSideMenuWidth] = useState({ width: '0px' })

    const dispatch = useDispatch()

    const handleChange = ({ target }) => {
        const { value } = target
        setBoardTitle(value)
    }

    const resizeWidth = (ev) => {
        setWidth(displayTextWidth(boardTitle))
    }

    const setTitle = () => {
        board.title = boardTitle
        dispatch(updateBoard(board))
    }

    function displayTextWidth(
        text,
        font = `700 18px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif`
    ) {
        const canvas =
            displayTextWidth.canvas ||
            (displayTextWidth.canvas = document.createElement('canvas'))
        const context = canvas.getContext('2d')
        context.font = font
        const metrics = context.measureText(text)
        const metricsObj = { width: `${metrics.width + 20}px` }
        return metricsObj
    }

    const renderSideMenu = () => {
        setSideMenuWidth(sideMenuWidth.width === '0px' ? { width: '339px' } : { width: '0px' })
    }

    return (
        <section className="board-header">
            <section className="left">
                <input
                    value={boardTitle}
                    onChange={handleChange}
                    onBlur={setTitle}
                    onKeyDown={resizeWidth}
                    onKeyUp={resizeWidth}
                    style={width}
                    spellCheck="false"
                ></input>
            </section>
            <section className="right">
                <button onClick={renderSideMenu}>
                    <BsThreeDots />
                    Show menu
                </button>
            </section>
            <BoardSideMenu width={sideMenuWidth} onCloseSideMenu={renderSideMenu} />
        </section>
    )
}

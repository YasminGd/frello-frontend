import { useRef } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { updateBoard } from '../store/actions/board.action'
import { BsThreeDots } from 'react-icons/bs'

export const BoardHeader = () => {
  const board = useSelector((state) => state.boardModule.board)
  const [boardTitle, setBoardTitle] = useState(board.title)
  const [width, setWidth] = useState(displayTextWidth(boardTitle))

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
        <button>
          <BsThreeDots />
          Show menu
        </button>
      </section>
    </section>
  )
}

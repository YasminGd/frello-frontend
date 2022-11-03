import { useRef } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { updateBoard } from '../../store/actions/board.action'
import { BsThreeDots, BsPersonPlus, BsFilter, BsGraphUp } from 'react-icons/bs'
import { BoardSideMenu } from './side-menu/board-side-menu'
import { TiStarOutline, TiStarFullOutline } from 'react-icons/ti'
import { ActionModal } from '../global/action-modal'
import { utilService } from '../../services/util.service'
import { useLocation, useNavigate } from 'react-router-dom'

export const BoardHeader = ({ changeBackground, changeTitle, updateFilter, filterBy, isBackgroundDark }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const board = useSelector((state) => state.boardModule.board)
  const [boardTitle, setBoardTitle] = useState(board.title)
  const [width, setWidth] = useState(displayTextWidth(boardTitle))
  const [actionModal, setActionModal] = useState(null)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState('')
  const btnAddUserRef = useRef()
  const filterRef = useRef()

  const dispatch = useDispatch()

  const handleChange = ({ target }) => {
    const { value } = target
    setBoardTitle(value)
  }

  const resizeWidth = (ev) => {
    setWidth(displayTextWidth(boardTitle))
  }

  function displayTextWidth(
    text,
    font = `700 18px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif`
  ) {
    const canvas = displayTextWidth.canvas || (displayTextWidth.canvas = document.createElement('canvas'))
    const context = canvas.getContext('2d')
    context.font = font
    const metrics = context.measureText(text)
    const metricsObj = { width: `${metrics.width + 20}px` }
    return metricsObj
  }

  const renderSideMenu = () => {
    setIsSideMenuOpen(isSideMenuOpen === '' ? 'open' : '')
  }

  const toggleStarBoard = () => {
    board.isStarred = !board.isStarred
    dispatch(updateBoard(board))
  }

  const onOpenActionModal = (type, ref) => {
    if (actionModal?.type === type) return setActionModal(null)
    const pos = utilService.getModalPosition(type, ref)
    setActionModal({ type, pos })
  }

  const onOpenDashboard = (ev) => {
    ev.stopPropagation()
    if (location.pathname.includes('dashboard')) navigate(-1)
    else navigate(`${location.pathname}/dashboard`)
  }

  const themeStyle = isBackgroundDark ? '' : 'dark'

  return (
    <section className="board-header">
      <section className="left">
        <input
          value={boardTitle}
          onChange={handleChange}
          onBlur={() => changeTitle(boardTitle)}
          onKeyDown={resizeWidth}
          onKeyUp={resizeWidth}
          style={width}
          spellCheck="false"
          className={themeStyle}
        ></input>
        <span className={`star-container ${themeStyle}`} onClick={toggleStarBoard}>
          {!board.isStarred && <TiStarOutline />}
          {board.isStarred && <TiStarFullOutline className="yellow-star" />}
        </span>
        <span className={`divider ${themeStyle}`}></span>
        {board.members && board?.members?.length !== 0 && (
          <div className="board-members">
            {board.members.map((member, index) => (
              <div className="member-img" key={member._id} style={{ zIndex: `${board.members.length - index}` }}>
                <img src={member.imgUrl} alt="" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => {
            onOpenActionModal('Users', btnAddUserRef)
          }}
          ref={btnAddUserRef}
          className={`btn-share ${themeStyle}`}
        >
          <BsPersonPlus className="person-icon" />
          <span>Share</span>
        </button>
      </section>
      <section className={`right ${isSideMenuOpen}`}>
        <button onClick={onOpenDashboard} className={themeStyle}>
          <BsGraphUp />
          Dashboard
        </button>
        <div className={`divider ${themeStyle}`}></div>
        <button
          ref={filterRef}
          onClick={() => {
            onOpenActionModal('Filter', filterRef)
          }}
          className={`filter ${themeStyle}`}
        >
          <BsFilter />
          Filter
        </button>
        <div className={`divider ${themeStyle}`}></div>
        {!isSideMenuOpen && (
          <button onClick={renderSideMenu} className={themeStyle}>
            <BsThreeDots />
            Show menu
          </button>
        )}
      </section>
      <BoardSideMenu isOpen={isSideMenuOpen} onCloseSideMenu={renderSideMenu} changeBackground={changeBackground} />
      {actionModal && (
        <ActionModal
          setActionModal={setActionModal}
          data={actionModal}
          updateFilter={updateFilter}
          filterBy={filterBy}
        />
      )}
    </section>
  )
}

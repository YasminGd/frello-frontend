import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { SiTrello } from 'react-icons/si'
import { useSelector } from 'react-redux'
import { ActionModal } from './action-modal'
import { useEffect, useRef, useState } from 'react'
import { utilService } from '../../services/util.service'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Fragment } from 'react'

export const AppHeader = () => {
  const [headerStatus, setHeaderStatus] = useState()
  const board = useSelector((state) => state.boardModule.board)
  const user = useSelector((state) => state.userModule.user)
  const [actionModal, setActionModal] = useState(null)
  const location = useLocation()
  const userImgRef = useRef()
  const boardsRef = useRef()
  const starredRef = useRef()

  useEffect(() => {
    let status
    if (location.pathname === '/') status = 'home'
    else if (location.pathname === '/user/login' || location.pathname === '/user/signup')
      status = 'auth'
    else if (location.pathname.includes('/board')) status = 'board'
    setHeaderStatus(status)
  }, [location.pathname])

  // TODO: add state for header status
  const getHeaderStyleClass = () => {
    let styleClass

    switch (headerStatus) {
      case 'home':
        styleClass = 'home-header fixed'
        break;

      case 'auth':
        styleClass = 'login-header'
        break;

      default:
        break;
    }
    return styleClass
  }

  const getStyleColor = () => {
    const backgroundColor = board?.style?.backgroundColor
    return backgroundColor ? { backgroundColor } : {}
  }

  const onOpenActionModal = (type, ref) => {
    if (actionModal?.type === type) return setActionModal(null)
    const pos = utilService.getModalPosition(type, ref)
    setActionModal({ type, pos })
  }

  const styleClass = getHeaderStyleClass()
  const isUserImgDisplayed = user?.fullname !== 'Guest'

  const fontColor = !utilService.isBackgroundDark(board?.style?.backgroundColor) ? 'dark' : ''

  return (
    <section className={`app-header ${styleClass}`} style={getStyleColor()}>
      <section className="left">
        <Link to="/workspace">
          <div className={`main-logo ${fontColor}`}>
            <SiTrello />
            <h1>Frello</h1>
          </div>
        </Link>
        {(headerStatus === 'board') && (
          <Fragment>
            <div
              className={`boards ${fontColor}`}
              onClick={() => onOpenActionModal('Boards', boardsRef)}
              ref={boardsRef}
            >
              <p>Boards</p>
              <div className="svg-container">
                <MdKeyboardArrowDown />
              </div>
            </div>
            <div
              className={`boards ${fontColor}`}
              onClick={() => onOpenActionModal('Starred boards', starredRef)}
              ref={starredRef}
            >
              <p>Starred</p>
              <div className="svg-container">
                <MdKeyboardArrowDown />
              </div>
            </div>
          </Fragment>
        )}
      </section>

      <nav className={`home-nav ${styleClass ? '' : 'none'}`}>
        <Link className="login" to={'user/login'}>
          Log in
        </Link>
        <Link className="signup" to={'user/signup'}>
          Get Frello for free
        </Link>
      </nav>
      {/*  */}
      {!styleClass && user && isUserImgDisplayed && (
        <div className="user-img">
          <img
            referrerPolicy="no-referrer"
            src={user.imgUrl}
            alt=""
            ref={userImgRef}
            onClick={() => {
              onOpenActionModal('Account', userImgRef)
            }}
          />
        </div>
      )}
      {actionModal && (
        <ActionModal setActionModal={setActionModal} data={actionModal} />
      )}
    </section>
  )
}

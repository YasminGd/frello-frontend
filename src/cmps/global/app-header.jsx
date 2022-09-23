import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { SiTrello } from 'react-icons/si'
import { useSelector } from 'react-redux'
const logo = require('../../assets/img/logo-frello.png')

export const AppHeader = () => {
  const board = useSelector((state) => state.boardModule.board)
  const user = useSelector((state) => state.userModule.user)
  console.log(user);
  const location = useLocation()

  const getStyleClass = () => {
    let styleClass
    if (location.pathname === '/') styleClass = 'home-header fixed'
    else if (location.pathname === '/user/login' || location.pathname === '/user/signup') styleClass = 'login-header'

    return styleClass
  }

  const getStyleColor = () => {
    return board?.style?.backgroundColor ? {backgroundColor: board.style.backgroundColor} : {}
  }

  const styleClass = getStyleClass()

  return (
    <section className={`app-header ${styleClass}`} style={getStyleColor()}>
      <Link to="/workspace">
        <div className="main-logo">
          <SiTrello />
          {/* <img src={logo} alt="" /> */}
          <h1>Frello</h1>
        </div>
      </Link>
      <nav className={`home-nav ${styleClass ? '' : 'none'}`}>
        <Link className="login" to={'user/login'}>
          Log in
        </Link>
        <Link className="signup" to={'user/signup'}>
          Get Frello for free
        </Link>
      </nav>
      {!styleClass && user && (
        <div className="user-img">
          <img src={user.imgUrl} alt="" />
        </div>
      )}
    </section>
  )
}

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../store/actions/user.action'

export const AccountDetails = ({ setActionModal }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userModule.user)

  const onLogout = () => {
    dispatch(logout())
    setActionModal(null)
  }

  return (
    <section className="account-details">
      <div className="account-header">
        <div className="user-img">
          <img referrerPolicy="no-referrer" src={user.imgUrl} alt="" />
        </div>
        <p>{user.fullname}</p>
      </div>
      <div className="seperator"></div>
      <div className="btn-container">
        <Link to={'/'} onClick={onLogout} className="btn-login-logout">
          Log out
        </Link>
      </div>
    </section>
  )
}

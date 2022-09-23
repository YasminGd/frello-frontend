import { useSelector } from "react-redux"

export const AccountDetails = () => {

    const user = useSelector(state => state.userModule.user)

    return (
        <section className="account-details">
            <div className="account-header">
                <div className="user-img">
                    <img src={user.imgUrl} alt="" />
                </div>
                <p>{user.fullname}</p>
            </div>
            <div className="seperator"></div>
            <div className="btn-container">
                <button className="btn-login-logout">Logout</button>
            </div>
        </section>
    )
}
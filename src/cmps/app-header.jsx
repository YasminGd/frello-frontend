import { Link } from "react-router-dom"
const logo = require('../assets/img/logo-frello.png')

export const AppHeader = () => {
  return (
    <section className="app-header">
      <div className="main-logo">
        <img src={logo} alt="" />
        <h1>Frello</h1>
      </div>
      <nav className="home-nav">
        <Link className="login" to={'user/login'}>Log in</Link>
        <Link className="signup" to={'user/signup'}>Get Frello for free</Link>
      </nav>
    </section>
  )
}

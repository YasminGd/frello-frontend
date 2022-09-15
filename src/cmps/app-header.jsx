import { Link } from "react-router-dom"

export const AppHeader = () => {
  return (
    <section className="app-header">
      <div className="main-logo">
        <img src="../assets/img/logo.png" alt="" />
        <h1>Frello</h1>
      </div>
      <nav>
        <Link className="login" to={'user/login'}>Log in</Link>
        <Link className="signup" to={'user/signup'}>Get Frello for free</Link>
      </nav>
    </section>
  )
}

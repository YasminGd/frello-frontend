import { Link } from 'react-router-dom'
import homepageHero from '../assets/img/homepage-hero.webp'

export const Home = () => {
  return (
    <section className="home">
      <div className="main">
        <div className="main-content">
          <h1>Frello helps teams move work forward.</h1>
          <p>Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Frello.</p>
          <Link to={'/workspace'}>Get Started</Link>
        </div>
        <div className="main-img">
          <img src={homepageHero} alt="" />
        </div>
      </div>
    </section>
  )
}

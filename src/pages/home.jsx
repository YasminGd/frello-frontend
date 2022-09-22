import { Link } from 'react-router-dom'
import homepageHero from '../assets/img/homepage-hero.webp'
import mainDescriptionImg from '../assets/img/main-app-description-img.png'

export const Home = () => {
  return (
    <section className="home">
      <div className="main">
        <div className="main-content">
          <h1>Frello helps teams move work forward.</h1>
          <p>
            Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way
            your team works is unique—accomplish it all with Frello.
          </p>
          <div className="link-container">
            <Link to={'/workspace'}>Start demo</Link>
          </div>
        </div>
        <div className="main-img">
          <img src={homepageHero} alt="" />
        </div>
      </div>
      <div className="separator"></div>
      <div className="main-app-description">
        <h2>It's more than work. It's a way of working together.</h2>
        <p>
          Start with a Frello board, lists, and cards. Customize and expand with more features as your teamwork grows.
          Manage projects, organize tasks, and build team spirit—all in one place.
        </p>
        <Link to={'/workspace'}>Start doing</Link>
        <img className="desc-image" alt="Description Img" src={mainDescriptionImg} />
      </div>
    </section>
  )
}

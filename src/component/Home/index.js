import './index.css'
import Header from '../Header'

const Home = () => (
  <div className="home-bg-container">
    <Header />
    <div className="home-container">
      <div className="home-content-container">
        <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
        <img
          className="digital-card"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  </div>
)

export default Home

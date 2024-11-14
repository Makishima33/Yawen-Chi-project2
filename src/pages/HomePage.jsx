import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to Minesweeper</h1>
      <p className="home-description">
        Test your logic and strategy skills with this classic puzzle game!
      </p>
      <Link to="/game/easy" className="play-button">
        Start Playing
      </Link>
    </div>
  );
}

export default HomePage;

import { Link } from "react-router-dom";
import "./Header.css";
function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/game/easy">Easy</Link>
      <Link to="/game/medium">Medium</Link>
      <Link to="/game/hard">Hard</Link>
      <Link to="/rules">Rules</Link>
    </nav>
  );
}

export default Header;

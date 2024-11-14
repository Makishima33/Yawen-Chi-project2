import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import RulesPage from "./pages/RulesPage";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/game/:difficulty" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;

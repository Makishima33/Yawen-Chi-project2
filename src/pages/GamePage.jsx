import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Board from "../components/Board";
import GameContext from "../context/GameContext";
import "./GamePage.css";

function GamePage() {
  const { difficulty } = useParams();
  const { resetGame } = useContext(GameContext);

  useEffect(() => {
    const difficultyConfig = {
      easy: { rows: 8, cols: 8, mines: 10 },
      medium: { rows: 16, cols: 16, mines: 40 },
      hard: { rows: 30, cols: 30, mines: 99 },
    };

    resetGame(difficultyConfig[difficulty] || difficultyConfig.easy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  return (
    <div className="game-page-container">
      <h1 className="game-page-heading">
        Minesweeper Game -{" "}
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </h1>
      <div className="board-container">
        <Board />
      </div>
    </div>
  );
}

export default GamePage;

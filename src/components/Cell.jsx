import { useContext } from "react";
import GameContext from "../context/GameContext";
import PropTypes from "prop-types";

function Cell({ cellData, onClick, onRightClick }) {
  const { gameOver } = useContext(GameContext);

  return (
    <div
      className={`cell ${cellData.revealed ? "revealed" : ""} ${
        cellData.flagged ? "flagged" : ""
      } ${cellData.hasMine && cellData.revealed ? "mine" : ""}`}
      onClick={!gameOver && !cellData.flagged ? onClick : undefined}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
    >
      {cellData.flagged && !cellData.revealed && "🚩"}
      {cellData.revealed && cellData.hasMine && "💣"}
      {cellData.revealed &&
        !cellData.hasMine &&
        cellData.adjacentMines > 0 &&
        cellData.adjacentMines}
    </div>
  );
}

Cell.propTypes = {
  cellData: PropTypes.shape({
    hasMine: PropTypes.bool.isRequired,
    revealed: PropTypes.bool.isRequired,
    flagged: PropTypes.bool.isRequired,
    adjacentMines: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onRightClick: PropTypes.func.isRequired,
};

export default Cell;

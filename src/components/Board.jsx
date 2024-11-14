import { useState, useEffect, useContext } from "react";
import Cell from "./Cell";
import "./Board.css";
import PropTypes from "prop-types";
import GameContext from "../context/GameContext";

function createBoard(rows, cols, mines) {
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      hasMine: false,
      revealed: false,
      flagged: false,
      adjacentMines: 0,
    }))
  );

  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!grid[row][col].hasMine) {
      grid[row][col] = { ...grid[row][col], hasMine: true };
      minesPlaced++;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!grid[r][c].hasMine) {
        let adjacentMines = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const newRow = r + dr;
            const newCol = c + dc;
            if (
              newRow >= 0 &&
              newRow < rows &&
              newCol >= 0 &&
              newCol < cols &&
              grid[newRow][newCol].hasMine
            ) {
              adjacentMines++;
            }
          }
        }
        grid[r][c] = { ...grid[r][c], adjacentMines };
      }
    }
  }
  return grid;
}

function Board() {
  const { config, gameOver, setGameOver, resetGame, flags, setFlags } =
    useContext(GameContext);
  const { rows, cols, mines } = config;
  const [grid, setGrid] = useState(createBoard(rows, cols, mines));

  // Flag Bomb Function(Extra credit) - toggles flag on right-click
  const toggleFlag = (row, col) => {
    if (gameOver || grid[row][col].revealed) return;

    const newGrid = grid.map((r) => r.slice());
    const cell = newGrid[row][col];

    cell.flagged = !cell.flagged;

    // Update flag counter
    setFlags((prevFlags) => (cell.flagged ? prevFlags + 1 : prevFlags - 1));

    setGrid(newGrid);
  };

  const revealCell = (row, col) => {
    if (gameOver || grid[row][col].revealed || grid[row][col].flagged) return;

    const newGrid = grid.map((r) => r.slice());
    const cell = newGrid[row][col];
    cell.revealed = true;

    if (cell.hasMine) {
      setGameOver(true);
      alert("Game over!  You lost!");
    } else if (cell.adjacentMines === 0) {
      revealEmptyCells(newGrid, row, col);
    }

    setGrid(newGrid);

    if (checkWin(newGrid)) {
      setGameOver(true);
      alert("Game over! You Won!");
    }
  };

  // Auto-Clear Function(Extra credit) - reveals empty adjacent cells
  const revealEmptyCells = (newGrid, row, col) => {
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];
    const stack = [[row, col]];
    while (stack.length) {
      const [r, c] = stack.pop();
      for (const [dr, dc] of directions) {
        const newRow = r + dr;
        const newCol = c + dc;
        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          !newGrid[newRow][newCol].revealed &&
          !newGrid[newRow][newCol].flagged
        ) {
          newGrid[newRow][newCol].revealed = true;
          if (newGrid[newRow][newCol].adjacentMines === 0) {
            stack.push([newRow, newCol]);
          }
        }
      }
    }
  };

  const checkWin = (newGrid) => {
    for (let row of newGrid) {
      for (let cell of row) {
        if (!cell.hasMine && !cell.revealed) {
          return false;
        }
      }
    }
    return true;
  };

  const handleResetGame = () => {
    resetGame(config);
    setGrid(createBoard(rows, cols, mines));
  };

  useEffect(() => {
    setGrid(createBoard(rows, cols, mines));
    setGameOver(false);
  }, [rows, cols, mines, setGameOver]);

  return (
    <div className="game-container">
      <div className="flag-count">Flags Left: {mines - flags}</div>{" "}
      {/* Display flags counter */}
      <button className="reset-button" onClick={handleResetGame}>
        Reset Game
      </button>
      <div className="board">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                cellData={cell}
                onClick={() => revealCell(rowIndex, colIndex)}
                onRightClick={() => toggleFlag(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

Board.propTypes = {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  mines: PropTypes.number.isRequired,
};

export default Board;

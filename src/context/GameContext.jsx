import { createContext, useState } from "react";
import PropTypes from "prop-types";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [config, setConfig] = useState({ rows: 8, cols: 8, mines: 10 });
  const [gameOver, setGameOver] = useState(false);
  const [flags, setFlags] = useState(0);

  const resetGame = (newConfig) => {
    setConfig(newConfig || { rows: 8, cols: 8, mines: 10 });
    setGameOver(false);
    setFlags(0);
  };

  return (
    <GameContext.Provider
      value={{
        config,
        gameOver,
        setGameOver,
        flags,
        setFlags,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameContext;

import React from "react";
import { generatePuzzle } from "../../utils/generator";

const Game = () => {
  let puzzle = generatePuzzle();
  return (
    <div className="container">
      <h1>Minesweeper</h1>
      <div className="board">
        {puzzle.map((row, i) => {
          return (
            <div
              className="board-row"
              key={`b-row-${i}`}
            >
              {row.map((cell, j) => {
                let bomb = "";
                if (cell === 9) bomb = "bomb";
                return (
                  <div
                    className={`board-cell ${bomb}`}
                    key={`b-cell-${j}`}
                  >
                    {cell}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Game;

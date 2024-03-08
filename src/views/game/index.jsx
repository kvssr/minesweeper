import React, { useState } from "react";
import generatePuzzle from "../../utils/generator";
import { revealArea } from "../../utils/generator";

const Game = () => {
  const [puzzle, setPuzzle] = useState(generatePuzzle());
  console.log("puzzle", puzzle);

  const handleCellClick = (e) => {
    console.log("handle click", e.target);
    let id = e.target.id.split("-");
    let i = Number(id[0]);
    let j = Number(id[1]);
    if (puzzle[i][j].visible) return;
    // e.target.innerText = puzzle[i][j].value;
    // puzzle[i][j].visible = true;
    if (puzzle[i][j].value === 0) setPuzzle([...revealArea(puzzle, j, i)]);
    puzzle[i][j].visible = true;
    setPuzzle([...puzzle]);
    // setPuzzle([...puzzle]);
  };

  const handleCellMouseEnter = (e) => {
    let id = e.target.id.split("-");
    let i = id[0];
    let j = id[1];
    if (!puzzle[i][j].visible) return;
    e.target.innerText = e.target.id;
  };

  const handleCellMouseLeave = (e) => {
    let id = e.target.id.split("-");
    let i = id[0];
    let j = id[1];
    if (!puzzle[i][j].visible) return;
    e.target.innerText = puzzle[i][j].value;
  };

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
                let value = cell.visible ? cell.value : "";
                if (cell.value === 9) bomb = "bomb";
                return (
                  <div
                    className={`board-cell ${bomb}`}
                    key={`b-cell-${j}`}
                    id={`${i}-${j}`}
                    onClick={handleCellClick}
                    onMouseEnter={handleCellMouseEnter}
                    onMouseLeave={handleCellMouseLeave}
                  >
                    {value}
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

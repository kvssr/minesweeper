import React, { useEffect, useState } from "react";
import generatePuzzle from "../../utils/generator";
import { revealArea } from "../../utils/generator";
import Cell from "../../components/Cell";
import "../../assets/shared.css";
import Timer from "../../components/Timer";

const Game = () => {
  let bombs = 60;
  let visibleCells = 0;
  const [bombCount, setBombCount] = useState(bombs);
  const [puzzle, setPuzzle] = useState(generatePuzzle(20, 20, bombCount));
  const [gameState, setGameState] = useState("pregame");
  const winCondition = puzzle.length * puzzle[0].length - bombs;
  // console.log("puzzle", puzzle);

  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  useEffect(() => {
    let flags = 0;
    for (let i = 0; i < puzzle.length; i++) {
      for (let j = 0; j < puzzle[0].length; j++) {
        if (puzzle[i][j].flagged) flags++;
        if (puzzle[i][j].visible) visibleCells++;
      }
    }
    setBombCount(bombs - flags);
    if (visibleCells === winCondition) setGameState("won");
  }, [puzzle]);

  const handleCellClick = (e) => {
    // console.log("handle click", e.target);
    if (gameState === "pregame") setGameState("start");
    if (gameState === "failed" || gameState === "won") return;
    console.log("🚀 ~ handleCellClick ~ gameState:", gameState);
    // if (e.target.innerText === "🚩") return;
    let id = e.target.id.split("-");
    let i = Number(id[0]);
    let j = Number(id[1]);
    if (puzzle[i][j].visible) return;
    if (puzzle[i][j].flagged) return;
    if (puzzle[i][j].value === 9) {
      setGameState("failed");
      return;
    }
    if (puzzle[i][j].value === 0) setPuzzle([...revealArea(puzzle, j, i)]);
    puzzle[i][j].visible = true;
    setPuzzle([...puzzle]);
  };

  const decreaseFlagCount = () => {
    setBombCount(bombCount + 1);
    console.log("🚀 ~ decreaseFlagCount ~ bombCount:", bombCount);
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

  const handleCellMouseClick = (e) => {
    e.preventDefault();
    console.log("🚀 ~ handleCellMouseClick ~ e:", e);
    if (gameState === "failed" || gameState === "won") return;
    let id = e.target.id.split("-");
    let i = id[0];
    let j = id[1];
    if (puzzle[i][j].visible) return;
    if (e.buttons === 2) {
      puzzle[i][j].flagged = !puzzle[i][j].flagged;
      setBombCount(bombCount - 1);
      setPuzzle([...puzzle]);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Minesweeper</h1>
      </header>
      <div className="score-board">
        <div className="bomb-counter">
          <p>{bombCount}</p>
        </div>
        <Timer gameState={gameState} />
      </div>
      <div className="board">
        {puzzle.map((row, i) => {
          return (
            <div
              className="board-row"
              key={`b-row-${i}`}
            >
              {row.map((cell, j) => {
                return (
                  <Cell
                    props={puzzle[i][j]}
                    onMouseDown={handleCellMouseClick}
                    onClick={handleCellClick}
                    gameState={gameState}
                    decreaseFlagCount={decreaseFlagCount}
                  />
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

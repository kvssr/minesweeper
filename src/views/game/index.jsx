import React, { useEffect, useState } from "react";
import Cell from "../../components/Cell";
import "../../assets/shared.css";
import Timer from "../../components/Timer";
import { socket } from "../../socket/socket.js";
import "../../assets/game.css";
import useLongPress from "../../components/useLongPress.js";

const Game = ({ game, setGame }) => {
  const [bombCount, setBombCount] = useState(game.bombCount);
  const [puzzle, setPuzzle] = useState(game.board);
  const [gameState, setGameState] = useState(game.gamestate);
  const { action, handlers } = useLongPress();
  // console.log("puzzle", puzzle);
  console.log("game", game);

  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  const updateCells = (cells) => {
    cells.map((cell) => {
      console.log("cell", cell);
      puzzle[cell.y][cell.x] = cell;
    });
    setPuzzle([...puzzle]);
  };

  useEffect(() => {
    const onGameMoveUpdated = ({ cells, gamestate, bombCount }) => {
      console.log("onGameMoveUpdated", cells);
      console.log("onGameMoveUpdated", gamestate);
      updateCells(cells);
      setBombCount(bombCount);
      setGameState(gamestate);
    };

    const onGameNew = (game) => {
      console.log("onGameNew", game);
      setGame(game);
      setPuzzle(game.board);
      setBombCount(game.bombCount);
      setGameState(game.gameState);
    };

    socket.on("game move updated", onGameMoveUpdated);
    socket.on("game new", onGameNew);

    return () => {
      socket.off("game move updated", onGameMoveUpdated);
      socket.off("game new", onGameNew);
    };
  }, [game]);

  // const handleCellClick = (e) => {
  //   let id = e.target.id.split("-");
  //   let i = Number(id[0]);
  //   let j = Number(id[1]);
  //   if (action === "longpress") {
  //     console.log("clicking longpress");
  //     socket.emit("game move selected", { x: j, y: i, value: 1 });
  //     return;
  //   }
  //   socket.emit("game move selected", { x: j, y: i, value: 0 });
  // };

  const handleCellMouseClick = (e) => {
    e.preventDefault();
    // console.log("🚀 ~ handleCellMouseClick ~ e:", e);
    let id = e.target.id.split("-");
    let i = Number(id[0]);
    let j = Number(id[1]);
    if (puzzle[i][j].visible) return;
    if (e.buttons === 2) {
      socket.emit("game move selected", { x: j, y: i, value: 1 });
    }
  };

  const handleNewGameClick = () => {
    socket.emit("game new");
  };

  return (
    <div className="container">
      <div className="score-board">
        <div
          className="bomb-counter"
          onTouchEnd={""}
        >
          <p>{("0000" + bombCount).slice(-4)}</p>
        </div>
        <button
          className="newGameBtn"
          onClick={handleNewGameClick}
        >
          <p>+</p>
        </button>
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
                    // onMouseDown={handleCellMouseClick}
                    // onClick={handleCellClick}
                    gameState={gameState}
                    {...handlers}
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

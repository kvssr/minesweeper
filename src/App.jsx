import { useEffect, useState } from "react";
import Game from "./views/game";
import { socket } from "./socket/socket";
import "./assets/shared.css";
import Homepage from "./views/homepage";

function App() {
  const [room, setRoom] = useState();
  const [game, setGame] = useState();

  useEffect(() => {
    const onRoomJoined = (room) => {
      console.log("onRoomJoined", room);
      setRoom(room);
    };

    const onGameJoined = (game) => {
      console.log("onRoomJoined", game);
      setGame(game);
    };

    const onMsgReceived = (msg) => {
      console.log("message recieved", msg);
    };

    socket.on("room joined", onRoomJoined);
    socket.on("game joined", onGameJoined);
    socket.on("chat message", onMsgReceived);

    return () => {
      socket.off("room joined", onRoomJoined);
      socket.off("game joined", onGameJoined);
      socket.off("chat message", onMsgReceived);
    };
  }, []);

  return (
    <div className="App">
      <header>
        <h2>Minesweeper</h2>
        <h1>{room}</h1>
      </header>
      <div>
        {room && game && (
          <Game
            game={game}
            setGame={setGame}
          />
        )}
        {!game && <Homepage />}
      </div>
    </div>
  );
}

export default App;

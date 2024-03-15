import React from "react";
import { socket } from "../socket/socket";

export const ConnectionManager = () => {
  const connect = (e) => {
    e.preventDefault();
    console.log("Connecting", socket);
    const room = e.currentTarget.elements.roomInput.value;
    console.log("form props:", room);
    socket.connect();
    socket.emit("room connect", room);
  };

  const disconnect = () => {
    console.log("Disconnecting", socket);
    socket.disconnect();
  };

  const createRoom = () => {
    console.log("Creating room");
    socket.connect();
    socket.emit("room create");
  };

  return (
    <div className="joinRow">
      <button
        type="button"
        className="createCol"
        onClick={createRoom}
      >
        Create
      </button>

      <form
        onSubmit={connect}
        className="joinCol"
      >
        <input
          id="roomInput"
          name="room"
          className="roomInput"
          placeholder="Room code"
          size={7}
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

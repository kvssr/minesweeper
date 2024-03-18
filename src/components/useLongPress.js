import { useState, useRef } from "react";
import { socket } from "../socket/socket";

export default function useLongPress() {
  const [action, setAction] = useState();

  const timerRef = useRef();
  const isLongPress = useRef();

  function startPressTimer(i, j) {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setAction("longpress");
      console.log("timer longpress");
      placeFlag(i, j);
    }, 500);
  }

  function placeFlag(i, j) {
    socket.emit("game move selected", { x: j, y: i, value: 1 });
  }

  function handleOnClick(e) {
    console.log("handleOnClick");
    let id = e.target.id.split("-");
    let i = Number(id[0]);
    let j = Number(id[1]);
    if (isLongPress.current) {
      // socket.emit("game move selected", { x: j, y: i, value: 1 });
      return;
    }
    socket.emit("game move selected", { x: j, y: i, value: 0 });
    setAction("click");
  }

  function handleOnMouseDown(e) {
    console.log("handleOnMouseDown", e);
    let id = e.target.id.split("-");
    let i = Number(id[0]);
    let j = Number(id[1]);
    if (e.button === 2) {
      socket.emit("game move selected", { x: j, y: i, value: 1 });
    }
    startPressTimer(i, j);
  }

  function handleOnMouseUp() {
    console.log("handleOnMouseUp");
    clearTimeout(timerRef.current);
  }

  function handleOnTouchStart(e) {
    console.log("handleOnTouchStart");
    let id = e.target.id.split("-");
    let i = Number(id[0]);
    let j = Number(id[1]);
    startPressTimer(i, j);
  }

  function handleOnTouchEnd() {
    // if (action === "longpress") return;
    console.log("handleOnTouchEnd");
    clearTimeout(timerRef.current);
  }

  return {
    action,
    handlers: {
      onClick: handleOnClick,
      onMouseDown: handleOnMouseDown,
      onMouseUp: handleOnMouseUp,
      onTouchStart: handleOnTouchStart,
      onTouchEnd: handleOnTouchEnd,
    },
  };
}

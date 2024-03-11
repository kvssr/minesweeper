import React from "react";

const Cell = ({
  props,
  onMouseDown,
  onClick,
  gameState,
  decreaseFlagCount,
}) => {
  let { value, x, y, visible } = props;
  let bomb = "";
  let visibleColour = "";
  if (visible) {
    bomb = value === 9 ? "bomb" : "";
    visibleColour = "visible";
    value = value === 9 ? "💣" : value;
    value = value === 0 ? "" : value;
  }
  if (gameState === "failed" && value === 9) {
    visible = true;
    value = "💣";
  }
  let flagged = props.flagged ? "flagged" : "";
  return (
    <div
      className={`board-cell ${bomb} ${visibleColour} ${flagged}`}
      key={`b-cell-${x}`}
      id={`${y}-${x}`}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      {visible ? value : ""}
    </div>
  );
};

export default Cell;

import React from "react";

const Cell = ({
  props,
  onMouseDown,
  onMouseUp,
  onClick,
  onTouchStart,
  onTouchEnd,
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
  let flagged = props.flagged ? "flagged" : "";
  return (
    <div
      className={`board-cell ${bomb} ${visibleColour} ${flagged}`}
      key={`b-cell-${x}`}
      id={`${y}-${x}`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {visible ? value : ""}
    </div>
  );
};

export default Cell;

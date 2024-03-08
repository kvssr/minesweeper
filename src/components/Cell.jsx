import React from "react";

const Cell = ({ value, x, y, visible }) => {
  return <div className="board-cell">{visible ? value : ""}</div>;
};

export default Cell;

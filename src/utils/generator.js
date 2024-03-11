const generatePuzzle = (x = 20, y = 20, bombs = 60) => {
  let puzzle = [];
  for (let i = 0; i < y; i++) {
    puzzle[i] = [];
    for (let j = 0; j < x; j++) {
      puzzle[i][j] = {
        value: 0,
        visible: false,
        visited: false,
        x: j,
        y: i,
        flagged: false,
      };
    }
  }

  for (let i = 0; i < bombs; i++) {
    let ranX = Math.floor(Math.random() * x);
    let ranY = Math.floor(Math.random() * y);

    while (puzzle[ranY][ranX].value === 9) {
      ranX = Math.floor(Math.random() * x);
      ranY = Math.floor(Math.random() * y);
    }

    puzzle[ranY][ranX].value = 9;
    updateCellValues(puzzle, ranX, ranY);
  }

  return puzzle;
};

const updateCellValues = (puzzle, x, y) => {
  let startX = Math.max(0, x - 1);
  let endX = Math.min(puzzle[0].length, x + 2);
  let startY = Math.max(0, y - 1);
  let endY = Math.min(puzzle[0].length, y + 2);

  for (let i = startY; i < endY; i++) {
    for (let j = startX; j < endX; j++) {
      if (puzzle[i][j].value === 9) continue;
      puzzle[i][j].value++;
    }
  }
};

export const revealArea = (puzzle, x, y) => {
  let startX = Math.max(0, x - 1);
  let endX = Math.min(puzzle[0].length, x + 2);
  let startY = Math.max(0, y - 1);
  let endY = Math.min(puzzle.length, y + 2);

  puzzle[y][x].visible = true;
  puzzle[y][x].visited = true;
  puzzle[y][x].flagged = false;
  for (let i = startY; i < endY; i++) {
    for (let j = startX; j < endX; j++) {
      if (puzzle[i][j].visited === false && puzzle[i][j].value === 0) {
        revealArea(puzzle, j, i);
      }
      if (puzzle[i][j].visited) continue;
      puzzle[i][j].visible = true;
      puzzle[i][j].visited = true;
      puzzle[i][j].flagged = false;
    }
  }

  return puzzle;
};

export default generatePuzzle;

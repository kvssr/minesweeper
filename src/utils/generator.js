export const generatePuzzle = (x = 10, y = 10, bombs = 15) => {
  let puzzle = [];
  for (let i = 0; i < y; i++) {
    puzzle[i] = [];
    for (let j = 0; j < x; j++) {
      puzzle[i][j] = 0;
    }
  }

  for (let i = 0; i < bombs; i++) {
    let ranX = Math.floor(Math.random() * x);
    let ranY = Math.floor(Math.random() * y);

    while (puzzle[ranY][ranX] === 9) {
      ranX = Math.floor(Math.random() * x);
      ranY = Math.floor(Math.random() * y);
    }

    puzzle[ranY][ranX] = 9;
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
      if (puzzle[i][j] === 9) continue;
      puzzle[i][j]++;
    }
  }
};

console.log(generatePuzzle());

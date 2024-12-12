const utils = require("../utils");

async function part1() {
  // Read contents from input.txt
  const contents = utils.openFile("./sample.txt", false);
  const grid = contents.split("\n").map((line) => line.trim().split(""));

  const rows = grid.length;
  const cols = grid[0].length;
  const directions = ["^", ">", "v", "<"]; // Order: Up, Right, Down, Left
  const moves = [
    [-1, 0], // Up
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
  ];

  let guardPosition = null;
  let guardDirection = null;

  // Find the guard's starting position and direction
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (directions.includes(grid[r][c])) {
        guardPosition = [r, c];
        guardDirection = directions.indexOf(grid[r][c]);
        grid[r][c] = "."; // Clear guard's initial position
      }
    }
  }

  // Check if guardPosition was found
  if (!guardPosition) {
    console.error(
      "Guard's position not found in the grid. Check your input file."
    );
    return;
  }

  const visited = new Set();
  visited.add(guardPosition.join(","));

  // Simulate the guard's movement
  while (true) {
    const [currentRow, currentCol] = guardPosition;
    const [moveRow, moveCol] = moves[guardDirection];
    const nextRow = currentRow + moveRow;
    const nextCol = currentCol + moveCol;

    // Check if next position is within bounds
    if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
      break; // Guard has left the map
    }

    if (grid[nextRow][nextCol] === "#") {
      // Turn right (90 degrees)
      guardDirection = (guardDirection + 1) % 4;
    } else {
      // Move forward
      guardPosition = [nextRow, nextCol];
      visited.add(guardPosition.join(","));
    }
  }

  console.log(`The guard visited ${visited.size} distinct positions.`);
}

part1();

// part2();

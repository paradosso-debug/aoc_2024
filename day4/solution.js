// Import utilities for file handling
const utils = require("../utils");

// Async function to read the grid from file and count occurrences
async function part1() {
  // Read contents from sample.txt
  const contents = utils.openFile("./input.txt", false);
  const grid = contents.split("\n").map((line) => line.trim());

  // Dimensions of the grid
  const numRows = grid.length;
  const numCols = grid[0].length;

  // Directions to search: [rowOffset, colOffset]
  const directions = [
    [0, 1], // Horizontal right
    [0, -1], // Horizontal left
    [1, 0], // Vertical down
    [-1, 0], // Vertical up
    [1, 1], // Diagonal down-right
    [1, -1], // Diagonal down-left
    [-1, 1], // Diagonal up-right
    [-1, -1], // Diagonal up-left
  ];

  const targetWord = "XMAS";
  const targetLength = targetWord.length;

  function countOccurrences(grid, targetWord) {
    let count = 0;

    // Function to check if the word exists starting from (row, col) in a specific direction
    function searchFromPosition(row, col, direction) {
      let [rowOffset, colOffset] = direction;

      for (let i = 0; i < targetLength; i++) {
        let newRow = row + i * rowOffset;
        let newCol = col + i * colOffset;

        // Check bounds
        if (
          newRow < 0 ||
          newRow >= numRows ||
          newCol < 0 ||
          newCol >= numCols ||
          grid[newRow][newCol] !== targetWord[i]
        ) {
          return false;
        }
      }
      return true;
    }

    // Iterate through each cell in the grid
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        // Check all directions from the current position
        for (let direction of directions) {
          if (searchFromPosition(row, col, direction)) {
            count++;
          }
        }
      }
    }

    return count;
  }

  const totalOccurrences = countOccurrences(grid, targetWord);
  console.log(`Total occurrences of '${targetWord}':`, totalOccurrences);
}

// part1();

async function part2() {
  // Your provided utility function to get the file content
  const contents = utils.openFile("./input.txt", false);

  // Convert the input into a grid
  const grid = contents.split("\n").map((line) => line.trim());

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  // Helper function to check X-MAS patterns
  const isXMasPattern = (r, c) => {
    // Forward slash pattern
    const forwardSlash =
      grid[r]?.[c] === "M" &&
      grid[r + 1]?.[c + 1] === "A" &&
      grid[r + 2]?.[c + 2] === "S";

    // Backslash pattern
    const backSlash =
      grid[r]?.[c] === "M" &&
      grid[r + 1]?.[c - 1] === "A" &&
      grid[r + 2]?.[c - 2] === "S";

    return forwardSlash || backSlash;
  };

  // Iterate through every cell in the grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (isXMasPattern(r, c)) {
        count++;
      }
    }
  }

  console.log("Number of X-MAS patterns:", count);
}

part2();

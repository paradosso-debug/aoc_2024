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

// Async function to read the grid from file and count occurrences
async function part2() {
  // Read contents from input.txt
  const contents = utils.openFile("./input.txt", false);
  const grid = contents.split("\n").map((line) => line.trim());

  // Dimensions of the grid
  const numRows = grid.length;
  const numCols = grid[0].length;

  // Define the primary target pattern
  const targetPattern = [
    ["M", ".", "S"],
    [".", "A", "."],
    ["M", ".", "S"],
  ];

  const patternRows = targetPattern.length;
  const patternCols = targetPattern[0].length;

  // Directions to search: [rowOffset, colOffset]
  const directions = [
    [1, 0], // Vertical down
    [0, 1], // Horizontal right
    [1, 1], // Diagonal down-right
    [1, -1], // Diagonal down-left
    [-1, 0], // Vertical up
    [0, -1], // Horizontal left
    [-1, -1], // Diagonal up-left
    [-1, 1], // Diagonal up-right
  ];

  function countXMASPatterns(grid, targetPattern) {
    let count = 0;

    // Function to check if the pattern exists starting from (row, col) in a specific direction
    function searchFromPosition(row, col, direction) {
      const [rowOffset, colOffset] = direction;
      for (let i = 0; i < patternRows; i++) {
        for (let j = 0; j < patternCols; j++) {
          let newRow = row + i * rowOffset;
          let newCol = col + j * colOffset;

          // Check bounds
          if (
            newRow < 0 ||
            newRow >= numRows ||
            newCol < 0 ||
            newCol >= numCols ||
            (targetPattern[i][j] !== "." &&
              grid[newRow][newCol] !== targetPattern[i][j])
          ) {
            return false;
          }
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

  const totalOccurrences = countXMASPatterns(grid, targetPattern);
  console.log(`Total occurrences of X-MAS pattern:`, totalOccurrences);
}

// Execute part2 function
part2();

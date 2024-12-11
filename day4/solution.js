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

function part2() {
  // Read the input file
  const lines = utils.openFile("./input.txt");
  let count = 0;

  function searchXMAS(lines, lineIndex, index, lineStep, indexStep) {
    let i = 0;
    let pass = false;
    let ind1 = lineIndex - lineStep;
    while (
      i < 2 &&
      lineIndex - lineStep >= 0 &&
      index - indexStep >= 0 &&
      lineIndex - lineStep < lines.length &&
      index - indexStep < lines[0].length
    ) {
      let line = lines[lineIndex - lineStep];
      let char = line[index - indexStep];
      pass = (i == 0 && char == "M") || (i == 1 && char == "S");
      if (!pass) return false;
      lineStep *= -1;
      indexStep *= -1;
      i++;
    }
    return i == 2 ? pass : false;
  }

  const steps = [
    [1, -1],
    [-1, 1],
  ];

  const steps2 = [
    [1, 1],
    [-1, -1],
  ];

  for (let l = 0; l < lines.length; l++) {
    for (let c = 0; c < lines[0].length; c++) {
      if (lines[l][c] != "A") continue;

      let valid =
        steps.reduce(
          (p, v) => p || searchXMAS(lines, l, c, v[0], v[1]),
          false
        ) &&
        steps2.reduce(
          (p, v) => p || searchXMAS(lines, l, c, v[0], v[1]),
          false
        );
      if (valid) count++;
    }
  }

  console.log("count =", count);
}

part2();

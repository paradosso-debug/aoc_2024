const utils = require("../utils");

async function part1() {
  const contents = utils.openFile("./input.txt");
  console.log("contents =", contents);
  let leftSide = [];
  let rightSide = [];
  for (let i = 0; i < contents.length; i++) {
    const current = contents[i];
    const split = current.split("   ");
    console.log("split =", split);
    leftSide.push(Number(split[0]));
    rightSide.push(Number(split[1]));
  }

  console.log("leftSide =", leftSide);
  console.log("rightSide =", rightSide);

  let total = 0;

  // while (leftSide.length && rightSide.length) {
  //   const leftMin = Math.min(...leftSide);
  //   const rightMin = Math.min(...rightSide);

  //   leftSide.splice(leftSide.indexOf(leftMin), 1);
  //   rightSide.splice(rightSide.indexOf(rightMin), 1);

  //   total += Math.abs(leftMin - rightMin);
  // }

  leftSide.sort((a, b) => a - b);
  rightSide.sort((a, b) => a - b);

  console.log("leftSide =", leftSide);
  console.log("rightSide =", rightSide);

  for (let i = 0; i < leftSide.length; i++)
    total += Math.abs(leftSide[i] - rightSide[i]);

  console.log("total =", total);
}

// part1();

function part2() {
  const contents = utils.openFile("./input.txt");
  console.log("contents =", contents);
  const leftSide = [],
    rightSide = [];
  for (let i = 0; i < contents.length; i++) {
    const [l, r] = contents[i].split("   ");
    leftSide.push(Number(l));
    rightSide.push(Number(r));
  }

  console.log("leftSide =", leftSide);
  console.log("rightSide =", rightSide);

  let total = 0;
  for (let i = 0; i < leftSide.length; i++) {
    const el = leftSide[i]; // 3
    const occurences = rightSide.filter((num) => num === el); // [3, 3, 3]
    console.log("occurences =", occurences);
    total += el * occurences.length;
  }

  console.log("total =", total);
}

part2();

module.exports = {
  part1,
  part2,
};

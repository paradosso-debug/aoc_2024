const utils = require("../utils");

// 7 6 4 2 1

function validate(arr) {
  // console.log("validate: arr =", arr); // 7 6 4 2 1
  let way = undefined;
  const minDiff = 1,
    maxDiff = 3;

  let current = undefined,
    next = undefined;
  for (let i = 0; i < arr.length - 1; i++) {
    // current = 6, next = 4
    (current = arr[i]), (next = arr[i + 1]);
    if (
      Math.abs(current - next) < minDiff ||
      Math.abs(current - next) > maxDiff
    ) {
      return false;
    }

    if (!way) {
      if (current < next) way = "INC";
      else way = "DEC";
    } else {
      if (
        (way === "INC" && current > next) ||
        (way === "DEC" && current < next)
      )
        return false;
      else continue;
    }
  }

  return true;
}

function part1() {
  const contents = utils.openFile("./input.txt");
  // console.log("contents =", contents);
  const reports = contents.map((r) => r.split(" ").map(Number));

  let okReports = 0;

  for (let i = 0; i < reports.length; i++) {
    const currentReport = reports[i];
    const isOk = validate(currentReport);
    if (isOk) ++okReports;
  }

  console.log("okReports =", okReports);
}

// part1();

async function part2() {
  const contents = utils.openFile("./input.txt");
  // console.log("contents =", contents);
  const reports = contents.map((r) => r.split(" ").map(Number));

  let okReports = 0;

  for (let i = 0; i < reports.length; i++) {
    const currentReport = reports[i]; // 1 3 2 4 5
    const isOk = validate(currentReport); // false
    if (isOk) ++okReports;
    else {
      for (let j = 0; j < currentReport.length; j++) {
        const clone = [...currentReport];
        // j - 1
        clone.splice(j, 1);
        const secondOk = validate(clone);
        if (secondOk) {
          ++okReports;
          break;
        }
      }
    }
  }

  console.log("okReports =", okReports);
}

part2();

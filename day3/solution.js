const utils = require("../utils");

async function part1() {
  const contents = utils.openFile("./input.txt", false);

  const re = /mul\([1-9][0-9]{0,2},[1-9][0-9]{0,2}\)/g;
  const matches = contents.match(re);

  let total = 0;
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];

    const s = current.split(",");

    const first = s[0].replace(/\D+/g, "");
    const second = s[1].replace(/\D+/g, "");

    total += Number(first) * Number(second);
    // console.log(first, second);
  }
  console.log(total);
}

// part1();

function part2() {
  const contents = utils.openFile("./input.txt", false);
  console.log(contents);

  const re = /mul\([1-9][0-9]{0,2},[1-9][0-9]{0,2}\)|don't\(\)|do\(\)/g;
  const matches = contents.match(re);
  console.log(matches);

  let enabled = true;
  let total = 0;
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    if (current === "do()") {
      enabled = true;
    } else if (current === "don't()") {
      enabled = false;
    } else if (enabled === true && current.startsWith("mul")) {
      const s = current.split(",");
      const first = s[0].replace(/\D+/g, "");
      const second = s[1].replace(/\D+/g, "");
      total += Number(first) * Number(second);
    }
  }
  console.log(total);
}

part2();

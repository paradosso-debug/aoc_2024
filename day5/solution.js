const utils = require("../utils");

function Order() {
  this.before = [];
  this.after = [];
}

function part1() {
  const contents = utils.openFile("./input.txt", false).split("\r\n\r\n");
  // split rules and pages into own variables
  let [rules, pages] = contents.map((c) => {
    return c.split("\r\n");
  });
  // rules is an array -> ['X|Y', "X|Y"] -> want it to look like [[X, Y], [X,Y]...]
  rules = rules
    .map((rule) => rule.split("|"))
    .reduce((acc, curr) => {
      // acc - {}
      // curr [47, 53]
      /**
       * acc
       * {
       *  "47": {
       *    "before": [],
       *    "after": [53]
       *  }
       * }
       */

      const [b, a] = curr;
      if (!(b in acc)) acc[b] = new Order();
      acc[b].after.push(a);

      if (!(a in acc)) acc[a] = new Order();
      acc[a].before.push(b);

      return acc;
    }, {});
  console.log("rules =", rules);
  // pages needs to be an array of pages right now it is -> ['A,B,C,D,E,F', ...] -> need it to be [[A, B, C, D, E, F]....]
  pages = pages.map((page) => page.split(","));

  let validPages = [];
  pages.forEach((page) => {
    if (validate(page, rules)) {
      validPages.push(page);
    }
  });

  const total = validPages.reduce(
    (acc, curr) => acc + Number(curr[Math.floor(curr.length / 2)]),
    0
  );

  console.log("total =", total);
}

function validate(arr, rules) {
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const { before: beforeRule, after: afterRule } = rules[current];
    const [before, after] = [
      arr.slice(0, arr.indexOf(current)),
      arr.slice(arr.indexOf(current) + 1),
    ];

    if (
      // need to make sure before is not in the afterRule
      before.some((b) => afterRule.includes(b)) ||
      // need to make sure after is not in the beforeRule
      after.some((a) => beforeRule.includes(a))
    ) {
      return false;
    }
  }

  return true;
}

function part2() {
  const contents = utils.openFile("./_input.txt", false).split("\r\n\r\n");
  // split rules and pages into own variables
  let [rules, pages] = contents.map((c) => {
    return c.split("\r\n");
  });
  // rules is an array -> ['X|Y', "X|Y"] -> want it to look like [[X, Y], [X,Y]...]
  rules = rules
    .map((rule) => rule.split("|"))
    .reduce((acc, curr) => {
      // acc - {}
      // curr [47, 53]
      /**
       * acc
       * {
       *  "47": {
       *    "before": [],
       *    "after": [53]
       *  }
       * }
       */

      const [b, a] = curr;
      if (!(b in acc)) acc[b] = new Order();
      acc[b].after.push(a);

      if (!(a in acc)) acc[a] = new Order();
      acc[a].before.push(b);

      return acc;
    }, {});
  // console.log("rules =", rules);
  // pages needs to be an array of pages right now it is -> ['A,B,C,D,E,F', ...] -> need it to be [[A, B, C, D, E, F]....]
  pages = pages.map((page) => page.split(","));

  let invalidPages = [];

  pages.forEach((page) => {
    if (!validate(page, rules)) {
      invalidPages.push(correction(page, rules));
    }
  });

  // console.log("invalidPages =", invalidPages);

  const total = invalidPages.reduce(
    (acc, curr) => acc + Number(curr[Math.floor(curr.length / 2)]),
    0
  );

  console.log("total =", total);
}

function validate2(arr, rules) {
  console.log("arr =", arr);
  console.log("rules =", rules);
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const { before: beforeRule, after: afterRule } = rules[current];
    const [before, after] = [
      arr.slice(0, arr.indexOf(current)),
      arr.slice(arr.indexOf(current) + 1),
    ];

    if (
      // need to make sure before is not in the afterRule
      before.some((b) => afterRule.includes(b)) ||
      // need to make sure after is not in the beforeRule
      after.some((a) => beforeRule.includes(a))
    ) {
      return false;
    }
  }

  return true;
}

function correction(page, rules) {
  if (validate2(page, rules)) return page;
  let clone = [...page];
  for (el of clone) {
    const rule = rules[el];
    const [before, after] = [
      page.slice(0, page.indexOf(el)),
      page.slice(page.indexOf(el) + 1),
    ];

    for (let i = 0; i < before.length; i++) {
      const b = before[i];
      if (rule.after.includes(before)) {
        before.splice(i, 1), after.unshift(b);
      }
    }

    for (let j = 0; j < after.length; j++) {
      const a = after[j];
      if (rule.before.includes(a)) {
        after.splice(j, 1), before.push(a);
      }
    }

    page = [...before, el, ...after];
  }

  return correction(page, rules);
}

part2();

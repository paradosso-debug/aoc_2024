const fs = require("fs");

class Utils {
  constructor() {
    this.fs = fs;
  }

  openFile(path, byLines = true) {
    const contents = this.fs.readFileSync(path, "utf8");
    if (!byLines) return contents;
    return this.splitLines(contents);
  }

  splitLines(contents) {
    return contents.split("\n").map((l) => l.trim());
  }
}

module.exports = new Utils();

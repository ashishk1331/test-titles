type AvailableColors = "red" | "magenta" | "white" | "yellow";

export class Text {
  text: string;
  colorCode = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  };

  color(text: string, color: AvailableColors) {
    let code = this.colorCode.white;
    if (color in this.colorCode) {
      code = this.colorCode[color];
    }
    return code + text + "\x1b[0m";
  }
}

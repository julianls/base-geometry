export class CommonExtensions {
  static isAlmostSame(val1: number, val2: number, min: number = 0.01) {
    return Math.abs(val1 - val2) < min;
  }

  static isAlmostSamePosition(val1x: number, val1y: number, val2x: number, val2y: number, min: number = 0.01) {
    return Math.abs(val1x - val2x) < min && Math.abs(val1y - val2y) < min;
  }
}

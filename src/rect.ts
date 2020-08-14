import { Point } from './point';

export class Rect {
  constructor(public x: number, public y: number, public width: number, public height: number) {}

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.height;
  }

  get center() {
    return new Point(this.x + this.width / 2.0, this.y + this.height / 2.0);
  }

  public union(pt: Point) {
    const pt1 = new Point(this.x, this.y);
    const pt2 = new Point(this.x + this.width, this.y + this.height);

    pt1.x = Math.min(pt1.x, pt.x);
    pt1.y = Math.min(pt1.y, pt.y);

    pt2.x = Math.max(pt2.x, pt.x);
    pt2.y = Math.max(pt2.y, pt.y);

    this.x = pt1.x;
    this.y = pt1.y;
    this.width = pt2.x - pt1.x;
    this.height = pt2.y - pt1.y;
  }

  public containsPos(x: number, y: number): boolean {
    return this.x <= x && x < this.x + this.width && this.y <= y && y < this.y + this.height;
  }

  public containsPoint(value: Point): boolean {
    return this.x <= value.x && value.x < this.x + this.width && this.y <= value.y && value.y < this.y + this.height;
  }

  public containsRect(value: Rect): boolean {
    return (
      this.x <= value.x &&
      value.x + value.width <= this.x + this.width &&
      this.y <= value.y &&
      value.y + value.height <= this.y + this.height
    );
  }

  public intersects(value: Rect): boolean {
    return value.left < this.right && this.left < value.right && value.top < this.bottom && this.top < value.bottom;
  }

  public hasCommonParts(value: Rect): boolean {
    return (
      this.intersects(value) ||
      this.containsPos(value.x, value.y) ||
      this.containsPos(value.x + value.width, value.y) ||
      this.containsPos(value.x + value.width, value.y + value.height) ||
      this.containsPos(value.x, value.y + value.height) ||
      value.containsPos(this.x, this.y) ||
      value.containsPos(this.x + this.width, this.y) ||
      value.containsPos(this.x + this.width, this.y + this.height) ||
      value.containsPos(this.x, this.y + this.height)
    );
  }
}

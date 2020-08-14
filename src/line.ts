import { IPoint } from './interfaces/point';
import { ILine } from './interfaces/line';

export class Line implements ILine {
  constructor(public first: IPoint, public second: IPoint) {}
}

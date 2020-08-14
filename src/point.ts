import { IPoint } from './interfaces/point';

export class Point implements IPoint {
  constructor(public x: number, public y: number) {}
}

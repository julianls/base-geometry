import { IPoint } from '..';
import { Point } from '../point';
import { Matrix } from '../matrices/matrix';

export class PointExtensions {
  static distance(pt1: IPoint, pt2: IPoint): number {
    return PointExtensions.distanceXY(pt1.x, pt1.y, pt2.x, pt2.y);
  }

  static distanceXY(x: number, y: number, x1: number, y1: number): number {
    const v1 = x - x1;
    const v2 = y - y1;
    return Math.sqrt(v1 * v1 + v2 * v2);
  }

  public static transform(position: IPoint, matrix: Matrix): IPoint {
    const result = new Point(
      position.x * matrix.M11 + position.y * matrix.M21 + matrix.M41,
      position.x * matrix.M12 + position.y * matrix.M22 + matrix.M42,
    );
    return result;
  }

  public static getPosition(x: number, y: number, translation: Point, rotation: number, isflipped: boolean): IPoint {
    let result = new Point(x, y);

    let matrix = Matrix.createTranslation(translation.x, translation.y, 0);

    if (rotation !== 0) {
      matrix = Matrix.add(matrix, Matrix.createRotationZ(rotation));
    }

    if (isflipped) {
      matrix = Matrix.add(matrix, Matrix.createMirror(true, false));
    }

    result = PointExtensions.transform(result, matrix);

    return result;
  }
}

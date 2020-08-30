import { IPoint, ILine, Point } from '..';
import { Matrix } from '../matrices/matrix';
import { Line } from '../line';

export class LineExtensions {
  private static TOL: number = Math.pow(10, -9);

  public static distance(line: ILine, pt: IPoint): number {
    return LineExtensions.distanceXY(line.first.x, line.first.y, line.second.x, line.second.y, pt.x, pt.y);
  }

  public static distanceXY(x: number, y: number, x1: number, y1: number, x2: number, y2: number): number {
    const v1 = x - x1;
    const v2 = y - y1;
    return Math.sqrt(v1 * v1 + v2 * v2);
  }

  public static transform(line: ILine, matrix: Matrix): ILine {
    const pos1 = new Point(
      line.first.x * matrix.M11 + line.first.y * matrix.M21 + matrix.M41,
      line.first.x * matrix.M12 + line.first.y * matrix.M22 + matrix.M42,
    );
    const pos2 = new Point(
      line.second.x * matrix.M11 + line.second.y * matrix.M21 + matrix.M41,
      line.second.x * matrix.M12 + line.second.y * matrix.M22 + matrix.M42,
    );

    return new Line(pos1, pos2);
  }

  public static getPointProjection(x1: number, y1: number, x2: number, y2: number, toProject: IPoint): IPoint {
    let deltaY = y2 - y1;
    if (deltaY === 0) deltaY = 0.000000000001;

    let deltaX = x2 - x1;
    if (deltaX === 0) deltaX = 0.000000000001;

    const m = deltaY / deltaX;
    const b = y1 - m * x1;

    const x = (m * toProject.y + toProject.x - m * b) / (m * m + 1);
    const y = (m * m * toProject.y + m * toProject.x + b) / (m * m + 1);

    return new Point(x, y);
  }

  public static lineIntersect(A: Point, B: Point, E: Point, F: Point, infinite: boolean): IPoint {
    let x = 0;
    let y = 0;

    const a1 = B.y - A.y;
    const b1 = A.x - B.x;
    const c1 = B.x * A.y - A.x * B.y;
    const a2 = F.y - E.y;
    const b2 = E.x - F.x;
    const c2 = F.x * E.y - E.x * F.y;

    const denom = a1 * b2 - a2 * b1;

    (x = (b1 * c2 - b2 * c1) / denom), (y = (a2 * c1 - a1 * c2) / denom);

    if (!isFinite(x) || !isFinite(y)) {
      return null;
    }

    // lines are colinear
    /*var crossABE = (E.y - A.y) * (B.x - A.x) - (E.x - A.x) * (B.y - A.y);
        var crossABF = (F.y - A.y) * (B.x - A.x) - (F.x - A.x) * (B.y - A.y);
        if(_almostEqual(crossABE,0) && _almostEqual(crossABF,0)){
            return null;
        }*/

    if (!infinite) {
      // coincident points do not count as intersecting
      if (Math.abs(A.x - B.x) > LineExtensions.TOL && (A.x < B.x ? x < A.x || x > B.x : x > A.x || x < B.x))
        return null;
      if (Math.abs(A.y - B.y) > LineExtensions.TOL && (A.y < B.y ? y < A.y || y > B.y : y > A.y || y < B.y))
        return null;

      if (Math.abs(E.x - F.x) > LineExtensions.TOL && (E.x < F.x ? x < E.x || x > F.x : x > E.x || x < F.x))
        return null;
      if (Math.abs(E.y - F.y) > LineExtensions.TOL && (E.y < F.y ? y < E.y || y > F.y : y > E.y || y < F.y))
        return null;
    }

    return new Point(x, y);
  }
}

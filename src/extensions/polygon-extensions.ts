import { IPoint, Point } from '..';

export class PolygonExtensions {
  public static IsInPolygon(point: IPoint, polygon: IPoint[]): boolean {
    let result = false;
    let a = polygon[polygon.length - 1];
    for (const b of polygon) {
      if (b.x === point.x && b.y === point.y) return true;

      if (b.y === a.y && point.y === a.y && a.x <= point.x && point.x <= b.x) return true;

      if ((b.y < point.y && a.y >= point.y) || (a.y < point.y && b.y >= point.y)) {
        if (b.x + ((point.y - b.y) / (a.y - b.y)) * (a.x - b.x) <= point.x) result = !result;
      }
      a = b;
    }
    return result;
  }

  static getCurvePoints(
    pts: IPoint[],
    tension: number = 0.5,
    isClosed: boolean = false,
    numOfSegments: number = 16,
  ): IPoint[] {
    // use input value if provided, or use a default value
    tension = typeof tension !== 'undefined' ? tension : 0.5;
    isClosed = isClosed ? isClosed : false;
    numOfSegments = numOfSegments ? numOfSegments : 16;

    const res: Point[] = []; // clone array
    let x = 0;
    let y = 0; // our x,y coords
    let t1x = 0;
    let t2x = 0;
    let t1y = 0;
    let t2y = 0; // tension vectors
    let c1 = 0;
    let c2 = 0;
    let c3 = 0;
    let c4 = 0; // cardinal points
    let st = 0;
    let t = 0;
    let i = 0; // steps based on num. of segments

    // clone array so we don't change the original
    const _pts = pts.slice(0);

    // The algorithm require a previous and next point to the actual point array.
    // Check if we will draw closed or open curve.
    // If closed, copy end points to beginning and first points to end
    // If open, duplicate first points to befinning, end points to end
    if (isClosed) {
      _pts.unshift(pts[pts.length - 1]);
      _pts.unshift(pts[pts.length - 1]);
      _pts.push(pts[0]);
      _pts.push(pts[1]);
    } else {
      _pts.unshift(pts[0]); // copy 1. point and insert at beginning
      _pts.push(pts[pts.length - 1]); // copy last point and append
    }

    // ok, lets start..

    // 1. loop goes through point array
    // 2. loop goes through each segment between the 2 pts + 1e point before and after
    for (i = 1; i < _pts.length - 2; i++) {
      for (t = 0; t <= numOfSegments; t++) {
        const pt0 = _pts[i - 1];
        const pt1 = _pts[i];
        const pt2 = _pts[i + 1];
        const pt3 = _pts[i + 2];

        // calc tension vectors
        t1x = (pt2.x - pt0.x) * tension;
        t2x = (pt3.x - pt1.x) * tension;

        t1y = (pt2.y - pt0.y) * tension;
        t2y = (pt3.y - pt1.y) * tension;

        // calc step
        st = t / numOfSegments;

        // calc cardinals
        c1 = 2 * Math.pow(st, 3) - 3 * Math.pow(st, 2) + 1;
        c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2);
        c3 = Math.pow(st, 3) - 2 * Math.pow(st, 2) + st;
        c4 = Math.pow(st, 3) - Math.pow(st, 2);

        // calc x and y cords with common control vectors
        x = c1 * pt1.x + c2 * pt2.x + c3 * t1x + c4 * t2x;
        y = c1 * pt1.y + c2 * pt2.y + c3 * t1y + c4 * t2y;

        // store points in array
        if (res.length === 0 || res[res.length - 1].x !== x || res[res.length - 1].y !== y) res.push({ x, y });
      }
    }

    return res;
  }
}

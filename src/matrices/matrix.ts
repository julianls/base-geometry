export class Matrix {
  public M11: number;
  public M12: number;
  public M13: number;
  public M14: number;
  public M21: number;
  public M22: number;
  public M23: number;
  public M24: number;
  public M31: number;
  public M32: number;
  public M33: number;
  public M34: number;
  public M41: number;
  public M42: number;
  public M43: number;
  public M44: number;

  private static identity = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

  constructor(
    m11: number,
    m12: number,
    m13: number,
    m14: number,
    m21: number,
    m22: number,
    m23: number,
    m24: number,
    m31: number,
    m32: number,
    m33: number,
    m34: number,
    m41: number,
    m42: number,
    m43: number,
    m44: number,
  ) {
    this.M11 = m11;
    this.M12 = m12;
    this.M13 = m13;
    this.M14 = m14;
    this.M21 = m21;
    this.M22 = m22;
    this.M23 = m23;
    this.M24 = m24;
    this.M31 = m31;
    this.M32 = m32;
    this.M33 = m33;
    this.M34 = m34;
    this.M41 = m41;
    this.M42 = m42;
    this.M43 = m43;
    this.M44 = m44;
  }

  public clone(): Matrix {
    return new Matrix(
      this.M11,
      this.M12,
      this.M13,
      this.M14,
      this.M21,
      this.M22,
      this.M23,
      this.M24,
      this.M31,
      this.M32,
      this.M33,
      this.M34,
      this.M41,
      this.M42,
      this.M43,
      this.M44,
    );
  }

  public equals(other: Matrix): boolean {
    return (
      this.M11 === other.M11 &&
      this.M22 === other.M22 &&
      this.M33 === other.M33 &&
      this.M44 === other.M44 &&
      this.M12 === other.M12 &&
      this.M13 === other.M13 &&
      this.M14 === other.M14 &&
      this.M21 === other.M21 &&
      this.M23 === other.M23 &&
      this.M24 === other.M24 &&
      this.M31 === other.M31 &&
      this.M32 === other.M32 &&
      this.M34 === other.M34 &&
      this.M41 === other.M41 &&
      this.M42 === other.M42 &&
      this.M43 === other.M43
    );
  }

  public static add(matrix1: Matrix, matrix2: Matrix): Matrix {
    matrix1 = matrix1.clone();

    matrix1.M11 += matrix2.M11;
    matrix1.M12 += matrix2.M12;
    matrix1.M13 += matrix2.M13;
    matrix1.M14 += matrix2.M14;
    matrix1.M21 += matrix2.M21;
    matrix1.M22 += matrix2.M22;
    matrix1.M23 += matrix2.M23;
    matrix1.M24 += matrix2.M24;
    matrix1.M31 += matrix2.M31;
    matrix1.M32 += matrix2.M32;
    matrix1.M33 += matrix2.M33;
    matrix1.M34 += matrix2.M34;
    matrix1.M41 += matrix2.M41;
    matrix1.M42 += matrix2.M42;
    matrix1.M43 += matrix2.M43;
    matrix1.M44 += matrix2.M44;
    return matrix1;
  }

  public static multiply(matrix1: Matrix, matrix2: Matrix): Matrix {
    matrix1 = matrix1.clone();

    const m11 =
      matrix1.M11 * matrix2.M11 + matrix1.M12 * matrix2.M21 + matrix1.M13 * matrix2.M31 + matrix1.M14 * matrix2.M41;
    const m12 =
      matrix1.M11 * matrix2.M12 + matrix1.M12 * matrix2.M22 + matrix1.M13 * matrix2.M32 + matrix1.M14 * matrix2.M42;
    const m13 =
      matrix1.M11 * matrix2.M13 + matrix1.M12 * matrix2.M23 + matrix1.M13 * matrix2.M33 + matrix1.M14 * matrix2.M43;
    const m14 =
      matrix1.M11 * matrix2.M14 + matrix1.M12 * matrix2.M24 + matrix1.M13 * matrix2.M34 + matrix1.M14 * matrix2.M44;
    const m21 =
      matrix1.M21 * matrix2.M11 + matrix1.M22 * matrix2.M21 + matrix1.M23 * matrix2.M31 + matrix1.M24 * matrix2.M41;
    const m22 =
      matrix1.M21 * matrix2.M12 + matrix1.M22 * matrix2.M22 + matrix1.M23 * matrix2.M32 + matrix1.M24 * matrix2.M42;
    const m23 =
      matrix1.M21 * matrix2.M13 + matrix1.M22 * matrix2.M23 + matrix1.M23 * matrix2.M33 + matrix1.M24 * matrix2.M43;
    const m24 =
      matrix1.M21 * matrix2.M14 + matrix1.M22 * matrix2.M24 + matrix1.M23 * matrix2.M34 + matrix1.M24 * matrix2.M44;
    const m31 =
      matrix1.M31 * matrix2.M11 + matrix1.M32 * matrix2.M21 + matrix1.M33 * matrix2.M31 + matrix1.M34 * matrix2.M41;
    const m32 =
      matrix1.M31 * matrix2.M12 + matrix1.M32 * matrix2.M22 + matrix1.M33 * matrix2.M32 + matrix1.M34 * matrix2.M42;
    const m33 =
      matrix1.M31 * matrix2.M13 + matrix1.M32 * matrix2.M23 + matrix1.M33 * matrix2.M33 + matrix1.M34 * matrix2.M43;
    const m34 =
      matrix1.M31 * matrix2.M14 + matrix1.M32 * matrix2.M24 + matrix1.M33 * matrix2.M34 + matrix1.M34 * matrix2.M44;
    const m41 =
      matrix1.M41 * matrix2.M11 + matrix1.M42 * matrix2.M21 + matrix1.M43 * matrix2.M31 + matrix1.M44 * matrix2.M41;
    const m42 =
      matrix1.M41 * matrix2.M12 + matrix1.M42 * matrix2.M22 + matrix1.M43 * matrix2.M32 + matrix1.M44 * matrix2.M42;
    const m43 =
      matrix1.M41 * matrix2.M13 + matrix1.M42 * matrix2.M23 + matrix1.M43 * matrix2.M33 + matrix1.M44 * matrix2.M43;
    const m44 =
      matrix1.M41 * matrix2.M14 + matrix1.M42 * matrix2.M24 + matrix1.M43 * matrix2.M34 + matrix1.M44 * matrix2.M44;

    matrix1.M11 = m11;
    matrix1.M12 = m12;
    matrix1.M13 = m13;
    matrix1.M14 = m14;
    matrix1.M21 = m21;
    matrix1.M22 = m22;
    matrix1.M23 = m23;
    matrix1.M24 = m24;
    matrix1.M31 = m31;
    matrix1.M32 = m32;
    matrix1.M33 = m33;
    matrix1.M34 = m34;
    matrix1.M41 = m41;
    matrix1.M42 = m42;
    matrix1.M43 = m43;
    matrix1.M44 = m44;
    return matrix1;
  }

  public static createScale(xScale: number, yScale: number, zScale: number): Matrix {
    const result = new Matrix(xScale, 0, 0, 0, 0, yScale, 0, 0, 0, 0, zScale, 0, 0, 0, 0, 1);
    return result;
  }

  public static createRotationZ(radians: number): Matrix {
    const returnMatrix = Matrix.identity.clone();

    const val1 = Math.cos(radians);
    const val2 = Math.sin(radians);

    returnMatrix.M11 = val1;
    returnMatrix.M12 = val2;
    returnMatrix.M21 = -val2;
    returnMatrix.M22 = val1;

    return returnMatrix;
  }

  public static createTranslation(xPosition: number, yPosition: number, zPosition: number): Matrix {
    const result = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, xPosition, yPosition, zPosition, 1);
    return result;
  }

  public static createMirror(flipX: boolean, flipY: boolean): Matrix {
    const result = Matrix.identity.clone();
    if (flipY) result.M11 = -1;
    if (flipX) result.M22 = -1;
    return result;
  }
}

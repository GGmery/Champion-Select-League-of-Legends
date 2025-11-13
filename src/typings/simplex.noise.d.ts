declare module 'simplex-noise' {
  export default class SimplexNoise {
    constructor(random?: () => number);
    noise2D(x: number, y: number): number;
    noise3D(x: number, y: number, z: number): number;
  }
}

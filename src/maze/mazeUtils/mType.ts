
const GenType = {
  aldous: 0,
  backtracking: 1,
  binaryTree: 2,

  ellers: 3,
  huntAndKill: 4,
  kruskals: 5,

  prims: 6,
  recursiveDivision: 7,
  sideWider: 8,
  wilsons: 9
}

type GenType = (typeof GenType)[keyof typeof GenType];
export { GenType };
//--------------------------------------------------
//-----------------ProjectCardGroup-----------------

import type { CardType } from "@/PalacePackage/utils/interfaces/payload";

//--------------------------------------------------
export interface ProjectCardPayload {
  title: string;
  description: string;
  year: string;
  image?: string;
  type?: CardType;
  url?: string;
  url2?: string;
}

export interface StudiesCardPayload {
  title: string;
  subtitle: string;
  year: string;
  place: string;
}

//--------------------------------------------------
const MazeGenType = {
  aldous: 0,
  binaryTree: 1,

  ellers: 2,
  kruskals: 3,

  recursiveDivision: 4,
  sideWider: 5,
  wilsons: 6
}

type MazeGenType = (typeof MazeGenType)[keyof typeof MazeGenType];
export { MazeGenType };
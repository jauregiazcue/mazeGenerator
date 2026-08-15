import { aldousBroderMaze } from "./aldous-broder";

const cellType = {
  aLeft: 0,
  aDown: 1,
  aUp: 2,
  aRight: 3,
  active: 4,
  debug: 5,
  inactive: 6,
}
type cellType = (typeof cellType)[keyof typeof cellType];

interface position {
  xStart: number,
  yStart: number,
}

interface cell {
  position: position,
  cellType: cellType,
  hasBeenSet: boolean,
  cellColor: string,
}

export interface Grid {
  list: cell[],
  cellSize: number,
  rows: number,
  cols: number,
  drawnPieces: number,
}


class Maze {
  constructor() {
    this.size = 10;
  }

  init(size?: number) {
    if (!size) size = this.size;

    size = size <= 0 ? 10 : size;

    this.maze = aldousBroderMaze(size, size);
  }

  firstDraw(ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#FFA72B";
    ctx.font = "32px Alexandria Variable";
    ctx.fillText("Click Generate",
      (width / 2) - ctx.measureText("Click Generate").width / 2, height / 2);
  }

  errorDraw(ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "red";
    ctx.font = "24px Alexandria Variable";

    ctx.fillText('WIDTH AND HEIGHT',
      (width / 2) - ctx.measureText("WIDTH AND HEIGHT").width / 2, (height / 2.25));

    ctx.fillText('MUST BE BIGGER',
      (width / 2) - ctx.measureText("MUST BE BIGGER").width / 2, (height / 2.25) + 50);

    ctx.fillText('OR EQUAL TO 10',
      (width / 2) - ctx.measureText("OR EQUAL TO 10").width / 2, (height / 2.25) + 100);
  }


  draw(ctx: CanvasRenderingContext2D) {
    console.log("Draw");
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    if (this.maze.length <= 0) return;

    //const actualSize = this.size % 2 == 0 ? this.size + 1 : this.size;
    const rectangleSize = 11;
    const rectWidth = (width / rectangleSize);
    const rectHeight = (width / rectangleSize);

    ctx.fillStyle = "#cac8b9";

    const startX = rectangleSize * (this.stepX);
    const startY = rectangleSize * (this.stepY);
    let endX = rectangleSize * (this.stepX + 1);
    if (endX >= this.maze.length) endX = this.maze.length;
    let endY = rectangleSize * (this.stepY + 1);
    if (endY >= this.maze.length) endY = this.maze.length;

    console.log("X Start: " + startX + " X End: " + endX);
    console.log("Y Start: " + startY + " Y End: " + endY);

    let fakeX = 0;
    let fakeY = 0;
    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        if (y > this.maze.length) return;
        if (x > this.maze[y].length) return;
        if (this.maze[y][x]) {
          ctx.fillRect(rectWidth * fakeY, rectHeight * fakeX,
            rectWidth, rectHeight);
        }
        else {
          ctx.clearRect(rectWidth * fakeY, rectHeight * fakeX,
            rectWidth, rectHeight);
        }
        fakeY++;
      }
      fakeX++;
      fakeY = 0;
    }
  }


  getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
  }

  handleSizeInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.size = Number(event.target.value);
  }

  handleStepXInputChange(add: number, ctx: CanvasRenderingContext2D) {
    this.stepX += add;
    if (this.stepX < 0) this.stepX = 0;
    this.draw(ctx);
  }

  handleStepYInputChange(add: number, ctx: CanvasRenderingContext2D) {
    this.stepY += add;
    if (this.stepY < 0) this.stepY = 0;
    this.draw(ctx);
  }

  stepX: number = 0;
  stepY: number = 0;
  size: number = 10;
  maze: number[][] = [];
}

export const maze: Maze = new Maze();

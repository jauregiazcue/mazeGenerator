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
      (width / 2) - ctx.measureText("WIDTH AND HEIGHT").width / 2,( height / 2.25));
      
      ctx.fillText('MUST BE BIGGER',
      (width / 2) - ctx.measureText("MUST BE BIGGER").width / 2 ,( height / 2.25) + 50);

      ctx.fillText('OR EQUAL TO 10',
      (width / 2) - ctx.measureText("OR EQUAL TO 10").width / 2 ,( height / 2.25) + 100);
  }


  draw(ctx: CanvasRenderingContext2D) {
    console.log("Draw");
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    if (this.maze.length <= 0) return;

    const rectWidth = (width / this.maze[0].length);
    const rectHeight = (height / this.maze.length);

    ctx.fillStyle = "white";
    for (let i = 0; i < this.maze.length; i++) {
      for (let j = 0; j < this.maze[i].length; j++) {
        if (this.maze[i][j]) {
          ctx.fillRect(rectWidth * j, rectHeight * i,
            rectWidth, rectHeight);
        }
        else {
          ctx.clearRect(rectWidth * j, rectHeight * i,
            rectWidth, rectHeight);
        }
      }
    }
  }


  getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
  }

  handleSizeInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.size = Number(event.target.value);
  }


  size: number = 10;

  maze: number[][] = [];
}

export const maze: Maze = new Maze();

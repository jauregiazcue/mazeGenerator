const cellType = {
  inactive: 0,
  activeWithoutConnection: 1,
  aLeft: 2,
  aDown: 3,
  aBoth: 4
}
type cellType = (typeof cellType)[keyof typeof cellType];

interface position {
  xStart: number,
  yStart: number,
}

interface cell {
  position: position,
  cellType: cellType,
}

export interface Grid {
  list: cell[],
  cellSize: number,
  rows: number,
  cols: number,
  drawnPieces: number,
}


class Laberynth {
  constructor(grid_: Grid) {
    this.grid = grid_;
  }

  generateGrid(cols: number, rows: number, cellSize: number) {
    const list: cell[] = [];
    const cellSizeAndOffset = (cellSize * 2);
    cols = (cols / (cellSizeAndOffset));
    rows = (rows / (cellSizeAndOffset));

    let x = 0.0;
    let y = 0.0;
    for (let i = 0; i < (cols * rows); i++) {
      list.push({
        position: { xStart: this.getPosition(x), yStart: this.getPosition(y), },
        cellType: this.getRandomNumber(4) + 1
      });
      x++;
      if (x >= cols) { x = 0; y += 1; }
    }


    /* for (let index = 0; index < list.length; index++) {
      const cell = list[index];
      if (cell.cellType == cellType.inactive) continue;

      let previouscell: cell | undefined = undefined;
      if (index != 0) previouscell = list[index - 1];

      let nextRowcell: cell | undefined = undefined;
      if (index + rows < list.length) nextRowcell = list[index + rows];

      if (previouscell != undefined && index % rows != 0
        && previouscell.cellType != cellType.inactive) cell.cellType = cellType.aLeft;
      if (nextRowcell != undefined && nextRowcell.cellType != cellType.inactive) {

        cell.cellType = cell.cellType == cellType.activeWithoutConnection ? cellType.aDown : cellType.aBoth;
      }
    } */

    this.grid = { list: list, cellSize: cellSize, rows: rows, cols: cols, drawnPieces: 0 };
  }

  drawCell(grid: Grid, index: number, ctx: CanvasRenderingContext2D) {
    const cell = grid.list[index];

    let xOffset = 0;
    let yOffset = 0;
    if (cell.cellType == cellType.inactive) return;


    ctx.fillRect(cell.position.xStart + xOffset,
      cell.position.yStart + yOffset,
      grid.cellSize,
      grid.cellSize
    );


    if (cell.cellType == cellType.aLeft || cell.cellType == cellType.aBoth) {
      xOffset = -grid.cellSize;
      ctx.fillRect(cell.position.xStart + xOffset,
        cell.position.yStart + yOffset + 5,
        grid.cellSize,
        grid.cellSize - 10
      );
    }

    if (cell.cellType == cellType.aDown || cell.cellType == cellType.aBoth) {
      xOffset = 0;
      yOffset = grid.cellSize;
      ctx.fillRect(cell.position.xStart + xOffset + 5,
        cell.position.yStart + yOffset,
        grid.cellSize - 10,
        grid.cellSize
      );
    }

  }

  draw = (ctx: CanvasRenderingContext2D, grid: Grid) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "black";

    ctx.beginPath();
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "white";
    if (grid.list.length < grid.drawnPieces) grid.drawnPieces = grid.list.length;
    for (let i = 0; i < grid.drawnPieces; i++) {
      this.drawCell(grid, i, ctx);
    }
    grid.drawnPieces++;
  }

  getPosition(pos: number) {
    return (this.grid.cellSize / 2) + (pos * this.grid.cellSize * 2);
  }

  getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
  }


  grid: Grid = { list: [], cellSize: 0, rows: 0, cols: 0, drawnPieces: 0 };
}

export const laberynth: Laberynth = new Laberynth({ list: [], cellSize: 0, rows: 0, cols: 0, drawnPieces: 0 });
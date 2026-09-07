import { getRandomInteger, openEntranceAndExit } from "./mUtils";

export function binaryTreeMaze(width: number, height: number) {

    const maze: number[][] = [];
    for (let row = 0; row < height; row++) {
        maze.push([]);
        for (let column = 0; column < width; column++) {
            maze[row].push((Number(!(row % 2 == 1 && column % 2 == 1))));
        }
    }
    
    for (let row = 1; row < width; row += 2) {
        for (let column = 1; column < height; column += 2) {
            let downOrRight = getRandomInteger(2);
            //force cells to not open maze outer walls
            if (column >= height - 2) downOrRight = 0;
            if (row >= width - 2) downOrRight = 1;
            
            if (downOrRight) maze[column + 1][row] = 0;
            else maze[column][row + 1] = 0;
        }
    }

    openEntranceAndExit(maze, width, height);

    return maze;
}
import { divide, getNumberFromBoolean, horizontalOrVertical, openEntranceAndExit } from "./mUtils";

export function recursiveDivisionMaze(width: number, height: number) {
    const maze: number[][] = [];

    for (let row = 0; row < height; row++) {
        maze.push([]);
        for (let column = 0; column < width; column++) {
            maze[row].push(getNumberFromBoolean(row == 0 ||
                column == 0 ||
                row == height - 1 ||
                column == width - 1));
        }
    }
    
    divide(maze, [1, height - 2], [1, width - 2], horizontalOrVertical(1, 1));

    openEntranceAndExit(maze, width, height);

    return maze;

}

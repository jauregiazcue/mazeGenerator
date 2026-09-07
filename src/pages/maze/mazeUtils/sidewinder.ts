import { getRandomInteger, openEntranceAndExit } from "./mUtils";

export function sidewinderMaze(width: number, height: number) {
    const maze: number[][] = [];
    for (let row = 0; row < height; row++) {
        maze.push([]);
        for (let column = 0; column < width; column++) {
            maze[row].push(Number(!(row % 2 == 1 && column % 2 == 1)));
        }
    }

    for (let row = 1; row < height; row += 2) {
        let begin = 1;
        for (let col = 1; col < width; col += 2) {
            let ctn = (row == 1) ? 1 : getRandomInteger(2);
            if (col == width - 2) ctn = 0;
            if (ctn) maze[row][col + 1] = 0;

            if (!ctn && row != 1) {
                let up = getRandomInteger((col - begin)) + begin;
                up = up % 2 ? up : up + 1;
                maze[row - 1][up] = 0;

                begin = col + 2;
            }
        }
    }

    openEntranceAndExit(maze, width, height);

    return maze;

}

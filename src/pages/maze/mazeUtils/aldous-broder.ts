import { neighbours, getRandomInteger, openEntranceAndExit } from "./mUtils";


export function aldousBroderMaze(width: number, height: number) {
    const maze: number[][] = [];
    let notVisited = Math.floor(width / 2) * Math.floor(height / 2);

    // Set all cells as walls
    for (let row = 0; row < height; row++) {
        maze.push([]);
        for (let column = 0; column < width; column++) {
            maze[row].push(1);
        }
    }
    
    let on = [];
    on[0] = getRandomInteger(height - 2) + 1;
    if (on[0] % 2 == 0) on[0]++;
    on[1] = getRandomInteger(width - 2) + 1;
    if (on[1] % 2 == 0) on[1]++;


    maze[on[0]][on[1]] = 0;
    notVisited--;

    while (notVisited > 0) {
        const n = neighbours(maze, on[0], on[1]);
        const to = n[getRandomInteger(n.length)];

        if (maze[to[0]][to[1]] == 1) {
            maze[to[0]][to[1]] = 0;
            // Remove wall between on and to
            maze[(to[0] + on[0]) / 2][(to[1] + on[1]) / 2] = 0;
            notVisited--;
        }
        on = to;
    }

    openEntranceAndExit(maze, width, height);

    return maze;
}

import { complete, findCoord, neighbors } from "./mUtils";


export function huntAndKillMaze(width: number, height: number) {




    // Fill maze with 1's (walls)
    const maze: number[][] = [];
    for (let i = 0; i < height; i++) {
        maze.push([]);
        for (let j = 0; j < width; j++) {
            maze[i].push(1);
        }
    }

    // Opening at top - start of maze
    maze[0][1] = 0;
    maze[1][1] = 0;

    let on = [1, 1];

    while (!complete(maze)) {

        const n = neighbors(maze, on[0], on[1]);
        if (n.length == 0) {
            const t = findCoord(maze);
            if (t == undefined) return maze;
            on = t[0];

            maze[on[0]][on[1]] = 0;
            maze[(on[0] + t[1][0]) / 2][(on[1] + t[1][1]) / 2] = 0;
        } else {

            const i = Math.floor(Math.random() * n.length);
            const nb = n[i];
            maze[nb[0]][nb[1]] = 0;
            maze[(nb[0] + on[0]) / 2][(nb[1] + on[1]) / 2] = 0;

            on = nb.slice();

        }

    }

    maze[height - 2][width - 1] = 0;

    return maze;

}






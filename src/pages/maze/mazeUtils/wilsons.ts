import { complete, getRandomInteger, indexOfCoord, neighbours, openEntranceAndExit, randCoord } from "./mUtils";


export function wilsonsMaze(width: number, height: number) {
    const maze: number[][] = [];
    for (let row = 0; row < height; row++) {
        maze.push([]);
        for (let column = 0; column < width; column++) {
            maze[row].push(1);
        }
    }

    const s = randCoord(width, height);
    maze[s[0]][s[1]] = 0;

    while (!complete(maze)) {
        let cell;
        do {
            cell = randCoord(width, height);
        } while (maze[cell[0]][cell[1]] != 1);

        maze[cell[0]][cell[1]] = 2;

        const path = [cell];
        while (maze[path[path.length - 1][0]][path[path.length - 1][1]] != 0) {


            let last = path[path.length - 1];
            const n = neighbours(maze, last[0], last[1]);
            const nb = n[getRandomInteger(n.length)];

            path.push(nb);

            maze[(nb[0] + last[0]) / 2][(nb[1] + last[1]) / 2] = 2;
            if (maze[nb[0]][nb[1]] == 0) {

                for (let row = 0; row < height; row++) {
                    for (let column = 0; column < width; column++) {
                        if (maze[row][column] == 2)
                            maze[row][column] = 0;
                    }
                }
            }

            else {

                maze[nb[0]][nb[1]] = 2;
                const loc = indexOfCoord(path, nb);
                if (loc != path.length - 1) {

                    const removed = path.splice(loc + 1, path.length - loc - 1);
                    maze[(nb[0] + last[0]) / 2][(nb[1] + last[1]) / 2] = 1;
                    last = path[path.length - 1];

                    for (let k = removed.length - 1; k >= 0; k--) {
                        const on = removed[k];
                        const next = k ? removed[k - 1] : last;

                        if (k != removed.length - 1)
                            maze[on[0]][on[1]] = 1;

                        maze[(on[0] + next[0]) / 2][(on[1] + next[1]) / 2] = 1;
                    }

                }

            }

        }

    }

    openEntranceAndExit(maze, width, height);

    return maze;

}
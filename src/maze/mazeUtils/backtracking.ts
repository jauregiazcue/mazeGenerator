import { neighbors } from "./mUtils";

export function backtrackingMaze(width: number, height: number) {

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

    const start = [];
    do {
        start[0] = Math.floor(Math.random() * height)
    } while (start[0] % 2 == 0);
    do {
        start[1] = Math.floor(Math.random() * width)
    } while (start[1] % 2 == 0);

    maze[start[0]][start[1]] = 0;

    // First open cell
    const openCells = [start];

    while (openCells.length) {

        let cell: number[] = [];
        let n: number[][] = [];
        // Add unnecessary element for elegance of code
        // Allows openCells.pop() at beginning of do while loop
        openCells.push([-1, -1]);

        // Define current cell as last element in openCells
        // and get neighbors, discarding "locked" cells
        do {
            openCells.pop();
            if (openCells.length == 0)
                break;
            cell = openCells[openCells.length - 1];
            n = neighbors(maze, cell[0], cell[1]);
        } while (n.length == 0 && openCells.length > 0);

        // If we're done, don't bother continuing
        if (openCells.length == 0)
            break;

        // Choose random neighbor and add it to openCells
        const choice = n[Math.floor(Math.random() * n.length)];
        openCells.push(choice);

        // Set neighbor to 0 (path, not wall)
        // Set connecting node between cell and choice to 0
        maze[choice[0]][choice[1]] = 0;
        maze[(choice[0] + cell[0]) / 2][(choice[1] + cell[1]) / 2] = 0;
    }

    // Opening at bottom - end of maze
    maze[maze.length - 1][maze[0].length - 2] = 0;
    maze[maze.length - 2][maze[0].length - 2] = 0;

    return maze;
}


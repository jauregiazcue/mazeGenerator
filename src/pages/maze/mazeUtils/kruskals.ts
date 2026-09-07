import { getRandomInteger, indexOfSet, openEntranceAndExit } from "./mUtils";

export function kruskalsMaze(width: number, height: number) {

    // Initialize maze: each square is its own set
    const maze: number[][] = [];
    const sets: [number[][]] = [[]];
    const setConnectors: number[][] = [];

    for (let row = 0; row < height; row++) {
        maze.push([]);
        for (let column = 0; column < width; column++) {
            //If it is in the edge of the maze, make it a wall
            const add = Number((row % 2 == 0 || column % 2 == 0));
            maze[row].push(add);

            if (add == 0) sets.push([[row, column]]);

            // Left and Down of each cell
            if (row != height - 2 && add == 0)
                setConnectors.push([row + 1, column]);

            if (column != width - 2 && add == 0)
                setConnectors.push([row, column + 1]);
        }
    }


    while (setConnectors.length) {
        //Get a random connector and remove it from the list
        const index = getRandomInteger(setConnectors.length);
        const removed = setConnectors.splice(index, 1)[0];
        let cell1, cell2;


        if (removed[0] % 2) {
            //horizontal connection
            cell1 = [removed[0], removed[1] - 1];
            cell2 = [removed[0], removed[1] + 1];
        }
        else {
            //vertical connection
            cell1 = [removed[0] - 1, removed[1]];
            cell2 = [removed[0] + 1, removed[1]];
        }

        let firstIndex = indexOfSet(sets, cell1);
        const secondIndex = indexOfSet(sets, cell2);

        // If the two cells are in different sets,
        // merge them and remove the wall
        if (firstIndex != secondIndex) {
            const add: number[][] = sets.splice(secondIndex, 1)[0];
            // If the second set was before the first, 
            // the first's index has changed
            if (secondIndex < firstIndex) firstIndex--;
            // Merge the two sets
            sets[firstIndex] = sets[firstIndex].concat(add);
            // Remove the wall
            maze[removed[0]][removed[1]] = 0;
        }
    }

    openEntranceAndExit(maze, width, height);
    return maze;

}
import { neighbors } from "./mUtils";

export function primsMaze(width : number, height : number){
    
    
    
    
    // Fill maze with 1's (walls)
    const maze : number[][]=[];
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
    
    // While openCells is not empty
    while (openCells.length) {
        
        // Get random cell from openCells and generate neighbors
        let index = Math.floor(Math.random() * openCells.length);
        let cell = openCells[index];
        let n = neighbors(maze, cell[0], cell[1]);
        
        // If no neighbors, remove cell from openCells and regenerate
        while (n.length == 0) {
            openCells.splice(index, 1);
            if (openCells.length == 0) { break; }
            
            index = Math.floor(Math.random() * openCells.length);
            cell = openCells[index];
            n = neighbors(maze, cell[0], cell[1]);
        }
        if (openCells.length == 0) { break; }

        // Random choice from all neighbors added to openCells
        const choice = n[Math.floor(Math.random() * n.length)];
        openCells.push(choice);
        
        // If that was the only neighbor (length of neighbors array == 0)
        // then remove initial cell from openCells
        if (n.length == 1) {
            openCells.splice(index, 1);
        }
        
        // Set neighbor to 0 (path, not wall)
        // Set connecting node between cell and choice to 0
        maze[ choice[0] ][ choice[1] ] = 0;
        maze[ (choice[0] + cell[0]) / 2 ][ (choice[1] + cell[1]) / 2 ] = 0;
        
    }
    
    // Opening at bottom - end of maze
    maze[maze.length - 1][maze[0].length - 2] = 0;
    maze[maze.length - 2][maze[0].length - 2] = 0;
    
    return maze;
}


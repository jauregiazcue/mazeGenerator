

export function aldousBroderMaze(width : number, height : number) {
    
    // Make dimensions odd
    width -= width % 2; width++;
    height -= height % 2; height++;
    
    // Initialize maze: each square is its own set
    const maze : number[][]  = [];
    let unvisited = 0;
    
    for (let i = 0; i < height; i++) {
        maze.push([]);
        for (let j = 0; j < width; j++) {
            if ((i % 2 == 1 && j % 2 == 1))
                unvisited++;
            
            maze[i].push(1);
        }
    }
    let on = [];
    
    do {
        on[0] = Math.floor(Math.random() * height);
        on[1] = Math.floor(Math.random() * width);
    } while (on[0] % 2 == 0 || on[1] % 2 == 0);
    
    maze[on[0]][on[1]] = 0;
    unvisited--;
    
    while (unvisited > 0) {
        const n = neighborsAB(maze, on[0], on[1]);
        const to = n[Math.floor(Math.random() * n.length)];
        
        if (maze[to[0]][to[1]] == 1) {
            maze[to[0]][to[1]] = 0;
            maze[(to[0] + on[0]) / 2][(to[1] + on[1]) / 2] = 0;
            unvisited--;
        }
        on = to;
    }
    
    maze[0][1] = 0;
    maze[height - 1][width - 2] = 0;
    
    return maze;
    
}

function neighborsAB(maze : number[][], ic: number, jc: number) {
    const final = [];
    for (let i = 0; i < 4; i++) {
        const n = [ic, jc];
        
        // Iterates through four neighbors
        // [i][j - 2] 
        // [i][j + 2]
        // [i - 2][j]
        // [i + 2][j]
        n[i % 2] += ((Math.floor(i / 2) * 2) || -2);
        if (n[0] < maze.length && 
            n[1] < maze[0].length && 
            n[0] > 0 && 
            n[1] > 0) {
            
            final.push(n);
        }
    }
    return final;
}
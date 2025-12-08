(() => {

    // ---------------------------------------
    // MAZE BASE SETUP
    // ---------------------------------------
    const canvas = document.getElementById('maze');
    const ctx = canvas.getContext('2d');

    const newBtn = document.getElementById('new');
    const resetBtn = document.getElementById('reset');
    const skipBtn = document.getElementById('skipBtn');   // NEW BUTTON
    const timerDisplay = document.getElementById("mazeTimer");

    let cols = 26, rows = 18, cellSize = 28;
    let grid = [], stack = [], solutionPath = null;
    let player = { x: 0, y: 0 };
    let goal = { x: 0, y: 0 };

    // ---------------------------------------
    // INITIALIZE MAZE
    // ---------------------------------------
    function init() {
        canvas.width = cols * cellSize;
        canvas.height = rows * cellSize;

        grid = [];

        // create grid
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                grid.push({ x, y, visited: false, walls: [true, true, true, true] });
            }
        }

        stack = [];
        carve(0, 0);

        player = { x: 0, y: 0 };
        goal = { x: cols - 1, y: rows - 1 };
        solutionPath = null;

        draw();
        startMazeTimer();
    }

    // ---------------------------------------
    // MAZE GENERATION (DFS)
    // ---------------------------------------
    function index(x, y) {
        if (x < 0 || y < 0 || x >= cols || y >= rows) return -1;
        return y * cols + x;
    }

    function carve(sx, sy) {
        const start = grid[index(sx, sy)];
        start.visited = true;
        stack.push(start);

    //     while (stack.length) {
    //         let current = stack[stack.length - 1];
    //         let n = getNeighbors(current);

    //         if (n.length > 0) {
    //             const pick = n[Math.floor(Math.random() * n.length)];
    //             const next = pick.cell;
    //             const d = pick.dir;

    //             current.walls[d] = false;
    //             next.walls[(d + 2) % 4] = false;
    //             next.visited = true;

    //             stack.push(next);
    //         } else {
    //             stack.pop();
    //         }
    //     }
    // }

    function getNeighbors(cell) {
        const dirs = [ [0,-1], [1,0], [0,1], [-1,0] ];
        let arr = [];

        for (let i = 0; i < 4; i++) {
            const nx = cell.x + dirs[i][0];
            const ny = cell.y + dirs[i][1];
            const id = index(nx, ny);
            if (id !== -1 && !grid[id].visited) arr.push({ cell: grid[id], dir: i });
        }

        return arr;
    }

    // ---------------------------------------
    // DRAWING
    // ---------------------------------------
    function drawMaze() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        for (let c of grid) {
            const x = c.x * cellSize,
                  y = c.y * cellSize;

            if (c.walls[0]) drawLine(x, y, x + cellSize, y);
            if (c.walls[1]) drawLine(x + cellSize, y, x + cellSize, y + cellSize);
            if (c.walls[2]) drawLine(x + cellSize, y + cellSize, x, y + cellSize);
            if (c.walls[3]) drawLine(x, y + cellSize, x, y);
        }
    }

    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function drawPlayer() {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(
            player.x * cellSize + cellSize / 2,
            player.y * cellSize + cellSize / 2,
            cellSize * 0.3,
            0, Math.PI * 2
        );
        ctx.fill();
    }

    function drawGoal() {
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(
            goal.x * cellSize + cellSize / 2,
            goal.y * cellSize + cellSize / 2,
            cellSize * 0.3,
            0, Math.PI * 2
        );
        ctx.fill();
    }



    function draw() {
        drawMaze();
        drawGoal();
        drawPlayer();
    }

    // ---------------------------------------
    // PLAYER MOVEMENT
    // ---------------------------------------
    function move(dx, dy) {
        const nx = player.x + dx;
        const ny = player.y + dy;

        const id = index(player.x, player.y);
        const current = grid[id];

        let dir;
        if (dx === 0 && dy === -1) dir = 0;
        if (dx === 1 && dy === 0) dir = 1;
        if (dx === 0 && dy === 1) dir = 2;
        if (dx === -1 && dy === 0) dir = 3;

        if (!current.walls[dir]) {
            player.x = nx;
            player.y = ny;
        }

        draw();

        checkGoal();
    }

    window.addEventListener('keydown', e => {
        if (["ArrowUp","w","W"].includes(e.key)) move(0, -1);
        if (["ArrowDown","s","S"].includes(e.key)) move(0, 1);
        if (["ArrowLeft","a","A"].includes(e.key)) move(-1, 0);
        if (["ArrowRight","d","D"].includes(e.key)) move(1, 0);
    });

    newBtn.addEventListener('click', init);

    resetBtn.addEventListener('click', () => {
        player.x = 0;
        player.y = 0;
        draw();
    });

    // ---------------------------------------
    // ⏳ TIMER + RETURN LOGIC
    // ---------------------------------------
    let timeLeft = 120;
    let mazeTimer;

    function startMazeTimer() {
        timeLeft = 120;
        timerDisplay.textContent = timeLeft;

        clearInterval(mazeTimer);

        mazeTimer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(mazeTimer);
                alert("⏳ Time's up! Returning to quiz...");
                returnToQuiz();
            }
        }, 1000);
    }

    // ---------------------------------------
    // 🎉 GOAL REACHED
    // ---------------------------------------
    function checkGoal() {
        if (player.x === goal.x && player.y === goal.y) {
            clearInterval(mazeTimer);
            alert("🎉 Hurray! You completed the maze in time!");
            showLoadingThenReturn();
        }
    }

    // ---------------------------------------
    // SKIP BUTTON
    // ---------------------------------------
    skipBtn.addEventListener("click", () => {
        clearInterval(mazeTimer);
        alert("Skipped! Returning to game...");
        showLoadingThenReturn();
    });

    // ---------------------------------------
    // LOADING SCREEN + RETURN
    // ---------------------------------------
function showLoadingThenReturn() {
  document.getElementById('mazeLoading').style.display = 'flex';
  setTimeout(() => {
  returnToQuiz();
}, 1000);
}


    // ---------------------------------------
    // FINAL RETURN FUNCTION
    // ---------------------------------------
    function returnToQuiz() {
        window.location.href = "question.html";
    }

    // Start maze
    init();

})();


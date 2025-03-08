document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const canvas = document.getElementById('game-board');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const restartBtn = document.getElementById('restart-btn');
    const finalScoreElement = document.getElementById('final-score');
    const gameOverModal = document.getElementById('game-over');
    const difficultyButtons = document.querySelectorAll('.diff-btn');
    
    // 游戏配置
    const gridSize = 20;
    const gridWidth = canvas.width / gridSize;
    const gridHeight = canvas.height / gridSize;
    
    // 游戏变量
    let snake = [];
    let food = {};
    let direction = 'right';
    let nextDirection = 'right';
    let score = 0;
    let gameSpeed = 200; // 默认速度 (ms)
    let gameInterval;
    let isPaused = false;
    let isGameRunning = false;
    
    // 颜色配置
    const colors = {
        background: '#ecf0f1',
        snake: '#2ecc71',
        snakeHead: '#27ae60',
        food: '#e74c3c',
        border: '#34495e'
    };
    
    // 初始化游戏
    function initGame() {
        // 初始化蛇
        snake = [
            {x: 5, y: 10},
            {x: 4, y: 10},
            {x: 3, y: 10}
        ];
        
        // 随机生成食物
        generateFood();
        
        // 重置方向
        direction = 'right';
        nextDirection = 'right';
        
        // 重置分数
        score = 0;
        scoreElement.textContent = score;
        
        // 更新游戏状态
        isGameRunning = true;
        isPaused = false;
        
        // 启动游戏循环
        if (gameInterval) {
            clearInterval(gameInterval);
        }
        gameInterval = setInterval(gameLoop, gameSpeed);
        
        // 更新按钮状态
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    }
    
    // 游戏主循环
    function gameLoop() {
        if (isPaused) return;
        
        update();
        draw();
    }
    
    // 更新游戏状态
    function update() {
        // 确定下一步的方向
        direction = nextDirection;
        
        // 获取蛇头位置
        const head = {...snake[0]};
        
        // 根据方向移动蛇头
        switch(direction) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }
        
        // 左右穿墙
        if (head.x < 0) {
            head.x = gridWidth - 1;
        } else if (head.x >= gridWidth) {
            head.x = 0;
        }
        
        // 检测上下碰墙
        if (head.y < 0 || head.y >= gridHeight) {
            gameOver();
            return;
        }
        
        // 检测自身碰撞
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver();
            return;
        }
        
        // 添加新头部
        snake.unshift(head);
        
        // 检测是否吃到食物
        if (head.x === food.x && head.y === food.y) {
            // 增加分数
            score += 10;
            scoreElement.textContent = score;
            
            // 生成新食物
            generateFood();
        } else {
            // 如果没吃到食物，移除蛇尾
            snake.pop();
        }
    }
    
    // 绘制游戏
    function draw() {
        // 清空画布
        ctx.fillStyle = colors.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 绘制蛇
        snake.forEach((segment, index) => {
            // 蛇头特殊颜色
            if (index === 0) {
                ctx.fillStyle = colors.snakeHead;
            } else {
                ctx.fillStyle = colors.snake;
            }
            
            // 绘制蛇身体部分（略小一点以产生网格效果）
            const padding = 1;
            ctx.fillRect(
                segment.x * gridSize + padding,
                segment.y * gridSize + padding,
                gridSize - 2 * padding,
                gridSize - 2 * padding
            );
            
            // 为蛇头添加眼睛
            if (index === 0) {
                ctx.fillStyle = 'white';
                
                // 根据方向绘制眼睛
                const eyeSize = 3;
                const eyePadding = 5;
                
                if (direction === 'right' || direction === 'left') {
                    // 水平方向的眼睛
                    const eyeX = direction === 'right' ? segment.x * gridSize + gridSize - eyePadding : segment.x * gridSize + eyePadding - eyeSize;
                    
                    ctx.fillRect(
                        eyeX,
                        segment.y * gridSize + eyePadding,
                        eyeSize,
                        eyeSize
                    );
                    
                    ctx.fillRect(
                        eyeX,
                        segment.y * gridSize + gridSize - eyePadding - eyeSize,
                        eyeSize,
                        eyeSize
                    );
                } else {
                    // 垂直方向的眼睛
                    const eyeY = direction === 'down' ? segment.y * gridSize + gridSize - eyePadding : segment.y * gridSize + eyePadding - eyeSize;
                    
                    ctx.fillRect(
                        segment.x * gridSize + eyePadding,
                        eyeY,
                        eyeSize,
                        eyeSize
                    );
                    
                    ctx.fillRect(
                        segment.x * gridSize + gridSize - eyePadding - eyeSize,
                        eyeY,
                        eyeSize,
                        eyeSize
                    );
                }
            }
        });
        
        // 绘制食物
        ctx.fillStyle = colors.food;
        ctx.beginPath();
        ctx.arc(
            food.x * gridSize + gridSize / 2,
            food.y * gridSize + gridSize / 2,
            gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
    
    // 生成食物
    function generateFood() {
        let newFood;
        let foodOnSnake;
        
        do {
            foodOnSnake = false;
            newFood = {
                x: Math.floor(Math.random() * gridWidth),
                y: Math.floor(Math.random() * gridHeight)
            };
            
            // 检查食物是否与蛇重叠
            for (let i = 0; i < snake.length; i++) {
                if (snake[i].x === newFood.x && snake[i].y === newFood.y) {
                    foodOnSnake = true;
                    break;
                }
            }
        } while (foodOnSnake);
        
        food = newFood;
    }
    
    // 游戏结束
    function gameOver() {
        clearInterval(gameInterval);
        isGameRunning = false;
        
        finalScoreElement.textContent = score;
        gameOverModal.style.display = 'flex';
        
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
    
    // 暂停游戏
    function togglePause() {
        if (!isGameRunning) return;
        
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? '继续' : '暂停';
    }
    
    // 键盘事件监听
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (direction !== 'down') nextDirection = 'up';
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (direction !== 'up') nextDirection = 'down';
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (direction !== 'right') nextDirection = 'left';
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (direction !== 'left') nextDirection = 'right';
                break;
            case ' ': // 空格键
                if (isGameRunning) togglePause();
                break;
        }
    });
    
    // 按钮点击事件
    startBtn.addEventListener('click', initGame);
    pauseBtn.addEventListener('click', togglePause);
    restartBtn.addEventListener('click', () => {
        gameOverModal.style.display = 'none';
        initGame();
    });
    
    // 难度选择
    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新选中状态
            difficultyButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 设置游戏速度
            gameSpeed = parseInt(button.getAttribute('data-speed'), 10);
            
            // 如果游戏正在运行，重新设置定时器
            if (isGameRunning) {
                clearInterval(gameInterval);
                gameInterval = setInterval(gameLoop, gameSpeed);
            }
        });
    });
    
    // 初始化绘制
    draw();
});

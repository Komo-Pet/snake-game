(() => {
    const cnv = document.querySelector('canvas');
    const ctx = cnv.getContext('2d');

    const width = cnv.width = 500;
    const height = cnv.height = 500;

    const cfg = {
        sideTiles: 50, //determine number of tiles on side (total number is x^2)
        offset: 5, //offset for grid to align dotes on center
        tileSize : width / 50,
        velocity: 10, //number of pixels per movement;
    }

    

    let coordinates = [];
    function createGrid (){
        for (i = 0; i < cfg.sideTiles; i++) {
            for (j = 0; j < cfg.sideTiles; j++){
                ctx.fillStyle = 'red';
                let gridX = width / cfg.sideTiles * i + cfg.offset;
                let gridY = height / cfg.sideTiles * j + cfg.offset;
                coordinates.push({gridX, gridY})
                ctx.beginPath();
                ctx.arc(gridX, gridY, 1, 0, Math.PI *2);
                ctx.fill();
            }
        }
    }

    let RIGHT = false;
    let LEFT = false;
    let UP = false;
    let DOWN = false;
    let score = 0;

    class Snake {
        constructor() {
            this.position = 250;
            this.x = this.y = this.position;
            
        }

        update() {
            let x = this.x;
            let y = this.y;
            let w = cfg.tileSize;
            let h = cfg.tileSize;
            
            ctx.fillStyle = 'magenta';
            ctx.beginPath();
            ctx.fillRect(x, y, w, h);
        }
        snakeEat() {
            snake.push(new Snake());
            snake[length-1] = snake[length-2];
            score += 1;
            console.log(score);
            document.getElementById('score').innerText = score;
        }

        move(){
            if (RIGHT){
                if (this.x == 490){
                    this.x = -10;
                }
                this.x += cfg.velocity;
            } else if (LEFT) {
                if (this.x == 0){
                    this.x = 500;
                }
                this.x -= cfg.velocity;
            } else if (UP) {
                if (this.y == 0){
                    this.y = 500;
                }
                this.y -= cfg.velocity;
            } else if (DOWN) {
                if (this.y == 490){
                    this.y = -10;
                }
                this.y += cfg.velocity;
            }
        }
    }

    let snake = [];
    function createSnake() {
        snake.push( new Snake() );
        snake.push( new Snake() );
        snake.push( new Snake() );
        snake.push( new Snake() );
        snake.push( new Snake() );
        for (let i = snake.length - 1; i >= 0; i--) {
            snake[i].x -= i * 10;
            snake[i].update();
        }
        //snake[0].update();       
        RIGHT = true;
    }

    class Apple {
        constructor() {
            this.position = Math.round(Math.random()* 2500);
            this.x = coordinates[this.position].gridX - cfg.offset;
            this.y = coordinates[this.position].gridY - cfg.offset;
        }

        update() {
            let x = this.x;
            let y = this.y;
            let w = cfg.tileSize;
            let h = cfg.tileSize;
            ctx.fillStyle = 'green';
            ctx.beginPath();
            ctx.fillRect(x, y, w, h);
            console.log(`apple x:${x}, y:${y}`);
        }

        eaten() {
            apple = new Apple();
            console.log(`new apple X:${apple.x}, Y:${apple.y}`);
        }
    }

    let apple;
    function createApple () {
        apple = new Apple();
    }
    
    function init(){
        createGrid();
        createApple();
        createSnake();
    }
    init();

    document.addEventListener(`keydown`, e => {
        if (e.code == "KeyA") {
            RIGHT = false;
            LEFT = true;
            UP = false;
            DOWN = false;
            //snake.update();
        } else if (e.code == "KeyS") {
            RIGHT = false;
            LEFT = false;
            UP = false;
            DOWN = true;
            //snake.update();
        } else if (e.code == "KeyW") {
            RIGHT = false;
            LEFT = false;
            UP = true;
            DOWN = false;
            //snake.update();
        } else if (e.code == "KeyD") {
            RIGHT = true;
            LEFT = false;
            UP = false;
            DOWN = false;
            //snake.update();
        }
        
    });

    function loop() {
         setTimeout(() => {
            requestAnimationFrame(loop);
            ctx.fillStyle = "rgb(218, 218, 218)";
            ctx.fillRect(0, 0, width, height);
            
            if (snake[0].x == (apple.x) && snake[0].y == (apple.y)) {
                apple.eaten();
                snake[0].snakeEat();
                console.log("eaten!")
            }
            apple.update();
            for (let i = snake.length - 1; i > 0; i--) {
                snake[i].y = snake [i-1].y;
                snake[i].x = snake [i-1].x;
                snake[i].update();
            }        
            snake[0].move(); 
            snake[0].update();
            
            
         }, 500);
    }
    loop();

})();
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    color: "blue",
    speed: 0.1,
    mass: 1,
};

const enemies = [];
const smallCells = [];

let isPlayerEaten = false;

class Cell {
    constructor(x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.mass = 1; 
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this === player) {
            const dx = player.x - this.x;
            const dy = player.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const directionX = dx / distance;
            const directionY = dy / distance;
            this.x += directionX * this.speed;
            this.y += directionY * this.speed;
        } else {
            const dx = player.x - this.x;
            const dy = player.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (this.radius > player.radius) {
                const directionX = dx / distance;
                const directionY = dy / distance;
                this.x += directionX * this.speed;
                this.y += directionY * this.speed;
            } else {
                const directionX = -dx / distance;
                const directionY = -dy / distance;
                this.x += directionX * this.speed;
                this.y += directionY * this.speed;
            }
        }
    }
}

function spawnEnemies() {
    setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 10 + Math.random() * 30;
        const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        const speed = 1 + Math.random() * 3;
        const enemy = new Cell(x, y, radius, color, speed);
        enemies.push(enemy);
    }, 1000);
}

function spawnSmallCells() {
    setInterval(() => {
        if (smallCells.length < 30) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = 5;
            const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
            const smallCell = new Cell(x, y, radius, color, 0);
            smallCells.push(smallCell);
        }
    }, 10);
}

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
}

function gameOver() {
    alert("Game Over");
    document.location.reload();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < smallCells.length; i++) {
        smallCells[i].draw();
    }

    
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        const dxPlayer = player.x - enemy.x;
        const dyPlayer = player.y - enemy.y;
        const distanceToPlayer = Math.sqrt(dxPlayer * dxPlayer + dyPlayer * dyPlayer);

        let closestTarget = player;
        let closestDistance = distanceToPlayer;

        for (let j = 0; j < smallCells.length; j++) {
            const smallCell = smallCells[j];
            const dxSmallCell = smallCell.x - enemy.x;
            const dySmallCell = smallCell.y - enemy.y;
            const distanceToSmallCell = Math.sqrt(dxSmallCell * dxSmallCell + dySmallCell * dySmallCell);

            if (distanceToSmallCell < closestDistance) {
                closestDistance = distanceToSmallCell;
                closestTarget = smallCell;
            }
        }

        const dxTarget = closestTarget.x - enemy.x;
        const dyTarget = closestTarget.y - enemy.y;
        const distanceToTarget = Math.sqrt(dxTarget * dxTarget + dyTarget * dyTarget);

        if (distanceToTarget > 0) {
            const directionX = dxTarget / distanceToTarget;
            const directionY = dyTarget / distanceToTarget;
            enemy.x += directionX * enemy.speed;
            enemy.y += directionY * enemy.speed;

            if (distanceToTarget < enemy.radius + closestTarget.radius) {
                if (closestTarget === player) {
                    if (player.radius > enemy.radius) {
                        player.radius += 2;
                        player.mass += 1;
                        enemies.splice(i, 1);
                        i--;
                    } else {
                        if (!isPlayerEaten) {
                            isPlayerEaten = true;
                            setTimeout(() => {
                                gameOver();
                            }, 5);
                        }
                    }
                } else {
                    enemy.radius += 2; 
                    enemy.mass += 1;
                    const newX = Math.random() * canvas.width;
                    const newY = Math.random() * canvas.height;
                    closestTarget.x = newX;
                    closestTarget.y = newY;
                }
            }
        }
    }

    for (let i = 0; i < enemies.length; i++) {
        const dx = player.x - enemies[i].x;
        const dy = player.y - enemies[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < player.radius + enemies[i].radius) {
            if (player.radius > enemies[i].radius) {
                player.radius += 2;
                player.mass += 1;
                enemies.splice(i, 1);
                i--;
            } else {
                if (!isPlayerEaten) {
                    isPlayerEaten = true;
                    setTimeout(() => {
                        gameOver();
                    }, 100);
                }
            }
        }
    }

    for (let i = 0; i < enemies.length; i++) {
        for (let j = i + 1; j < enemies.length; j++) {
            const dx = enemies[i].x - enemies[j].x;
            const dy = enemies[i].y - enemies[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < enemies[i].radius + enemies[j].radius) {
                if (enemies[i].radius > enemies[j].radius) {
                   
                    enemies[i].radius += enemies[j].radius / 2;
                    enemies[i].mass += 1;
                    enemies.splice(j, 1);
                    j--;
                } else {
                    
                    
                    enemies[j].radius += enemies[i].radius / 2;
                    enemies[j].mass += 1;
                    enemies.splice(i, 1);
                    i--;
                    break; 
                }
            }
        }
    }

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
        if (enemies[i].radius > player.radius) {
            enemies[i].update();
        }
    }

    for (let i = 0; i < smallCells.length; i++) {
        const dx = player.x - smallCells[i].x;
        const dy = player.y - smallCells[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < player.radius + smallCells[i].radius) {
            player.radius += 2;
            player.mass += 1;
            smallCells.splice(i, 1);
            i--;
        }
    }
    drawPlayer();

    requestAnimationFrame(update);
}


canvas.addEventListener("mousemove", (e) => {
    player.x = e.clientX - canvas.getBoundingClientRect().left;
    player.y = e.clientY - canvas.getBoundingClientRect().top;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

spawnEnemies();
spawnSmallCells();
update();
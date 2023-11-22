let player;
let walls = [];
let objects = [];
let spawnRate = 2000; // Intervalo de generación de enemigos en milisegundos
let lastSpawnTime = 0;

function setup() {
    createCanvas(400, 400);
    player = new Player(width / 2, height / 2);
    player.bulletSpeed = 5;
    player.angle = 0;

    // Crear paredes alrededor del lienzo
    walls.push(new Wall(0, 0, width, 10, true)); // Pared superior
    walls.push(new Wall(0, height - 10, width, 10, true)); // Pared inferior
    walls.push(new Wall(0, 0, 10, height, true)); // Pared izquierda
    walls.push(new Wall(width - 10, 0, 10, height, true)); // Pared derecha
}

function draw() {
    background(255);

    // Mover y dibujar las balas
    if (player) {
        // Mover y dibujar las balas
        for (let i = player.bullets.length - 1; i >= 0; i--) {
            let bullet = player.bullets[i];
            bullet.move();
            bullet.show();

            // Verificar colisiones con paredes u otros objetos aquí
            if (checkBulletCollision(bullet)) {
                player.bullets.splice(i, 1);
            }
        }
    }


    // Dibujar las paredes
    for (let wall of walls) {
        wall.show();
    }

    // Dibujar y actualizar el jugador
    if (player && player.isAlive) {    
    player.show();
    player.move();
    player.shoot();
    player.showHealth();
    player.draw();
    }

    if (player.health <= 0) {
        // Mostrar el mensaje de Game Over y el botón de reinicio
        showGameOverScreen();
    }

    // Verifica el tiempo transcurrido para la generación de enemigos
    const currentTime = millis();
    if (currentTime - lastSpawnTime > spawnRate) {
        spawnEnemy();
        lastSpawnTime = currentTime;
    }

    // Dibujar y actualizar los objetos (enemigos)
    for (let i = objects.length - 1; i >= 0; i--) {
        let obj = objects[i];
        obj.show();
    
        // Verifica si el objeto tiene el método update antes de llamarlo
        if (obj instanceof Enemy) {
            obj.update(player);
    
            // Verifica si el enemigo tiene cero de salud y elimínalo
            if (obj.health <= 0) {
                console.log("Enemy eliminated!");
                objects.splice(i, 1);
            }
        } else if (obj instanceof Bullet) {
            // Verificar colisiones con enemigos u otros objetos aquí
            if (checkBulletCollision(obj)) {
                console.log("Bullet hit!");
                objects.splice(i, 1);
            }
        }
    }

    // Verificar colisiones del jugador
    checkPlayerCollision(player);

    if (player.health <= 0) {
        player.health = 0; // Asegura que la salud sea 0
        document.getElementById('health-container').classList.add('hidden');
        showGameOverScreen(); // Llama a la función que muestra el mensaje de Game Over
    }
}
function spawnEnemy() {
    // Genera un enemigo y agrega al arreglo de objetos
    const randomWall = random(walls);
    let enemy;

    // Probabilidades de tipo de enemigo
    const rand = random();
    if (rand < 0.6) {
        enemy = new WeakEnemy(random(randomWall.x + 10, randomWall.x + randomWall.width - 10), random(randomWall.y + 10, randomWall.y + randomWall.height - 10), 10);
    } else if (rand < 0.9) {
        enemy = new ChasingEnemy(random(randomWall.x + 10, randomWall.x + randomWall.width - 10), random(randomWall.y + 10, randomWall.y + randomWall.height - 10), 15);
    } else {
        enemy = new FleeingEnemy(random(randomWall.x + 10, randomWall.x + randomWall.width - 10), random(randomWall.y + 10, randomWall.y + randomWall.height - 10), 20);
    }

    objects.push(enemy);
}

function checkBulletCollision(bullet) {
    // Verificar colisiones con enemigos u otros objetos aquí
    for (let i = objects.length - 1; i >= 0; i--) {
        let obj = objects[i];
        if (obj instanceof Enemy && obj.collidesWith(bullet)) {
            console.log("Bullet hit an enemy!");
            console.log("Bullet Damage:", bullet.damage);
            console.log("Enemy Health After Hit:", obj.health);

            // Eliminar la bala al impactar
            return true;
        }
    }

    // Verificar colisiones con paredes u otros objetos aquí
    // Devuelve true si la bala debe ser eliminada, de lo contrario, devuelve false

    // Ejemplo: Eliminar la bala si sale de la pantalla
    if (bullet.y < 0 || bullet.y > height || bullet.x < 0 || bullet.x > width) {
        console.log("Bullet out of bounds!");
        return true;
    }

    return false;
}

function checkPlayerCollision(player) {
    // Verificar colisiones con enemigos u otros objetos aquí
    for (let i = objects.length - 1; i >= 0; i--) {
        let obj = objects[i];
        if (obj instanceof Enemy && obj.collidesWithPlayer(player)) {
            if (!player.invincible) {
                const damage = obj.getDamage();
                player.takeDamage(damage);
            }
        }
    }
}

// Dentro de la función resetGame en main.js
function restartGame() {
    const gameOverContainer = document.getElementById('game-over-container');
    gameOverContainer.style.display = 'none';
    document.getElementById('health-container').classList.remove('hidden');

    // Resetear jugador
    player.reset();

    // Eliminar enemigos existentes
    objects = [];
    lastSpawnTime = 0; // Reiniciar el tiempo de generación de enemigos
}

// Dentro de la función showGameOverScreen en main.js
function showGameOverScreen() {
    const gameOverContainer = document.getElementById('game-over-container');
    gameOverContainer.style.display = 'block';

    // Reiniciar el juego cuando se haga clic en el botón "Restart"
    document.getElementById('restart-button').addEventListener('click', function() {
        resetGame();
    });
}
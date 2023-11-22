let player;
let walls = [];
let objects = [];
let spawnRate = 2000; // Intervalo de generación de enemigos en milisegundos
let lastSpawnTime = 0;

function setup() {
    createCanvas(400, 400);
    player = new Player(width / 2, height / 2);

    // Crear paredes alrededor del lienzo
    walls.push(new Wall(0, 0, width, 10, true)); // Pared superior
    walls.push(new Wall(0, height - 10, width, 10, true)); // Pared inferior
    walls.push(new Wall(0, 0, 10, height, true)); // Pared izquierda
    walls.push(new Wall(width - 10, 0, 10, height, true)); // Pared derecha
}

function draw() {
    background(255);

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

    // Dibujar las paredes
    for (let wall of walls) {
        wall.show();
    }

    // Dibujar y actualizar el jugador
    player.show();
    player.move();
    player.shoot();
    player.showHealth();

    // Verifica el tiempo transcurrido para la generación de enemigos
    const currentTime = millis();
    if (currentTime - lastSpawnTime > spawnRate) {
        spawnEnemy();
        lastSpawnTime = currentTime;
    }    

    // Dibujar y actualizar los objetos (enemigos)
    for (let obj of objects) {
        obj.show();
        // Verifica si el objeto tiene el método update antes de llamarlo
        if (obj instanceof Enemy) {
            obj.update(player);
        }
        // Implementar lógica para el reconocimiento de objetos con ml5.js
    }
}

function checkBulletCollision(bullet) {
    // Verificar colisión con las paredes
    for (let wall of walls) {
        if (collides(bullet, wall)) {
            return true;
        }
    }

    // Verificar colisión con los enemigos
    for (let obj of objects) {
        if (collides(bullet, obj)) {
            obj.health -= 10; // Puedes ajustar la cantidad de daño aquí
            return true;
        }
    }

    return false;
}

function collides(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

// En la función spawnEnemy, actualiza la creación de enemigos
function spawnEnemy() {
    // Genera un enemigo y agrega al arreglo de objetos
    const randomWall = random(walls);
    let enemy;

    // Probabilidades de tipo de enemigo
    const rand = random();
    if (rand < 0.6) {
        enemy = new WeakEnemy(10); // Usa WeakEnemy en lugar de Enemy débil
    } else if (rand < 0.9) {
        enemy = new ChasingEnemy(15); // Usa ChasingEnemy en lugar de ChasingEnemy intermedio
    } else {
        enemy = new FleeingEnemy(20); // Usa FleeingEnemy en lugar de FleeingEnemy más difícil
    }

    enemy.x += (randomWall.width - enemy.radius * 2) / 2;
    enemy.y += (randomWall.height - enemy.radius * 2) / 2;

    objects.push(enemy);
}
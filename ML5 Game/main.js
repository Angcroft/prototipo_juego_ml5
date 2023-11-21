let player;
let walls = [];
let objects = [];

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

    for (let obj of objects) {
        obj.show();
        // Implementar lógica para el reconocimiento de objetos con ml5.js
    }
}

function checkBulletCollision(bullet) {
    // Verificar colisiones con paredes u otros objetos aquí
    // Devuelve true si la bala debe ser eliminada, de lo contrario, devuelve false

    // Ejemplo: Eliminar la bala si sale de la pantalla
    if (bullet.y < 0 || bullet.y > height || bullet.x < 0 || bullet.x > width) {
        return true;
    }

    // Implementa la lógica específica de colisión con objetos o paredes aquí

    return false;
}

function checkCollision(x, y) {
    // Verifica si la posición (x, y) colisiona con una pared u otro objeto
    // Implementa lógica específica para tu juego aquí
    for (let wall of walls) {
        if (
            x > wall.x &&
            x < wall.x + wall.width &&
            y > wall.y &&
            y < wall.y + wall.height
        ) {
            if (wall.hasDoor) {
                // Verificcar colisión con la puerta
                if (
                    !(x > wall.x + (wall.width - wall.doorWidth) / 2 &&
                        x < wall.x + (wall.width + wall.doorWidth) / 2 &&
                        y > wall.y &&
                        y < wall.y + wall.doorHeight)
                ) {
                    return true; // Hay colisión
                }
            } else {
                return true; // Hay colisión con la pared
            }
        }
    }
}
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;
        this.speed = 3;
        this.health = 100;
        this.bullets = [];
        this.bulletSpeed = 5;
        this.lastShotTime = 0;
        this.shootCooldown = 1000;
        this.angle = 0;
        this.movementDirection = createVector(0, 0); // Inicializar el vector de dirección
    }

    show() {
        fill(0, 0, 255);
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        ellipse(0, 0, this.size, this.size);
        pop();
    }

    move() {
        // Actualizar la dirección de movimiento basada en las teclas presionadas
        this.movementDirection.set(0, 0);

        if (keyIsDown(87) && this.y - this.speed > 0) {
            this.movementDirection.y = -1; // Movimiento hacia arriba
        }
        if (keyIsDown(83) && this.y + this.speed < height) {
            this.movementDirection.y = 1; // Movimiento hacia abajo
        }
        if (keyIsDown(65) && this.x - this.speed > 0) {
            this.movementDirection.x = -1; // Movimiento hacia la izquierda
        }
        if (keyIsDown(68) && this.x + this.speed < width) {
            this.movementDirection.x = 1; // Movimiento hacia la derecha
        }

        // Mover el jugador en la dirección actualizada
        this.x += this.speed * this.movementDirection.x;
        this.y += this.speed * this.movementDirection.y;
    }

    shoot() {
        const currentTime = millis();
        if (keyIsDown(32) && currentTime - this.lastShotTime > this.shootCooldown) {
            const angleToMouse = atan2(mouseY - this.y, mouseX - this.x);
            const bulletX = this.x + this.size / 2 * cos(angleToMouse);
            const bulletY = this.y + this.size / 2 * sin(angleToMouse);

            this.bullets.push(new Bullet(bulletX, bulletY, this.bulletSpeed, angleToMouse));
            this.lastShotTime = currentTime;
        }
    }

    showHealth() {
        const healthSpan = document.getElementById('health');
        healthSpan.innerText = this.health;
    }
}
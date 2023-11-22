class GameObject {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    show() {
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    }
}

class Enemy extends GameObject {
    constructor(x, y, radius, color, health) {
        super(x, y, radius * 2, radius * 2, color);
        this.radius = radius;
        this.health = health;
    }

    show() {
        fill(this.color);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }
}

class WeakEnemy extends Enemy {
    constructor(radius) {
        const x = random(width);  // Posición X inicial aleatoria
        const y = random(height); // Posición Y inicial aleatoria
        super(x, y, radius * 2, radius * 2, color(0));  // Círculo negro
        this.radius = radius;
        this.speed = 2;
    }

    moveRandomly() {
        const choice = floor(random(4));  // 0: arriba, 1: abajo, 2: izquierda, 3: derecha

        switch (choice) {
            case 0:
                this.y = max(this.y - this.speed, 0);  // Mover hacia arriba
                break;
            case 1:
                this.y = min(this.y + this.speed, height - this.height);  // Mover hacia abajo
                break;
            case 2:
                this.x = max(this.x - this.speed, 0);  // Mover hacia la izquierda
                break;
            case 3:
                this.x = min(this.x + this.speed, width - this.width);  // Mover hacia la derecha
                break;
            default:
                break;
        }
    }

    update() {
        this.moveRandomly();
    }
}

class ChasingEnemy extends Enemy {
    constructor(radius) {
        const x = width - radius * 2;  // Posición X en el extremo derecho del mapa
        const y = height / 2;          // Posición Y en el centro del mapa
        super(x, y, radius * 2, radius * 2, color(255, 0, 0));  // Círculo rojo
        this.radius = radius;
        this.speed = 2;
    }

    chasePlayer(player) {
        const angleToPlayer = atan2(player.y - this.y, player.x - this.x);
        this.x += this.speed * cos(angleToPlayer);
        this.y += this.speed * sin(angleToPlayer);
    }

    update(player) {
        this.chasePlayer(player);
    }
}

class FleeingEnemy extends Enemy {
    constructor(radius) {
        const x = 0;                  // Posición X en el extremo izquierdo del mapa
        const y = height / 2;          // Posición Y en el centro del mapa
        super(x, y, radius * 2, radius * 2, color(0, 255, 0));  // Círculo verde
        this.radius = radius;
        this.speed = 2;
        this.minDistance = 50;  // Distancia mínima al jugador para comenzar a alejarse
    }

    fleeFromPlayer(player) {
        const distanceToPlayer = dist(this.x, this.y, player.x, player.y);

        if (distanceToPlayer < this.minDistance) {
            const angleToPlayer = atan2(player.y - this.y, player.x - this.x);
            const fleeRadius = this.radius * 2;  // Puedes ajustar este valor según tu preferencia

            // Limitar la distancia de alejamiento al radio del jugador
            const targetX = player.x + cos(angleToPlayer) * fleeRadius;
            const targetY = player.y + sin(angleToPlayer) * fleeRadius;

            // Mover hacia el punto de alejamiento
            this.x += this.speed * cos(angleToPlayer);
            this.y += this.speed * sin(angleToPlayer);
        }
    }

    update(player) {
        this.fleeFromPlayer(player);
    }
}
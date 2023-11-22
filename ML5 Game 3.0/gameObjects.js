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

    collidesWith(bullet) {
        console.log("Checking collision with bullet. Bullet Damage:", bullet.damage);
        
        // Verificar si la bala colisiona con el enemigo
        const distance = dist(this.x, this.y, bullet.x, bullet.y);
        if (distance < (this.radius + bullet.width) / 2) {
            console.log("Enemy Hit! Enemy Health Before Hit:", this.health);
            
            this.health -= bullet.damage;
            
            console.log("Enemy Health After Hit:", this.health);
            
            return true;
        }
        return false;
    }
}

class WeakEnemy extends Enemy {
    constructor(x, y, radius) {
        super(x, y, radius * 2, radius * 2, color(0));  // Círculo negro
        this.radius = radius;
        this.speed = 2;
        this.health = 10;
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

    getDamage() {
        return 10;
    }

    collidesWithPlayer(player) {
        if (player !== null) {
            const distance = dist(this.x, this.y, player.x, player.y);
            return distance < (this.radius + player.size) / 2;
        }
        return false; // Otra opción es lanzar una excepción o manejar el caso de `player` null según la lógica de tu aplicación
    }

    update() {
        if (player) {
            this.moveRandomly();
        }
    }


}

class ChasingEnemy extends Enemy {
    constructor(x, y, radius) {
        super(x, y, radius * 2, radius * 2, color(255, 0, 0));  // Círculo rojo
        this.radius = radius;
        this.speed = 2;
        this.health = 40;
    }

    chasePlayer(player) {
        if (player !== null) {
            const angleToPlayer = atan2(player.y - this.y, player.x - this.x);
            this.x += this.speed * cos(angleToPlayer);
            this.y += this.speed * sin(angleToPlayer);
        }
    }
    getDamage() {
        return 20;
    }

    collidesWithPlayer(player) {
        if (player !== null) {
            const distance = dist(this.x, this.y, player.x, player.y);
            return distance < (this.radius + player.size) / 2;
        }
        return false; // Otra opción es lanzar una excepción o manejar el caso de `player` null según la lógica de tu aplicación
    }

    update(player) {
        this.chasePlayer(player);
    }


}

class FleeingEnemy extends Enemy {
    constructor(x, y, radius) {
        super(x, y, radius * 2, radius * 2, color(0, 255, 255));  // Círculo celeste
        this.radius = radius;
        this.speed = 2;
        this.minDistance = 50;  // Distancia mínima al jugador para comenzar a alejarse
        this.health = 60;
    }

    fleeFromPlayer(player) {
        if (player) {
            const distanceToPlayer = dist(this.x, this.y, player.x, player.y);
    
            if (distanceToPlayer < this.minDistance) {
                const angleToPlayer = atan2(player.y - this.y, player.x - this.x);
                const fleeRadius = this.radius * 2;
    
                const targetX = player.x + cos(angleToPlayer) * fleeRadius;
                const targetY = player.y + sin(angleToPlayer) * fleeRadius;
    
                this.x += this.speed * cos(angleToPlayer);
                this.y += this.speed * sin(angleToPlayer);
            }
        }
    }

    getDamage() {
        return 30;
    }

    collidesWithPlayer(player) {
        if (player !== null) {
            const distance = dist(this.x, this.y, player.x, player.y);
            return distance < (this.radius + player.size) / 2;
        }
        return false; // Otra opción es lanzar una excepción o manejar el caso de `player` null según la lógica de tu aplicación
    }


    update(player) {
        this.fleeFromPlayer(player);

    }


}
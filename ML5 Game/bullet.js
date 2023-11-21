class Bullet extends GameObject {
    constructor(x, y, speed, angle) {
        super(x, y, 5, 10, color(255, 0, 0));
        this.speed = speed;
        this.angle = angle;
    }

    move() {
        this.x += this.speed * cos(this.angle);
        this.y += this.speed * sin(this.angle);
    }
}
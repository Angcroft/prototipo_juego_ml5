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
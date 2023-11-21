class Wall {
    constructor(x, y, width, height, hasDoor = false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hasDoor = hasDoor;
        this.doorWidth = 20;    //Ancho de la puerta
        this.doorHeight = 5;    //  Altura de la puerta
    }

    show()
    {
        fill(150, 75, 0);   //  Color para las paredes
        rect(this.x, this.y, this.width, this.height);

        if (this.hasDoor)
        {
            fill(0) //  Color negro para la puerta
            if (this.width > this.height)
            {
                //  Puerta horizontal en la pared
                rect(this.x + (this.width - this.doorWidth) / 2, this.y, this.doorWidth, this.doorHeight);
            } else {
                //  Puerta vertical en la pared
                rect(this.x, this.y + (this.height - this.doorHeight) / 2, this.doorWidth, this.doorHeight);
            }
        }
    }
}
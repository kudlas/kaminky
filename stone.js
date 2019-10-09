class Stone {

    constructor(side) {
        this.id = stoneCounter++;
        this.side = side;
        this.size = 55;
        this.isLast = false;
    }

    getDirection() {
        return this.side ? 1 : -1;
    }

    setOppositeSide() {
        this.side = !this.side;
    }

    setLastStone() {
        this.isLast = true;
    }

    getColor() {
        return this.side === true ? 0 : 255;
    }

    draw(x, y) {
        fill(this.getColor());
        circle(x, y, this.size);
        fill(240,5,5);
        textSize(20);
        text(this.id,x,y+20);

        if(this.isLast) {
            fill(10, 10, 200);
            circle(x, y, 20);
        }
    }

}

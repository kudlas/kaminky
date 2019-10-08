class Tile {

    constructor(x, y) {
        this.id = 0.5 * (x+y)*(x+y+1)+y; // pairing function
        this.tileSize = tileSize;
        this.x = x;
        this.y = y;
        this.stoneToChange = null;

        this.stone = null;
        this.defaultBg = `#ece8c2`;
        this.activeBg = `#aeaeae`;
        this.placeBg = `#f0f8ff`;

        this.isClicked = false;

        this.isPossiblePlace = false;

        this.xStart = x * this.tileSize;
        this.yStart = y * this.tileSize;

        this.dontMove = false; // when doing multijump, dont allow normal movement
    }


    removeStone() {
        this.setStone(null);
    }

    setStone(stone) {
        this.stone = stone;
    }

    isInteracting(x, y) {
        if (x >= this.xStart &&
            x <= (this.xStart + this.tileSize)) {

            if (y >= this.yStart &&
                y <= (this.yStart + this.tileSize)) {
                return true
            }
        }
        return false;
    }

    clicked(plan) {

        if (this.stone != null) {

            // you cant play with the last one
            if(this.stone.isLast) return;

            this.isClicked=true;

            // posible move positions
            if(!this.dontMove) {
                let x = this.x;
                let y = this.y;

                let possibleTile = plan.getTile(x, y + (1 * this.stone.getDirection())); // plan[x][y + (1 * this.stone.getDirection())];

                if (possibleTile !== null && possibleTile.stone === null) {
                    possibleTile.setPossiblePlace();
                }
            }

            let jumps = plan.getPossibleJumps(this.x, this.y);

            jumps.forEach(jump =>{
                jump.landingTile.setPossiblePlace();
                jump.landingTile.stoneToChange = jump.jumpedStone;
            });

        }
    }

    setPossiblePlace() {
        this.isPossiblePlace = true;
    }

    unclick() {
        this.isClicked=false;
        this.isPossiblePlace = false;
        this.stoneToChange = null;
        this.dontMove = false;
    }

    getBgColor() {
        let ret = this.defaultBg;
        if(this.isClicked) {
            ret = this.activeBg;
        }

        if(this.isPossiblePlace) {
            ret = this.placeBg;
        }

        return ret;
    }

    draw(strokeCol) {
        let size = this.tileSize;
        stroke(strokeCol);
        fill( this.getBgColor() );
        rect(this.x * size, this.y * size, size, size);

        if (this.stone !== null) {
            let stoneX = (this.x * size) + (size / 2);
            let stoneY = (this.y * size) + (size / 2);

            this.stone.draw(stoneX, stoneY);
        }

        fill(0, 255, 0);
        textSize(32);
        //this.id, this.x * size + (size / 3), this.y * size + (size / 2));

    }

}
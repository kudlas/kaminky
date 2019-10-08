class GameMaster {

    // TODO při jumpu se nejspíš neodebírá kámen

    constructor(xT, yT) {
        this.xT = xT;
        this.yT = yT;
        this.plan = new Plan(xTiles, yTiles);

        this.selectedTiles = [];

        this.turn = false;
        this.stones = [];
        this.disableSelecting = false; // when multijumping dissalow selecting other stones.

        this.ai = new Ai(this);
    }

    newGame() {
        for (let x = 0; x < this.xT; x++) {
            for (let y = 0; y < this.yT; y++) {
                let newTile = new Tile(x, y);

                this.plan.addTile(x, y, newTile);

                if (y === 1 || y === 4) {
                    let stone = new Stone(y === 1);
                    newTile.setStone(stone);
                    this.stones.push(stone);
                }

            }
        }
    }

    // při označení kamene udělat pole možných pohybů a v clicku ho jen prohledávat?
    click(x, y) {

        let tile = this.plan.getTile(Math.floor(x / tileSize), Math.floor(y / tileSize));

        if(tile===null) return;

        let removeTile = this.getLastClickedTile();

        if (!tile.isPossiblePlace) {
            // when multijumping, allow only possible places to be moved on
            if(this.disableSelecting) return;

            this.unclickTiles();
            if (tile.stone === null) return;
            // disable clicking on stones, that belongs to different turn
            if (tile.stone.side == this.turn) {
                this.selectedTiles.push(tile);
                tile.clicked(this.plan);
            }
        } else {
            tile.setStone(removeTile.stone);

            if (tile.stoneToChange !== null) {
                // it was jumping
                tile.stoneToChange.setOppositeSide();
                tile.stoneToChange.isLast = false;

                let isMultiJumpPossible = ((this.plan.getPossibleJumps(tile.x, tile.y)).length > 0);

                if(isMultiJumpPossible) {
                    this.disableSelecting = true;
                    this.unclickTiles();
                    this.selectedTiles.push(tile);
                    removeTile.removeStone();
                    tile.dontMove = true;
                    tile.clicked(this.plan);
                    return;
                } else
                {
                    this.disableSelecting = false;
                }
            }

            // set stone which cannot be moved next turn
            this.forgetLastStones(tile.stone.side);
            tile.stone.setLastStone();

            removeTile.removeStone();
            this.unclickTiles();

            this.ai.turn();
            this.turn = !this.turn;
        }
    }

    forgetLastStones(side) {
        this.stones.forEach(stone => {
            if (stone.side === side) {
                stone.isLast = false;
            }
        });
    }

    unclickTiles() {
        this.plan.allTiles.forEach(function (i) {
            i.unclick();
        });
    }

    getLastClickedTile() {
        let len = this.selectedTiles.length;
        if (len >= 1) {
            return this.selectedTiles[len - 1]
        }
    }

    update() {
        let _that = this;
        this.plan.allTiles.forEach(function (i) {
            i.draw(_that.turn ? 0 : 255);
        });
    }

    isGameFinished() {

    }

}



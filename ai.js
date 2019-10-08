class Ai {

    constructor(gm) {
        this.gameMaster = gm;

        this.enemyTiles = [];
        this.alliedTiles = [];
    }

    turn() {
        console.log("my turn babe", this.gameMaster);
        this.getStonesAndMoves();
    }

    getStonesAndMoves() {
        this.gameMaster.plan.allTiles.forEach((tile) => {
            if (tile.stone !== null) {
                if (tile.stone.side) {
                    this.enemyTiles.push(this.getAiTile(tile));
                } else {
                    this.alliedTiles.push(this.getAiTile(tile));
                }
            }
        });
    }

    getAiTile(tile) {
        return {x: tile.x, y: tile.y, side: tile.stone.side, canMove: !tile.stone.isLast};
    }


}

class Ai {

    constructor(gm) {
        this.gameMaster = gm;
        this.mySide = false;
        this.tiles = [];

        this.moves = [];
    }

    beginTurn(turn) {
        setTimeout( () => {
            console.log("my turn babe", this.gameMaster);
            this.mySide = turn;
            this.getStonesAndMoves();

            // do stuff
            let myMove = random(this.moves);
            console.log("recommended move", myMove);
            this.gameMaster.click(myMove.from.x * tileSize, myMove.from.y * tileSize);
            console.log("I clicked");

            this.gameMaster.click(myMove.to.x * tileSize, myMove.to.y * tileSize);

        }, 500);
    }

    getStonesAndMoves() {

        this.moves = [];

        this.gameMaster.plan.allTiles.forEach((tile) => {
            if (tile.stone !== null && !tile.stone.isLast) {
                // get all stones info and store it
                this.tiles.push(this.getAiTile(tile));

                if (tile.stone.side === this.mySide) {
                    let _that = this;

                    // get all jumps
                    let jumps = this.gameMaster.plan.getPossibleJumps(tile.x, tile.y);

                    jumps.forEach((jump) => {
                        let aiTile = jump.landingTile;
                        let output = {getStone: 1, to: {id: aiTile.id, x: aiTile.x, y: aiTile.y}, from: {id: tile.id, x: tile.x, y: tile.y}};
                        this.moves.push(output);
                    });

                    // get possible moves
                    let move = tile.getMove(this.gameMaster.plan);
                    let moveOutput = {from: {id: tile.id, x: tile.x, y: tile.y}, to:  {id: move.id, x: move.x, y: move.y}, getStone: 0, x: move.x, y: move.y};
                    this.moves.push(moveOutput);
                    // console.log("standart moves" ,moveOutput );

                }
            }
        });

        console.log("moves", this.moves);
    }

    getAiTile(tile) {
        return {x: tile.x, y: tile.y, side: tile.stone.side, canMove: !tile.stone.isLast, id: tile.id};
    }


}

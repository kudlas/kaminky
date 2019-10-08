class Plan {

    constructor(xMax, yMax) {
        this.gamePlan = Array(xMax).fill(null).map(x => new Array());
        this.allTiles = [];

        this.xMax = xMax;
        this.yMax = yMax;

        this.possibleJumps = [
            {x: 1, y: 0, landing: {x: 2, y: 0}},
            {x: -1, y: 0, landing: {x: -2, y: 0}},
            {x: 0, y: 1, landing: {x: 0, y: 2}},
            {x: 0, y: -1, landing: {x: 0, y: -2}},
        ];
    }

    addTile(x, y, tile) {
        if (this.isValidLocation(x, y)) {
            this.gamePlan[x][y] = tile;
            this.allTiles.push(tile);
        }
    }

    getTile(x, y) {
        if (this.isValidLocation(x, y)) {
            return this.gamePlan[x][y];
        }
        return null;
    }

    isValidLocation(x, y) {

        if (x >= 0 && y >= 0) {
            if (x < this.xMax && y < this.yMax) {
                return true;
            }
        }

        return false;

    }

    getPossibleJumps(x, y) {
        let _that = this;
        let ret = [];

        let currentTile = this.getTile(x,y);

        this.possibleJumps.forEach(coords => {
            // get tiles around current one

            // tile is tile with enemy stone facing this one
            let tile = _that.getTile(x + coords.x, y + coords.y);

            // is outside gameplan or without stone
            if (tile === null || tile.stone === null) return;

            // are they populated with enemy stones?
            if (tile.stone.side !== currentTile.stone.side) {
                // yes they are, is there stone at landing position?
                // get landing pos
                let landing = _that.getTile(x + coords.landing.x, y + coords.landing.y);

                if (landing !== null && landing.stone === null) {
                    ret.push({landingTile: landing, jumpedStone: tile.stone});
                }
            }
        });

        return ret;

    }

}

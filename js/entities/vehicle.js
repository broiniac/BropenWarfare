game.VehicleEntity = me.Entity.extend({
    /**
     * constructor
     */
    init: function (tilex, tiley) {
        var tmxRenderer = me.game.tmxRenderer,
            tileCoords  = tmxRenderer.tileToPixelCoords(tilex, tiley);
        // console.log("vehicle.js: PRE: ", this, tilex, tiley, tileCoords);
        this.layer = me.game.world.getChildByName("background")[0];

        // call the constructor
        this._super(me.Entity, 'init', [
            tileCoords.x,
            tileCoords.y,
            {
                image: "hexmini",
                width: this.layer.maxTileSize.width, //18
                height: this.layer.maxTileSize.height, //18
                tilewidth: this.layer.tilewidth, //14
                tileheight: this.layer.tileheight, //12
            }
        ]);

        this.name = "vehicle";
        this.moved = false;

        this.renderable.addAnimation("vehicle", [22], 1);
        this.renderable.addAnimation("vehicle-active", [23], 1);
        this.renderable.setCurrentAnimation("vehicle");

        this.anchorPoint.set(0.5, 0.15);

        this.alwaysUpdate = true;

        me.input.registerPointerEvent("pointerdown", this, this.onSelect.bind(this));
        // console.log("vehicle.js: POST: ", this);
    },

    /**
     * update the entity
     */
    update: function (dt) {
        // this._super(me.Entity, "update", [dt]);

        return true;
    },

    onSelect: function (e) {
        var cursor = me.game.world.getChildByName("cursor")[0],
            target = cursor.target;
        if (target) {
            target.renderable.setCurrentAnimation("vehicle");
        }

        this.renderable.setCurrentAnimation("vehicle-active");
        // this.setVehicleInPosition(e);

        cursor.target = this;

        return false;
    },

    // setVehicleInPosition: function (e) {
    //     if (me.levelDirector.getCurrentLevelId()) {
    //         var tile;
    //
    //         try {
    //             tile = this.layer.getTile(e.gameWorldX, e.gameWorldY);
    //         } catch(err) {
    //             return;
    //         }
    //
    //         if (tile) {
    //             if (tile.row % 2) {
    //                 this.pos.x = (tile.col * this.layer.tilewidth) + (this.layer.tilewidth / 2);
    //             } else {
    //                  this.pos.x = tile.col * this.layer.tilewidth;
    //             }
    //             this.pos.y = tile.row * (tile.width / 2);
    //
    //             // console.log("this.pos.x: ", this.pos.x, ", this.pos.y: ", this.pos.y);
    //             // console.log("tile.row: ", tile.row, ", tile.col: ", tile.col);
    //         }
    //     }
    // }
});

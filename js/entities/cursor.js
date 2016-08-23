game.CursorEntity = me.Entity.extend({
    /**
     * constructor
     */
    init: function() {
        this.layer = me.game.world.getChildByName("background")[0];

        // call the constructor
        this._super(me.Entity, 'init', [0, 0, {
                image: "hexmini",
                width: this.layer.maxTileSize.width, //18
                height: this.layer.maxTileSize.height, //18
                tilewidth: this.layer.tilewidth, //14
                tileheight: this.layer.tileheight, //12
            }
        ]);

        this.name = "cursor";
        this.target = undefined;

        this.renderable.addAnimation("cursor", [17], 1);
        this.renderable.setCurrentAnimation("cursor");

        this.anchorPoint.set(0.5, 0.15);

        this.alwaysUpdate = true;

        this.handler = me.event.subscribe(
            me.event.POINTERMOVE,
            this.onMove.bind(this)
        );

        me.input.registerPointerEvent(
            "pointerdown",
            this,
            this.onMove.bind(this)
        );

        me.input.registerPointerEvent("pointerdown", this, this.onClick.bind(this));
    },

    /**
     * update the entity
     */
    update: function(dt) {
        this._super(me.Entity, "update", [dt]);

        return true;
    },

    onMove: function(e) {
        this.setCursorInPosition(e);

        return true;
    },

    onClick: function(e) {
        if (!this.target || this.target.moved || game.data.moves <= 0) {
            return true;
        }

        console.log("e: ", e);
        console.log("this: ", this);
        console.log(this.layer);

        this.target.pos.x = this.pos.x;
        this.target.pos.y = this.pos.y;
        this.target.moved = true;
        game.data.moves--;

        return false;
    },

    setCursorInPosition: function(e) {
        if (me.levelDirector.getCurrentLevelId()) {
            var tile;

            try {
                tile = this.layer.getTile(e.gameWorldX, e.gameWorldY);
            } catch(err) {
                return;
            }

            if (tile) {
                if (tile.row % 2) {
                    this.pos.x = (tile.col * this.layer.tilewidth) + (this.layer.tilewidth / 2);
                } else {
                     this.pos.x = tile.col * this.layer.tilewidth;
                }
                this.pos.y = tile.row * (tile.width / 2);

                // console.log("this.pos.x: ", this.pos.x, ", this.pos.y: ", this.pos.y);
                // console.log("tile.row: ", tile.row, ", tile.col: ", tile.col);
            }
        }
    },

    clearTarget: function() {
        if(this.target) {
            this.target.renderable.setCurrentAnimation("vehicle");
        }
        this.target = undefined;
    },
});

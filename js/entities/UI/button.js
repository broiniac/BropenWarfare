game.UI = game.UI || {};

/**
 * a basic button control
 */
game.UI.ButtonUI = me.GUI_Object.extend({
    /**
     * constructor
     */
    init: function(x, y, color, label) {
        this._super(me.GUI_Object, "init", [ x, y, {
            image: game.texture,
            region : color + "_button04"
        } ]);

        // make sure we use screen coordinates
        // this.floating = true;

        // offset of the two used images in the texture
        this.unclicked_region = game.texture.getRegion(color + "_button04");
        this.clicked_region = game.texture.getRegion(color + "_button05");

        this.anchorPoint.set(0, 0);
        this.setOpacity(0.5);

        this.font = new me.Font("kenpixel", 12, "black");
        this.font.textAlign = "center";
        this.font.textBaseline = "middle";

        this.label = label;

        // // only the parent container is a floating object
        // this.floating = false;
    },

    /**
     * function called when the object is clicked on
     */
    onClick : function (event) {
        console.log(event);
        console.log(this);
        this.offset.setV(this.clicked_region.offset);
        // account for the different sprite size
        this.pos.y += this.height - this.clicked_region.height ;
        this.height = this.clicked_region.height;
        // don't propagate the event
        return false;
    },

    /**
     * function called when the pointer button is released
     */
    onRelease : function (/* event */) {
        this.offset.setV(this.unclicked_region.offset);
        // account for the different sprite size
        this.pos.y -= this.unclicked_region.height - this.height;
        this.height = this.unclicked_region.height;
        // don't propagate the event
        return false;
    },

    draw: function(renderer) {
        renderer.save();
        renderer.translate(this.ancestor.pos.x, this.ancestor.pos.y);

        this._super(me.GUI_Object, "draw", [ renderer ]);

        this.font.draw(renderer,
            this.label,
            this.pos.x + this.width / 2,
            this.pos.y + this.height / 2
        );

        renderer.restore();
    }
});

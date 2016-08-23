game.UI = game.UI || {};

/**
 * a UI panel.
 *
 * #TODO: Probably quirky on maps smaller then screen size
 */
game.UI.Panel = me.Container.extend({
    /**
     * constructor
     */
    init: function(position, width, height, color) {
        var viewport = me.game.viewport,
            newViewportX = viewport.bounds.pos.x,
            newViewportY = viewport.bounds.pos.y,
            renderPosX = 0,
            renderPosY = 0,
            newViewportWidth = viewport.width,
            newViewportHeight = viewport.height;

        this.name = position;
        this.color = color;
        this.position = position;

        // make sure we use screen coordinates
        this.floating = true;

        switch (position) {
            case "top":
                // #WTF: Why I dont have to do thing below
                //      to render viewport properly
                //      and its got wrong sizes when this is on?
                // newViewportHeight -= height;
                newViewportY -= height;
                break;
            case "bottom":
                newViewportHeight -= height;
                renderPosY = viewport.origHeight - height;
                break;
            case "left":
                // #WTF: Why I dont have to do thing below
                //      to render viewport properly
                //      and its got wrong sizes when this is on?
                // newViewportWidth -= width;
                newViewportX -= width;
                break;
            case "right":
                newViewportWidth -= width;
                renderPosX = viewport.origWidth - width;
                break;
            default:
        }

        this._super(me.Container, 'init', [renderPosX, renderPosY, width, height]);

        viewport.resize(newViewportWidth, newViewportHeight);

        var layer = me.game.world.getChildByName("background")[0];
        viewport.setBounds(
            newViewportX,
            newViewportY,
            me.game.world.width,
            // #WTF: why I have to do the correction (divided by 4) to
            //      fix needed for this ugly stain on the bottom of viewport
            me.game.world.height - (layer.rows*layer.tileheight)/4 // - 192
        );

        me.game.viewport = viewport;

        console.log(this);
    },

    /**
     * update function
     */
    update: function () {
        return true;
    },

    /**
     * draw the turn
     */
    draw: function (renderer) {
        var color = renderer.globalColor.toHex();
        renderer.setColor(this.color);
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        renderer.setColor(color);

        this._super(me.Container, "draw", [ renderer ]);
    }
});

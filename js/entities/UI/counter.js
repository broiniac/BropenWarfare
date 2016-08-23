game.UI = game.UI || {};

/**
 * a basic UI item to display something
 */
game.UI.Counter = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y, key, value) {
        this._super(me.Renderable, 'init', [x, y, 10, 10]);
        this.counter = 0;
        this.key = key;
        this.value = value;

        // create a font
        // this.font = new me.BitmapFont("32x32_font", 32);
        this.font = new me.Font("Press Start 2P", 8, "white");
        // this.font.set("right");

        // local copy of the global turn
        this.turn = -1;
    },

    /**
     * update function
     */
    update: function () {
        if (this.turn !== game.data.turn) {
            this.turn = game.data.turn;
            return true;
        }
        return false;
    },

    /**
     * draw the turn
     */
    draw: function (renderer) {
        // draw it baby !
        // this.font.draw (renderer, "myText", 70, 70);
        this.font.draw(
            renderer,
            this.key+": "+ eval(this.value ? this.value : this.key),
            this.pos.x,
            this.pos.y
        );
    }

});

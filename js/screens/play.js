game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // clear the background
        // me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));

        // load a level
        // me.levelDirector.loadLevel("demo");
        me.levelDirector.loadLevel("demo2");

        var cursor = me.pool.pull("CursorEntity");
        me.game.world.addChild(cursor, 10);
        me.game.viewport.follow(cursor);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
    },

    /**
     * #TODO: This is temporary. Remove it someday.
     */
    randomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
});

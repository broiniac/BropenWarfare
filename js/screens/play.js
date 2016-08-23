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

        // reset the turn
        game.data.turn = 0;

        var cursor = me.pool.pull("CursorEntity");
        me.game.world.addChild(cursor, 10);
        me.game.viewport.follow(cursor);

        this.createUI();
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the UI from the game world
        me.game.world.removeChild(this.UI);
    },

    /**
     *
     */
     createUI: function() {
        // Add our UI to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.UI = new game.UI.Container();

        var panelTop = new game.UI.Panel("top", me.game.viewport.origWidth, 100, "blue");
        var buttonEndTurn = new game.UI.ButtonUIEndTurn(
            panelTop.width - 200,
            10,
            "green",
            "End Turn"
        );
        panelTop.addChild(buttonEndTurn);
        this.UI.addChild(panelTop);

        var panelBottom = new game.UI.Panel("bottom", me.game.viewport.origWidth, 150, "green");
        panelBottom.addChild(new game.UI.ButtonUI(
            20,
            20,
            "blue",
            "Button " + this.randomInt(0, 100)
        ));
        this.UI.addChild(panelBottom);
        // this.UI.addChild(new game.UI.Panel("left", 100, me.game.viewport.origHeight, "blue"));
        // this.UI.addChild(new game.UI.Panel("right", 200, me.game.viewport.origHeight, "yellow"));

        this.UI.addChild(new game.UI.Counter(0, 0, "game.data.turn"));

        me.game.world.addChild(this.UI);
    },

    /**
     * #TODO: This is temporary. Remove it someday.
     */
    randomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
});

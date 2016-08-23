/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        turn: 0,
    },

    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(640, 480, {
            wrapper: "screen",
            // scale : 2.0,
            scale: "auto",
            scaleMethod: "fit"
            //     "fit" => Letterboxed; content is scaled to design aspect ratio
            //     "fill-max" => Canvas is resized to fit maximum design resolution; content is scaled to design aspect ratio
            //     "flex-height" => Canvas height is resized to fit; content is scaled to design aspect ratio
            //     "flex-width" => Canvas width is resized to fit; content is scaled to design aspect ratio
            //     "stretch" => Canvas is resized to fit; content is scaled to screen aspect ratio
        })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        me.debug.renderHitBox = true;
        me.debug.renderVelocity = true;
        me.debug.renderQuadTree = true;

        me.sys.fps = 10;
        me.sys.updatesPerSecond = 10;

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        // load the texture atlas file
        // this will be used by object entities later
        game.texture = new me.video.renderer.Texture(
            me.loader.getJSON("UI_Assets"),
            me.loader.getImage("UI_Assets")
        );

        // me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // add our player entity in the entity pool
        me.pool.register("mainPlayer", game.PlayerEntity);
        me.pool.register("CursorEntity", game.CursorEntity);

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};

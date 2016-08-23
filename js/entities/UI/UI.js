game.UI = game.UI || {};

game.UI.Container = me.Container.extend({
    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // give a name
        this.name = "UI";

        // add our child turn object at the top left corner
        me.game.viewport.origWidth = me.game.viewport.width;
        me.game.viewport.origHeight = me.game.viewport.height;
    }
});

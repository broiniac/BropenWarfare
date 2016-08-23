game.UI = game.UI || {};
// var ButtonUI =  game.UI.ButtonUI || {};
// console.log(me);
// console.log(game);
// return;

/**
 * a UI panel.
 *
 * #TODO: Probably quirky on maps smaller then screen size
 */
game.UI.ButtonUIEndTurn = game.UI.ButtonUI.extend({
    /**
     * constructor
     */
    init: function(x, y, color, label) {
        this._super(game.UI.ButtonUI, "init", [x, y, color, label]);
    },

    onClick: function(event) {
        var vehicles = me.game.world.getChildByName("vehicle");
        for (var i = 0, length = vehicles.length; i < length; i++) {
            vehicles[i].moved = false;
        }
        game.data.turn++;
        game.data.moves = 3;

        me.game.world.getChildByName("cursor")[0].clearTarget();

        return this._super(game.UI.ButtonUI, "onClick", [ event ]);
    }
});

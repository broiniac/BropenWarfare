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
        game.data.turn++;

        return this._super(game.UI.ButtonUI, "onClick", [ event ]);
    }
});

game.minimap = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y,{
			image: "minimap",
			width: 1015,
			height: 183,
			spritewidth: "1015",
			spriteheight: "183",
			getShape: function() {
				/*sets the rectangle the player can walk into*/
				return (new me.Rect(0, 0, 1015, 183)).toPolygon();
			}
		}]);
		this.floating = true; //makes minimap stay still


	}
});
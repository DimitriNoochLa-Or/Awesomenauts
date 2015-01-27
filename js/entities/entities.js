game.PlayerEntity = me.Entity.extend({
	init:function(x, y, settings){
		this._super(me.Entity, 'init', [x,y,{
			image: "player",
			width: 64,
			height: 64,
			spritewidth: "64", 
			spriteheight: "64",
			getShape: function(){
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);

		this.body.setVelocity(10, 20);
	},
	update:function(delta){
		if(me.input.isKeyPressed("right")){
			//sets the position of my x by adding the velocity to find above in set velocitu and multipling ti by me.timer.tick
			this.body.vel.x += this.body.accel.x * me.timer.tick//makes the movement look smooth
		}
		else{
			this.body.vel.x = 0;
		}
		this.body.update(delta);//delta is the change in time
		return true;
	}
});
game.ShootArrow = me.Entity.extend({
	init: function(x, y, settings, facing){
		this._super(me.Entity, 'init', [x, y, {
			/*chooses the creep and sets its size*/
			image: "arrow",
			width: 48,
			height: 48,
			spritewidth: "48",
			spriteheight: "48",
			getShape: function() {
				/*sets the rectangle the player can walk into*/
				return (new me.Rect(0, 0, 48, 48)).toPolygon();
			}
		}]);
		this.alwaysUpdate = true;

		this.body.setVelocity(10, 0);
		this.attack = game.data.ability3*10;
		this.type = "arrow";
		this.facing = facing;
	},
	update: function(delta){
		if (this.facing === "left") {
		this.body.vel -= this.body.accel.x * me.timer.tick;
		}else {
			this.body.vel -= this.body.accel.x * me.timer.tick;

		}
		me.collision.check(this, true, this.collideHandler.bindKey(me.input.KEY.E));
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	collideHandler: function(response){
		if(response.b.type === 'EnemyBase' || response.b.type === 'EnemyCreep'){
			this.attacking = true;
			response.b.loseHealth(this.attack);
			me.game.world.removeChild(this);//this makes it so it does go thru the enemys 
		}
	}
});
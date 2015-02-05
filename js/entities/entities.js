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

		this.body.setVelocity(6, 20);
		this.renderable.addAnimation("idle" , [143]);
		this.renderable.addAnimation("walk" , [143, 144 , 145 , 146 , 147 , 148 , 149 , 150 , 151] , 80);
		this.renderable.setCurrentAnimation("idle");
	},
	update:function(delta){
		if(me.input.isKeyPressed("right")){
			//sets the position of my x by adding the velocity to find above in set velocitu and multipling ti by me.timer.tick
			this.body.vel.x += this.body.accel.x * me.timer.tick//makes the movement look smooth()
		
		}
		else{
			this.body.vel.x = 0;
		}
		if(this.body.vel.x !== 0){
		if(!this.renderable.isCurrentAnimation("walk")){
			this.renderable.setCurrentAnimation("walk");

			}
		}
		else{
			this.renderable.setCurrentAnimation("idle");
		}
		this.body.update(delta);//delta is the change in time

		this._super(me.Entity, "update", [delta]);
		return true;
	}
});
game.PlayerBaseEntity = me.Entity.extend({
	init : function(x , y ,settings){
		this._super(me.Entity, 'init' , [x , y, {
			image : "tower",
			width : 100,
			hieght : 100,
			spritewidth : "100",
			spriteheight : "100",
			getShape:function(){
				return(new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);
			this.broken = false;
			this.health = 10;
			this.alwaysUpdate = true;
			this.body.onCollision = this.onCollision.bind(this);


			this.type = "PlayerBaseEntity";
			},
		update:function(delta){
			if(this.health<=0){
				this.broken = true;
			}
			this.body.update(delta);

			this._super(me.Entity , "update" , [true]);
			return true;
	 	},

	 	onCollision: function(){

	 	}



});
game.EnemyBaseEntity = me.Entity.extend({
	init : function(x , y ,settings){
		this._super(me.Entity, 'init' , [x , y, {
			image : "tower",
			width : 100,
			hieght : 100,
			spritewidth : "100",
			spriteheight : "100",
			getShape:function(){
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);
			this.broken = false;
			this.health = 10;
			this.alwaysUpdate = true;
			this.body.onCollision = this.onCollision.bind(this);


			this.type = "EnemyBaseEntity";
			},
		update:function(delta){
			if(this.health<=0){
				this.broken = true;
			}
			this.body.update(delta);

			this._super(me.Entity , "update" , [true]);
			return true;
	 	},

	 	onCollision: function(){

	 	}



});
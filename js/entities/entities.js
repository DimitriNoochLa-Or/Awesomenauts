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
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		this.renderable.addAnimation("idle" , [143]);
		this.renderable.addAnimation("walk" , [143, 144 , 145 , 146 , 147 , 148 , 149 , 150 , 151] , 80);
	    this.renderable.addAnimation("attack" , [91, 92, 93, 94, 95, 96, 97, 98] , 80);

		this.renderable.setCurrentAnimation("idle");
	},
	update:function(delta){
		if(me.input.isKeyPressed("right")){
			//sets the position of my x by adding the velocity to find above in set velocitu and multipling ti by me.timer.tick
			this.body.vel.x += this.body.accel.x * me.timer.tick//makes the movement look smooth()
			this.facing = "right";
			this.flipX(false);
		
		}
		else if(me.input.isKeyPressed("left")){
			this.facing = "left";
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.flipX(true);
		}
		else{
			this.body.vel.x = 0;
		}
		if (me.input.isKeyPressed("jump") &&  !this.jumping && !this.falling) {
			this.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		}

		if(this.body.vel.x !== 0){
		if(!this.renderable.isCurrentAnimation("walk")){
			this.renderable.setCurrentAnimation("walk");

			}
		}
		else{
			this.renderable.setCurrentAnimation("idle");
		}

		if(me.input.isKeyPressed("attack")){
			if(!this.renderable.isCurrentAnimation("attack")){
			//sets the current animation to attack and once it is over 
			// it goes back to idle
			this.renderable.setCurrentAnimation("attack" , "idle"); 
			//make it so that the next time we start this sequence we begin
			//from the first animation, not whereever we 
			//switched to another animation
			this.renderable.setAnimationFrame();

			}
			
		
		}
		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){

		if(!this.renderable.isCurrentAnimation("walk")){
			this.renderable.setCurrentAnimation("walk");

			};
		}
		else if(!this.renderable.isCurrentAnimation("attack"))
		{
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
			height : 100,
			spritewidth : "100",
			spriteheight : "100",
			getShape:function(){
				return(new me.Rect(0, 0, 100, 70)).toPolygon();
			}
		}]);
			this.broken = false;
			this.health = 10;
			this.alwaysUpdate = true;
			this.body.onCollision = this.onCollision.bind(this);
			

			this.renderable.addAnimation("idle" , [0]);
			this.renderable.addAnimation("broken" , [1]);
			this.renderable.setCurrentAnimation("idle");


			this.type = "PlayerBaseEntity";
			},
		update:function(delta){
			if(this.health<=0){
				this.broken = true;
				this.renderable.setCurrentAnimation("broken");

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
			height : 100,
			spritewidth : "100",
			spriteheight : "100",
			getShape:function(){
				return (new me.Rect(0, 0, 100, 70)).toPolygon();
			}
		}]);
			this.broken = false;
			this.health = 10;
			this.alwaysUpdate = true;
			this.body.onCollision = this.onCollision.bind(this);
			
			this.renderable.addAnimation("idle" , [0]);
			this.renderable.addAnimation("broken" , [1]);
			this.renderable.setCurrentAnimation("idle");


			this.type = "EnemyBaseEntity";
			},
		update:function(delta){
			if(this.health<=0){
				this.broken = true;
				this.renderable.setCurrentAnimation("broken");

			}
			this.body.update(delta);

			this._super(me.Entity , "update" , [true]);
			return true;
	 	},

	 	onCollision: function(){

	 	}



});
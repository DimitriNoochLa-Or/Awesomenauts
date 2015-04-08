game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings) {
		this.setSuper(x, y);
		this.setPlayerTimers();
		this.setAttributes();
		this.type = "PlayerEntity";
		this.setFlags();//used for like left or right
		/*the camera follows the player*/
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		this.addAnimation();


		this.renderable.setCurrentAnimation("idle");
	},

	setSuper: function(x, y){
		/*reaches to the constructor of Entity*/
		this._super(me.Entity, 'init', [x, y, {
			/*chooses the player and sets its size*/
			image: "player",
			width: 64,
			height: 64,
			spritewidth: "64",
			spriteheight: "64",
			getShape: function() {
				/*sets the rectangle the player can walk into*/
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);
	},

	setPlayerTimers: function(){
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastArrow = this.now;
		this.lastAttack = new Date().getTime(); /*haven't used this*/

	},

	setAttributes: function(){
		this.health = game.data.playerHealth;
		this.body.setVelocity(game.data.playerMoveSpeed, 20);				
		this.attack = game.data.playerAttack;

	 },

	setFlags: function(){
	 	/*keeps track of which direction your character is going*/
		this.facing = "right";
		this.dead = false;
		this.attacking = false;
	 },

    addAnimation: function(){
		/*adds the pictures of the character*/
		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		this.renderable.addAnimation("attack", [221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234], 80);


	 },


	update: function(delta) {
		this.now = new Date().getTime();
		//if im dead returns true
		//if im not returns false
		this.dead = this.checkIfDead();
		this.checkAbilityKeys();
		this.checkKeyPressesandMove();
		//refactors code so that it is easier to navigate

		this.setAnimation();
		

		
		/*tells it to check the collision*/
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	loseHealth: function(damage) {
		this.health = this.health = damage;
	},

	checkIfDead: function(){

		if(this.health <= 0){
			return true;
		}
		return false;

	},

	checkKeyPressesandMove: function(){
		if(me.input.isKeyPressed("right")) {
			this.moveRight();
		/*does everything as the 'right' if statement except it's doing it for 'left'*/
		}else if(me.input.isKeyPressed("left")) {
			this.moveLeft();
		}else{
			this.body.vel.x = 0;
		}
		/*allows you to jump by pressing up but not when you're falling or already jumping*/
		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
			this.jump();
		}

		this.attacking = me.input.isKeyPressed("attack");
	},

	moveRight: function(){
			/*adds to the position of my x by adding the velocity defined above in*/
			/*setVelocity() and multiplying it by me.timer.tick.*/
			/*me.timer.tick makes the movement look smooth*/
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.facing = "right";
			/*flips the pictures of the character*/
			this.flipX(true);
	},

	moveLeft: function(){
		this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.facing = "left";
			this.flipX(false);

	},

	jump: function(){
		this.body.jumping = true;
		this.body.vel.y -= this.body.accel.y * me.timer.tick;
		/*plays the sound effect*/
		me.audio.play("jump");
	},

	checkAbilityKeys: function(){
		if(me.input.isKeyPressed("skill1")){
			//this.speedBurst();
		}else if(me.input.isKeyPressed("skill2")){
			//this.cannibal();
		}else if(me.input.isKeyPressed("skill3")){
			this.shootArrow();
		}
	},

	shootArrow: function(){
		if((this.now-this.lastArrow) >= game.data.arrowTimer && game.data.ability3 > 0){
		this.lastArrow = this.now;
		var arrow = me.pool.pull("arrow", this.pos.x, this.pos.y, 0, {}, this.facing);
		me.game.world.addChild(arrow, 10);
	   }
	},



	setAnimation: function(){
		if(this.attacking) {
			if(!this.renderable.isCurrentAnimation("attack")) {
				/*Sets the current animation to attack and once that is over*/
				/*goes back to the idle animation*/
				this.renderable.setCurrentAnimation("attack", "idle");
				/*Makes it so that the next time we start this sequence we begin*/
				/*from the first animation, not whatever we left off when we*/
				/*switched to another animation*/
				this.renderable.setAnimationFrame();
				/*plays the sound effect*/
				me.audio.play("cling");
			}
		}
		/*sets the animation 'walk'*/
		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
			if(!this.renderable.isCurrentAnimation("walk")) {
				this.renderable.setCurrentAnimation("walk");
			}
		}else if(!this.renderable.isCurrentAnimation("attack")) {
			/*when staying still, it sets the animation 'idle'*/
			this.renderable.setCurrentAnimation("idle");
		}

	},

	/*sets the collision between the tower and the player so you can't go through*/
	collideHandler: function(response) {
		if(response.b.type==='EnemyBaseEntity') {
			this.collidewithEnemyBase(response);
		/*stops the player from moving when collided against a creep*/
		}else if(response.b.type==='EnemyCreep') {
			this.collidewithEnemyCreep(response);
		}
	},

	collidewithEnemyBase: function(response){

		var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;
			
			/*stops player from going through from above*/
			if(ydif<-40 && xdif< 70 && xdif>-35) {
				this.body.falling = false;
				this.body.vel.y = -1;
			/*stops player from going through from the right*/
			}else if(xdif>-35 && this.facing==='right' && (xdif<0)) {
				this.body.vel.x = 0;
				//this.pos.x = this.pos.x -1;
			/*stops player from going through from the left*/
			}else if(xdif<70 && this.facing==='left' && (xdif>0)) {
				this.body.vel.x = 0;
				//this.pos.x = this.pos.x +1;

			}
		
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer) {
								this.lastHit = this.now;
				response.b.loseHealth(game.data.playerAttack);
			}
	},

	collidewithEnemyCreep: function(response){
		var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;

			this.stopMovement(xdif);

			if(this.checkAttacking(xdif, ydif)){
				this.hitCreep(response);
			}
	},

	stopMovement: function  (xdif) {


			if(xdif>0) {
				//this.pos.x = this.pos.x + 1;
				if(this.facing==="left") {
					this.body.vel.x = 0;
				}
			}else{
				//this.pos.x = this.pos.x - 1;
				if(this.facing==="right") {
					this.body.vel.x = 0;
				}
			}	
	},


	checkAttacking: function(xdif, ydif){
			/*sets the amount of hits it needs for the creep to die*/
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
					&& (Math.abs(ydif) <=40) && 
					(((xdif>0) && this.facing==="right") || ((xdif<0) && this.facing==="left"))
					){
				this.lastHit = this.now;
			return true;
			
		}
		return false;
	},
	hitCreep: function(response){
	 		//if the creeps help is less then our attack,exectue code in if statement
			if(response.b.health <= game.data.playerAttack){
				//adds one gold for a creep kill
				game.data.gold += 1;
				console.log("Current gold: " + game.data.gold);

			}
				/*takes away one health when creep is hit*/
				response.b.loseHealth(game.data.playerAttack);
			
	},
});
//allycreep
game.MyCreep = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "creep2",
			width: 100,
			height:85,
			spritewidth: "100",
			spriteheight: "85",
			getShape: function(){
				return (new me.Rect(0, 0, 52, 100)).toPolygon();	
			}
		}]);
		
		 this.health = game.data.allyCreepHealth;
		 this.alwaysUpdate = true;
		// //this.attacking lets us know if the enemy is currently attacking
		 this.attacking = false;
		// //keeps track of when our creep last attacked anyting
		 this.lastAttacking = new Date().getTime();
		 this.lastHit = new Date().getTime();
		 this.now = new Date().getTime();

		this.body.setVelocity(game.data.allyCreepMoveSpeed, 20);

		this.type = "MyCreep";

		this.renderable.addAnimation("walk", [0, 1, 2, 3, 4], 80);
		this.renderable.setCurrentAnimation("walk");
	},

	update: function(delta) {
		// this.now = new Date().getTime();
		this.body.vel.x += this.body.accel.x * me.timer.tick;
		this.flipX(true);
		
		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;

		},
	

	collideHandler: function(response)	{
		if(response.b.type==='EnemyBaseEntity'){
			this.attacking = true;
			//this.lastAttacking = this.now;
			this.body.vel.x = 0;
			this.pos.x = this.pos.x +1;
			//checks that it has been at least 1 second since this creep hit a base
			if((this.now-this.lastHit <= game.data.allyCreepAttackTimer)){
				//updates the last hit timer
				this.lastHit = this.now;
				//makes the player base call its loseHealth	function and passes it a damage of 1
				response.b.loseHealth(1);
			}
		}
	},
	collidewithEnemyCreep: function(response){
		var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;

			this.stopMovement(xdif);

			if(this.checkAttacking(xdif, ydif)){
				this.hitCreep(response);
			}
	}
});

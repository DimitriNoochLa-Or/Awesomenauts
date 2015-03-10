//game manger removes the player is hes dead and resets it 
//collects gold and spawns creep on a timer 
game.GameTimerManager = Object.extend({
	init: function(x, y, settings) {
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
	},

	update: function() {
		this.now = new Date().getTime();
		this.goldTimerCheck();
		this.creepTimerCheck();

		return true;
	},

	goldTimerCheck: function(){
		if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)) {
			game.data.gold += 1;
			console.log("Current gold:" , + game.data.gold);
		
		}
	},

	creepTimerCheck: function(){
		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)) {
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creepe, 5);
		}
	}
});

game.HeroDeathManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
	},
	update: function (){
		if(game.data.player.dead){
			me.game.world.removechild(game.data.player);
			me.state.current().resetplayer(10,0);
		}
	}
});

game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
			this.gameover = false;
	},
	update: function(){
			if(game.data.win === true && !this.gameover){
				this.gameOver(true);
					
			}else if(game.data.win === false && !this.gameover){
				
				this.gameOver(false);
			}

			return true;
	},

	gameOver: function(win){
		if(win){
			//if i win i gain 10 exp
			game.data.exp += 10;
		}else{
			game.data.exp += 1;
		}


		this.gameover = true;
		me.save.exp = game.data.exp;
		//for testing purposes only
		me.save.exp2 = 4;
	}
});
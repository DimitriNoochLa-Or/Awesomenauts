game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		/*loads level01*/
		me.levelDirector.loadLevel("test");

		this.resetPlayer(0, 420);

		var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
		/*adds the gamemanager to the game*/
		me.game.world.addChild(gameTimerManager, 0);

		var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
		/*adds the HeroDeathManager to the game*/
		me.game.world.addChild(heroDeathManager, 0);

		var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
		/*adds the HeroDeathManager to the game*/
		me.game.world.addChild(experienceManager, 0);

		var spendGold = me.pool.pull("SpendGold", 0, 0, {});
		me.game.world.addChild(spendGold, 0);

		game.data.minimap = me.pool.pull("minimap" , 10, 10, {}); 
		me.game.world.addChild(game.data.minimap, 30);

		me.input.bindKey(me.input.KEY.B, "buy");
		me.input.bindKey(me.input.KEY.Q, "skill1");
		me.input.bindKey(me.input.KEY.W, "skill2");	
		me.input.bindKey(me.input.KEY.E, "skill3");		
		/*binds the right key so when pressed the player moves right*/
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		/*binds the left key so when pressed the player moves left*/
		me.input.bindKey(me.input.KEY.LEFT, "left");
		/*binds the up key so when pressed the player jumps*/
		me.input.bindKey(me.input.KEY.UP, "jump");
		/*binds the A key so when pressed the player attacks*/
		me.input.bindKey(me.input.KEY.A, "attack");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
		/*plays the song in the background when the game starts*/
		//me.audio.playTrack("retarded batman");
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},

	resetPlayer: function(x, y){
		game.data.player = me.pool.pull("player", x, y, {});
		me.game.world.addChild(game.data.player, 5);
		game.data.miniPlayer = me.pool.pull("miniPlayer" , 10, 10, {}); 
		me.game.world.addChild(game.data.miniPlayer, 31);
	}
});


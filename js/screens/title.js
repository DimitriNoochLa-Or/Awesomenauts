game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO

		game.data.option1 = new (me.Renderable.extend({
//renderable means we are drawing something
			init: function(){
				//calls super class
				this._super(me.Renderable, "init", [270, 240, 300, 50]);
				this.font = new me.Font("Arial", 46 , "white");
				me.input.registerPointerEvent('pointerdown' , this,  this.newGame.bind(this), true);
			    //listens for the pointer to be pressed down


			},
			//draws the main function
			//its passing what out renderable is
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "START a new game" , this.pos.x, this.pos.y);//coordinates
				this.font.draw(renderer.getContext(), "tralalalala", 250, 530);
			},

			update: function(dt){
				return true;
			},

			newGame: function(){
				me.input.releasePointerEvent('pointerdown', game.data.option1);			
				me.input.releasePointerEvent('pointerdown', game.data.option2);			
				me.state.change(me.state.NEW);




			}
		}));

		me.game.world.addChild= (game.data.option1);

			game.data.option2 = new (me.Renderable.extend({
			init: function(){
				//calls super class
				this._super(me.Renderable, "init", [380, 340, 350, 50]);
				this.font = new me.Font("Arial", 46 , "white");
				me.input.registerPointerEvent('pointerdown' , this,  this.newGame.bind(this), true);
			    //listens for the pointer to be pressed down


			},
			//draws the main function
			//its passing what out renderable is
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Continue" , this.pos.x, this.pos.y);//coordinates
			},

			update: function(dt){
				return true;
			},

			newGame: function(){


				me.input.releasePointerEvent('pointerdown' , game.data.option1);
				me.input.releasePointerEvent('pointerdown' , game.data.option2);

				me.state.change(me.state.LOAD);


			}
			}));
			me.game.world.addChild = (game.data.option2);
	
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	
	}
});

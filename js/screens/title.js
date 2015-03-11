game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO


//renderable means we are drawing something
		me.game.world.addChild(new (me.Renderable.extend({
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
				me.input.releasePointerEvent('pointerdown');
				me.save.remove('exp');
				me.save.remove('exp1');
				me.save.remove('exp2');
				me.save.remove('exp3');
				me.save.remove('exp4');				
				me.state.change(me.state.PLAY);


			}
		})));

			me.game.world.addChild(new (me.Renderable.extend({
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
				this.font.draw(renderer.getContext(), "tralalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalala", 250, 530);
			},

			update: function(dt){
				return true;
			},

			newGame: function(){
				me.input.releasePointerEvent('pointerdown' , this);
				me.save.remove('exp');
				me.save.remove('exp1');
				me.save.remove('exp2');
				me.save.remove('exp3');
				me.save.remove('exp4');	
				me.state.change(me.state.SPENDEXP);


			}
			})));

	
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	
	}
});

game.SpendExpScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO


//renderable means we are drawing something
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//calls super class
				this._super(me.Renderable, "init", [270, 240, 300, 50]);
				this.font = new me.Font("Arial", 46 , "white");
				
			    //listens for the pointer to be pressed down


			},
			//draws the main function
			//its passing what out renderable is
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Spend that shiz" , this.pos.x, this.pos.y);//coordinates
				this.font.draw(renderer.getContext(), "DO IT DOO IT", 250, 530);
			},

		})));

    },
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	
	}
});

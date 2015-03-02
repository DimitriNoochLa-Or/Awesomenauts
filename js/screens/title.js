game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO


		me.input.bindKey(me.input.KEY.ENTER, "start");
//renderable means we are drawing something
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//calls super class
				this._super(me.Renderable, "init", [510, 30, me.game.viewport.width, me.game.viewport.height]);
				this.font = new me.Font("Arial", 46 , "white");

			},
			//draws the main function
			//its passing what out renderable is
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "BRONYS SUCK " , 450, 130);//coordinates
				this.font.draw(renderer.getContext(), "IF U LOVE THEM THEN DIE", 250, 530);
			}
		})));

		this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
			if(action === "start"){
				me.state.change(me.state.PLAY);
			}
		});
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.ENTER); // TODO
		me.event.unsubscribe(this.handler);
	}
});

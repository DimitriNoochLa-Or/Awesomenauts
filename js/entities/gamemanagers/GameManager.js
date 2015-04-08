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
			alert("YOU lose bith");		
		}

	return true;
	},

	gameOver: function(win){
	if(win){
		game.data.exp += 10;
	}
	else{
		game.data.exp += 1;
	}
			
	this.gameover = true;
	me.save.exp = game.data.exp;
	console.log("exp:" + me.save.exp);	

		$.ajax({
			type: "POST",
			url: "lib/php/controller/save-user.php",
			data: {
				exp: game.data.exp,
				exp1: game.data.exp1,
				exp2: game.data.exp2,
				exp3: game.data.exp3,
				exp4: game.data.exp4,

				},
				dataType: "text"
			})
			//sends back a msg if it did go thru the php code 
			//if not it fails
			.success(function(response){
				if(response==="true"){
					me.state.change(me.state.MENU);//if registered goes straight into the game
				}else{
					alert(response);
				}
			})
			.fail(function(response){
 				alert("Fail");
			});
	}
	
});


	
var motto = require("./");

for(var i = 0; i < 50; i++) {
	motto.get(function(text) {
		console.log(text);
	});
}

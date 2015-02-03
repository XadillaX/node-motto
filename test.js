var motto = require("./");

function get() {
    motto.get(function(err, text) {
		console.log(err, text);
	});
}

for(var i = 0; i < 50; i++) {
    get();
}


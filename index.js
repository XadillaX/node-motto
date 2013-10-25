var spider = require("nodegrassex");
var default_motto = "不自由，毋宁死。";

exports.get = function(callback) {
	spider.get("http://www.verycd.com/statics/title.saying?timestamp=" + Date.now() + Math.random(), function(data, status, respheader) {
		if(status !== 200) {
			data = default_motto;
		} else {
			var pos1 = data.indexOf("'");
			var pos2 = data.indexOf("'", pos1 + 1);
			data = data.substring(pos1 + 1, pos2);

			if(data[data.length - 1] !== "。" && data[data.length - 1] !== "！") {
				data += "。";
			}
		}

		callback(data);
	}, "utf8").on("error", function(e) {
		callback(default_motto);
	});
};


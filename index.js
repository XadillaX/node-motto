var spider = require("nodegrassex");
var default_motto = "不自由，毋宁死。";

exports.get = function(callback) {
	spider.get("http://www.verycd.com/statics/title.saying?timestamp=" + Date.now() + Math.random(), function(data, status, respheader) {
		if(status !== 200) {
			data = default_motto;
		} else {
		    var reg = /new Array\(([\s\S]*?)\);.+/;
            var temp = reg.exec(data);
            if(temp.length !== 2) {
                callback(default_motto);
                return;
            }

            var array = "[" + temp[1] + "]";
            array = array.replace(/'/g, "\"");
            try {
                array = JSON.parse(array);
            } catch(e) {
                callback(default_motto);
                return;
            }

            var idx = parseInt((array.length - 1) * Math.random());
            if(array[idx][array[idx].length - 1] !== "。" &&
                array[idx][array[idx].length - 1] !== "！" &&
                array[idx][array[idx].length - 1] !== "？") {
                array[idx] += "。";
            }
            callback(array[idx]);
            return;
        }
	}, "utf8").on("error", function(e) {
		callback(default_motto);
	});
};


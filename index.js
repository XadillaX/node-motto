require("sugar");
var fJSON = require("fbbk-json");
var lorem = require("unicode-lorem");
var spidex = require("spidex");
var defaultMotto = "不自由，毋宁死。";
var baseUri = "http://www.verycd.com/statics/title.saying?{ran}";

/**
 * get a random motto
 * @param {Function} callback the callback function
 */
exports.get = function(callback) {
    spidex.get(baseUri.assign({
        ran: lorem(10).unicode.join("")
    }), {
        timeout: 60000,
        charset: "utf8"
    }, function(data, status/**, respheader*/) {
        if(status !== 200) {
            return callback(
                new Error("Server returns a wrong status: " + status),
                defaultMotto);
        } else {
            var reg = /new Array\(([\s\S]*?)\);.+/;
            var temp = reg.exec(data);
            if(temp.length !== 2) {
                return callback(
                    new Error("Wrong response data: " + data),
                    defaultMotto);
            }

            var array = "[" + temp[1] + "]";
            try {
                array = fJSON.parse(array);
            } catch(e) {
                return callback(
                    new Error("Broken JSON data: " + e.message),
                    defaultMotto);
            }

            var idx = Number.random(0, array.length - 1);
            if("。！？.?!".indexOf(array[idx][array[idx].length - 1]) === -1) {
                array[idx] += "。";
            }

            callback(undefined, array[idx]);
        }
    }).on("error", function(e) {
        callback(e, defaultMotto);
    });
};


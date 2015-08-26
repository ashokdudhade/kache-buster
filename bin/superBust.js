var superBust = require("../lib/applyVersion.js");
var through = require('through2');

module.exports = function(){
    return through.obj(function(file, enc, cb) {
        var content = superBust.applyVersion({sourceDir: "/test",
        versionType: "timestamp", content: file.contents.toString()});
        file.contents = new Buffer(content);
        cb(null, file);
    });
}

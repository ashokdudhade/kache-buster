var superBust = require("./lib/applyVersion.js");
var through = require('through2');

module.exports = function(options){
    if(typeof options === "undefined"){
            options = {
                versionType: "timestamp"
            };
    }

    return through.obj(function(file, enc, cb) {
        options['content'] =  file.contents.toString();
        var content = superBust.applyVersion(options);
        file.contents = new Buffer(content);
        cb(null, file);
    });
}

var $ = require('cheerio'),
    crypto = require('crypto'),
    fs = require('fs');

module.exports.applyVersion = function(cacheBustRequest) {

    if (typeof cacheBustRequest === "undefined" || typeof cacheBustRequest.content === "undefined") {
        return;
    }

    var content = cacheBustRequest.content;

    var sourceDir = cacheBustRequest.sourceDir;

    var cdnUrlCheckRegx = /^http(s)?/;
    var $scripts = $(content).find('script');

    var cwd = process.cwd();

    if (typeof sourceDir !== "undefined" && cacheBustRequest.versionType == "MD5") {
        //TODO Add check for cwr
        try{
            process.chdir(cwd + sourceDir);
        }catch(ex){

        }

    }


    var util = new this.applyVersionUtil({
        versionType: cacheBustRequest.versionType,
        customVersion: cacheBustRequest.customVersion
    });


    for (var scriptIndex = 0; scriptIndex < $scripts.length; scriptIndex++) {
        var script = $scripts[scriptIndex];

        var src = script.attribs.src;

        content = util.appendVersion({
            src: src,
            content: content
        });

    }


    var $styles = $(content).find('link[rel=stylesheet]');

    for (var i = 0; i < $styles.length; i++) {
        var src = $styles[i].attribs.href;

        content = util.appendVersion({
            src: src,
            content: content
        });
    }

    if (typeof sourceDir !== "undefined") {
        //TODO Add check for cwr
        try{
            process.chdir(cwd);
        }catch(ex){

        }

    }

    return content;
}

module.exports.applyVersionUtil = function(utilRequest) {
    var versionType = typeof utilRequest !== "undefined" && utilRequest.versionType ? utilRequest.versionType : "MD5";

    var versionCheckRegex = /([\?&])version=([^&]*)/;

    var timestamp = new Date().getTime();

    var versionGenerator = {
        "MD5": function(src) {
            var data = _getFileContent(src);
            if(typeof data === "undefined"){
                return data
            }
            return _checksum(data);
        },
        "timestamp": function() {
            return timestamp;
        },
        "custom": function() {

            if (typeof utilRequest.customVersion === "function") {
                return utilRequest.customVersion();
            } else {
                return utilRequest.customVersion;
            }
        }
    };

    if (!versionGenerator.hasOwnProperty(versionType)) {
        throw versionType + " version type is not supported";
    }

    var queryStringParamName = "version";

    function _getVersion(src) {
        return versionGenerator[versionType](src);
    }

    function _isCdnUrl(path) {
        var cdnUrlCheckRegx = /^http(s?):\/\//;
        return cdnUrlCheckRegx.test(path);
    }

    function _checksum(content) {
        return crypto
            .createHash('md5')
            .update(content, 'utf8')
            .digest('hex');
    }

    function _getFileContent(src) {
        if (typeof src === "undefined" || src == '') {
            return src;
        }
        var srcFile = /([^$\?]*)/.test(src) ? /([^$\?]*)/.exec(src)[0] : src;

        if(!fs.existsSync(srcFile)){
            return undefined;
        }

        return fs.readFileSync(srcFile);
    }

    function _getDelimeter(src) {
        var hasAnyQueryStringParams = /[?]/.test(src);
        var delimeter = "?";
        if (hasAnyQueryStringParams) {
            delimeter = "&";
        }
        return delimeter;
    }

    function _getVersionedSrc(src) {

        var version = _getVersion(src);

        if(typeof version === "undefined"){
            return src;
        }

        var matches = versionCheckRegex.exec(src);

        var versionText = queryStringParamName + "=" + version;

        var versionedSrc;

        var hasExistingVersion = matches != null;

        if (hasExistingVersion) {
            versionedSrc = src.replace(versionCheckRegex, matches[1] + versionText);
        } else {
            versionedSrc = src + _getDelimeter() + versionText;
        }

        return versionedSrc;
    }

    function _applyVersion(request) {

        var content = request.content;

        if (!_isCdnUrl(request.src)) {

            content = content.replace(request.src, _getVersionedSrc(request.src));
        }

        return content;
    }

    this.appendVersion = _applyVersion;

}

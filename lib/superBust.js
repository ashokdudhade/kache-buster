var $ = require('cheerio'),
    crypto = require('crypto'),
    fs = require('fs');

module.exports.applyVersion = function(cacheBustRequest) {

    if (typeof cacheBustRequest === "undefined" || typeof cacheBustRequest.content === "undefined") {
        return;
    }

    var content = cacheBustRequest.content;
    var queryStringParamName = "version";
    var versionType = cacheBustRequest.versionType || "timestamp";
    var sourceDir = cacheBustRequest.sourceDir;

    var cdnUrlCheckRegx = /^http(s)?/;
    var $scripts = $(content).find('script');

    var cwd = process.cwd();

    if (typeof sourceDir !== "undefined") {
        process.chdir(cwd + sourceDir);
    }

    for (var scriptIndex = 0; scriptIndex < $scripts.length; scriptIndex++) {
        var script = $scripts[scriptIndex];

        var src = script.attribs.src;

        if (!this.isCdnUrl(src)) {
            var data = this.getFileContent(src);
            var md5 = this.checksum(data);
            var regex = /([\?&])version=([^&]*)/;
            var matches = regex.exec(src);

            var versionText = queryStringParamName + "=" + md5;

            if (matches != null) {
                content = content.replace(src, src.replace(regex, matches[1] + versionText));
            } else {
                var hasAnyQueryStringParams = /[?]/.test(src);

                if (hasAnyQueryStringParams) {
                    content = content.replace(src, src + "&" + versionText);
                } else {
                    content = content.replace(src, src + "?" + versionText);
                }
            }

        }
    }


    var $styles = $(content).find('link[rel=stylesheet]');


    for (var i = 0; i < $styles.length; i++) {
        var src = $styles[i].attribs.href;

        if (!this.isCdnUrl(src)) {

            var data = this.getFileContent(src);

            var md5 = this.checksum(data);

            var regex = /([\?&])version=([^&]*)/;

            var matches = regex.exec(src);

            var versionText = queryStringParamName + "=" + md5;

            if (matches != null) {

                content = content.replace(src, src.replace(regex, matches[1] + versionText));

            } else {

                var hasAnyQueryStringParams = /[?]/.test(src);

                if (hasAnyQueryStringParams) {
                    content = content.replace(src, src + "&" + versionText);
                } else {
                    content = content.replace(src, src + "?" + versionText);
                }
            }
        }
    }

    return content;
}

module.exports.isCdnUrl = function(src) {
    var cdnUrlCheckRegx = /^http(s?):\/\//;
    return cdnUrlCheckRegx.test(src);
}

module.exports.checksum = function(content) {
    return crypto
        .createHash('md5')
        .update(content, 'utf8')
        .digest('hex');
}

module.exports.getFileContent = function(src) {
    if (typeof src === "undefined" || src == '') {
        return src;
    }
    var srcFile = /([^$\?]*)/.test(src) ? /([^$\?]*)/.exec(src)[0] : src;

    return fs.readFileSync(srcFile);
}

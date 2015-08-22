var assert = require("assert");
var superBust = require("../lib/superBust.js");

describe('Super cache bust test', function() {
    describe('superBust with invalid param', function() {
        it('Should return nothing with invalid paramter', function() {
            var content = superBust.applyVersion();
            assert.equal(content, undefined);
        });
    });

    describe('superBust with valid param', function() {
        it('Should return content with scripts and links versioned', function() {
            var content = superBust.applyVersion({
                "content": "<html><script src='data/some.js?nnn=nn&version=kk'></script><script src='data/someOther.js'></script><link rel='stylesheet' href = 'data/somecss.css'></link></html>",
                                versionType : "timestamp"
            });
            console.log(content);
            //assert.nptEqual(content, undefined);
        });
    });

    describe('isCdnUrl test', function() {
        it(' should return false for empty string imput', function() {
            var isCdnUrl = superBust.isCdnUrl('');
            assert.equal(isCdnUrl, false);
        });

        it(' should return false for undefined imput', function() {
            var isCdnUrl = superBust.isCdnUrl(undefined);
            assert.equal(isCdnUrl, false);
        });

        it(' should return false for non cdn path', function() {
            var isCdnUrl = superBust.isCdnUrl('data/src.js');
            assert.equal(isCdnUrl, false);
        });

        it(' should return false for non cdn path with http in name', function() {
            var isCdnUrl = superBust.isCdnUrl('httpdata/src.js');
            assert.equal(isCdnUrl, false);
        });

        it(' should return false for non cdn path with https in name', function() {
            var isCdnUrl = superBust.isCdnUrl('httpsdata/src.js');
            assert.equal(isCdnUrl, false);
        });

        it(' should return true for valid http cdn path', function() {
            var isCdnUrl = superBust.isCdnUrl('http://somedomain.com/data/src.js');
            assert.equal(isCdnUrl, true);
        });

        it(' should return true for valid https cdn path', function() {
            var isCdnUrl = superBust.isCdnUrl('https://somedomain.com/data/src.js');
            assert.equal(isCdnUrl, true);
        });

    });

    describe('getFileContent tests', function() {
        it('should return empty string when empty path is passed', function() {
            var fileContent = superBust.getFileContent('');
            assert.equal(fileContent, '');
        });

        it('should return undefined when undefined is passed', function() {
            var fileContent = superBust.getFileContent(undefined);
            assert.equal(fileContent, undefined);
        });

    });

});

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
        it('Should return content with scripts and links versioned MD5', function() {
            var content = "<html><script src='data/some.js?nnn=nn&version=kk'></script><script src='data/someOther.js'></script><link rel='stylesheet' href = 'data/somecss.css'></link></html>";

            var regex = /src='data\/someOther.js'/;
            var isVersionExists = !regex.test(content);

            var content = superBust.applyVersion({
                content: content,
                sourceDir: "/test",
                versionType : "MD5"
            });
            assert.equal(isVersionExists, false);
            assert.equal(/'data\/someOther.js\?version([^$]*)'/.test(content), true);
            assert.equal(/'data\/somecss.css\?version([^$]*)'/.test(content), true);
            assert.equal(/version=kk'/.test(content), false);

        });

        it('Should return content with scripts and links versioned timestamp', function() {
            var content = "<html><script src='data/some.js?nnn=nn&version=kk'></script><script src='data/someOther.js'></script><link rel='stylesheet' href = 'data/somecss.css'></link></html>";

            var regex = /src='data\/someOther.js'/;
            var isVersionExists = !regex.test(content);

            var content = superBust.applyVersion({
                content: content,
                sourceDir: "/test",
                versionType : "MD5"
            });
            assert.equal(isVersionExists, false);
            assert.equal(/'data\/someOther.js\?version([^$]*)'/.test(content), true);
            assert.equal(/'data\/somecss.css\?version([^$]*)'/.test(content), true);
            assert.equal(/version=kk'/.test(content), false);

        });

        it('Should return content with scripts and links versioned custom', function() {
            var content = "<html><script src='data/some.js?nnn=nn&version=kk'></script><script src='data/someOther.js'></script><link rel='stylesheet' href = 'data/somecss.css'></link></html>";

            var regex = /src='data\/someOther.js'/;
            var isVersionExists = !regex.test(content);

            var content = superBust.applyVersion({
                content: content,
                sourceDir: "/test",
                versionType : "custom",
                customVersion: "0000"
            });
            assert.equal(isVersionExists, false);
            assert.equal(/'data\/someOther.js\?version=0000'/.test(content), true);
            assert.equal(/'data\/somecss.css\?version=0000'/.test(content), true);
            assert.equal(/'data\/some.js\?nnn=nn&version=0000'/.test(content), true);
            assert.equal(/version=kk'/.test(content), false);

        });

        it('Should return content with scripts and links versioned custom function', function() {
            var content = "<html><script src='data/some.js?nnn=nn&version=kk'></script><script src='data/someOther.js'></script><link rel='stylesheet' href = 'data/somecss.css'></link></html>";

            var regex = /src='data\/someOther.js'/;
            var isVersionExists = !regex.test(content);

            var content = superBust.applyVersion({
                content: content,
                sourceDir: "/test",
                versionType : "custom",
                customVersion: function(){
                    return "newVersion"
                }
            });
            assert.equal(isVersionExists, false);
            assert.equal(/'data\/someOther.js\?version=newVersion'/.test(content), true);
            assert.equal(/'data\/somecss.css\?version=newVersion'/.test(content), true);
            assert.equal(/'data\/some.js\?nnn=nn&version=newVersion'/.test(content), true);
            assert.equal(/version=kk'/.test(content), false);

        });
    });


});

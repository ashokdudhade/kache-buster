var assert = require("assert");
var kacheBust = require("../lib/applyVersion.js");

describe('Kache bust test', function() {

    describe('kacheBust with invalid param', function() {
        it('Should return nothing with invalid paramter', function() {
            var content = kacheBust.applyVersion();
            assert.equal(content, undefined);
        });
    });

    describe('kacheBust with valid param', function() {
        it('Should return content with scripts and links versioned MD5 from source directory', function() {
            var content = "<html><script src='data/some.js?nnn=nn&version=kk'></script><script src='data/some.js?hash=mm'></script><script src='data/someOther.js'></script><link rel='stylesheet' href = 'data/somecss.css'></link></html>";

            var regex = /version=kk'/;
            var isVersionExists = !regex.test(content);

            content = kacheBust.applyVersion({
                content: content,
                sourceDir: "/test",
                versionType: "MD5"
            });
            assert.equal(isVersionExists, false);
            assert.equal(/'data\/someOther.js\?version([^$]*)'/.test(content), true);
            assert.equal(/'data\/somecss.css\?version([^$]*)'/.test(content), true);
            assert.equal(/version=kk'/.test(content), false);
            assert.equal(/'data\/some.js\?hash=mm&version/.test(content), true);

        });

        it('Should return content with scripts and links versioned MD5 from current directory', function() {
            var content = "<html><script src='test/data/some.js?nnn=nn&version=kk'></script><script src='test/data/someOther.js'></script><link rel='stylesheet' href = 'test/data/somecss.css'></link></html>";

            var regex = /version=kk'/;
            var isVersionExists = !regex.test(content);

            content = kacheBust.applyVersion({
                content: content,
                versionType: "MD5"
            });

            assert.equal(isVersionExists, false);
            assert.equal(/data\/someOther.js\?version([^$]*)'/.test(content), true);
            assert.equal(/data\/somecss.css\?version([^$]*)'/.test(content), true);
            assert.equal(/version=kk'/.test(content), false);

        });

        it('Should return same content if no change in static content files', function() {
            var content = "<html><script src='test/data/some.js?nnn=nn&version=kk'></script><script src='test/data/someOther.js'></script><link rel='stylesheet' href = 'test/data/somecss.css'></link></html>";

            var firstContent = kacheBust.applyVersion({
                content: content,
                versionType: "MD5"
            });

            var secondContent = kacheBust.applyVersion({
                content: content,
                versionType: "MD5"
            });

            assert.equal(firstContent, secondContent);

        });

        it('Should return content with scripts and links versioned timestamp', function() {
            var content = "<html><script src='data/some.js?nnn=nn&version=kk'></script><script src='data/someOther.js'></script><link rel='stylesheet' href = 'data/somecss.css'></link></html>";

            var regex = /version=kk'/;
            var isVersionExists = !regex.test(content);

            content = kacheBust.applyVersion({
                content: content,
                sourceDir: "/test",
                versionType: "MD5"
            });
            assert.equal(isVersionExists, false);
            assert.equal(/'data\/someOther.js\?version([^$]*)'/.test(content), true);
            assert.equal(/'data\/somecss.css\?version([^$]*)'/.test(content), true);
            assert.equal(/version=kk'/.test(content), false);

        });

        it('Should return content with scripts and links versioned custom', function() {
            var content = "<html><script src='data/some.js?nnn=nn&version=kk'></script><script src='data/someOther.js'></script><link rel='stylesheet' href = 'data/somecss.css'></link></html>";

            var regex = /version=kk'/;
            var isVersionExists = !regex.test(content);

            content = kacheBust.applyVersion({
                content: content,
                sourceDir: "/test",
                versionType: "custom",
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

            var regex = /version=kk'/;
            var isVersionExists = !regex.test(content);

            content = kacheBust.applyVersion({
                content: content,
                sourceDir: "/test",
                versionType: "custom",
                customVersion: function() {
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

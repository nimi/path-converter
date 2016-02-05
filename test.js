require('mocha');

var assert = require('assert');
var main = require('./').main;

function convert (path, prepend) {
	return main({prepend: prepend || null}, [path]);
}

describe('convert:', function () {
	it('should convert "E://foo//bar//baz"', function() {
		assert.equal(convert('E://foo//bar//baz'), '/foo/bar/baz');
	});
	it('should convert "E://foo//bar//baz//"', function() {
		assert.equal(convert('E://foo//bar//baz//'), '/foo/bar/baz/');
	});
	it('should convert "E:/foo/bar/baz/"', function() {
		assert.equal(convert('E:/foo/bar/baz/'), '/foo/bar/baz/');
	});
	it('should convert "E://foo\\bar\\baz"', function() {
		assert.equal(convert('E://foo\\bar\\baz'), '/foo/bar/baz');
	});
	it('should convert "foo\\bar\\baz"', function() {
		assert.equal(convert('foo\\bar\\baz'), 'foo/bar/baz');
	});
	it('should convert "foo\\bar\\baz\\"', function() {
		assert.equal(convert('foo\\bar\\baz\\'), 'foo/bar/baz/');
	});
	it('should convert "E://foo/bar\\baz"', function() {
		assert.equal(convert('E://foo/bar\\baz'), '/foo/bar/baz');
	});
	it('should convert "E:\\\\foo/bar\\baz"', function() {
		assert.equal(convert('E:\\\\foo/bar\\baz'), '/foo/bar/baz');
	});
	it('should convert "foo/bar\\baz"', function() {
		assert.equal(convert('//foo/bar\\baz'), '/foo/bar/baz');
	});
	it('should convert "foo\\bar\\baz"', function() {
		assert.equal(convert('//foo\\bar\\baz'), '/foo/bar/baz');
	});
	it('should convert "C:\\user\\docs\\Letter.txt"', function() {
		assert.equal(convert('C:\\user\\docs\\Letter.txt'), '/user/docs/Letter.txt');
	});
	it('should convert "user/docs/Letter.txt"', function() {
		assert.equal(convert('/user/docs/Letter.txt'), '/user/docs/Letter.txt');
	});
	it('should convert "C:Letter.txt"', function() {
		assert.equal(convert('C:Letter.txt'), 'Letter.txt');
	});
	it('should convert "Server01\\user\\docs\\Letter.txt"', function() {
		assert.equal(convert('\\Server01\\user\\docs\\Letter.txt'), '/Server01/user/docs/Letter.txt');
	});
	it('should convert "UNC\\Server01\\user\\docs\\Letter.txt"', function() {
		assert.equal(convert('\\?\\UNC\\Server01\\user\\docs\\Letter.txt'), '/?/UNC/Server01/user/docs/Letter.txt');
	});
})

#!/usr/bin/env node

'use strict';

const program = require('commander');
const pathy = require('path');

program
	.version('.0.1.0')
	.description('A utility for converting paths')
	.usage('[options] [path]')
	.option('-p --prepend <s>', 'Add prepend path')
	.parse(process.argv);

function log() {
	return console.log.apply(console, arguments);
}

function isString(str) {
	return typeof str === 'string';
}

function normalizePath(path) {
	if (!isString(path)) {
		throw new TypeError(
			`Expected a string and recieved a ${path} instead.`
		);
	}

	return path
		.replace(/^\w:+/i, '')
		.replace(/[\\\/]+/g, '/')
		.trim()
		.replace(/\s/g, '\\ ');
}

function prepend(prepend, path) {
	if (isString(prepend)) {
		return prepend + path;
	}
}

function main(program, test) {
	const path = Boolean(test) ? test : process && process.argv.slice(2);
	if (!path) { return program.help(); }
	let normalizedPath = path.length && normalizePath(path[0]);
	normalizedPath = program.prepend ?
		prepend(program.prepend, normalizedPath) : normalizedPath;

	log('');
	log('Original path:');
	log('%s', path[0]);
	log('');

	log('Unix path:');
	log('%s', normalizedPath);
	log('');

	return normalizedPath;
}

// Run it
main(program);

module.exports = {
	main: function(isProgram, isTest) {
		return main(isProgram, isTest);
	}
};


const { src, dest, series, parallel } = require('gulp');;
const uglify = require('gulp-uglify');
var run = require('gulp-run');

function help(callback) {
	// place code for your default task here
	console.log("Help is on the way");
	callback();
}

function copyModules(callback) {
	return src("node_modules/kony-timeout-polyfill/aaa_setTimeout.js")
	.pipe(uglify())
	.pipe(dest("modules/kony-timout-polyfill/"));
}

function copyRequireModules(callback) {
	return src("node_modules/q/q.js")
	.pipe(uglify())
	.pipe(dest("modules/require/q/"));
}

exports.default = series(parallel(copyModules, copyRequireModules));

/*
 * @package dav-server
 * @copyright Copyright(c) 2016 PDXHub <eric AT PDXHub.org>
 * @author Eric Drechsel <eric AT PDXHub.org>
 * @license http://github.com/edrex/dav-server/blob/master/LICENSE MIT License
 */
"use strict";

var args = require('minimist')(process.argv.slice(2), {boolean: ['debug','h']});
var jsDAV = require("jsdav");
var jsDAV_Locks_Backend_FS = require("jsdav/lib/DAV/plugins/locks/fs");

function printUsage(){
  console.log("dav-server [--debug] rootDir");
  process.exit();
}

if (args.h || args._.length !== 1) printUsage();
if (args.debug) jsDAV.debugMode = true;

var rootDir = __dirname + args._.shift();
jsDAV.createServer({
  node: rootDir,
  locksBackend: jsDAV_Locks_Backend_FS.new(rootDir)
}, 8000);

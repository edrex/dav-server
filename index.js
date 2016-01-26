/*
 * @package dav-server
 * @copyright Copyright(c) 2016 PDXHub <eric AT PDXHub.org>
 * @author Eric Drechsel <eric AT PDXHub.org>
 * @license http://github.com/edrex/dav-server/blob/master/LICENSE MIT License
 */
"use strict";

var args = require('minimist')(process.argv.slice(2), {boolean: ['debug','h']});
var fs = require('fs')
var path = require('path')
var jsDAV = require("jsdav");
var jsDAV_Locks_Backend_FS = require("jsdav/lib/DAV/plugins/locks/fs");

var usage = "dav-server [--debug] [-i LISTEN_IP] [-p PORT] rootDir";

function exitMsg(msg, code){
  console.log(msg);
  process.exit(code || 0);
}

if (args.h || args._.length !== 1) exitMsg(usage);
if (args.debug) jsDAV.debugMode = true;

var rootDir = path.join(args._.shift(), '/');
if (!fs.existsSync(rootDir)) exitMsg(rootDir+" does not exist.");
if (!fs.statSync(rootDir).isDirectory()) exitMsg(rootDir+": not a directory.");
jsDAV.createServer({
  node: rootDir,
  locksBackend: jsDAV_Locks_Backend_FS.new(rootDir)
}, 8000);

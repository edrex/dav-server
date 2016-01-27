/*
 * @package dav-server
 * @copyright Copyright(c) 2016 PDXHub <eric AT PDXHub.org>
 * @author Eric Drechsel <eric AT PDXHub.org>
 * @license http://github.com/edrex/dav-server/blob/master/LICENSE MIT License
 */
"use strict";

var args = require('minimist')(process.argv.slice(2), {boolean: ['debug','h'], string: ['i', 'p', 'digest', 'realm'], default: {i:'127.0.0.1', p:8000}});
var fs = require('fs');
var path = require('path');
var jsDAV = require("jsdav");

var usage = "dav-server [--debug] [-i LISTEN_IP] [-p PORT] [--digest HTDIGEST_FILE --realm AUTH_REALM] rootDir";

function exitMsg(msg, code){
  console.log(msg);
  process.exit(code || 0);
}

if (args.h || args._.length !== 1) exitMsg(usage);
if (args.debug) jsDAV.debugMode = true;

var rootDir = path.join(args._.shift(), '/');
if (!fs.existsSync(rootDir)) exitMsg(rootDir+" does not exist.", 1);
if (!fs.statSync(rootDir).isDirectory()) exitMsg(rootDir+": not a directory.", 1);

var config = {
  node: rootDir,
  locksBackend: require("jsdav/lib/DAV/plugins/locks/fs").new(rootDir)
}

if (args.digest || args.realm) {
  if (!args.digest || !args.realm ) {
    exitMsg("--digest and --realm are corequisite.", 1);
  }
  config.authBackend = require("jsdav/lib/DAV/plugins/auth/file").new(args.digest);
  config.realm = args.realm;
}

jsDAV.createServer(config, args.p, args.i);

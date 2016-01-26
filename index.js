/*
 * @package dav-server
 * @copyright Copyright(c) 2016 PDXHub.org <eric AT PDXHub.org>
 * @author Eric Drechsel <eric AT PDXHub.org>
 * @license http://github.com/edrex/dav-server/blob/master/LICENSE MIT License
 */
"use strict";

var jsDAV = require("jsdav");
jsDAV.debugMode = true;
var jsDAV_Locks_Backend_FS = require("jsdav/lib/DAV/plugins/locks/fs");

var rootDir = __dirname + "";
jsDAV.createServer({
  node: rootDir,
  locksBackend: jsDAV_Locks_Backend_FS.new(rootDir)
}, 8000);

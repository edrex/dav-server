A filesystem-based webdav server, a thin wrapper around [jsDAV](https://github.com/mikedeboer/jsDAV).

Intended as a reference server for developing [WebDAV save/load](https://github.com/Jermolene/TiddlyWiki5/issues/738) capabilities in [TiddlyWiki](http://tiddlywiki.com/). 

## Install

npm install -g dav-server

## Setup

If your server will be internet-facing, you will want to protect it with authentication.

Standard HTTP digest auth is built in. To use it, first generate an htaccess file using Apache's `htaccess` command or similar:

```
% htaccess -c ./htaccess wiki bob
<enter bob's password>
% htaccess ./htaccess wiki jane
<enter jane's password>
% cat htdigest
bob:dostuff:e812d2badc815fe1cc4bd17bba6e505c
jane:dostuff:bc7d2f2f47116effdd94b64f21dcf32c
```

## Usage

```
dav-server [--debug] [-i LISTEN_IP] [-p PORT] [--digest HTDIGEST_FILE --realm AUTH_REALM] rootDir
```

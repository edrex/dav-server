A filesystem-based webdav server, a thin wrapper around [jsDAV](https://github.com/mikedeboer/jsDAV).

Intended as a reference server for developing [WebDAV save/load](https://github.com/Jermolene/TiddlyWiki5/issues/738) capabilities in [TiddlyWiki](http://tiddlywiki.com/). 

## Install

```
npm install -g dav-server
```

## Usage

```
dav-server [--debug] [-i LISTEN_IP] [-p PORT] [--digest HTDIGEST_FILE --realm AUTH_REALM] rootDir
```

## Authentication

If your server will be internet-facing, you probably want authentication.

Standard HTTP digest auth is built in:

```
dav-server --digest htaccess --realm wiki ./wiki/
```

To [create an htaccess file](https://httpd.apache.org/docs/2.4/programs/htdigest.html) use Apache's `htaccess` command or similar:

```
% htaccess -c ./htaccess wiki bob
<enter bob's password>
% htaccess ./htaccess wiki jane
<enter jane's password>
% cat htdigest
bob:wiki:e812d2badc815fe1cc4bd17bba6e505c
jane:wiki:bc7d2f2f47116effdd94b64f21dcf32c
```

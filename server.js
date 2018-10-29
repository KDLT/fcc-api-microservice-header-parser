// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(myLogger);

function myLogger(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next();
};

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
// {"ipaddress":"::ffff:159.20.14.100","language":"en-US,en;q=0.5", "software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"}

app.get('/api/whoami', function(req, res) {
  // console.log(req.headers); // SAME WITH req.connection.parser.incoming.headers
  // console.log(req.connection);
  // console.log(req.connection.parser.HTTPParser.incoming.IncomingMessage.headers);
  // console.log(req.connection.parser);
  // console.log(Object.keys(req.connection.parser));
  // console.log(req.connection.parser.incoming.headers)
  // console.log(req.rawHeaders); // so lahat ng 'leaf' level items pwedeng straight up irequest?!
  // console.log(req.keepAliveTimeout); // NOPE. undefined itong keepAliveTimoeut, more than 1 ito apparently
  // console.log(Object.keys(req.connection));
  // console.log(req.connection._httpMessage.req.res); // sample ng [CIRCULAR], babalik ka lang sa parent object
  // console.log(req._parsedUrl) // lahat ng nasa req ng _httpMessage ay pwedeng icall outright parang itong _parsedUrl, no need for req.connection._httpMessage.req.res
  res.json({
    ipaddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// output ito ng req.connection
const string = `Socket {
  connecting: false,
  _hadError: false,
  _handle: 
   TCP {
     reading: true,
     owner: [Circular],
     onread: [Function: onread],
     onconnection: null,
     writeQueueSize: 0,
     _consumed: true },
  _parent: null,
  _host: null,
  _readableState: 
   ReadableState {
     objectMode: false,
     highWaterMark: 16384,
     buffer: BufferList { head: null, tail: null, length: 0 },
     length: 0,
     pipes: null,
     pipesCount: 0,
     flowing: true,
     ended: false,
     endEmitted: false,
     reading: true,
     sync: false,
     needReadable: true,
     emittedReadable: false,
     readableListening: false,
     resumeScheduled: false,
     destroyed: false,
     defaultEncoding: 'utf8',
     awaitDrain: 0,
     readingMore: false,
     decoder: null,
     encoding: null },
  readable: true,
  domain: null,
  _events: 
   { end: [ [Object], [Function: bound socketOnEnd] ],
     _socketEnd: [Function: onSocketEnd],
     drain: [ [Function: ondrain], [Function: bound socketOnDrain] ],
     timeout: [Function: socketOnTimeout],
     data: [Function: bound socketOnData],
     error: [Function: socketOnError],
     close: 
      [ [Function: bound socketOnClose],
        [Function: onServerResponseClose] ],
     resume: [Function: onSocketResume],
     pause: [Function: onSocketPause] },
  _eventsCount: 9,
  _maxListeners: undefined,
  _writableState: 
   WritableState {
     objectMode: false,
     highWaterMark: 16384,
     finalCalled: false,
     needDrain: false,
     ending: false,
     ended: false,
     finished: false,
     destroyed: false,
     decodeStrings: false,
     defaultEncoding: 'utf8',
     length: 0,
     writing: false,
     corked: 0,
     sync: true,
     bufferProcessing: false,
     onwrite: [Function: bound onwrite],
     writecb: null,
     writelen: 0,
     bufferedRequest: null,
     lastBufferedRequest: null,
     pendingcb: 0,
     prefinished: false,
     errorEmitted: false,
     bufferedRequestCount: 0,
     corkedRequestsFree: 
      { next: null,
        entry: null,
        finish: [Function: bound onCorkedFinish] } },
  writable: true,
  allowHalfOpen: true,
  _bytesDispatched: 0,
  _sockname: null,
  _pendingData: null,
  _pendingEncoding: '',
  server: 
   Server {
     domain: null,
     _events: 
      { request: [Object],
        connection: [Function: connectionListener] },
     _eventsCount: 2,
     _maxListeners: undefined,
     _connections: 1,
     _handle: 
      TCP {
        reading: false,
        owner: [Circular],
        onread: null,
        onconnection: [Function: onconnection],
        writeQueueSize: 0 },
     _usingSlaves: false,
     _slaves: [],
     _unref: false,
     allowHalfOpen: true,
     pauseOnConnect: false,
     httpAllowHalfOpen: false,
     timeout: 120000,
     keepAliveTimeout: 5000,
     _pendingResponseData: 0,
     maxHeadersCount: null,
     _connectionKey: '6::::3000',
     [Symbol(IncomingMessage)]: { [Function: IncomingMessage] super_: [Object] },
     [Symbol(ServerResponse)]: { [Function: ServerResponse] super_: [Object] },
     [Symbol(asyncId)]: 4 },
  _server: 
   Server {
     domain: null,
     _events: 
      { request: [Object],
        connection: [Function: connectionListener] },
     _eventsCount: 2,
     _maxListeners: undefined,
     _connections: 1,
     _handle: 
      TCP {
        reading: false,
        owner: [Circular],
        onread: null,
        onconnection: [Function: onconnection],
        writeQueueSize: 0 },
     _usingSlaves: false,
     _slaves: [],
     _unref: false,
     allowHalfOpen: true,
     pauseOnConnect: false,
     httpAllowHalfOpen: false,
     timeout: 120000,
     keepAliveTimeout: 5000,
     _pendingResponseData: 0,
     maxHeadersCount: null,
     _connectionKey: '6::::3000',
     [Symbol(IncomingMessage)]: { [Function: IncomingMessage] super_: [Object] },
     [Symbol(ServerResponse)]: { [Function: ServerResponse] super_: [Object] },
     [Symbol(asyncId)]: 4 },
  _idleTimeout: 120000,
  _idleNext: 
   TimersList {
     _idleNext: [Circular],
     _idlePrev: [Circular],
     _timer: Timer { '0': [Function: listOnTimeout], _list: [Circular] },
     _unrefed: true,
     msecs: 120000,
     nextTick: false },
  _idlePrev: 
   TimersList {
     _idleNext: [Circular],
     _idlePrev: [Circular],
     _timer: Timer { '0': [Function: listOnTimeout], _list: [Circular] },
     _unrefed: true,
     msecs: 120000,
     nextTick: false },
  _idleStart: 3863,
  _destroyed: false,
  parser: 
   HTTPParser {
     '0': [Function: parserOnHeaders],
     '1': [Function: parserOnHeadersComplete],
     '2': [Function: parserOnBody],
     '3': [Function: parserOnMessageComplete],
     '4': [Function: bound onParserExecute],
     _headers: [],
     _url: '',
     _consumed: true,
     socket: [Circular],
     incoming: 
      IncomingMessage {
        _readableState: [Object],
        readable: true,
        domain: null,
        _events: {},
        _eventsCount: 0,
        _maxListeners: undefined,
        socket: [Circular],
        connection: [Circular],
        httpVersionMajor: 1,
        httpVersionMinor: 1,
        httpVersion: '1.1',
        complete: true,
        headers: [Object],
        rawHeaders: [Array],
        trailers: {},
        rawTrailers: [],
        upgrade: false,
        url: '/api/whoami',
        method: 'GET',
        statusCode: null,
        statusMessage: null,
        client: [Circular],
        _consuming: false,
        _dumped: false,
        res: [Object],
        next: [Function: next],
        baseUrl: '',
        originalUrl: '/api/whoami',
        _parsedUrl: [Object],
        params: {},
        _parsedOriginalUrl: [Object],
        route: [Object] },
     outgoing: null,
     maxHeaderPairs: 2000,
     onIncoming: [Function: bound parserOnIncoming] },
  on: [Function: socketOnWrap],
  _paused: false,
  _httpMessage: 
   ServerResponse {
     domain: null,
     _events: { finish: [Function: bound resOnFinish] },
     _eventsCount: 1,
     _maxListeners: undefined,
     output: [],
     outputEncodings: [],
     outputCallbacks: [],
     outputSize: 0,
     writable: true,
     _last: false,
     upgrading: false,
     chunkedEncoding: false,
     shouldKeepAlive: false,
     useChunkedEncodingByDefault: true,
     sendDate: true,
     _removedConnection: false,
     _removedContLen: false,
     _removedTE: false,
     _contentLength: null,
     _hasBody: true,
     _trailer: '',
     finished: false,
     _headerSent: false,
     socket: [Circular],
     connection: [Circular],
     _header: null,
     _onPendingData: [Function: bound updateOutgoingData],
     _sent100: false,
     _expect_continue: false,
     req: 
      IncomingMessage {
        _readableState: [Object],
        readable: true,
        domain: null,
        _events: {},
        _eventsCount: 0,
        _maxListeners: undefined,
        socket: [Circular],
        connection: [Circular],
        httpVersionMajor: 1,
        httpVersionMinor: 1,
        httpVersion: '1.1',
        complete: true,
        headers: [Object],
        rawHeaders: [Array],
        trailers: {},
        rawTrailers: [],
        upgrade: false,
        url: '/api/whoami',
        method: 'GET',
        statusCode: null,
        statusMessage: null,
        client: [Circular],
        _consuming: false,
        _dumped: false,
        res: [Circular],
        next: [Function: next],
        baseUrl: '',
        originalUrl: '/api/whoami',
        _parsedUrl: [Object],
        params: {},
        _parsedOriginalUrl: [Object],
        route: [Object] },
     locals: {},
     [Symbol(outHeadersKey)]: 
      { 'x-powered-by': [Array],
        'access-control-allow-origin': [Array] } },
  _peername: { address: '::ffff:127.0.0.1', family: 'IPv6', port: 35376 },
  [Symbol(asyncId)]: 42,
  [Symbol(bytesRead)]: 0,
  [Symbol(asyncId)]: 43,
  [Symbol(triggerAsyncId)]: 42 }`
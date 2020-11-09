"use strict";

var _express = _interopRequireDefault(require("express"));

var _routes = require("./routes.js");

var _env = require("./config/env.js");

var _db = require("./config/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = 3000;
(0, _env.setEnviroment)(app);
(0, _db.connectToDB)();
(0, _routes.registerRoutes)(app);
app.get('/', function (req, res) {
  if (process.env.NODE_ENV !== 'production') {
    return res.send('Running server in development mode');
  } else {
    res.sendFile('index.html', {
      root: __dirname + '/../dist'
    });
  }
});
app.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port, " in ").concat(process.env.NODE_ENV));
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectToDB = connectToDB;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connectToDB() {
  _mongoose.default.connect(process.env.DB_URL, {
    useNewUrlParser: true
  }, function (error) {
    if (error) {
      console.log('unable to connect to databas');
      throw error;
    } else {
      console.log('Connected to MongoDB!');
    }
  });
}
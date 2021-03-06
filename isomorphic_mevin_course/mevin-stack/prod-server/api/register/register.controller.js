"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;

var _stringUtil = require("../../utilities/string-util.js");

var _userModel = _interopRequireDefault(require("../../model/user-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
  var validation = validateIndex(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      message: validation.message
    });
  }

  var user = new _userModel.default({
    username: req.body.username,
    password: req.body.password,
    first: req.body.first,
    last: req.body.last
  });
  user.save(function (error) {
    if (error) {
      if (error.code === 11000) {
        return res.status(403).json({
          message: 'Username is taken'
        });
      }

      return res.status(500).json();
    }

    return res.status(201).json();
  });
}

function validateIndex(body) {
  var errors = '';

  if (_stringUtil.StringUtil.isEmpty(body.username)) {
    errors += 'Username is required.';
  }

  if (_stringUtil.StringUtil.isEmpty(body.password)) {
    errors += 'Password is required.';
  }

  if (_stringUtil.StringUtil.isEmpty(body.first)) {
    errors += 'A first name is required.';
  }

  if (_stringUtil.StringUtil.isEmpty(body.last)) {
    errors += 'A last name is required.';
  }

  return {
    isValid: _stringUtil.StringUtil.isEmpty(errors),
    message: errors
  };
}
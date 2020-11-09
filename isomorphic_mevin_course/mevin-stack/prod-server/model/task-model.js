"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var taskSchema = new _mongoose.default.Schema({
  title: String,
  body: String,
  dueDate: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  },
  author: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'user'
  }
});
taskSchema.set('timestamps', true);

var _default = _mongoose.default.model('task', taskSchema);

exports.default = _default;
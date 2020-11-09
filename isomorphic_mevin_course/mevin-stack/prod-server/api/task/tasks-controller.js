"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.show = show;

var _userModel = _interopRequireDefault(require("../../model/user-model"));

var _taskModel = _interopRequireDefault(require("../../model/task-model"));

var _moment = _interopRequireDefault(require("moment"));

var auth = _interopRequireWildcard(require("../../services/auth-service"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(req, res) {
  _taskModel.default.find({}, function (error, tasks) {
    if (error) {
      return res.status(500).json();
    }

    return res.status(200).json({
      tasks: tasks
    });
  }).populate('author', 'username', 'user');
}

function create(req, res) {
  var id = auth.getUserId(req);

  _userModel.default.findOne({
    _id: id
  }, function (error, user) {
    if (error && !user) {
      return res.status(500).json();
    }

    var task = new _taskModel.default(req.body.task);
    task.author = user._id;
    task.dueDate = (0, _moment.default)(task.dueDate);
    task.save(function (error) {
      if (error) {
        return res.status(500).json();
      }

      return res.status(204).json();
    });
  });
}

function update(req, res) {
  var id = auth.getUserId(req);

  _userModel.default.findOne({
    _id: id
  }, function (error, user) {
    if (error) {
      return res.status(500).json();
    }

    if (!user) {
      return res.status(404).json();
    }

    var task = new _taskModel.default(req.body.task);
    task.author = user._id;
    task.dueDate = (0, _moment.default)(task.dueDate);

    _taskModel.default.findByIdAndUpdate({
      _id: task._id
    }, task, function (error) {
      if (error) {
        return res.status(500).json();
      }

      return res.status(204).json();
    });
  });
}

function remove(req, res) {
  var id = auth.getUserId(req);

  _taskModel.default.findOne({
    _id: req.params.id
  }, function (error, task) {
    if (error) {
      return res.status(500).json();
    }

    if (!task) {
      return res.status(404).json();
    }

    if (task.author._id.toString() !== id) {
      return res.status(403).json({
        message: 'Not allowed to delete another user\'s task'
      });
    }

    _taskModel.default.deleteOne({
      _id: req.params.id
    }, function (error) {
      if (error) {
        return res.status(500).json();
      }

      return res.status(204).json();
    });
  });
}

function show(req, res) {
  _taskModel.default.findOne({
    _id: req.params.id
  }, function (error, task) {
    if (error) {
      return res.status(500).json();
    }

    if (!task) {
      return res.status(404).json();
    }

    return res.status(200).json({
      task: task
    });
  });
}
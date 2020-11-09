"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRoutes = registerRoutes;

var _taskRoutes = _interopRequireDefault(require("./api/task/task-routes.js"));

var _authRoutes = _interopRequireDefault(require("./api/auth/auth-routes.js"));

var _registerRoutes = _interopRequireDefault(require("./api/register/register-routes.js"));

var _userRoutes = _interopRequireDefault(require("./api/user/user-routes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerRoutes(app) {
  app.use('/api', _taskRoutes.default);
  app.use('/api', _authRoutes.default);
  app.use('/api', _registerRoutes.default);
  app.use('/api', _userRoutes.default);
}
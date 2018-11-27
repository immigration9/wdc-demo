"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var BTN_SIZES = ['large', 'default', 'small'];
var BTN_TYPES = ['default', 'primary', 'warning'];

var Button = function Button(_ref) {
  var children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["children"]);

  var componentClass = (0, _classnames.default)("wBtn".concat(rest.theme ? "-".concat(rest.theme) : ''), "wBtn".concat(rest.theme ? "-".concat(rest.theme) : '', "-").concat(rest.type), "wBtn".concat(rest.theme ? "-".concat(rest.theme) : '', "-").concat(rest.size), {
    'wBtn-is-active': rest.isActive
  }, rest.className);
  var type = rest.submit ? 'submit' : 'button';

  if (rest.href) {
    return _react.default.createElement("a", {
      href: rest.href,
      className: componentClass
    }, children);
  } else {
    return _react.default.createElement("button", {
      type: type,
      className: componentClass
    }, children);
  }
};

Button.propTypes = {
  size: _propTypes.default.oneOf(BTN_SIZES),
  type: _propTypes.default.oneOf(BTN_TYPES),
  isActive: _propTypes.default.bool,
  className: _propTypes.default.string,
  submit: _propTypes.default.bool,
  theme: _propTypes.default.string
};
Button.defaultProps = {};
var _default = Button;
exports.default = _default;
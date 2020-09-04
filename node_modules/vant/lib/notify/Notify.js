"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _popup = require("../mixins/popup");

var _popup2 = _interopRequireDefault(require("../popup"));

// Utils
// Mixins
// Components
var _createNamespace = (0, _utils.createNamespace)('notify'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function Notify(h, props, slots, ctx) {
  var style = {
    color: props.color,
    background: props.background
  };
  return h(_popup2.default, (0, _babelHelperVueJsxMergeProps.default)([{
    "attrs": {
      "value": props.value,
      "position": "top",
      "overlay": false,
      "duration": 0.2,
      "lockScroll": false
    },
    "style": style,
    "class": [bem([props.type]), props.className]
  }, (0, _functional.inherit)(ctx, true)]), [(slots.default == null ? void 0 : slots.default()) || props.message]);
}

Notify.props = (0, _extends2.default)({}, _popup.popupMixinProps, {
  color: String,
  message: [Number, String],
  duration: [Number, String],
  className: null,
  background: String,
  getContainer: [String, Function],
  type: {
    type: String,
    default: 'danger'
  }
});

var _default = createComponent(Notify);

exports.default = _default;
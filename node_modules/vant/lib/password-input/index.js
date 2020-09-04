"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _utils = require("../utils");

var _functional = require("../utils/functional");

var _constant = require("../utils/constant");

// Utils
var _createNamespace = (0, _utils.createNamespace)('password-input'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function PasswordInput(h, props, slots, ctx) {
  var _ref2;

  var mask = props.mask,
      value = props.value,
      length = props.length,
      gutter = props.gutter,
      focused = props.focused,
      errorInfo = props.errorInfo;
  var info = errorInfo || props.info;
  var Points = [];

  for (var i = 0; i < length; i++) {
    var _ref;

    var _char = value[i];
    var showBorder = i !== 0 && !gutter;
    var showCursor = focused && i === value.length;
    var style = void 0;

    if (i !== 0 && gutter) {
      style = {
        marginLeft: (0, _utils.addUnit)(gutter)
      };
    }

    Points.push(h("li", {
      "class": [(_ref = {}, _ref[_constant.BORDER_LEFT] = showBorder, _ref), bem('item', {
        focus: showCursor
      })],
      "style": style
    }, [mask ? h("i", {
      "style": {
        visibility: _char ? 'visible' : 'hidden'
      }
    }) : _char, showCursor && h("div", {
      "class": bem('cursor')
    })]));
  }

  return h("div", {
    "class": bem()
  }, [h("ul", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": [bem('security'), (_ref2 = {}, _ref2[_constant.BORDER_SURROUND] = !gutter, _ref2)],
    "on": {
      "touchstart": function touchstart(event) {
        event.stopPropagation();
        (0, _functional.emit)(ctx, 'focus', event);
      }
    }
  }, (0, _functional.inherit)(ctx, true)]), [Points]), info && h("div", {
    "class": bem(errorInfo ? 'error-info' : 'info')
  }, [info])]);
}

PasswordInput.props = {
  info: String,
  gutter: [Number, String],
  focused: Boolean,
  errorInfo: String,
  mask: {
    type: Boolean,
    default: true
  },
  value: {
    type: String,
    default: ''
  },
  length: {
    type: [Number, String],
    default: 6
  }
};

var _default = createComponent(PasswordInput);

exports.default = _default;
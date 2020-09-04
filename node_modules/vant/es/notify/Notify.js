import _extends from "@babel/runtime/helpers/esm/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
// Utils
import { createNamespace } from '../utils';
import { inherit } from '../utils/functional'; // Mixins

import { popupMixinProps } from '../mixins/popup'; // Components

import Popup from '../popup'; // Types

var _createNamespace = createNamespace('notify'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function Notify(h, props, slots, ctx) {
  var style = {
    color: props.color,
    background: props.background
  };
  return h(Popup, _mergeJSXProps([{
    "attrs": {
      "value": props.value,
      "position": "top",
      "overlay": false,
      "duration": 0.2,
      "lockScroll": false
    },
    "style": style,
    "class": [bem([props.type]), props.className]
  }, inherit(ctx, true)]), [(slots.default == null ? void 0 : slots.default()) || props.message]);
}

Notify.props = _extends({}, popupMixinProps, {
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
export default createComponent(Notify);
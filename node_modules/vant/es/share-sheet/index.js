import _extends from "@babel/runtime/helpers/esm/extends";
// Utils
import { createNamespace, isDef } from '../utils'; // Mixins

import { popupMixinProps } from '../mixins/popup'; // Components

import Popup from '../popup';
var PRESET_ICONS = ['qq', 'weibo', 'wechat', 'link', 'qrcode', 'poster'];

var _createNamespace = createNamespace('share-sheet'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1],
    t = _createNamespace[2];

export default createComponent({
  props: _extends({}, popupMixinProps, {
    title: String,
    cancelText: String,
    description: String,
    getContainer: [String, Function],
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  }),
  methods: {
    onCancel: function onCancel() {
      this.toggle(false);
      this.$emit('cancel');
    },
    onSelect: function onSelect(option, index) {
      this.$emit('select', option, index);
    },
    toggle: function toggle(val) {
      this.$emit('input', val);
    },
    getIconURL: function getIconURL(icon) {
      if (PRESET_ICONS.indexOf(icon) !== -1) {
        return "https://img.yzcdn.cn/vant/share-icon-" + icon + ".png";
      }

      return icon;
    },
    genHeader: function genHeader() {
      var h = this.$createElement;
      var title = this.slots('title') || this.title;
      var description = this.slots('description') || this.description;

      if (!title && !description) {
        return;
      }

      return h("div", {
        "class": bem('header')
      }, [title && h("h2", {
        "class": bem('title')
      }, [title]), description && h("span", {
        "class": bem('description')
      }, [description])]);
    },
    genOptions: function genOptions(options, showBorder) {
      var _this = this;

      var h = this.$createElement;
      return h("div", {
        "class": bem('options', {
          border: showBorder
        })
      }, [options.map(function (option, index) {
        return h("div", {
          "attrs": {
            "role": "button",
            "tabindex": "0"
          },
          "class": [bem('option'), option.className],
          "on": {
            "click": function click() {
              _this.onSelect(option, index);
            }
          }
        }, [h("img", {
          "attrs": {
            "src": _this.getIconURL(option.icon)
          },
          "class": bem('icon')
        }), option.name && h("span", {
          "class": bem('name')
        }, [option.name]), option.description && h("span", {
          "class": bem('option-description')
        }, [option.description])]);
      })]);
    },
    genRows: function genRows() {
      var _this2 = this;

      var options = this.options;

      if (Array.isArray(options[0])) {
        return options.map(function (item, index) {
          return _this2.genOptions(item, index !== 0);
        });
      }

      return this.genOptions(options);
    },
    genCancelText: function genCancelText() {
      var h = this.$createElement;
      var cancelText = isDef(this.cancelText) ? this.cancelText : t('cancel');

      if (cancelText) {
        return h("button", {
          "attrs": {
            "type": "button"
          },
          "class": bem('cancel'),
          "on": {
            "click": this.onCancel
          }
        }, [cancelText]);
      }
    },
    onClickOverlay: function onClickOverlay() {
      this.$emit('click-overlay');
    }
  },
  render: function render() {
    var h = arguments[0];
    return h(Popup, {
      "attrs": {
        "round": true,
        "value": this.value,
        "position": "bottom",
        "overlay": this.overlay,
        "duration": this.duration,
        "lazyRender": this.lazyRender,
        "lockScroll": this.lockScroll,
        "getContainer": this.getContainer,
        "closeOnPopstate": this.closeOnPopstate,
        "closeOnClickOverlay": this.closeOnClickOverlay,
        "safeAreaInsetBottom": this.safeAreaInsetBottom
      },
      "class": bem(),
      "on": {
        "input": this.toggle,
        "click-overlay": this.onClickOverlay
      }
    }, [this.genHeader(), this.genRows(), this.genCancelText()]);
  }
});
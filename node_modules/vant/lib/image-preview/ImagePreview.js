"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _shared = require("./shared");

var _popup = require("../mixins/popup");

var _touch = require("../mixins/touch");

var _bindEvent = require("../mixins/bind-event");

var _icon = _interopRequireDefault(require("../icon"));

var _swipe = _interopRequireDefault(require("../swipe"));

var _ImagePreviewItem = _interopRequireDefault(require("./ImagePreviewItem"));

// Utils
// Mixins
// Components
var _default2 = (0, _shared.createComponent)({
  mixins: [_touch.TouchMixin, (0, _popup.PopupMixin)({
    skipToggleEvent: true
  }), (0, _bindEvent.BindEventMixin)(function (bind) {
    bind(window, 'resize', this.resize, true);
    bind(window, 'orientationchange', this.resize, true);
  })],
  props: {
    className: null,
    closeable: Boolean,
    asyncClose: Boolean,
    showIndicators: Boolean,
    images: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    loop: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: true
    },
    minZoom: {
      type: [Number, String],
      default: 1 / 3
    },
    maxZoom: {
      type: [Number, String],
      default: 3
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    swipeDuration: {
      type: [Number, String],
      default: 500
    },
    startPosition: {
      type: [Number, String],
      default: 0
    },
    overlayClass: {
      type: String,
      default: (0, _shared.bem)('overlay')
    },
    closeIcon: {
      type: String,
      default: 'clear'
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    closeIconPosition: {
      type: String,
      default: 'top-right'
    }
  },
  data: function data() {
    return {
      active: 0,
      windowWidth: 0,
      windowHeight: 0,
      doubleClickTimer: null
    };
  },
  created: function created() {
    this.resize();
  },
  watch: {
    startPosition: 'setActive',
    value: function value(val) {
      var _this = this;

      if (val) {
        this.setActive(+this.startPosition);
        this.$nextTick(function () {
          _this.$refs.swipe.swipeTo(+_this.startPosition, {
            immediate: true
          });
        });
      } else {
        this.$emit('close', {
          index: this.active,
          url: this.images[this.active]
        });
      }
    }
  },
  methods: {
    resize: function resize() {
      if (_utils.inBrowser) {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
      }
    },
    emitClose: function emitClose() {
      if (!this.asyncClose) {
        this.$emit('input', false);
      }
    },
    emitScale: function emitScale(args) {
      this.$emit('scale', args);
    },
    setActive: function setActive(active) {
      if (active !== this.active) {
        this.active = active;
        this.$emit('change', active);
      }
    },
    genIndex: function genIndex() {
      var h = this.$createElement;

      if (this.showIndex) {
        return h("div", {
          "class": (0, _shared.bem)('index')
        }, [this.slots('index') || this.active + 1 + " / " + this.images.length]);
      }
    },
    genCover: function genCover() {
      var h = this.$createElement;
      var cover = this.slots('cover');

      if (cover) {
        return h("div", {
          "class": (0, _shared.bem)('cover')
        }, [cover]);
      }
    },
    genImages: function genImages() {
      var _this2 = this;

      var h = this.$createElement;
      return h(_swipe.default, {
        "ref": "swipe",
        "attrs": {
          "lazyRender": true,
          "loop": this.loop,
          "duration": this.swipeDuration,
          "initialSwipe": this.startPosition,
          "showIndicators": this.showIndicators,
          "indicatorColor": "white"
        },
        "class": (0, _shared.bem)('swipe'),
        "on": {
          "change": this.setActive
        }
      }, [this.images.map(function (image) {
        return h(_ImagePreviewItem.default, {
          "attrs": {
            "src": image,
            "show": _this2.value,
            "active": _this2.active,
            "maxZoom": _this2.maxZoom,
            "minZoom": _this2.minZoom,
            "windowWidth": _this2.windowWidth,
            "windowHeight": _this2.windowHeight
          },
          "on": {
            "scale": _this2.emitScale,
            "close": _this2.emitClose
          }
        });
      })]);
    },
    genClose: function genClose() {
      var h = this.$createElement;

      if (this.closeable) {
        return h(_icon.default, {
          "attrs": {
            "role": "button",
            "name": this.closeIcon
          },
          "class": (0, _shared.bem)('close-icon', this.closeIconPosition),
          "on": {
            "click": this.emitClose
          }
        });
      }
    },
    onClosed: function onClosed() {
      this.$emit('closed');
    },
    // @exposed-api
    swipeTo: function swipeTo(index, options) {
      if (this.$refs.swipe) {
        this.$refs.swipe.swipeTo(index, options);
      }
    }
  },
  render: function render() {
    var h = arguments[0];

    if (!this.shouldRender) {
      return;
    }

    return h("transition", {
      "attrs": {
        "name": "van-fade"
      },
      "on": {
        "afterLeave": this.onClosed
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.value
      }],
      "class": [(0, _shared.bem)(), this.className]
    }, [this.genClose(), this.genImages(), this.genIndex(), this.genCover()])]);
  }
});

exports.default = _default2;
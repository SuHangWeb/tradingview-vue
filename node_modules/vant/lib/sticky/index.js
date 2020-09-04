"use strict";

exports.__esModule = true;
exports.default = void 0;

var _style = require("../utils/dom/style");

var _unit = require("../utils/format/unit");

var _utils = require("../utils");

var _scroll = require("../utils/dom/scroll");

var _bindEvent = require("../mixins/bind-event");

var _createNamespace = (0, _utils.createNamespace)('sticky'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var _default = createComponent({
  mixins: [(0, _bindEvent.BindEventMixin)(function (bind, isBind) {
    if (!this.scroller) {
      this.scroller = (0, _scroll.getScroller)(this.$el);
    }

    if (this.observer) {
      var method = isBind ? 'observe' : 'unobserve';
      this.observer[method](this.$el);
    }

    bind(this.scroller, 'scroll', this.onScroll, true);
    this.onScroll();
  })],
  props: {
    zIndex: [Number, String],
    container: null,
    offsetTop: {
      type: [Number, String],
      default: 0
    }
  },
  data: function data() {
    return {
      fixed: false,
      height: 0,
      transform: 0
    };
  },
  computed: {
    offsetTopPx: function offsetTopPx() {
      return (0, _unit.unitToPx)(this.offsetTop);
    },
    style: function style() {
      if (!this.fixed) {
        return;
      }

      var style = {};

      if ((0, _utils.isDef)(this.zIndex)) {
        style.zIndex = this.zIndex;
      }

      if (this.offsetTopPx && this.fixed) {
        style.top = this.offsetTopPx + "px";
      }

      if (this.transform) {
        style.transform = "translate3d(0, " + this.transform + "px, 0)";
      }

      return style;
    }
  },
  created: function created() {
    var _this = this;

    // compatibility: https://caniuse.com/#feat=intersectionobserver
    if (!_utils.isServer && window.IntersectionObserver) {
      this.observer = new IntersectionObserver(function (entries) {
        // trigger scroll when visibility changed
        if (entries[0].intersectionRatio > 0) {
          _this.onScroll();
        }
      }, {
        root: document.body
      });
    }
  },
  methods: {
    onScroll: function onScroll() {
      var _this2 = this;

      if ((0, _style.isHidden)(this.$el)) {
        return;
      }

      this.height = this.$el.offsetHeight;
      var container = this.container,
          offsetTopPx = this.offsetTopPx;
      var scrollTop = (0, _scroll.getScrollTop)(window);
      var topToPageTop = (0, _scroll.getElementTop)(this.$el);

      var emitScrollEvent = function emitScrollEvent() {
        _this2.$emit('scroll', {
          scrollTop: scrollTop,
          isFixed: _this2.fixed
        });
      }; // The sticky component should be kept inside the container element


      if (container) {
        var bottomToPageTop = topToPageTop + container.offsetHeight;

        if (scrollTop + offsetTopPx + this.height > bottomToPageTop) {
          var distanceToBottom = this.height + scrollTop - bottomToPageTop;

          if (distanceToBottom < this.height) {
            this.fixed = true;
            this.transform = -(distanceToBottom + offsetTopPx);
          } else {
            this.fixed = false;
          }

          emitScrollEvent();
          return;
        }
      }

      if (scrollTop + offsetTopPx > topToPageTop) {
        this.fixed = true;
        this.transform = 0;
      } else {
        this.fixed = false;
      }

      emitScrollEvent();
    }
  },
  render: function render() {
    var h = arguments[0];
    var fixed = this.fixed;
    var style = {
      height: fixed ? this.height + "px" : null
    };
    return h("div", {
      "style": style
    }, [h("div", {
      "class": bem({
        fixed: fixed
      }),
      "style": this.style
    }, [this.slots()])]);
  }
});

exports.default = _default;
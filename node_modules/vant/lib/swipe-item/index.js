"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _utils = require("../utils");

var _relation = require("../mixins/relation");

var _createNamespace = (0, _utils.createNamespace)('swipe-item'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var _default = createComponent({
  mixins: [(0, _relation.ChildrenMixin)('vanSwipe')],
  data: function data() {
    return {
      offset: 0,
      mounted: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.mounted = true;
    });
  },
  computed: {
    style: function style() {
      var style = {};
      var _this$parent = this.parent,
          size = _this$parent.size,
          vertical = _this$parent.vertical;
      style[vertical ? 'height' : 'width'] = size + "px";

      if (this.offset) {
        style.transform = "translate" + (vertical ? 'Y' : 'X') + "(" + this.offset + "px)";
      }

      return style;
    },
    shouldRender: function shouldRender() {
      var index = this.index,
          parent = this.parent,
          mounted = this.mounted;

      if (!parent.lazyRender) {
        return true;
      } // wait for all item to mount, so we can get the exact count


      if (!mounted) {
        return false;
      }

      var active = parent.activeIndicator;
      var maxActive = parent.count - 1;
      var prevActive = active === 0 ? maxActive : active - 1;
      var nextActive = active === maxActive ? 0 : active + 1;
      return index === active || index === prevActive || index === nextActive;
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem(),
      "style": this.style,
      "on": (0, _extends2.default)({}, this.$listeners)
    }, [this.shouldRender && this.slots()]);
  }
});

exports.default = _default;
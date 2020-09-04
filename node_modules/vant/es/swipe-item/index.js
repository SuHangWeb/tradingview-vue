import _extends from "@babel/runtime/helpers/esm/extends";
import { createNamespace } from '../utils';
import { ChildrenMixin } from '../mixins/relation';

var _createNamespace = createNamespace('swipe-item'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [ChildrenMixin('vanSwipe')],
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
      "on": _extends({}, this.$listeners)
    }, [this.shouldRender && this.slots()]);
  }
});
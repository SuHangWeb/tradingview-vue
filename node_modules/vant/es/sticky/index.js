import { isHidden } from '../utils/dom/style';
import { unitToPx } from '../utils/format/unit';
import { createNamespace, isDef, isServer } from '../utils';
import { getScrollTop, getElementTop, getScroller } from '../utils/dom/scroll';
import { BindEventMixin } from '../mixins/bind-event';

var _createNamespace = createNamespace('sticky'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [BindEventMixin(function (bind, isBind) {
    if (!this.scroller) {
      this.scroller = getScroller(this.$el);
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
      return unitToPx(this.offsetTop);
    },
    style: function style() {
      if (!this.fixed) {
        return;
      }

      var style = {};

      if (isDef(this.zIndex)) {
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
    if (!isServer && window.IntersectionObserver) {
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

      if (isHidden(this.$el)) {
        return;
      }

      this.height = this.$el.offsetHeight;
      var container = this.container,
          offsetTopPx = this.offsetTopPx;
      var scrollTop = getScrollTop(window);
      var topToPageTop = getElementTop(this.$el);

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
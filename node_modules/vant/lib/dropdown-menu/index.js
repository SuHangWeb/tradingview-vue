"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _scroll = require("../utils/dom/scroll");

var _relation = require("../mixins/relation");

var _clickOutside = require("../mixins/click-outside");

// Utils
// Mixins
var _createNamespace = (0, _utils.createNamespace)('dropdown-menu'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var _default = createComponent({
  mixins: [(0, _relation.ParentMixin)('vanDropdownMenu'), (0, _clickOutside.ClickOutsideMixin)({
    event: 'click',
    method: 'onClickOutside'
  })],
  props: {
    zIndex: [Number, String],
    activeColor: String,
    overlay: {
      type: Boolean,
      default: true
    },
    duration: {
      type: [Number, String],
      default: 0.2
    },
    direction: {
      type: String,
      default: 'down'
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      offset: 0
    };
  },
  computed: {
    scroller: function scroller() {
      return (0, _scroll.getScroller)(this.$el);
    },
    opened: function opened() {
      return this.children.some(function (item) {
        return item.showWrapper;
      });
    },
    barStyle: function barStyle() {
      if (this.opened && (0, _utils.isDef)(this.zIndex)) {
        return {
          zIndex: 1 + this.zIndex
        };
      }
    }
  },
  methods: {
    updateOffset: function updateOffset() {
      if (!this.$refs.bar) {
        return;
      }

      var rect = this.$refs.bar.getBoundingClientRect();

      if (this.direction === 'down') {
        this.offset = rect.bottom;
      } else {
        this.offset = window.innerHeight - rect.top;
      }
    },
    toggleItem: function toggleItem(active) {
      this.children.forEach(function (item, index) {
        if (index === active) {
          item.toggle();
        } else if (item.showPopup) {
          item.toggle(false, {
            immediate: true
          });
        }
      });
    },
    onClickOutside: function onClickOutside() {
      this.children.forEach(function (item) {
        item.toggle(false);
      });
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    var Titles = this.children.map(function (item, index) {
      return h("div", {
        "attrs": {
          "role": "button",
          "tabindex": item.disabled ? -1 : 0
        },
        "class": bem('item', {
          disabled: item.disabled
        }),
        "on": {
          "click": function click() {
            if (!item.disabled) {
              _this.toggleItem(index);
            }
          }
        }
      }, [h("span", {
        "class": [bem('title', {
          active: item.showPopup,
          down: item.showPopup === (_this.direction === 'down')
        }), item.titleClass],
        "style": {
          color: item.showPopup ? _this.activeColor : ''
        }
      }, [h("div", {
        "class": "van-ellipsis"
      }, [item.slots('title') || item.displayTitle])])]);
    });
    return h("div", {
      "class": bem()
    }, [h("div", {
      "ref": "bar",
      "style": this.barStyle,
      "class": bem('bar', {
        opened: this.opened
      })
    }, [Titles]), this.slots('default')]);
  }
});

exports.default = _default;
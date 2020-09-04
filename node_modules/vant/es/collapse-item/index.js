import _extends from "@babel/runtime/helpers/esm/extends";
// Utils
import { createNamespace, isDef } from '../utils';
import { raf, doubleRaf } from '../utils/dom/raf'; // Mixins

import { ChildrenMixin } from '../mixins/relation'; // Components

import Cell from '../cell';
import { cellProps } from '../cell/shared';

var _createNamespace = createNamespace('collapse-item'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var CELL_SLOTS = ['title', 'icon', 'right-icon'];
export default createComponent({
  mixins: [ChildrenMixin('vanCollapse')],
  props: _extends({}, cellProps, {
    name: [Number, String],
    disabled: Boolean,
    isLink: {
      type: Boolean,
      default: true
    }
  }),
  data: function data() {
    return {
      show: null,
      inited: null
    };
  },
  computed: {
    currentName: function currentName() {
      return isDef(this.name) ? this.name : this.index;
    },
    expanded: function expanded() {
      var _this = this;

      if (!this.parent) {
        return null;
      }

      var _this$parent = this.parent,
          value = _this$parent.value,
          accordion = _this$parent.accordion;

      if (process.env.NODE_ENV !== 'production' && !accordion && !Array.isArray(value)) {
        console.error('[Vant] Collapse: type of prop "value" should be Array');
        return;
      }

      return accordion ? value === this.currentName : value.some(function (name) {
        return name === _this.currentName;
      });
    }
  },
  created: function created() {
    this.show = this.expanded;
    this.inited = this.expanded;
  },
  watch: {
    expanded: function expanded(_expanded, prev) {
      var _this2 = this;

      if (prev === null) {
        return;
      }

      if (_expanded) {
        this.show = true;
        this.inited = true;
      } // Use raf: flick when opened in safari
      // Use nextTick: closing animation failed when set `user-select: none`


      var nextTick = _expanded ? this.$nextTick : raf;
      nextTick(function () {
        var _this2$$refs = _this2.$refs,
            content = _this2$$refs.content,
            wrapper = _this2$$refs.wrapper;

        if (!content || !wrapper) {
          return;
        }

        var offsetHeight = content.offsetHeight;

        if (offsetHeight) {
          var contentHeight = offsetHeight + "px";
          wrapper.style.height = _expanded ? 0 : contentHeight; // use double raf to ensure animation can start

          doubleRaf(function () {
            wrapper.style.height = _expanded ? contentHeight : 0;
          });
        } else {
          _this2.onTransitionEnd();
        }
      });
    }
  },
  methods: {
    onClick: function onClick() {
      if (this.disabled) {
        return;
      }

      var parent = this.parent,
          currentName = this.currentName;
      var close = parent.accordion && currentName === parent.value;
      var name = close ? '' : currentName;
      parent.switch(name, !this.expanded);
    },
    onTransitionEnd: function onTransitionEnd() {
      if (!this.expanded) {
        this.show = false;
      } else {
        this.$refs.wrapper.style.height = '';
      }
    },
    genTitle: function genTitle() {
      var _this3 = this;

      var h = this.$createElement;
      var border = this.border,
          disabled = this.disabled,
          expanded = this.expanded;
      var titleSlots = CELL_SLOTS.reduce(function (slots, name) {
        if (_this3.slots(name)) {
          slots[name] = function () {
            return _this3.slots(name);
          };
        }

        return slots;
      }, {});

      if (this.slots('value')) {
        titleSlots.default = function () {
          return _this3.slots('value');
        };
      }

      return h(Cell, {
        "attrs": {
          "role": "button",
          "tabindex": disabled ? -1 : 0,
          "aria-expanded": String(expanded)
        },
        "class": bem('title', {
          disabled: disabled,
          expanded: expanded,
          borderless: !border
        }),
        "on": {
          "click": this.onClick
        },
        "scopedSlots": titleSlots,
        "props": _extends({}, this.$props)
      });
    },
    genContent: function genContent() {
      var h = this.$createElement;

      if (this.inited) {
        return h("div", {
          "directives": [{
            name: "show",
            value: this.show
          }],
          "ref": "wrapper",
          "class": bem('wrapper'),
          "on": {
            "transitionend": this.onTransitionEnd
          }
        }, [h("div", {
          "ref": "content",
          "class": bem('content')
        }, [this.slots()])]);
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": [bem({
        border: this.index && this.border
      })]
    }, [this.genTitle(), this.genContent()]);
  }
});
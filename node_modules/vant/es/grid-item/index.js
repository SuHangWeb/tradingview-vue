import _extends from "@babel/runtime/helpers/esm/extends";
// Utils
import { createNamespace, addUnit, isDef } from '../utils';
import { BORDER } from '../utils/constant';
import { route, routeProps } from '../utils/router'; // Mixins

import { ChildrenMixin } from '../mixins/relation'; // Components

import Info from '../info';
import Icon from '../icon';

var _createNamespace = createNamespace('grid-item'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [ChildrenMixin('vanGrid')],
  props: _extends({}, routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    iconPrefix: String,
    info: [Number, String],
    badge: [Number, String]
  }),
  computed: {
    style: function style() {
      var _this$parent = this.parent,
          square = _this$parent.square,
          gutter = _this$parent.gutter,
          columnNum = _this$parent.columnNum;
      var percent = 100 / columnNum + "%";
      var style = {
        flexBasis: percent
      };

      if (square) {
        style.paddingTop = percent;
      } else if (gutter) {
        var gutterValue = addUnit(gutter);
        style.paddingRight = gutterValue;

        if (this.index >= columnNum) {
          style.marginTop = gutterValue;
        }
      }

      return style;
    },
    contentStyle: function contentStyle() {
      var _this$parent2 = this.parent,
          square = _this$parent2.square,
          gutter = _this$parent2.gutter;

      if (square && gutter) {
        var gutterValue = addUnit(gutter);
        return {
          right: gutterValue,
          bottom: gutterValue,
          height: 'auto'
        };
      }
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
      route(this.$router, this);
    },
    genIcon: function genIcon() {
      var h = this.$createElement;
      var iconSlot = this.slots('icon');
      var info = isDef(this.badge) ? this.badge : this.info;

      if (iconSlot) {
        return h("div", {
          "class": bem('icon-wrapper')
        }, [iconSlot, h(Info, {
          "attrs": {
            "dot": this.dot,
            "info": info
          }
        })]);
      }

      if (this.icon) {
        return h(Icon, {
          "attrs": {
            "name": this.icon,
            "dot": this.dot,
            "info": info,
            "size": this.parent.iconSize,
            "classPrefix": this.iconPrefix
          },
          "class": bem('icon')
        });
      }
    },
    getText: function getText() {
      var h = this.$createElement;
      var textSlot = this.slots('text');

      if (textSlot) {
        return textSlot;
      }

      if (this.text) {
        return h("span", {
          "class": bem('text')
        }, [this.text]);
      }
    },
    genContent: function genContent() {
      var slot = this.slots();

      if (slot) {
        return slot;
      }

      return [this.genIcon(), this.getText()];
    }
  },
  render: function render() {
    var _ref;

    var h = arguments[0];
    var _this$parent3 = this.parent,
        center = _this$parent3.center,
        border = _this$parent3.border,
        square = _this$parent3.square,
        gutter = _this$parent3.gutter,
        direction = _this$parent3.direction,
        clickable = _this$parent3.clickable;
    return h("div", {
      "class": [bem({
        square: square
      })],
      "style": this.style
    }, [h("div", {
      "style": this.contentStyle,
      "attrs": {
        "role": clickable ? 'button' : null,
        "tabindex": clickable ? 0 : null
      },
      "class": [bem('content', [direction, {
        center: center,
        square: square,
        clickable: clickable,
        surround: border && gutter
      }]), (_ref = {}, _ref[BORDER] = border, _ref)],
      "on": {
        "click": this.onClick
      }
    }, [this.genContent()])]);
  }
});
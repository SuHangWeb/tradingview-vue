import _extends from "@babel/runtime/helpers/esm/extends";
import { createNamespace, isDef } from '../utils';
import { route, routeProps } from '../utils/router';
import { ChildrenMixin } from '../mixins/relation';
import Info from '../info';
import Icon from '../icon';

var _createNamespace = createNamespace('goods-action-icon'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [ChildrenMixin('vanGoodsAction')],
  props: _extends({}, routeProps, {
    dot: Boolean,
    text: String,
    icon: String,
    color: String,
    info: [Number, String],
    badge: [Number, String],
    iconClass: null
  }),
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
      route(this.$router, this);
    },
    genIcon: function genIcon() {
      var h = this.$createElement;
      var slot = this.slots('icon');
      var info = isDef(this.badge) ? this.badge : this.info;

      if (slot) {
        return h("div", {
          "class": bem('icon')
        }, [slot, h(Info, {
          "attrs": {
            "dot": this.dot,
            "info": info
          }
        })]);
      }

      return h(Icon, {
        "class": [bem('icon'), this.iconClass],
        "attrs": {
          "tag": "div",
          "dot": this.dot,
          "info": info,
          "name": this.icon,
          "color": this.color
        }
      });
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "attrs": {
        "role": "button",
        "tabindex": "0"
      },
      "class": bem(),
      "on": {
        "click": this.onClick
      }
    }, [this.genIcon(), this.slots() || this.text]);
  }
});
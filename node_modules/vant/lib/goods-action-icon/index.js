"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _utils = require("../utils");

var _router = require("../utils/router");

var _relation = require("../mixins/relation");

var _info = _interopRequireDefault(require("../info"));

var _icon = _interopRequireDefault(require("../icon"));

var _createNamespace = (0, _utils.createNamespace)('goods-action-icon'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var _default = createComponent({
  mixins: [(0, _relation.ChildrenMixin)('vanGoodsAction')],
  props: (0, _extends2.default)({}, _router.routeProps, {
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
      (0, _router.route)(this.$router, this);
    },
    genIcon: function genIcon() {
      var h = this.$createElement;
      var slot = this.slots('icon');
      var info = (0, _utils.isDef)(this.badge) ? this.badge : this.info;

      if (slot) {
        return h("div", {
          "class": bem('icon')
        }, [slot, h(_info.default, {
          "attrs": {
            "dot": this.dot,
            "info": info
          }
        })]);
      }

      return h(_icon.default, {
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

exports.default = _default;
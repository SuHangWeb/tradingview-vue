"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _shared = require("./shared");

var _field = require("../mixins/field");

var _loading = _interopRequireDefault(require("../loading"));

// Utils
// Mixins
// Components
var _createNamespace = (0, _utils.createNamespace)('switch'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var _default = createComponent({
  mixins: [_field.FieldMixin],
  props: _shared.switchProps,
  computed: {
    checked: function checked() {
      return this.value === this.activeValue;
    },
    style: function style() {
      return {
        fontSize: (0, _utils.addUnit)(this.size),
        backgroundColor: this.checked ? this.activeColor : this.inactiveColor
      };
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);

      if (!this.disabled && !this.loading) {
        var newValue = this.checked ? this.inactiveValue : this.activeValue;
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      }
    },
    genLoading: function genLoading() {
      var h = this.$createElement;

      if (this.loading) {
        var color = this.checked ? this.activeColor : this.inactiveColor;
        return h(_loading.default, {
          "class": bem('loading'),
          "attrs": {
            "color": color
          }
        });
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    var checked = this.checked,
        loading = this.loading,
        disabled = this.disabled;
    return h("div", {
      "class": bem({
        on: checked,
        loading: loading,
        disabled: disabled
      }),
      "attrs": {
        "role": "switch",
        "aria-checked": String(checked)
      },
      "style": this.style,
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": bem('node')
    }, [this.genLoading()])]);
  }
});

exports.default = _default;
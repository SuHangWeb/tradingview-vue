// Utils
import { createNamespace, addUnit } from '../utils';
import { switchProps } from './shared'; // Mixins

import { FieldMixin } from '../mixins/field'; // Components

import Loading from '../loading';

var _createNamespace = createNamespace('switch'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [FieldMixin],
  props: switchProps,
  computed: {
    checked: function checked() {
      return this.value === this.activeValue;
    },
    style: function style() {
      return {
        fontSize: addUnit(this.size),
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
        return h(Loading, {
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
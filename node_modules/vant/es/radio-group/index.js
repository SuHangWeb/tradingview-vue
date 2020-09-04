import { createNamespace } from '../utils';
import { FieldMixin } from '../mixins/field';
import { ParentMixin } from '../mixins/relation';

var _createNamespace = createNamespace('radio-group'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [ParentMixin('vanRadio'), FieldMixin],
  props: {
    value: null,
    disabled: Boolean,
    direction: String,
    checkedColor: String,
    iconSize: [Number, String]
  },
  watch: {
    value: function value(_value) {
      this.$emit('change', _value);
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem([this.direction]),
      "attrs": {
        "role": "radiogroup"
      }
    }, [this.slots()]);
  }
});
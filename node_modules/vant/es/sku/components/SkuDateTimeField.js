// Utils
import { createNamespace } from '../../utils';
import { stringToDate, dateToString } from '../utils/time-helper'; // Components

import Popup from '../../popup';
import DateTimePicker from '../../datetime-picker';
import Field from '../../field';
var namespace = createNamespace('sku-datetime-field');
var createComponent = namespace[0];
var t = namespace[2];
export default createComponent({
  props: {
    value: String,
    label: String,
    required: Boolean,
    placeholder: String,
    type: {
      type: String,
      default: 'date'
    }
  },
  data: function data() {
    return {
      showDatePicker: false,
      currentDate: this.type === 'time' ? '' : new Date(),
      minDate: new Date(new Date().getFullYear() - 60, 0, 1)
    };
  },
  watch: {
    value: function value(val) {
      switch (this.type) {
        case 'time':
          this.currentDate = val;
          break;

        case 'date':
        case 'datetime':
          this.currentDate = stringToDate(val) || new Date();
          break;
      }
    }
  },
  computed: {
    title: function title() {
      return t("title." + this.type);
    }
  },
  methods: {
    onClick: function onClick() {
      this.showDatePicker = true;
    },
    onConfirm: function onConfirm(val) {
      var data = val;

      if (this.type !== 'time') {
        data = dateToString(val, this.type);
      }

      this.$emit('input', data);
      this.showDatePicker = false;
    },
    onCancel: function onCancel() {
      this.showDatePicker = false;
    },
    formatter: function formatter(type, val) {
      var word = t("format." + type);
      return "" + val + word;
    }
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    return h(Field, {
      "attrs": {
        "readonly": true,
        "is-link": true,
        "center": true,
        "value": this.value,
        "label": this.label,
        "required": this.required,
        "placeholder": this.placeholder
      },
      "on": {
        "click": this.onClick
      }
    }, [h(Popup, {
      "attrs": {
        "round": true,
        "position": "bottom",
        "getContainer": "body"
      },
      "slot": "extra",
      "model": {
        value: _this.showDatePicker,
        callback: function callback($$v) {
          _this.showDatePicker = $$v;
        }
      }
    }, [h(DateTimePicker, {
      "attrs": {
        "type": this.type,
        "title": this.title,
        "value": this.currentDate,
        "minDate": this.minDate,
        "formatter": this.formatter
      },
      "on": {
        "cancel": this.onCancel,
        "confirm": this.onConfirm
      }
    })])]);
  }
});
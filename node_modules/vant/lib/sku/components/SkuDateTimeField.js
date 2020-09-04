"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../../utils");

var _timeHelper = require("../utils/time-helper");

var _popup = _interopRequireDefault(require("../../popup"));

var _datetimePicker = _interopRequireDefault(require("../../datetime-picker"));

var _field = _interopRequireDefault(require("../../field"));

// Utils
// Components
var namespace = (0, _utils.createNamespace)('sku-datetime-field');
var createComponent = namespace[0];
var t = namespace[2];

var _default = createComponent({
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
          this.currentDate = (0, _timeHelper.stringToDate)(val) || new Date();
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
        data = (0, _timeHelper.dateToString)(val, this.type);
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
    return h(_field.default, {
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
    }, [h(_popup.default, {
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
    }, [h(_datetimePicker.default, {
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

exports.default = _default;
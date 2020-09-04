import { createNamespace, addUnit } from '../utils';
import { preventDefault } from '../utils/dom/event';
import { TouchMixin } from '../mixins/touch';
import { FieldMixin } from '../mixins/field';

var _createNamespace = createNamespace('slider'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [TouchMixin, FieldMixin],
  props: {
    disabled: Boolean,
    vertical: Boolean,
    barHeight: [Number, String],
    buttonSize: [Number, String],
    activeColor: String,
    inactiveColor: String,
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    step: {
      type: [Number, String],
      default: 1
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      dragStatus: ''
    };
  },
  computed: {
    range: function range() {
      return this.max - this.min;
    },
    buttonStyle: function buttonStyle() {
      if (this.buttonSize) {
        var size = addUnit(this.buttonSize);
        return {
          width: size,
          height: size
        };
      }
    }
  },
  created: function created() {
    // format initial value
    this.updateValue(this.value);
  },
  mounted: function mounted() {
    this.bindTouchEvent(this.$refs.wrapper);
  },
  methods: {
    onTouchStart: function onTouchStart(event) {
      if (this.disabled) {
        return;
      }

      this.touchStart(event);
      this.startValue = this.format(this.value);
      this.dragStatus = 'start';
    },
    onTouchMove: function onTouchMove(event) {
      if (this.disabled) {
        return;
      }

      if (this.dragStatus === 'start') {
        this.$emit('drag-start');
      }

      preventDefault(event, true);
      this.touchMove(event);
      this.dragStatus = 'draging';
      var rect = this.$el.getBoundingClientRect();
      var delta = this.vertical ? this.deltaY : this.deltaX;
      var total = this.vertical ? rect.height : rect.width;
      var diff = delta / total * this.range;
      this.newValue = this.startValue + diff;
      this.updateValue(this.newValue);
    },
    onTouchEnd: function onTouchEnd() {
      if (this.disabled) {
        return;
      }

      if (this.dragStatus === 'draging') {
        this.updateValue(this.newValue, true);
        this.$emit('drag-end');
      }

      this.dragStatus = '';
    },
    onClick: function onClick(event) {
      event.stopPropagation();
      if (this.disabled) return;
      var rect = this.$el.getBoundingClientRect();
      var delta = this.vertical ? event.clientY - rect.top : event.clientX - rect.left;
      var total = this.vertical ? rect.height : rect.width;
      var value = +this.min + delta / total * this.range;
      this.startValue = this.value;
      this.updateValue(value, true);
    },
    updateValue: function updateValue(value, end) {
      value = this.format(value);

      if (value !== this.value) {
        this.$emit('input', value);
      }

      if (end && value !== this.startValue) {
        this.$emit('change', value);
      }
    },
    format: function format(value) {
      return Math.round(Math.max(this.min, Math.min(value, this.max)) / this.step) * this.step;
    }
  },
  render: function render() {
    var _wrapperStyle, _barStyle;

    var h = arguments[0];
    var vertical = this.vertical;
    var mainAxis = vertical ? 'height' : 'width';
    var crossAxis = vertical ? 'width' : 'height';
    var wrapperStyle = (_wrapperStyle = {
      background: this.inactiveColor
    }, _wrapperStyle[crossAxis] = addUnit(this.barHeight), _wrapperStyle);
    var barStyle = (_barStyle = {}, _barStyle[mainAxis] = (this.value - this.min) * 100 / this.range + "%", _barStyle.background = this.activeColor, _barStyle);

    if (this.dragStatus) {
      barStyle.transition = 'none';
    }

    return h("div", {
      "style": wrapperStyle,
      "class": bem({
        disabled: this.disabled,
        vertical: vertical
      }),
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": bem('bar'),
      "style": barStyle
    }, [h("div", {
      "ref": "wrapper",
      "attrs": {
        "role": "slider",
        "tabindex": this.disabled ? -1 : 0,
        "aria-valuemin": this.min,
        "aria-valuenow": this.value,
        "aria-valuemax": this.max,
        "aria-orientation": this.vertical ? 'vertical' : 'horizontal'
      },
      "class": bem('button-wrapper')
    }, [this.slots('button') || h("div", {
      "class": bem('button'),
      "style": this.buttonStyle
    })])])]);
  }
});
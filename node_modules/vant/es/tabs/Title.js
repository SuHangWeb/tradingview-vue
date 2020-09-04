import { createNamespace, isDef } from '../utils';
import Info from '../info';

var _createNamespace = createNamespace('tab'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  props: {
    dot: Boolean,
    type: String,
    info: [Number, String],
    color: String,
    title: String,
    isActive: Boolean,
    disabled: Boolean,
    scrollable: Boolean,
    activeColor: String,
    inactiveColor: String,
    swipeThreshold: [Number, String]
  },
  computed: {
    style: function style() {
      var style = {};
      var color = this.color,
          isActive = this.isActive;
      var isCard = this.type === 'card'; // card theme color

      if (color && isCard) {
        style.borderColor = color;

        if (!this.disabled) {
          if (isActive) {
            style.backgroundColor = color;
          } else {
            style.color = color;
          }
        }
      }

      var titleColor = isActive ? this.activeColor : this.inactiveColor;

      if (titleColor) {
        style.color = titleColor;
      }

      return style;
    }
  },
  methods: {
    onClick: function onClick() {
      this.$emit('click');
    },
    genText: function genText() {
      var h = this.$createElement;
      var Text = h("span", {
        "class": bem('text', {
          ellipsis: !this.scrollable
        })
      }, [this.slots() || this.title]);

      if (this.dot || isDef(this.info) && this.info !== '') {
        return h("span", {
          "class": bem('text-wrapper')
        }, [Text, h(Info, {
          "attrs": {
            "dot": this.dot,
            "info": this.info
          }
        })]);
      }

      return Text;
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "attrs": {
        "role": "tab",
        "aria-selected": this.isActive
      },
      "class": [bem({
        active: this.isActive,
        disabled: this.disabled
      })],
      "style": this.style,
      "on": {
        "click": this.onClick
      }
    }, [this.genText()]);
  }
});
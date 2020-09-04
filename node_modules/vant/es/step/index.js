import { createNamespace } from '../utils';
import { BORDER } from '../utils/constant';
import { ChildrenMixin } from '../mixins/relation';
import Icon from '../icon';

var _createNamespace = createNamespace('step'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [ChildrenMixin('vanSteps')],
  computed: {
    status: function status() {
      if (this.index < this.parent.active) {
        return 'finish';
      }

      if (this.index === +this.parent.active) {
        return 'process';
      }
    },
    active: function active() {
      return this.status === 'process';
    },
    lineStyle: function lineStyle() {
      if (this.status === 'finish') {
        return {
          background: this.parent.activeColor
        };
      }

      return {
        background: this.parent.inactiveColor
      };
    },
    titleStyle: function titleStyle() {
      if (this.active) {
        return {
          color: this.parent.activeColor
        };
      }

      if (!this.status) {
        return {
          color: this.parent.inactiveColor
        };
      }
    }
  },
  methods: {
    genCircle: function genCircle() {
      var h = this.$createElement;
      var _this$parent = this.parent,
          activeIcon = _this$parent.activeIcon,
          activeColor = _this$parent.activeColor,
          inactiveIcon = _this$parent.inactiveIcon;

      if (this.active) {
        return this.slots('active-icon') || h(Icon, {
          "class": bem('icon', 'active'),
          "attrs": {
            "name": activeIcon,
            "color": activeColor
          }
        });
      }

      var inactiveIconSlot = this.slots('inactive-icon');

      if (inactiveIcon || inactiveIconSlot) {
        return inactiveIconSlot || h(Icon, {
          "class": bem('icon'),
          "attrs": {
            "name": inactiveIcon
          }
        });
      }

      return h("i", {
        "class": bem('circle'),
        "style": this.lineStyle
      });
    },
    onClickStep: function onClickStep() {
      this.parent.$emit('click-step', this.index);
    }
  },
  render: function render() {
    var _ref;

    var h = arguments[0];
    var status = this.status,
        active = this.active;
    var direction = this.parent.direction;
    return h("div", {
      "class": [BORDER, bem([direction, (_ref = {}, _ref[status] = status, _ref)])]
    }, [h("div", {
      "class": bem('title', {
        active: active
      }),
      "style": this.titleStyle,
      "on": {
        "click": this.onClickStep
      }
    }, [this.slots()]), h("div", {
      "class": bem('circle-container'),
      "on": {
        "click": this.onClickStep
      }
    }, [this.genCircle()]), h("div", {
      "class": bem('line'),
      "style": this.lineStyle
    })]);
  }
});
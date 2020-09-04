import { createNamespace } from '../utils';
import { TouchMixin } from '../mixins/touch';
import Loading from '../loading';
import DeleteIcon from './DeleteIcon';
import CollapseIcon from './CollapseIcon';

var _createNamespace = createNamespace('key'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [TouchMixin],
  props: {
    type: String,
    text: [Number, String],
    color: String,
    wider: Boolean,
    large: Boolean,
    loading: Boolean
  },
  data: function data() {
    return {
      active: false
    };
  },
  mounted: function mounted() {
    this.bindTouchEvent(this.$el);
  },
  methods: {
    onTouchStart: function onTouchStart(event) {
      // compatible with Vue 2.6 event bubble bug
      event.stopPropagation();
      this.touchStart(event);
      this.active = true;
    },
    onTouchMove: function onTouchMove(event) {
      this.touchMove(event);

      if (this.direction) {
        this.active = false;
      }
    },
    onTouchEnd: function onTouchEnd(event) {
      if (this.active) {
        // eliminate tap delay on safari
        event.preventDefault();
        this.active = false;
        this.$emit('press', this.text, this.type);
      }
    },
    genContent: function genContent() {
      var h = this.$createElement;
      var isExtra = this.type === 'extra';
      var isDelete = this.type === 'delete';
      var text = this.slots('default') || this.text;

      if (this.loading) {
        return h(Loading, {
          "class": bem('loading-icon')
        });
      }

      if (isDelete) {
        return text || h(DeleteIcon, {
          "class": bem('delete-icon')
        });
      }

      if (isExtra) {
        return text || h(CollapseIcon, {
          "class": bem('collapse-icon')
        });
      }

      return text;
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem('wrapper', {
        wider: this.wider
      })
    }, [h("div", {
      "attrs": {
        "role": "button",
        "tabindex": "0"
      },
      "class": bem([this.color, {
        large: this.large,
        active: this.active,
        delete: this.type === 'delete'
      }])
    }, [this.genContent()])]);
  }
});
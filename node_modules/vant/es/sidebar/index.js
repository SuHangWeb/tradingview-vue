import { createNamespace } from '../utils';
import { ParentMixin } from '../mixins/relation';

var _createNamespace = createNamespace('sidebar'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [ParentMixin('vanSidebar')],
  model: {
    prop: 'activeKey'
  },
  props: {
    activeKey: {
      type: [Number, String],
      default: 0
    }
  },
  data: function data() {
    return {
      index: +this.activeKey
    };
  },
  watch: {
    activeKey: function activeKey() {
      this.setIndex(+this.activeKey);
    }
  },
  methods: {
    setIndex: function setIndex(index) {
      if (index !== this.index) {
        this.index = index;
        this.$emit('change', index);
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem()
    }, [this.slots()]);
  }
});
import { createNamespace } from '../utils';
import { ParentMixin } from '../mixins/relation';

var _createNamespace = createNamespace('goods-action'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [ParentMixin('vanGoodsAction')],
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem({
        unfit: !this.safeAreaInsetBottom
      })
    }, [this.slots()]);
  }
});
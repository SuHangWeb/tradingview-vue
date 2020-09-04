// Utils
import { createNamespace } from '../../utils';
import { BORDER_BOTTOM } from '../../utils/constant'; // Mixins

import { ParentMixin } from '../../mixins/relation';
import { BindEventMixin } from '../../mixins/bind-event';

var _createNamespace = createNamespace('sku-row'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1],
    t = _createNamespace[2];

export { bem };
export default createComponent({
  mixins: [ParentMixin('vanSkuRows'), BindEventMixin(function (bind) {
    if (this.scrollable && this.$refs.scroller) {
      bind(this.$refs.scroller, 'scroll', this.onScroll);
    }
  })],
  props: {
    skuRow: Object
  },
  data: function data() {
    return {
      progress: 0
    };
  },
  computed: {
    scrollable: function scrollable() {
      return this.skuRow.largeImageMode && this.skuRow.v.length > 6;
    }
  },
  methods: {
    onScroll: function onScroll() {
      var _this$$refs = this.$refs,
          scroller = _this$$refs.scroller,
          row = _this$$refs.row;
      var distance = row.offsetWidth - scroller.offsetWidth;
      this.progress = scroller.scrollLeft / distance;
    },
    genTitle: function genTitle() {
      var h = this.$createElement;
      return h("div", {
        "class": bem('title')
      }, [this.skuRow.k, this.skuRow.is_multiple && h("span", {
        "class": bem('title-multiple')
      }, ["\uFF08", t('multiple'), "\uFF09"])]);
    },
    genIndicator: function genIndicator() {
      var h = this.$createElement;

      if (this.scrollable) {
        var style = {
          transform: "translate3d(" + this.progress * 20 + "px, 0, 0)"
        };
        return h("div", {
          "class": bem('indicator-wrapper')
        }, [h("div", {
          "class": bem('indicator')
        }, [h("div", {
          "class": bem('indicator-slider'),
          "style": style
        })])]);
      }
    },
    genContent: function genContent() {
      var h = this.$createElement;
      var nodes = this.slots();

      if (this.skuRow.largeImageMode) {
        var top = [];
        var bottom = [];
        nodes.forEach(function (node, index) {
          var group = Math.floor(index / 3) % 2 === 0 ? top : bottom;
          group.push(node);
        });
        return h("div", {
          "class": bem('scroller'),
          "ref": "scroller"
        }, [h("div", {
          "class": bem('row'),
          "ref": "row"
        }, [top]), bottom.length ? h("div", {
          "class": bem('row')
        }, [bottom]) : null]);
      }

      return nodes;
    },
    centerItem: function centerItem(selectSkuId) {
      if (!this.skuRow.largeImageMode || !selectSkuId) {
        return;
      }

      var _this$children = this.children,
          children = _this$children === void 0 ? [] : _this$children;
      var _this$$refs2 = this.$refs,
          scroller = _this$$refs2.scroller,
          row = _this$$refs2.row;
      var child = children.find(function (it) {
        return +it.skuValue.id === +selectSkuId;
      });

      if (scroller && row && child && child.$el) {
        var target = child.$el;
        var to = target.offsetLeft - (scroller.offsetWidth - target.offsetWidth) / 2;
        scroller.scrollLeft = to;
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": [bem(), BORDER_BOTTOM]
    }, [this.genTitle(), this.genContent(), this.genIndicator()]);
  }
});
import _extends from "@babel/runtime/helpers/esm/extends";
import { bem } from './SkuRow';
import { createNamespace } from '../../utils';
import { isSkuChoosable } from '../utils/sku-helper';
import { ChildrenMixin } from '../../mixins/relation';
import Image from '../../image';

var _createNamespace = createNamespace('sku-row-item'),
    createComponent = _createNamespace[0];

export default createComponent({
  mixins: [ChildrenMixin('vanSkuRows')],
  props: {
    lazyLoad: Boolean,
    skuValue: Object,
    skuKeyStr: String,
    skuEventBus: Object,
    selectedSku: Object,
    largeImageMode: Boolean,
    skuList: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  computed: {
    imgUrl: function imgUrl() {
      var url = this.skuValue.imgUrl || this.skuValue.img_url;
      return this.largeImageMode ? url || 'https://img.yzcdn.cn/upload_files/2020/06/24/FmKWDg0bN9rMcTp9ne8MXiQWGtLn.png' : url;
    },
    choosable: function choosable() {
      return isSkuChoosable(this.skuList, this.selectedSku, {
        key: this.skuKeyStr,
        valueId: this.skuValue.id
      });
    }
  },
  methods: {
    onSelect: function onSelect() {
      if (this.choosable) {
        this.skuEventBus.$emit('sku:select', _extends({}, this.skuValue, {
          skuKeyStr: this.skuKeyStr
        }));
      }
    },
    onPreviewImg: function onPreviewImg(event) {
      event.stopPropagation();
      var skuValue = this.skuValue,
          skuKeyStr = this.skuKeyStr;
      this.skuEventBus.$emit('sku:previewImage', _extends({}, skuValue, {
        ks: skuKeyStr,
        imgUrl: skuValue.imgUrl || skuValue.img_url
      }));
    },
    genImage: function genImage(classPrefix) {
      var h = this.$createElement;

      if (this.imgUrl) {
        return h(Image, {
          "attrs": {
            "fit": "cover",
            "src": this.imgUrl,
            "lazyLoad": this.lazyLoad
          },
          "class": classPrefix + "-img"
        });
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    var choosed = this.skuValue.id === this.selectedSku[this.skuKeyStr];
    var classPrefix = this.largeImageMode ? bem('image-item') : bem('item');
    return h("span", {
      "class": [classPrefix, choosed ? classPrefix + "--active" : '', !this.choosable ? classPrefix + "--disabled" : ''],
      "on": {
        "click": this.onSelect
      }
    }, [this.genImage(classPrefix), h("div", {
      "class": classPrefix + "-name"
    }, [this.largeImageMode ? h("span", {
      "class": {
        'van-multi-ellipsis--l2': this.largeImageMode
      }
    }, [this.skuValue.name]) : this.skuValue.name]), this.largeImageMode && h("img", {
      "class": classPrefix + "-img-icon",
      "attrs": {
        "src": "https://img.yzcdn.cn/upload_files/2020/07/02/Fu4_ya0l0aAt4Mv4PL9jzPzfZnDX.png"
      },
      "on": {
        "click": this.onPreviewImg
      }
    })]);
  }
});
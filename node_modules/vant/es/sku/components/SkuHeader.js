import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/esm/extends";
// Utils
import { createNamespace } from '../../utils';
import { inherit } from '../../utils/functional';
import { BORDER_BOTTOM } from '../../utils/constant'; // Components

import Image from '../../image'; // Types

var _createNamespace = createNamespace('sku-header'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function getSkuImgValue(sku, selectedSku) {
  var imgValue;
  sku.tree.some(function (item) {
    var id = selectedSku[item.k_s];

    if (id && item.v) {
      var matchedSku = item.v.filter(function (skuValue) {
        return skuValue.id === id;
      })[0] || {};
      var img = matchedSku.previewImgUrl || matchedSku.imgUrl || matchedSku.img_url;

      if (img) {
        imgValue = _extends({}, matchedSku, {
          ks: item.k_s,
          imgUrl: img
        });
        return true;
      }
    }

    return false;
  });
  return imgValue;
}

function SkuHeader(h, props, slots, ctx) {
  var _slots$skuHeaderIma;

  var sku = props.sku,
      goods = props.goods,
      skuEventBus = props.skuEventBus,
      selectedSku = props.selectedSku,
      _props$showHeaderImag = props.showHeaderImage,
      showHeaderImage = _props$showHeaderImag === void 0 ? true : _props$showHeaderImag;
  var selectedValue = getSkuImgValue(sku, selectedSku);
  var imgUrl = selectedValue ? selectedValue.imgUrl : goods.picture;

  var previewImage = function previewImage() {
    skuEventBus.$emit('sku:previewImage', selectedValue);
  };

  return h("div", _mergeJSXProps([{
    "class": [bem(), BORDER_BOTTOM]
  }, inherit(ctx)]), [showHeaderImage && h(Image, {
    "attrs": {
      "fit": "cover",
      "src": imgUrl
    },
    "class": bem('img-wrap'),
    "on": {
      "click": previewImage
    }
  }, [(_slots$skuHeaderIma = slots['sku-header-image-extra']) == null ? void 0 : _slots$skuHeaderIma.call(slots)]), h("div", {
    "class": bem('goods-info')
  }, [slots.default == null ? void 0 : slots.default()])]);
}

SkuHeader.props = {
  sku: Object,
  goods: Object,
  skuEventBus: Object,
  selectedSku: Object,
  showHeaderImage: Boolean
};
export default createComponent(SkuHeader);
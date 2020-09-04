"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _utils = require("../../utils");

var _functional = require("../../utils/functional");

var _constant = require("../../utils/constant");

var _image = _interopRequireDefault(require("../../image"));

// Utils
// Components
var _createNamespace = (0, _utils.createNamespace)('sku-header'),
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
        imgValue = (0, _extends2.default)({}, matchedSku, {
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

  return h("div", (0, _babelHelperVueJsxMergeProps.default)([{
    "class": [bem(), _constant.BORDER_BOTTOM]
  }, (0, _functional.inherit)(ctx)]), [showHeaderImage && h(_image.default, {
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

var _default = createComponent(SkuHeader);

exports.default = _default;
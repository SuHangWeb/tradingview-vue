"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _SkuRow = require("./SkuRow");

var _utils = require("../../utils");

var _skuHelper = require("../utils/sku-helper");

var _relation = require("../../mixins/relation");

var _image = _interopRequireDefault(require("../../image"));

var _createNamespace = (0, _utils.createNamespace)('sku-row-item'),
    createComponent = _createNamespace[0];

var _default2 = createComponent({
  mixins: [(0, _relation.ChildrenMixin)('vanSkuRows')],
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
      return (0, _skuHelper.isSkuChoosable)(this.skuList, this.selectedSku, {
        key: this.skuKeyStr,
        valueId: this.skuValue.id
      });
    }
  },
  methods: {
    onSelect: function onSelect() {
      if (this.choosable) {
        this.skuEventBus.$emit('sku:select', (0, _extends2.default)({}, this.skuValue, {
          skuKeyStr: this.skuKeyStr
        }));
      }
    },
    onPreviewImg: function onPreviewImg(event) {
      event.stopPropagation();
      var skuValue = this.skuValue,
          skuKeyStr = this.skuKeyStr;
      this.skuEventBus.$emit('sku:previewImage', (0, _extends2.default)({}, skuValue, {
        ks: skuKeyStr,
        imgUrl: skuValue.imgUrl || skuValue.img_url
      }));
    },
    genImage: function genImage(classPrefix) {
      var h = this.$createElement;

      if (this.imgUrl) {
        return h(_image.default, {
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
    var classPrefix = this.largeImageMode ? (0, _SkuRow.bem)('image-item') : (0, _SkuRow.bem)('item');
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

exports.default = _default2;
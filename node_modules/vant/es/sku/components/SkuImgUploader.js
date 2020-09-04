// Utils
import { createNamespace } from '../../utils'; // Components

import Uploader from '../../uploader';
var namespace = createNamespace('sku-img-uploader');
var createComponent = namespace[0];
var t = namespace[2];
export default createComponent({
  props: {
    value: String,
    uploadImg: Function,
    maxSize: {
      type: Number,
      default: 6
    }
  },
  data: function data() {
    return {
      fileList: []
    };
  },
  watch: {
    value: function value(val) {
      if (val) {
        this.fileList = [{
          url: val,
          isImage: true
        }];
      } else {
        this.fileList = [];
      }
    }
  },
  methods: {
    afterReadFile: function afterReadFile(file) {
      var _this = this;

      file.status = 'uploading';
      file.message = t('uploading');
      this.uploadImg(file.file, file.content).then(function (img) {
        file.status = 'done';

        _this.$emit('input', img);
      }).catch(function () {
        file.status = 'failed';
        file.message = t('fail');
      });
    },
    onOversize: function onOversize() {
      this.$toast(t('oversize', this.maxSize));
    },
    onDelete: function onDelete() {
      this.$emit('input', '');
    }
  },
  render: function render() {
    var _this2 = this;

    var h = arguments[0];
    return h(Uploader, {
      "attrs": {
        "maxCount": 1,
        "afterRead": this.afterReadFile,
        "maxSize": this.maxSize * 1024 * 1024
      },
      "on": {
        "oversize": this.onOversize,
        "delete": this.onDelete
      },
      "model": {
        value: _this2.fileList,
        callback: function callback($$v) {
          _this2.fileList = $$v;
        }
      }
    });
  }
});
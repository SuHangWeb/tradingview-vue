import _extends from "@babel/runtime/helpers/esm/extends";
// Utils
import { createNamespace, addUnit, noop, isPromise, isDef } from '../utils';
import { toArray, readFile as _readFile, isOversize, isImageFile } from './utils'; // Mixins

import { FieldMixin } from '../mixins/field'; // Components

import Icon from '../icon';
import Image from '../image';
import Loading from '../loading';
import ImagePreview from '../image-preview';

var _createNamespace = createNamespace('uploader'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  inheritAttrs: false,
  mixins: [FieldMixin],
  model: {
    prop: 'fileList'
  },
  props: {
    disabled: Boolean,
    lazyLoad: Boolean,
    uploadText: String,
    afterRead: Function,
    beforeRead: Function,
    beforeDelete: Function,
    previewSize: [Number, String],
    previewOptions: Object,
    name: {
      type: [Number, String],
      default: ''
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    fileList: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    maxSize: {
      type: [Number, String],
      default: Number.MAX_VALUE
    },
    maxCount: {
      type: [Number, String],
      default: Number.MAX_VALUE
    },
    deletable: {
      type: Boolean,
      default: true
    },
    showUpload: {
      type: Boolean,
      default: true
    },
    previewImage: {
      type: Boolean,
      default: true
    },
    previewFullImage: {
      type: Boolean,
      default: true
    },
    imageFit: {
      type: String,
      default: 'cover'
    },
    resultType: {
      type: String,
      default: 'dataUrl'
    },
    uploadIcon: {
      type: String,
      default: 'photograph'
    }
  },
  computed: {
    previewSizeWithUnit: function previewSizeWithUnit() {
      return addUnit(this.previewSize);
    },
    // for form
    value: function value() {
      return this.fileList;
    }
  },
  methods: {
    getDetail: function getDetail(index) {
      if (index === void 0) {
        index = this.fileList.length;
      }

      return {
        name: this.name,
        index: index
      };
    },
    onChange: function onChange(event) {
      var _this = this;

      var files = event.target.files;

      if (this.disabled || !files.length) {
        return;
      }

      files = files.length === 1 ? files[0] : [].slice.call(files);

      if (this.beforeRead) {
        var response = this.beforeRead(files, this.getDetail());

        if (!response) {
          this.resetInput();
          return;
        }

        if (isPromise(response)) {
          response.then(function (data) {
            if (data) {
              _this.readFile(data);
            } else {
              _this.readFile(files);
            }
          }).catch(this.resetInput);
          return;
        }
      }

      this.readFile(files);
    },
    readFile: function readFile(files) {
      var _this2 = this;

      var oversize = isOversize(files, this.maxSize);

      if (Array.isArray(files)) {
        var maxCount = this.maxCount - this.fileList.length;

        if (files.length > maxCount) {
          files = files.slice(0, maxCount);
        }

        Promise.all(files.map(function (file) {
          return _readFile(file, _this2.resultType);
        })).then(function (contents) {
          var fileList = files.map(function (file, index) {
            var result = {
              file: file,
              status: '',
              message: ''
            };

            if (contents[index]) {
              result.content = contents[index];
            }

            return result;
          });

          _this2.onAfterRead(fileList, oversize);
        });
      } else {
        _readFile(files, this.resultType).then(function (content) {
          var result = {
            file: files,
            status: '',
            message: ''
          };

          if (content) {
            result.content = content;
          }

          _this2.onAfterRead(result, oversize);
        });
      }
    },
    onAfterRead: function onAfterRead(files, oversize) {
      var _this3 = this;

      this.resetInput();
      var validFiles = files;

      if (oversize) {
        var oversizeFiles = files;

        if (Array.isArray(files)) {
          oversizeFiles = [];
          validFiles = [];
          files.forEach(function (item) {
            if (item.file) {
              if (item.file.size > _this3.maxSize) {
                oversizeFiles.push(item);
              } else {
                validFiles.push(item);
              }
            }
          });
        } else {
          validFiles = null;
        }

        this.$emit('oversize', oversizeFiles, this.getDetail());
      }

      var isValidFiles = Array.isArray(validFiles) ? Boolean(validFiles.length) : Boolean(validFiles);

      if (isValidFiles) {
        this.$emit('input', [].concat(this.fileList, toArray(validFiles)));

        if (this.afterRead) {
          this.afterRead(validFiles, this.getDetail());
        }
      }
    },
    onDelete: function onDelete(file, index) {
      var _this4 = this;

      if (this.beforeDelete) {
        var response = this.beforeDelete(file, this.getDetail(index));

        if (!response) {
          return;
        }

        if (isPromise(response)) {
          response.then(function () {
            _this4.deleteFile(file, index);
          }).catch(noop);
          return;
        }
      }

      this.deleteFile(file, index);
    },
    deleteFile: function deleteFile(file, index) {
      var fileList = this.fileList.slice(0);
      fileList.splice(index, 1);
      this.$emit('input', fileList);
      this.$emit('delete', file, this.getDetail(index));
    },
    resetInput: function resetInput() {
      /* istanbul ignore else */
      if (this.$refs.input) {
        this.$refs.input.value = '';
      }
    },
    onPreviewImage: function onPreviewImage(item) {
      var _this5 = this;

      if (!this.previewFullImage) {
        return;
      }

      var imageFiles = this.fileList.filter(function (item) {
        return isImageFile(item);
      });
      var imageContents = imageFiles.map(function (item) {
        return item.content || item.url;
      });
      this.imagePreview = ImagePreview(_extends({
        images: imageContents,
        startPosition: imageFiles.indexOf(item),
        onClose: function onClose() {
          _this5.$emit('close-preview');
        }
      }, this.previewOptions));
    },
    // @exposed-api
    closeImagePreview: function closeImagePreview() {
      if (this.imagePreview) {
        this.imagePreview.close();
      }
    },
    // @exposed-api
    chooseFile: function chooseFile() {
      if (this.disabled) {
        return;
      }
      /* istanbul ignore else */


      if (this.$refs.input) {
        this.$refs.input.click();
      }
    },
    genPreviewMask: function genPreviewMask(item) {
      var h = this.$createElement;
      var status = item.status,
          message = item.message;

      if (status === 'uploading' || status === 'failed') {
        var MaskIcon = status === 'failed' ? h(Icon, {
          "attrs": {
            "name": "close"
          },
          "class": bem('mask-icon')
        }) : h(Loading, {
          "class": bem('loading')
        });
        var showMessage = isDef(message) && message !== '';
        return h("div", {
          "class": bem('mask')
        }, [MaskIcon, showMessage && h("div", {
          "class": bem('mask-message')
        }, [message])]);
      }
    },
    genPreviewItem: function genPreviewItem(item, index) {
      var _this6 = this;

      var h = this.$createElement;
      var showDelete = item.status !== 'uploading' && this.deletable;
      var DeleteIcon = showDelete && h("div", {
        "class": bem('preview-delete'),
        "on": {
          "click": function click(event) {
            event.stopPropagation();

            _this6.onDelete(item, index);
          }
        }
      }, [h(Icon, {
        "attrs": {
          "name": "cross"
        },
        "class": bem('preview-delete-icon')
      })]);
      var PreviewCoverContent = this.slots('preview-cover', item);
      var PreviewCover = PreviewCoverContent && h("div", {
        "class": bem('preview-cover')
      }, [PreviewCoverContent]);
      var Preview = isImageFile(item) ? h(Image, {
        "attrs": {
          "fit": this.imageFit,
          "src": item.content || item.url,
          "width": this.previewSize,
          "height": this.previewSize,
          "lazyLoad": this.lazyLoad
        },
        "class": bem('preview-image'),
        "on": {
          "click": function click() {
            _this6.onPreviewImage(item);
          }
        }
      }, [PreviewCover]) : h("div", {
        "class": bem('file'),
        "style": {
          width: this.previewSizeWithUnit,
          height: this.previewSizeWithUnit
        }
      }, [h(Icon, {
        "class": bem('file-icon'),
        "attrs": {
          "name": "description"
        }
      }), h("div", {
        "class": [bem('file-name'), 'van-ellipsis']
      }, [item.file ? item.file.name : item.url]), PreviewCover]);
      return h("div", {
        "class": bem('preview'),
        "on": {
          "click": function click() {
            _this6.$emit('click-preview', item, _this6.getDetail(index));
          }
        }
      }, [Preview, this.genPreviewMask(item), DeleteIcon]);
    },
    genPreviewList: function genPreviewList() {
      if (this.previewImage) {
        return this.fileList.map(this.genPreviewItem);
      }
    },
    genUpload: function genUpload() {
      var h = this.$createElement;

      if (this.fileList.length >= this.maxCount || !this.showUpload) {
        return;
      }

      var slot = this.slots();
      var Input = h("input", {
        "attrs": _extends({}, this.$attrs, {
          "type": "file",
          "accept": this.accept,
          "disabled": this.disabled
        }),
        "ref": "input",
        "class": bem('input'),
        "on": {
          "change": this.onChange
        }
      });

      if (slot) {
        return h("div", {
          "class": bem('input-wrapper')
        }, [slot, Input]);
      }

      var style;

      if (this.previewSize) {
        var size = this.previewSizeWithUnit;
        style = {
          width: size,
          height: size
        };
      }

      return h("div", {
        "class": bem('upload'),
        "style": style
      }, [h(Icon, {
        "attrs": {
          "name": this.uploadIcon
        },
        "class": bem('upload-icon')
      }), this.uploadText && h("span", {
        "class": bem('upload-text')
      }, [this.uploadText]), Input]);
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem()
    }, [h("div", {
      "class": bem('wrapper', {
        disabled: this.disabled
      })
    }, [this.genPreviewList(), this.genUpload()])]);
  }
});
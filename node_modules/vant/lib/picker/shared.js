"use strict";

exports.__esModule = true;
exports.pickerProps = exports.DEFAULT_ITEM_HEIGHT = void 0;
var DEFAULT_ITEM_HEIGHT = 44;
exports.DEFAULT_ITEM_HEIGHT = DEFAULT_ITEM_HEIGHT;
var pickerProps = {
  title: String,
  loading: Boolean,
  itemHeight: [Number, String],
  showToolbar: Boolean,
  cancelButtonText: String,
  confirmButtonText: String,
  allowHtml: {
    type: Boolean,
    default: true
  },
  visibleItemCount: {
    type: [Number, String],
    default: 6
  },
  swipeDuration: {
    type: [Number, String],
    default: 1000
  }
};
exports.pickerProps = pickerProps;
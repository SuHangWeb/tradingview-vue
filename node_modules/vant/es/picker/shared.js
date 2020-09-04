export var DEFAULT_ITEM_HEIGHT = 44;
export var pickerProps = {
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
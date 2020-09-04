import _extends from "@babel/runtime/helpers/esm/extends";
// Utils
import { createNamespace, isDef } from '../utils';
import { preventDefault } from '../utils/dom/event';
import { BORDER_UNSET_TOP_BOTTOM } from '../utils/constant';
import { pickerProps, DEFAULT_ITEM_HEIGHT } from './shared';
import { unitToPx } from '../utils/format/unit'; // Components

import Loading from '../loading';
import PickerColumn from './PickerColumn';

var _createNamespace = createNamespace('picker'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1],
    t = _createNamespace[2];

export default createComponent({
  props: _extends({}, pickerProps, {
    defaultIndex: {
      type: [Number, String],
      default: 0
    },
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    toolbarPosition: {
      type: String,
      default: 'top'
    },
    valueKey: {
      type: String,
      default: 'text'
    }
  }),
  data: function data() {
    return {
      children: [],
      formattedColumns: []
    };
  },
  computed: {
    itemPxHeight: function itemPxHeight() {
      return this.itemHeight ? unitToPx(this.itemHeight) : DEFAULT_ITEM_HEIGHT;
    },
    dataType: function dataType() {
      var columns = this.columns;
      var firstColumn = columns[0] || {};

      if (firstColumn.children) {
        return 'cascade';
      }

      if (firstColumn.values) {
        return 'object';
      }

      return 'text';
    }
  },
  watch: {
    columns: {
      handler: 'format',
      immediate: true
    }
  },
  methods: {
    format: function format() {
      var columns = this.columns,
          dataType = this.dataType;

      if (dataType === 'text') {
        this.formattedColumns = [{
          values: columns
        }];
      } else if (dataType === 'cascade') {
        this.formatCascade();
      } else {
        this.formattedColumns = columns;
      }
    },
    formatCascade: function formatCascade() {
      var formatted = [];
      var cursor = {
        children: this.columns
      };

      while (cursor && cursor.children) {
        var defaultIndex = isDef(cursor.defaultIndex) ? cursor.defaultIndex : +this.defaultIndex;
        formatted.push({
          values: cursor.children,
          className: cursor.className,
          defaultIndex: defaultIndex
        });
        cursor = cursor.children[defaultIndex];
      }

      this.formattedColumns = formatted;
    },
    emit: function emit(event) {
      var _this = this;

      if (this.dataType === 'text') {
        this.$emit(event, this.getColumnValue(0), this.getColumnIndex(0));
      } else {
        var values = this.getValues(); // compatible with old version of wrong parameters
        // should be removed in next major version
        // see: https://github.com/youzan/vant/issues/5905

        if (this.dataType === 'cascade') {
          values = values.map(function (item) {
            return item[_this.valueKey];
          });
        }

        this.$emit(event, values, this.getIndexes());
      }
    },
    onCascadeChange: function onCascadeChange(columnIndex) {
      var cursor = {
        children: this.columns
      };
      var indexes = this.getIndexes();

      for (var i = 0; i <= columnIndex; i++) {
        cursor = cursor.children[indexes[i]];
      }

      while (cursor && cursor.children) {
        columnIndex++;
        this.setColumnValues(columnIndex, cursor.children);
        cursor = cursor.children[cursor.defaultIndex || 0];
      }
    },
    onChange: function onChange(columnIndex) {
      var _this2 = this;

      if (this.dataType === 'cascade') {
        this.onCascadeChange(columnIndex);
      }

      if (this.dataType === 'text') {
        this.$emit('change', this, this.getColumnValue(0), this.getColumnIndex(0));
      } else {
        var values = this.getValues(); // compatible with old version of wrong parameters
        // should be removed in next major version
        // see: https://github.com/youzan/vant/issues/5905

        if (this.dataType === 'cascade') {
          values = values.map(function (item) {
            return item[_this2.valueKey];
          });
        }

        this.$emit('change', this, values, columnIndex);
      }
    },
    // get column instance by index
    getColumn: function getColumn(index) {
      return this.children[index];
    },
    // @exposed-api
    // get column value by index
    getColumnValue: function getColumnValue(index) {
      var column = this.getColumn(index);
      return column && column.getValue();
    },
    // @exposed-api
    // set column value by index
    setColumnValue: function setColumnValue(index, value) {
      var column = this.getColumn(index);

      if (column) {
        column.setValue(value);

        if (this.dataType === 'cascade') {
          this.onCascadeChange(index);
        }
      }
    },
    // @exposed-api
    // get column option index by column index
    getColumnIndex: function getColumnIndex(columnIndex) {
      return (this.getColumn(columnIndex) || {}).currentIndex;
    },
    // @exposed-api
    // set column option index by column index
    setColumnIndex: function setColumnIndex(columnIndex, optionIndex) {
      var column = this.getColumn(columnIndex);

      if (column) {
        column.setIndex(optionIndex);

        if (this.dataType === 'cascade') {
          this.onCascadeChange(columnIndex);
        }
      }
    },
    // @exposed-api
    // get options of column by index
    getColumnValues: function getColumnValues(index) {
      return (this.children[index] || {}).options;
    },
    // @exposed-api
    // set options of column by index
    setColumnValues: function setColumnValues(index, options) {
      var column = this.children[index];

      if (column) {
        column.setOptions(options);
      }
    },
    // @exposed-api
    // get values of all columns
    getValues: function getValues() {
      return this.children.map(function (child) {
        return child.getValue();
      });
    },
    // @exposed-api
    // set values of all columns
    setValues: function setValues(values) {
      var _this3 = this;

      values.forEach(function (value, index) {
        _this3.setColumnValue(index, value);
      });
    },
    // @exposed-api
    // get indexes of all columns
    getIndexes: function getIndexes() {
      return this.children.map(function (child) {
        return child.currentIndex;
      });
    },
    // @exposed-api
    // set indexes of all columns
    setIndexes: function setIndexes(indexes) {
      var _this4 = this;

      indexes.forEach(function (optionIndex, columnIndex) {
        _this4.setColumnIndex(columnIndex, optionIndex);
      });
    },
    // @exposed-api
    confirm: function confirm() {
      this.children.forEach(function (child) {
        return child.stopMomentum();
      });
      this.emit('confirm');
    },
    cancel: function cancel() {
      this.emit('cancel');
    },
    genTitle: function genTitle() {
      var h = this.$createElement;
      var titleSlot = this.slots('title');

      if (titleSlot) {
        return titleSlot;
      }

      if (this.title) {
        return h("div", {
          "class": ['van-ellipsis', bem('title')]
        }, [this.title]);
      }
    },
    genToolbar: function genToolbar() {
      var h = this.$createElement;

      if (this.showToolbar) {
        return h("div", {
          "class": bem('toolbar')
        }, [this.slots() || [h("button", {
          "attrs": {
            "type": "button"
          },
          "class": bem('cancel'),
          "on": {
            "click": this.cancel
          }
        }, [this.cancelButtonText || t('cancel')]), this.genTitle(), h("button", {
          "attrs": {
            "type": "button"
          },
          "class": bem('confirm'),
          "on": {
            "click": this.confirm
          }
        }, [this.confirmButtonText || t('confirm')])]]);
      }
    },
    genColumns: function genColumns() {
      var h = this.$createElement;
      var itemPxHeight = this.itemPxHeight;
      var wrapHeight = itemPxHeight * this.visibleItemCount;
      var frameStyle = {
        height: itemPxHeight + "px"
      };
      var columnsStyle = {
        height: wrapHeight + "px"
      };
      var maskStyle = {
        backgroundSize: "100% " + (wrapHeight - itemPxHeight) / 2 + "px"
      };
      return h("div", {
        "class": bem('columns'),
        "style": columnsStyle,
        "on": {
          "touchmove": preventDefault
        }
      }, [this.genColumnItems(), h("div", {
        "class": bem('mask'),
        "style": maskStyle
      }), h("div", {
        "class": [BORDER_UNSET_TOP_BOTTOM, bem('frame')],
        "style": frameStyle
      })]);
    },
    genColumnItems: function genColumnItems() {
      var _this5 = this;

      var h = this.$createElement;
      return this.formattedColumns.map(function (item, columnIndex) {
        return h(PickerColumn, {
          "attrs": {
            "valueKey": _this5.valueKey,
            "allowHtml": _this5.allowHtml,
            "className": item.className,
            "itemHeight": _this5.itemPxHeight,
            "defaultIndex": isDef(item.defaultIndex) ? item.defaultIndex : +_this5.defaultIndex,
            "swipeDuration": _this5.swipeDuration,
            "visibleItemCount": _this5.visibleItemCount,
            "initialOptions": item.values
          },
          "on": {
            "change": function change() {
              _this5.onChange(columnIndex);
            }
          }
        });
      });
    }
  },
  render: function render(h) {
    return h("div", {
      "class": bem()
    }, [this.toolbarPosition === 'top' ? this.genToolbar() : h(), this.loading ? h(Loading, {
      "class": bem('loading')
    }) : h(), this.slots('columns-top'), this.genColumns(), this.slots('columns-bottom'), this.toolbarPosition === 'bottom' ? this.genToolbar() : h()]);
  }
});
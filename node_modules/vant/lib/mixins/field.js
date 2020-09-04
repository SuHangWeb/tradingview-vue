"use strict";

exports.__esModule = true;
exports.FieldMixin = void 0;
var FieldMixin = {
  inject: {
    vanField: {
      default: null
    }
  },
  watch: {
    value: function value() {
      var field = this.vanField;

      if (field) {
        field.resetValidation();
        field.validateWithTrigger('onChange');
      }
    }
  },
  created: function created() {
    var field = this.vanField;

    if (field && !field.children) {
      field.children = this;
    }
  }
};
exports.FieldMixin = FieldMixin;
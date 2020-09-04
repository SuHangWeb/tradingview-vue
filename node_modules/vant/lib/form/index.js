"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _vnodes = require("../utils/vnodes");

var _createNamespace = (0, _utils.createNamespace)('form'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var _default = createComponent({
  props: {
    colon: Boolean,
    labelWidth: [Number, String],
    labelAlign: String,
    inputAlign: String,
    scrollToError: Boolean,
    validateFirst: Boolean,
    errorMessageAlign: String,
    submitOnEnter: {
      type: Boolean,
      default: true
    },
    validateTrigger: {
      type: String,
      default: 'onBlur'
    },
    showError: {
      type: Boolean,
      default: true
    },
    showErrorMessage: {
      type: Boolean,
      default: true
    }
  },
  provide: function provide() {
    return {
      vanForm: this
    };
  },
  data: function data() {
    return {
      fields: []
    };
  },
  methods: {
    validateSeq: function validateSeq() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var errors = [];

        _this.fields.reduce(function (promise, field) {
          return promise.then(function () {
            if (!errors.length) {
              return field.validate().then(function (error) {
                if (error) {
                  errors.push(error);
                }
              });
            }
          });
        }, Promise.resolve()).then(function () {
          if (errors.length) {
            reject(errors);
          } else {
            resolve();
          }
        });
      });
    },
    validateAll: function validateAll() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        Promise.all(_this2.fields.map(function (item) {
          return item.validate();
        })).then(function (errors) {
          errors = errors.filter(function (item) {
            return item;
          });

          if (errors.length) {
            reject(errors);
          } else {
            resolve();
          }
        });
      });
    },
    // @exposed-api
    validate: function validate(name) {
      if (name) {
        return this.validateField(name);
      }

      return this.validateFirst ? this.validateSeq() : this.validateAll();
    },
    validateField: function validateField(name) {
      var matched = this.fields.filter(function (item) {
        return item.name === name;
      });

      if (matched.length) {
        return new Promise(function (resolve, reject) {
          matched[0].validate().then(function (error) {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          });
        });
      }

      return Promise.reject();
    },
    // @exposed-api
    resetValidation: function resetValidation(name) {
      this.fields.forEach(function (item) {
        if (!name || item.name === name) {
          item.resetValidation();
        }
      });
    },
    // @exposed-api
    scrollToField: function scrollToField(name, options) {
      this.fields.forEach(function (item) {
        if (item.name === name) {
          item.$el.scrollIntoView(options);
        }
      });
    },
    addField: function addField(field) {
      this.fields.push(field);
      (0, _vnodes.sortChildren)(this.fields, this);
    },
    removeField: function removeField(field) {
      this.fields = this.fields.filter(function (item) {
        return item !== field;
      });
    },
    getValues: function getValues() {
      return this.fields.reduce(function (form, field) {
        form[field.name] = field.formValue;
        return form;
      }, {});
    },
    onSubmit: function onSubmit(event) {
      event.preventDefault();
      this.submit();
    },
    // @exposed-api
    submit: function submit() {
      var _this3 = this;

      var values = this.getValues();
      this.validate().then(function () {
        _this3.$emit('submit', values);
      }).catch(function (errors) {
        _this3.$emit('failed', {
          values: values,
          errors: errors
        });

        if (_this3.scrollToError) {
          _this3.scrollToField(errors[0].name);
        }
      });
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("form", {
      "class": bem(),
      "on": {
        "submit": this.onSubmit
      }
    }, [this.slots()]);
  }
});

exports.default = _default;
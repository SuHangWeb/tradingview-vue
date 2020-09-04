// Utils
import { createNamespace } from '../../utils';
import { isEmail } from '../../utils/validate/email';
import { isNumeric } from '../../utils/validate/number'; // Components

import Cell from '../../cell';
import Field from '../../field';
import SkuImgUploader from './SkuImgUploader';
import SkuDateTimeField from './SkuDateTimeField';

var _createNamespace = createNamespace('sku-messages'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1],
    t = _createNamespace[2];

export default createComponent({
  props: {
    messageConfig: Object,
    goodsId: [Number, String],
    messages: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      messageValues: this.resetMessageValues(this.messages)
    };
  },
  watch: {
    messages: function messages(val) {
      this.messageValues = this.resetMessageValues(val);
    }
  },
  methods: {
    resetMessageValues: function resetMessageValues(messages) {
      var messageConfig = this.messageConfig;
      var _messageConfig$initia = messageConfig.initialMessages,
          initialMessages = _messageConfig$initia === void 0 ? {} : _messageConfig$initia;
      return (messages || []).map(function (message) {
        return {
          value: initialMessages[message.name] || ''
        };
      });
    },
    getType: function getType(message) {
      if (+message.multiple === 1) {
        return 'textarea';
      }

      if (message.type === 'id_no') {
        return 'text';
      }

      return message.datetime > 0 ? 'datetime' : message.type;
    },
    getMessages: function getMessages() {
      var messages = {};
      this.messageValues.forEach(function (item, index) {
        messages["message_" + index] = item.value;
      });
      return messages;
    },
    getCartMessages: function getCartMessages() {
      var _this = this;

      var messages = {};
      this.messageValues.forEach(function (item, index) {
        var message = _this.messages[index];
        messages[message.name] = item.value;
      });
      return messages;
    },
    getPlaceholder: function getPlaceholder(message) {
      var type = +message.multiple === 1 ? 'textarea' : message.type;
      var map = this.messageConfig.placeholderMap || {};
      return message.placeholder || map[type] || t("placeholder." + type);
    },
    validateMessages: function validateMessages() {
      var values = this.messageValues;

      for (var i = 0; i < values.length; i++) {
        var value = values[i].value;
        var message = this.messages[i];

        if (value === '') {
          // 必填字段的校验
          if (String(message.required) === '1') {
            var textType = t(message.type === 'image' ? 'upload' : 'fill');
            return textType + message.name;
          }
        } else {
          if (message.type === 'tel' && !isNumeric(value)) {
            return t('invalid.tel');
          }

          if (message.type === 'mobile' && !/^\d{6,20}$/.test(value)) {
            return t('invalid.mobile');
          }

          if (message.type === 'email' && !isEmail(value)) {
            return t('invalid.email');
          }

          if (message.type === 'id_no' && (value.length < 15 || value.length > 18)) {
            return t('invalid.id_no');
          }
        }
      }
    },

    /**
     * The phone number copied from IOS mobile phone address book
     * will add spaces and invisible Unicode characters
     * which cannot pass the /^\d+$/ verification
     * so keep numbers and dots
     */
    getFormatter: function getFormatter(message) {
      return function formatter(value) {
        if (message.type === 'mobile' || message.type === 'tel') {
          return value.replace(/[^\d.]/g, '');
        }

        return value;
      };
    },
    genMessage: function genMessage(message, index) {
      var _this2 = this;

      var h = this.$createElement;

      if (message.type === 'image') {
        return h(Cell, {
          "key": this.goodsId + "-" + index,
          "attrs": {
            "title": message.name,
            "required": String(message.required) === '1',
            "valueClass": bem('image-cell-value')
          },
          "class": bem('image-cell')
        }, [h(SkuImgUploader, {
          "attrs": {
            "maxSize": this.messageConfig.uploadMaxSize,
            "uploadImg": this.messageConfig.uploadImg
          },
          "model": {
            value: _this2.messageValues[index].value,
            callback: function callback($$v) {
              _this2.$set(_this2.messageValues[index], "value", $$v);
            }
          }
        }), h("div", {
          "class": bem('image-cell-label')
        }, [t('imageLabel')])]);
      } // 时间和日期使用的vant选择器


      var isDateOrTime = ['date', 'time'].indexOf(message.type) > -1;

      if (isDateOrTime) {
        return h(SkuDateTimeField, {
          "attrs": {
            "label": message.name,
            "required": String(message.required) === '1',
            "placeholder": this.getPlaceholder(message),
            "type": this.getType(message)
          },
          "key": this.goodsId + "-" + index,
          "model": {
            value: _this2.messageValues[index].value,
            callback: function callback($$v) {
              _this2.$set(_this2.messageValues[index], "value", $$v);
            }
          }
        });
      }

      return h(Field, {
        "attrs": {
          "maxlength": "200",
          "center": !message.multiple,
          "label": message.name,
          "required": String(message.required) === '1',
          "placeholder": this.getPlaceholder(message),
          "type": this.getType(message),
          "formatter": this.getFormatter(message)
        },
        "key": this.goodsId + "-" + index,
        "model": {
          value: _this2.messageValues[index].value,
          callback: function callback($$v) {
            _this2.$set(_this2.messageValues[index], "value", $$v);
          }
        }
      });
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem()
    }, [this.messages.map(this.genMessage)]);
  }
});
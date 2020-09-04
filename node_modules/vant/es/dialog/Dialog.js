import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { createNamespace, addUnit } from '../utils';
import { BORDER_TOP, BORDER_LEFT } from '../utils/constant';
import { PopupMixin } from '../mixins/popup';
import Button from '../button';
import GoodsAction from '../goods-action';
import GoodsActionButton from '../goods-action-button';

var _createNamespace = createNamespace('dialog'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1],
    t = _createNamespace[2];

export default createComponent({
  mixins: [PopupMixin()],
  props: {
    title: String,
    theme: String,
    width: [Number, String],
    message: String,
    className: null,
    callback: Function,
    beforeClose: Function,
    messageAlign: String,
    cancelButtonText: String,
    cancelButtonColor: String,
    confirmButtonText: String,
    confirmButtonColor: String,
    showCancelButton: Boolean,
    overlay: {
      type: Boolean,
      default: true
    },
    allowHtml: {
      type: Boolean,
      default: true
    },
    transition: {
      type: String,
      default: 'van-dialog-bounce'
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      loading: {
        confirm: false,
        cancel: false
      }
    };
  },
  methods: {
    onClickOverlay: function onClickOverlay() {
      this.handleAction('overlay');
    },
    handleAction: function handleAction(action) {
      var _this = this;

      this.$emit(action); // show not trigger close event when hidden

      if (!this.value) {
        return;
      }

      if (this.beforeClose) {
        this.loading[action] = true;
        this.beforeClose(action, function (state) {
          if (state !== false && _this.loading[action]) {
            _this.onClose(action);
          }

          _this.loading.confirm = false;
          _this.loading.cancel = false;
        });
      } else {
        this.onClose(action);
      }
    },
    onClose: function onClose(action) {
      this.close();

      if (this.callback) {
        this.callback(action);
      }
    },
    onOpened: function onOpened() {
      this.$emit('opened');
    },
    onClosed: function onClosed() {
      this.$emit('closed');
    },
    genRoundButtons: function genRoundButtons() {
      var _this2 = this;

      var h = this.$createElement;
      return h(GoodsAction, {
        "class": bem('footer')
      }, [this.showCancelButton && h(GoodsActionButton, {
        "attrs": {
          "size": "large",
          "type": "warning",
          "text": this.cancelButtonText || t('cancel'),
          "color": this.cancelButtonColor,
          "loading": this.loading.cancel
        },
        "class": bem('cancel'),
        "on": {
          "click": function click() {
            _this2.handleAction('cancel');
          }
        }
      }), this.showConfirmButton && h(GoodsActionButton, {
        "attrs": {
          "size": "large",
          "type": "danger",
          "text": this.confirmButtonText || t('confirm'),
          "color": this.confirmButtonColor,
          "loading": this.loading.confirm
        },
        "class": bem('confirm'),
        "on": {
          "click": function click() {
            _this2.handleAction('confirm');
          }
        }
      })]);
    },
    genButtons: function genButtons() {
      var _this3 = this,
          _ref;

      var h = this.$createElement;
      var multiple = this.showCancelButton && this.showConfirmButton;
      return h("div", {
        "class": [BORDER_TOP, bem('footer')]
      }, [this.showCancelButton && h(Button, {
        "attrs": {
          "size": "large",
          "loading": this.loading.cancel,
          "text": this.cancelButtonText || t('cancel')
        },
        "class": bem('cancel'),
        "style": {
          color: this.cancelButtonColor
        },
        "on": {
          "click": function click() {
            _this3.handleAction('cancel');
          }
        }
      }), this.showConfirmButton && h(Button, {
        "attrs": {
          "size": "large",
          "loading": this.loading.confirm,
          "text": this.confirmButtonText || t('confirm')
        },
        "class": [bem('confirm'), (_ref = {}, _ref[BORDER_LEFT] = multiple, _ref)],
        "style": {
          color: this.confirmButtonColor
        },
        "on": {
          "click": function click() {
            _this3.handleAction('confirm');
          }
        }
      })]);
    },
    genContent: function genContent(hasTitle, messageSlot) {
      var h = this.$createElement;

      if (messageSlot) {
        return h("div", {
          "class": bem('content')
        }, [messageSlot]);
      }

      var message = this.message,
          messageAlign = this.messageAlign;

      if (message) {
        var _bem, _domProps;

        var data = {
          class: bem('message', (_bem = {
            'has-title': hasTitle
          }, _bem[messageAlign] = messageAlign, _bem)),
          domProps: (_domProps = {}, _domProps[this.allowHtml ? 'innerHTML' : 'textContent'] = message, _domProps)
        };
        return h("div", {
          "class": bem('content')
        }, [h("div", _mergeJSXProps([{}, data]))]);
      }
    }
  },
  render: function render() {
    var h = arguments[0];

    if (!this.shouldRender) {
      return;
    }

    var message = this.message;
    var messageSlot = this.slots();
    var title = this.slots('title') || this.title;
    var Title = title && h("div", {
      "class": bem('header', {
        isolated: !message && !messageSlot
      })
    }, [title]);
    return h("transition", {
      "attrs": {
        "name": this.transition
      },
      "on": {
        "afterEnter": this.onOpened,
        "afterLeave": this.onClosed
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.value
      }],
      "attrs": {
        "role": "dialog",
        "aria-labelledby": this.title || message
      },
      "class": [bem([this.theme]), this.className],
      "style": {
        width: addUnit(this.width)
      }
    }, [Title, this.genContent(title, messageSlot), this.theme === 'round-button' ? this.genRoundButtons() : this.genButtons()])]);
  }
});
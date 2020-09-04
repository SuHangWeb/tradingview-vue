import { createNamespace } from '../utils';
import { stopPropagation } from '../utils/dom/event';
import { PortalMixin } from '../mixins/portal';
import { BindEventMixin } from '../mixins/bind-event';
import Key from './Key';

var _createNamespace = createNamespace('number-keyboard'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [PortalMixin(), BindEventMixin(function (bind) {
    if (this.hideOnClickOutside) {
      bind(document.body, 'touchstart', this.onBlur);
    }
  })],
  model: {
    event: 'update:value'
  },
  props: {
    show: Boolean,
    title: String,
    zIndex: [Number, String],
    closeButtonText: String,
    deleteButtonText: String,
    closeButtonLoading: Boolean,
    theme: {
      type: String,
      default: 'default'
    },
    value: {
      type: String,
      default: ''
    },
    extraKey: {
      type: [String, Array],
      default: ''
    },
    maxlength: {
      type: [Number, String],
      default: Number.MAX_VALUE
    },
    transition: {
      type: Boolean,
      default: true
    },
    showDeleteKey: {
      type: Boolean,
      default: true
    },
    hideOnClickOutside: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    show: function show(val) {
      if (!this.transition) {
        this.$emit(val ? 'show' : 'hide');
      }
    }
  },
  computed: {
    keys: function keys() {
      if (this.theme === 'custom') {
        return this.genCustomKeys();
      }

      return this.genDefaultKeys();
    }
  },
  methods: {
    genBasicKeys: function genBasicKeys() {
      var keys = [];

      for (var i = 1; i <= 9; i++) {
        keys.push({
          text: i
        });
      }

      return keys;
    },
    genDefaultKeys: function genDefaultKeys() {
      return [].concat(this.genBasicKeys(), [{
        text: this.extraKey,
        type: 'extra'
      }, {
        text: 0
      }, {
        text: this.showDeleteKey ? this.deleteButtonText : '',
        type: this.showDeleteKey ? 'delete' : ''
      }]);
    },
    genCustomKeys: function genCustomKeys() {
      var keys = this.genBasicKeys();
      var extraKey = this.extraKey;
      var extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];

      if (extraKeys.length === 1) {
        keys.push({
          text: 0,
          wider: true
        }, {
          text: extraKey[0],
          type: 'extra'
        });
      } else if (extraKeys.length === 2) {
        keys.push({
          text: extraKey[0],
          type: 'extra'
        }, {
          text: 0
        }, {
          text: extraKey[1],
          type: 'extra'
        });
      }

      return keys;
    },
    onBlur: function onBlur() {
      this.show && this.$emit('blur');
    },
    onClose: function onClose() {
      this.$emit('close');
      this.onBlur();
    },
    onAnimationEnd: function onAnimationEnd() {
      this.$emit(this.show ? 'show' : 'hide');
    },
    onPress: function onPress(text, type) {
      if (text === '') {
        if (type === 'extra') {
          this.onBlur();
        }

        return;
      }

      var value = this.value;

      if (type === 'delete') {
        this.$emit('delete');
        this.$emit('update:value', value.slice(0, value.length - 1));
      } else if (type === 'close') {
        this.onClose();
      } else if (value.length < this.maxlength) {
        this.$emit('input', text);
        this.$emit('update:value', value + text);
      }
    },
    genTitle: function genTitle() {
      var h = this.$createElement;
      var title = this.title,
          theme = this.theme,
          closeButtonText = this.closeButtonText;
      var titleLeft = this.slots('title-left');
      var showClose = closeButtonText && theme === 'default';
      var showTitle = title || showClose || titleLeft;

      if (!showTitle) {
        return;
      }

      return h("div", {
        "class": bem('header')
      }, [titleLeft && h("span", {
        "class": bem('title-left')
      }, [titleLeft]), title && h("h2", {
        "class": bem('title')
      }, [title]), showClose && h("button", {
        "attrs": {
          "type": "button"
        },
        "class": bem('close'),
        "on": {
          "click": this.onClose
        }
      }, [closeButtonText])]);
    },
    genKeys: function genKeys() {
      var _this = this;

      var h = this.$createElement;
      return this.keys.map(function (key) {
        return h(Key, {
          "key": key.text,
          "attrs": {
            "text": key.text,
            "type": key.type,
            "wider": key.wider,
            "color": key.color
          },
          "on": {
            "press": _this.onPress
          }
        }, [key.type === 'delete' && _this.slots('delete'), key.type === 'extra' && _this.slots('extra-key')]);
      });
    },
    genSidebar: function genSidebar() {
      var h = this.$createElement;

      if (this.theme === 'custom') {
        return h("div", {
          "class": bem('sidebar')
        }, [this.showDeleteKey && h(Key, {
          "attrs": {
            "large": true,
            "text": this.deleteButtonText,
            "type": "delete"
          },
          "on": {
            "press": this.onPress
          }
        }, [this.slots('delete')]), h(Key, {
          "attrs": {
            "large": true,
            "text": this.closeButtonText,
            "type": "close",
            "color": "blue",
            "loading": this.closeButtonLoading
          },
          "on": {
            "press": this.onPress
          }
        })]);
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    var Title = this.genTitle();
    return h("transition", {
      "attrs": {
        "name": this.transition ? 'van-slide-up' : ''
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.show
      }],
      "style": {
        zIndex: this.zIndex
      },
      "class": bem({
        unfit: !this.safeAreaInsetBottom,
        'with-title': Title
      }),
      "on": {
        "touchstart": stopPropagation,
        "animationend": this.onAnimationEnd,
        "webkitAnimationEnd": this.onAnimationEnd
      }
    }, [Title, h("div", {
      "class": bem('body')
    }, [h("div", {
      "class": bem('keys')
    }, [this.genKeys()]), this.genSidebar()])])]);
  }
});
import _extends from "@babel/runtime/helpers/esm/extends";
import Vue from 'vue';
import VanNotify from './Notify';
import { isObject, isServer } from '../utils';
import { mount } from '../utils/functional';
var timer;
var instance;

function parseOptions(message) {
  return isObject(message) ? message : {
    message: message
  };
}

function Notify(options) {
  /* istanbul ignore if */
  if (isServer) {
    return;
  }

  if (!instance) {
    instance = mount(VanNotify, {
      on: {
        click: function click(event) {
          if (instance.onClick) {
            instance.onClick(event);
          }
        },
        close: function close() {
          if (instance.onClose) {
            instance.onClose();
          }
        },
        opened: function opened() {
          if (instance.onOpened) {
            instance.onOpened();
          }
        }
      }
    });
  }

  options = _extends({}, Notify.currentOptions, parseOptions(options));

  _extends(instance, options);

  clearTimeout(timer);

  if (options.duration && options.duration > 0) {
    timer = setTimeout(Notify.clear, options.duration);
  }

  return instance;
}

function defaultOptions() {
  return {
    type: 'danger',
    value: true,
    message: '',
    color: undefined,
    background: undefined,
    duration: 3000,
    className: '',
    onClose: null,
    onClick: null,
    onOpened: null
  };
}

Notify.clear = function () {
  if (instance) {
    instance.value = false;
  }
};

Notify.currentOptions = defaultOptions();

Notify.setDefaultOptions = function (options) {
  _extends(Notify.currentOptions, options);
};

Notify.resetDefaultOptions = function () {
  Notify.currentOptions = defaultOptions();
};

Notify.install = function () {
  Vue.use(VanNotify);
};

Notify.Component = VanNotify;
Vue.prototype.$notify = Notify;
export default Notify;
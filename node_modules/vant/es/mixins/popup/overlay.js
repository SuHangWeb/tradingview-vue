import _extends from "@babel/runtime/helpers/esm/extends";
import Overlay from '../../overlay';
import { context } from './context';
import { mount } from '../../utils/functional';
import { removeNode } from '../../utils/dom/node';
var defaultConfig = {
  className: '',
  customStyle: {}
};

function mountOverlay(vm) {
  return mount(Overlay, {
    on: {
      // close popup when overlay clicked & closeOnClickOverlay is true
      click: function click() {
        vm.$emit('click-overlay');

        if (vm.closeOnClickOverlay) {
          if (vm.onClickOverlay) {
            vm.onClickOverlay();
          } else {
            vm.close();
          }
        }
      }
    }
  });
}

export function updateOverlay(vm) {
  var item = context.find(vm);

  if (item) {
    var el = vm.$el;
    var config = item.config,
        overlay = item.overlay;

    if (el && el.parentNode) {
      el.parentNode.insertBefore(overlay.$el, el);
    }

    _extends(overlay, defaultConfig, config, {
      show: true
    });
  }
}
export function openOverlay(vm, config) {
  var item = context.find(vm);

  if (item) {
    item.config = config;
  } else {
    var overlay = mountOverlay(vm);
    context.stack.push({
      vm: vm,
      config: config,
      overlay: overlay
    });
  }

  updateOverlay(vm);
}
export function closeOverlay(vm) {
  var item = context.find(vm);

  if (item) {
    item.overlay.show = false;
  }
}
export function removeOverlay(vm) {
  var item = context.find(vm);

  if (item) {
    removeNode(item.overlay.$el);
  }
}
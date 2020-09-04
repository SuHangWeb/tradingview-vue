"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.updateOverlay = updateOverlay;
exports.openOverlay = openOverlay;
exports.closeOverlay = closeOverlay;
exports.removeOverlay = removeOverlay;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _overlay = _interopRequireDefault(require("../../overlay"));

var _context = require("./context");

var _functional = require("../../utils/functional");

var _node = require("../../utils/dom/node");

var defaultConfig = {
  className: '',
  customStyle: {}
};

function mountOverlay(vm) {
  return (0, _functional.mount)(_overlay.default, {
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

function updateOverlay(vm) {
  var item = _context.context.find(vm);

  if (item) {
    var el = vm.$el;
    var config = item.config,
        overlay = item.overlay;

    if (el && el.parentNode) {
      el.parentNode.insertBefore(overlay.$el, el);
    }

    (0, _extends2.default)(overlay, defaultConfig, config, {
      show: true
    });
  }
}

function openOverlay(vm, config) {
  var item = _context.context.find(vm);

  if (item) {
    item.config = config;
  } else {
    var overlay = mountOverlay(vm);

    _context.context.stack.push({
      vm: vm,
      config: config,
      overlay: overlay
    });
  }

  updateOverlay(vm);
}

function closeOverlay(vm) {
  var item = _context.context.find(vm);

  if (item) {
    item.overlay.show = false;
  }
}

function removeOverlay(vm) {
  var item = _context.context.find(vm);

  if (item) {
    (0, _node.removeNode)(item.overlay.$el);
  }
}
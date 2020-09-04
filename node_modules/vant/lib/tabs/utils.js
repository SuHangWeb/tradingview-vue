"use strict";

exports.__esModule = true;
exports.scrollLeftTo = scrollLeftTo;
exports.scrollTopTo = scrollTopTo;

var _raf = require("../utils/dom/raf");

var _scroll = require("../utils/dom/scroll");

var scrollLeftRafId;

function scrollLeftTo(scroller, to, duration) {
  (0, _raf.cancelRaf)(scrollLeftRafId);
  var count = 0;
  var from = scroller.scrollLeft;
  var frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16);

  function animate() {
    scroller.scrollLeft += (to - from) / frames;

    if (++count < frames) {
      scrollLeftRafId = (0, _raf.raf)(animate);
    }
  }

  animate();
}

function scrollTopTo(scroller, to, duration, callback) {
  var current = (0, _scroll.getScrollTop)(scroller);
  var isDown = current < to;
  var frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16);
  var step = (to - current) / frames;

  function animate() {
    current += step;

    if (isDown && current > to || !isDown && current < to) {
      current = to;
    }

    (0, _scroll.setScrollTop)(scroller, current);

    if (isDown && current < to || !isDown && current > to) {
      (0, _raf.raf)(animate);
    } else if (callback) {
      (0, _raf.raf)(callback);
    }
  }

  animate();
}
"use strict";

exports.__esModule = true;
exports.removeNode = removeNode;

function removeNode(el) {
  var parent = el.parentNode;

  if (parent) {
    parent.removeChild(el);
  }
}
"use strict";

exports.__esModule = true;
exports.sortChildren = sortChildren;

function flattenVNodes(vnodes) {
  var result = [];

  function traverse(vnodes) {
    vnodes.forEach(function (vnode) {
      result.push(vnode);

      if (vnode.componentInstance) {
        traverse(vnode.componentInstance.$children.map(function (item) {
          return item.$vnode;
        }));
      }

      if (vnode.children) {
        traverse(vnode.children);
      }
    });
  }

  traverse(vnodes);
  return result;
} // sort children instances by vnodes order


function sortChildren(children, parent) {
  var componentOptions = parent.$vnode.componentOptions;

  if (!componentOptions || !componentOptions.children) {
    return;
  }

  var vnodes = flattenVNodes(componentOptions.children);
  children.sort(function (a, b) {
    return vnodes.indexOf(a.$vnode) - vnodes.indexOf(b.$vnode);
  });
}
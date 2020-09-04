export function removeNode(el) {
  var parent = el.parentNode;

  if (parent) {
    parent.removeChild(el);
  }
}
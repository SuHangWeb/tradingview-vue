import _extends from "@babel/runtime/helpers/esm/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
// Utils
import { createNamespace } from '../utils';
import { emit, inherit } from '../utils/functional'; // Components

import Tag from '../tag';
import Icon from '../icon';
import Cell from '../cell';
import Radio from '../radio'; // Types

var _createNamespace = createNamespace('address-item'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function AddressItem(h, props, slots, ctx) {
  var disabled = props.disabled,
      switchable = props.switchable;

  function onClick() {
    if (switchable) {
      emit(ctx, 'select');
    }

    emit(ctx, 'click');
  }

  var genRightIcon = function genRightIcon() {
    return h(Icon, {
      "attrs": {
        "name": "edit"
      },
      "class": bem('edit'),
      "on": {
        "click": function click(event) {
          event.stopPropagation();
          emit(ctx, 'edit');
          emit(ctx, 'click');
        }
      }
    });
  };

  function genTag() {
    if (props.data.isDefault && props.defaultTagText) {
      return h(Tag, {
        "attrs": {
          "type": "danger",
          "round": true
        },
        "class": bem('tag')
      }, [props.defaultTagText]);
    }
  }

  function genContent() {
    var data = props.data;
    var Info = [h("div", {
      "class": bem('name')
    }, [data.name + " " + data.tel, genTag()]), h("div", {
      "class": bem('address')
    }, [data.address])];

    if (switchable && !disabled) {
      return h(Radio, {
        "attrs": {
          "name": data.id,
          "iconSize": 18
        }
      }, [Info]);
    }

    return Info;
  }

  return h("div", {
    "class": bem({
      disabled: disabled
    }),
    "on": {
      "click": onClick
    }
  }, [h(Cell, _mergeJSXProps([{
    "attrs": {
      "border": false,
      "valueClass": bem('value')
    },
    "scopedSlots": {
      default: genContent,
      'right-icon': genRightIcon
    }
  }, inherit(ctx)])), slots.bottom == null ? void 0 : slots.bottom(_extends({}, props.data, {
    disabled: disabled
  }))]);
}

AddressItem.props = {
  data: Object,
  disabled: Boolean,
  switchable: Boolean,
  defaultTagText: String
};
export default createComponent(AddressItem);
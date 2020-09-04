import _extends from "@babel/runtime/helpers/esm/extends";
// Utils
import { createNamespace, isObject, isDef } from '../utils';
import { route, routeProps } from '../utils/router'; // Mixins

import { ChildrenMixin } from '../mixins/relation'; // Components

import Icon from '../icon';
import Info from '../info';

var _createNamespace = createNamespace('tabbar-item'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [ChildrenMixin('vanTabbar')],
  props: _extends({}, routeProps, {
    dot: Boolean,
    icon: String,
    name: [Number, String],
    info: [Number, String],
    badge: [Number, String],
    iconPrefix: String
  }),
  data: function data() {
    return {
      active: false
    };
  },
  computed: {
    routeActive: function routeActive() {
      var to = this.to,
          $route = this.$route;

      if (to && $route) {
        var config = isObject(to) ? to : {
          path: to
        };
        var pathMatched = config.path === $route.path;
        var nameMatched = isDef(config.name) && config.name === $route.name;
        return pathMatched || nameMatched;
      }
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.parent.onChange(this.name || this.index);
      this.$emit('click', event);
      route(this.$router, this);
    },
    genIcon: function genIcon(active) {
      var h = this.$createElement;
      var slot = this.slots('icon', {
        active: active
      });

      if (slot) {
        return slot;
      }

      if (this.icon) {
        return h(Icon, {
          "attrs": {
            "name": this.icon,
            "classPrefix": this.iconPrefix
          }
        });
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    var active = this.parent.route ? this.routeActive : this.active;
    var color = this.parent[active ? 'activeColor' : 'inactiveColor'];
    return h("div", {
      "class": bem({
        active: active
      }),
      "style": {
        color: color
      },
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": bem('icon')
    }, [this.genIcon(active), h(Info, {
      "attrs": {
        "dot": this.dot,
        "info": isDef(this.badge) ? this.badge : this.info
      }
    })]), h("div", {
      "class": bem('text')
    }, [this.slots('default', {
      active: active
    })])]);
  }
});
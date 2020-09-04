"use strict";

exports.__esModule = true;
exports.CloseOnPopstateMixin = void 0;

var _event = require("../utils/dom/event");

var _bindEvent = require("./bind-event");

var CloseOnPopstateMixin = {
  mixins: [(0, _bindEvent.BindEventMixin)(function (bind, isBind) {
    this.handlePopstate(isBind && this.closeOnPopstate);
  })],
  props: {
    closeOnPopstate: Boolean
  },
  data: function data() {
    return {
      bindStatus: false
    };
  },
  watch: {
    closeOnPopstate: function closeOnPopstate(val) {
      this.handlePopstate(val);
    }
  },
  methods: {
    handlePopstate: function handlePopstate(bind) {
      var _this = this;

      /* istanbul ignore if */
      if (this.$isServer) {
        return;
      }

      if (this.bindStatus !== bind) {
        this.bindStatus = bind;
        var action = bind ? _event.on : _event.off;
        action(window, 'popstate', function () {
          _this.close();

          _this.shouldReopen = false;
        });
      }
    }
  }
};
exports.CloseOnPopstateMixin = CloseOnPopstateMixin;
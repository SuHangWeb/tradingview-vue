"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../../utils");

var _utils2 = require("../utils");

var _createNamespace = (0, _utils.createNamespace)('calendar-header'),
    createComponent = _createNamespace[0];

var _default = createComponent({
  props: {
    title: String,
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: Number
  },
  methods: {
    genTitle: function genTitle() {
      var h = this.$createElement;

      if (this.showTitle) {
        var title = this.slots('title') || this.title || (0, _utils2.t)('title');
        return h("div", {
          "class": (0, _utils2.bem)('header-title')
        }, [title]);
      }
    },
    genSubtitle: function genSubtitle() {
      var h = this.$createElement;

      if (this.showSubtitle) {
        return h("div", {
          "class": (0, _utils2.bem)('header-subtitle')
        }, [this.subtitle]);
      }
    },
    genWeekDays: function genWeekDays() {
      var h = this.$createElement;
      var weekdays = (0, _utils2.t)('weekdays');
      var firstDayOfWeek = this.firstDayOfWeek;
      var renderWeekDays = [].concat(weekdays.slice(firstDayOfWeek, 7), weekdays.slice(0, firstDayOfWeek));
      return h("div", {
        "class": (0, _utils2.bem)('weekdays')
      }, [renderWeekDays.map(function (item) {
        return h("span", {
          "class": (0, _utils2.bem)('weekday')
        }, [item]);
      })]);
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": (0, _utils2.bem)('header')
    }, [this.genTitle(), this.genSubtitle(), this.genWeekDays()]);
  }
});

exports.default = _default;
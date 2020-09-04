// Utils
import { bem } from './shared';
import { range } from '../utils/format/number';
import { preventDefault } from '../utils/dom/event'; // Mixins

import { TouchMixin } from '../mixins/touch'; // Component

import Image from '../image';
import Loading from '../loading';
import SwipeItem from '../swipe-item';

function getDistance(touches) {
  return Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) + Math.pow(touches[0].clientY - touches[1].clientY, 2));
}

export default {
  mixins: [TouchMixin],
  props: {
    src: String,
    show: Boolean,
    active: Number,
    minZoom: [Number, String],
    maxZoom: [Number, String],
    windowWidth: Number,
    windowHeight: Number
  },
  data: function data() {
    return {
      scale: 1,
      moveX: 0,
      moveY: 0,
      moving: false,
      zooming: false,
      imageRatio: 0,
      displayWidth: 0,
      displayHeight: 0
    };
  },
  computed: {
    vertical: function vertical() {
      var windowWidth = this.windowWidth,
          windowHeight = this.windowHeight;
      var windowRatio = windowHeight / windowWidth;
      return this.imageRatio > windowRatio;
    },
    imageStyle: function imageStyle() {
      var scale = this.scale;
      var style = {
        transitionDuration: this.zooming || this.moving ? '0s' : '.3s'
      };

      if (scale !== 1) {
        var offsetX = this.moveX / scale;
        var offsetY = this.moveY / scale;
        style.transform = "scale(" + scale + ", " + scale + ") translate(" + offsetX + "px, " + offsetY + "px)";
      }

      return style;
    },
    maxMoveX: function maxMoveX() {
      if (this.imageRatio) {
        var displayWidth = this.vertical ? this.windowHeight / this.imageRatio : this.windowWidth;
        return Math.max(0, (this.scale * displayWidth - this.windowWidth) / 2);
      }

      return 0;
    },
    maxMoveY: function maxMoveY() {
      if (this.imageRatio) {
        var displayHeight = this.vertical ? this.windowHeight : this.windowWidth * this.imageRatio;
        return Math.max(0, (this.scale * displayHeight - this.windowHeight) / 2);
      }

      return 0;
    }
  },
  watch: {
    show: function show(val) {
      if (!val) {
        this.resetScale();
      }
    }
  },
  mounted: function mounted() {
    this.bindTouchEvent(this.$el);
  },
  methods: {
    resetScale: function resetScale() {
      this.setScale(1);
      this.moveX = 0;
      this.moveY = 0;
    },
    setScale: function setScale(scale) {
      this.scale = range(scale, +this.minZoom, +this.maxZoom);
      this.$emit('scale', {
        scale: this.scale,
        index: this.active
      });
    },
    toggleScale: function toggleScale() {
      var scale = this.scale > 1 ? 1 : 2;
      this.setScale(scale);
      this.moveX = 0;
      this.moveY = 0;
    },
    onTouchStart: function onTouchStart(event) {
      var touches = event.touches;
      var _this$offsetX = this.offsetX,
          offsetX = _this$offsetX === void 0 ? 0 : _this$offsetX;
      this.touchStart(event);
      this.touchStartTime = new Date();
      this.startMoveX = this.moveX;
      this.startMoveY = this.moveY;
      this.moving = touches.length === 1 && this.scale !== 1;
      this.zooming = touches.length === 2 && !offsetX;

      if (this.zooming) {
        this.startScale = this.scale;
        this.startDistance = getDistance(event.touches);
      }
    },
    onTouchMove: function onTouchMove(event) {
      var touches = event.touches;
      this.touchMove(event);

      if (this.moving || this.zooming) {
        preventDefault(event, true);
      }

      if (this.moving) {
        var moveX = this.deltaX + this.startMoveX;
        var moveY = this.deltaY + this.startMoveY;
        this.moveX = range(moveX, -this.maxMoveX, this.maxMoveX);
        this.moveY = range(moveY, -this.maxMoveY, this.maxMoveY);
      }

      if (this.zooming && touches.length === 2) {
        var distance = getDistance(touches);
        var scale = this.startScale * distance / this.startDistance;
        this.setScale(scale);
      }
    },
    onTouchEnd: function onTouchEnd(event) {
      var stopPropagation = false;
      /* istanbul ignore else */

      if (this.moving || this.zooming) {
        stopPropagation = true;

        if (this.moving && this.startMoveX === this.moveX && this.startMoveY === this.moveY) {
          stopPropagation = false;
        }

        if (!event.touches.length) {
          if (this.zooming) {
            this.moveX = range(this.moveX, -this.maxMoveX, this.maxMoveX);
            this.moveY = range(this.moveY, -this.maxMoveY, this.maxMoveY);
            this.zooming = false;
          }

          this.moving = false;
          this.startMoveX = 0;
          this.startMoveY = 0;
          this.startScale = 1;

          if (this.scale < 1) {
            this.resetScale();
          }
        }
      } // eliminate tap delay on safari


      preventDefault(event, stopPropagation);
      this.checkTap();
      this.resetTouchStatus();
    },
    checkTap: function checkTap() {
      var _this = this;

      var _this$offsetX2 = this.offsetX,
          offsetX = _this$offsetX2 === void 0 ? 0 : _this$offsetX2,
          _this$offsetY = this.offsetY,
          offsetY = _this$offsetY === void 0 ? 0 : _this$offsetY;
      var deltaTime = new Date() - this.touchStartTime;
      var TAP_TIME = 250;
      var TAP_OFFSET = 10;

      if (offsetX < TAP_OFFSET && offsetY < TAP_OFFSET && deltaTime < TAP_TIME) {
        if (this.doubleTapTimer) {
          clearTimeout(this.doubleTapTimer);
          this.doubleTapTimer = null;
          this.toggleScale();
        } else {
          this.doubleTapTimer = setTimeout(function () {
            _this.$emit('close');

            _this.doubleTapTimer = null;
          }, TAP_TIME);
        }
      }
    },
    onLoad: function onLoad(event) {
      var _event$target = event.target,
          naturalWidth = _event$target.naturalWidth,
          naturalHeight = _event$target.naturalHeight;
      this.imageRatio = naturalHeight / naturalWidth;
    }
  },
  render: function render() {
    var h = arguments[0];
    var imageSlots = {
      loading: function loading() {
        return h(Loading, {
          "attrs": {
            "type": "spinner"
          }
        });
      }
    };
    return h(SwipeItem, {
      "class": bem('swipe-item')
    }, [h(Image, {
      "attrs": {
        "src": this.src,
        "fit": "contain"
      },
      "class": bem('image', {
        vertical: this.vertical
      }),
      "style": this.imageStyle,
      "scopedSlots": imageSlots,
      "on": {
        "load": this.onLoad
      }
    })]);
  }
};
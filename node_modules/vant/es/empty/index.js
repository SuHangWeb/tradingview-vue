import { createNamespace } from '../utils';
import Network from './Network';

var _createNamespace = createNamespace('empty'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var PRESETS = ['error', 'search', 'default'];
export default createComponent({
  props: {
    description: String,
    image: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    genImageContent: function genImageContent() {
      var h = this.$createElement;
      var slots = this.slots('image');

      if (slots) {
        return slots;
      }

      if (this.image === 'network') {
        return h(Network);
      }

      var image = this.image;

      if (PRESETS.indexOf(image) !== -1) {
        image = "https://img.yzcdn.cn/vant/empty-image-" + image + ".png";
      }

      return h("img", {
        "attrs": {
          "src": image
        }
      });
    },
    genImage: function genImage() {
      var h = this.$createElement;
      return h("div", {
        "class": bem('image')
      }, [this.genImageContent()]);
    },
    genDescription: function genDescription() {
      var h = this.$createElement;
      var description = this.slots('description') || this.description;

      if (description) {
        return h("p", {
          "class": bem('description')
        }, [description]);
      }
    },
    genBottom: function genBottom() {
      var h = this.$createElement;
      var slot = this.slots();

      if (slot) {
        return h("div", {
          "class": bem('bottom')
        }, [slot]);
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem()
    }, [this.genImage(), this.genDescription(), this.genBottom()]);
  }
});
import { createNamespace } from '../utils';
import { ChildrenMixin } from '../mixins/relation';

var _createNamespace = createNamespace('col'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

export default createComponent({
  mixins: [ChildrenMixin('vanRow')],
  props: {
    span: [Number, String],
    offset: [Number, String],
    tag: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    style: function style() {
      var index = this.index;

      var _ref = this.parent || {},
          spaces = _ref.spaces;

      if (spaces && spaces[index]) {
        var _spaces$index = spaces[index],
            left = _spaces$index.left,
            right = _spaces$index.right;
        return {
          paddingLeft: left ? left + "px" : null,
          paddingRight: right ? right + "px" : null
        };
      }
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  },
  render: function render() {
    var _bem;

    var h = arguments[0];
    var span = this.span,
        offset = this.offset;
    return h(this.tag, {
      "style": this.style,
      "class": bem((_bem = {}, _bem[span] = span, _bem["offset-" + offset] = offset, _bem)),
      "on": {
        "click": this.onClick
      }
    }, [this.slots()]);
  }
});
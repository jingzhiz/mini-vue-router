export default {
  name: 'RouterLink',
  props: {
    to: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    }
  },
  render(h) {
    const data = { ...this.$attrs };

    data.on = {
      click: () => {
        this.$router.push(this.to);
      }
    };

    return h(this.tag, data, this.$slots.default);
  }
};
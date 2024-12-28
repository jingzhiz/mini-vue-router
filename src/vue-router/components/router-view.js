export default {
  name: 'RouterView',
  functional: true,
  render(h, { parent, data }) {
    data.routerView = true;

    let depth = 0;
    const route = parent.$route;

    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }

    const record = route.matched[depth];

    if (!record) return h();

    return h(record.component, data);
  }
};
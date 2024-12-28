import RouterLink from './components/router-link.js';
import RouterView from './components/router-view.js';

export let Vue;

/**
 * 定义一个install函数，用于在Vue中安装路由功能
 * @param {Object} _Vue - Vue的构造函数，用于在内部添加组件和混入
 */
export function install(_Vue) {
  // 在install函数内部将传入的_Vue赋值给全局变量Vue
  Vue = _Vue;

  // 注册全局组件router-link，用于在应用中创建链接
  Vue.component('router-link', RouterLink);

  // 注册全局组件router-view，用于渲染匹配的路由组件
  Vue.component('router-view', RouterView);

  // 向Vue中添加一个全局混入，用于在每个实例的创建之前执行一些逻辑
  Vue.mixin({
    beforeCreate() {
      // 如果当前实例的选项中包含router，表明其是一个根实例
      if (this.$options.router) {
        // 在根实例中设置_routerRoot和_router属性
        this._routerRoot = this;
        this._router = this.$options.router;

        this._router.init(this);

        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        // 如果不是根实例，则向上查找最近的包含_routerRoot的父实例
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
    }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get() { return this._routerRoot._route; }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get() { return this._routerRoot._router; }
  });
}
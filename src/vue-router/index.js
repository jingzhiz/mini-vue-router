import { install } from "./install";
import { createMatcher } from "./create-matcher";
import { HashHistory, BrowserHistory } from "./history";

class VueRouter {
  /**
   * 构造函数，初始化路由器
   * 
   * @param {Object} options - 配置选项，包括模式和路由
   *   - mode: 路由模式，可以是 'hash' 或 'history'
   *   - routes: 路由配置数组
   */
  constructor(options = {}) {
    // 解构赋值从options中提取mode和routes，提供默认值
    const {
      mode = 'hash',
      routes = []
    } = options;

    this.beforeHooks = [];

    // 初始化mode
    this.mode = mode;

    // 创建路由匹配器
    this.matcher = createMatcher(routes || []);

    // 根据不同的模式初始化不同的历史记录管理器
    switch (mode) {
      case 'hash':
        // 在hash模式下，使用HashHistory管理历史记录
        this.history = new HashHistory(this);
        break;
      case 'history':
        // 在history模式下，使用BrowserHistory管理历史记录
        this.history = new BrowserHistory(this);
        break;
    }
  }

  /**
   * 初始化应用程序的路由
   * @param {Object} app - 应用程序实例
   */
  init(app) {
    // 获取历史记录对象，用于管理浏览器的会话历史
    const history = this.history;

    /**
     * 设置哈希监听器
     * 这个函数的目的是设置历史记录的监听器，以响应URL哈希的更改
     */
    const setupHashListener = () => {
      history.setupListeners();
    };

    // 过渡到当前所在的位置，并设置哈希监听器
    // 这是为了确保应用程序可以在任何位置开始，并正确地监听URL的更改
    history.transitionTo(history.getCurrentLocation(), setupHashListener);

    // 监听路由的更改，并更新应用程序的当前路由
    // 这个回调函数会在每次路由更改时被调用，以保持应用程序的同步
    history.listen(route => {
      app._route = route;
    });
  }

  match(location) {
    return this.matcher.match(location);
  }

  push(location) {
    window.location.hash = location;
  }

  beforeEach(hook) {
    this.beforeHooks.push(hook);
  }
}

VueRouter.install = install;

export default VueRouter;
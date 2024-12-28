import { createRoute } from './history';
import { createRouteMap } from './create-route-map';

/**
 * 匹配器创建
 * @description 匹配功能 match
 * @description 添加匹配，动态路由添加 addRoutes
 * @param {Array} routes - 路由配置数组
 * @returns {Object} 包含匹配函数和添加路由函数的对象
 */
export function createMatcher(routes) {
  const { pathList, pathMap } = createRouteMap(routes);

  /**
   * 匹配路由的函数
   * @param {string} path - 要匹配的路径
   * @returns {Object} 匹配到的路由记录
   */
  const match = (path) => {
    const record = pathMap[path];

    return createRoute(record, { path });
  };

  /**
   * 动态添加路由的函数
   * @param {Array} routes - 要添加的路由配置数组
   */
  const addRoutes = (routes) => {
    createRouteMap(routes, pathList, pathMap);
  };

  return {
    /**
     * 匹配路由的函数
     * @type {Function}
     */
    match,

    /**
     * 动态添加路由的函数
     * @type {Function}
     */
    addRoutes
  };
}

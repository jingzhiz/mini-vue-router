/**
 * 创建路由映射表
 * @param {Array} routes - 路由配置数组
 * @param {Array} oldPathList - 旧的路径列表（可选）
 * @param {Object} oldPathMap - 旧的路径映射表（可选）
 * @returns {Object} 包含路径列表和路径映射表的对象
 */
export function createRouteMap (
  routes,
  oldPathList,
  oldPathMap
) {

  const pathList = oldPathList || [];
  const pathMap = oldPathMap || {};

  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap);
  });

  return {
    /**
     * 路径列表，存储所有路由的路径
     * @example ['/', '/about', '/about/a', '/about/b']
     * @type {Array}
     */
    pathList,

    /**
     * 路径映射表，存储路径和对应路由记录的映射关系
     * @example { '/': {}, '/about': {} }
     * @type {Object}
     */
    pathMap
  };
}

/**
 * 向路径列表和映射中添加路由记录
 * 此函数用于递归地处理路由配置，将其转换为应用程序所需的路径列表和映射格式
 * 它确保没有重复的路径定义，并且正确地建立了父子路由关系
 * 
 * @param {Object} route - 当前正在处理的路由配置对象
 * @param {Array} pathList - 路径列表，按顺序存储所有路由路径
 * @param {Object} pathMap - 路径映射，将每个路径字符串映射到其对应的路由记录
 * @param {Object} parentRecord - 父级菜单记录
 */
function addRouteRecord (route, pathList, pathMap, parentRecord) {
  // 创建当前路由的记录对象，包括路径、组件和父路径
  const path = parentRecord ? `${parentRecord.path}/${route.path}` : route.path;

  const record = {
    path,
    component: route.component,
    parent: parentRecord
  };

  // 检查当前路径是否已存在于映射中，如果不存在则添加
  if (!pathMap[path]) {
    pathMap[path] = record;
    pathList.push(path);
  }

  // 如果当前路由有子路由，则递归处理每个子路由
  if (route.children) {
    route.children.forEach(childRoute => {
      addRouteRecord(childRoute, pathList, pathMap, record);
    });
  }
}

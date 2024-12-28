/**
 * 创建路由对象
 * 
 * 该函数根据路由记录和位置信息，构建一个路由对象它主要做的工作是
 * 将路由记录及其所有父级路由记录收集到一个数组中，并将这个数组作为匹配的路由
 * 信息的一部分返回这用于在应用中跟踪当前路由是如何从根路由
 * 逐级匹配到的
 * 
 * @param {Object} record - 当前路由记录，null表示没有匹配到任何路由记录
 * @param {Object} location - 当前的位置信息，通常包含路径、查询参数等
 * @returns {Object} 返回一个包含位置信息和匹配的路由记录数组的路由对象
 */
export function createRoute(record, location) {
  // 初始化一个空数组，用于存储匹配到的路由记录
  const matched = [];

  // 如果当前路由记录存在，则遍历所有父级路由记录
  if (record) {
    while (record) {
      // 将当前路由记录添加到匹配数组的开头，以构建从根到叶的路由路径
      matched.unshift(record);
      // 更新当前路由记录为父级路由记录，继续遍历直到没有父级
      record = record.parent;
    }
  }

  // 返回一个新的路由对象，包含当前位置信息和匹配到的路由记录数组
  return {
    ...location,
    matched
  };
}

export class History {
  constructor(router) {
    this.router = router;

    this.current = createRoute(null, {
      path: '/'
    });
  }

  /**
   * 切换到新的路由位置。
   * 
   * 该函数用于将当前路由切换到新的位置。它首先匹配新的位置与当前路由配置，
   * 然后将其与当前路由进行比较。如果两者相同且匹配的路由组件长度也相同，
   * 则认为切换已完成，无需进一步操作。否则，调用提供的回调函数以完成切换。
   * 
   * @param {string} location - 新路由的位置路径。
   * @param {function} onComplete - 切换完成后调用的回调函数。
   */
  transitionTo(location, onComplete) {
    // 匹配新位置与当前路由配置
    const current = this.router.match(location);

    // 如果新位置与当前路由相同，且匹配的路由组件数量也相同，则不需要切换
    if (
      this.current.path === location &&
      this.current.matched.length === current.matched.length
    ) return;

    const iterator = (hook, next) => {
      hook(current, this.current, next);
    };

    runQueue(this.router.beforeHooks, iterator, () => {
      this.current = current;
      this.cb && this.cb(current);

      // 如果提供了回调函数，则在切换完成后调用它
      onComplete && onComplete();
    });

  }

  listen(callback) {
    this.cb = callback;
  }
}

/**
 * 顺序执行队列中的任务
 * @param {Array} queue - 一个包含任务的队列
 * @param {Function} iterator - 用于执行队列中每个任务的迭代器函数
 * @param {Function} cb - 所有任务完成后执行的回调函数
 */
function runQueue(queue, iterator, cb) {
  /**
   * 执行下一个任务
   * @param {number} index - 当前任务的索引
   */
  const next = (index) => {
    // 获取当前索引的任务
    let hook = queue[index];

    // 执行当前任务，并在任务完成后决定是继续执行下一个任务还是执行回调函数
    iterator(hook, () => {
      if (index < queue.length - 1) {
        // 如果当前任务不是最后一个，则执行下一个任务
        next(index + 1);
      } else {
        // 如果当前任务是最后一个，则执行回调函数
        cb();
      }
    });
  };

  // 从第一个任务开始执行
  next(0);
}

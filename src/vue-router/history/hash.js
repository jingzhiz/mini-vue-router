import { History } from "./base";

/**
 * 此函数用于检查当前窗口位置是否包含哈希值，如果不包含则添加斜杠，跳转首页
 * 这是为了确保应用程序的路由或者状态正确
 */
function ensureSlash() {
	// 如果当前窗口位置包含哈希值，则无需操作，直接返回
	if (window.location.hash) return;

	// 如果没有哈希值，设置窗口位置的哈希值为根路径'/'
	window.location.hash = '/';
}

export class HashHistory extends History {
	constructor(router) {
		super(router);
		this.router = router;

		ensureSlash();
	}

	/**
	 * 获取当前页面的hash值
	 * 
	 * @returns {string} 返回当前页面URL的hash部分，不包括'#'符号
	 */
	getCurrentLocation() {
		return window.location.hash.slice(1);
	}

	setupListeners() {
		window.addEventListener('hashchange', () => {
			this.transitionTo(this.getCurrentLocation());
		});
	}
}
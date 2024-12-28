import { History } from "./base";

export class BrowserHistory extends History {
	constructor(router) {
		super(router);
		this.router = router;
		this.setupListeners();
	}

	setupListeners() {
		window.addEventListener("popstate", () => {
			this.transitionTo(window.location.pathname);
		});
	}

	push(location) {
		window.history.pushState({}, null, location);
	}
}

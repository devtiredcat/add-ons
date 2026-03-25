'use strict';
exports.setup = function (App) {
	return Tools('add-on').forApp(App).install({
		events: {
			updateuser(_nick, named) {
				if (named === true) {
					App.bot.sendTo('', '/friends viewnotifs');
				}
			}
		}
	});
};
'use strict';
exports.setup = function (App) {
	return Tools('add-on').forApp(App).install({
		events: {
			pm(from, message) {
				if (message.toLowerCase().includes(' bot') || message.toLowerCase().startsWith('bot')) {
					App.bot.pm(from, 'I am a bot.');
				}
			},
			userchat(room, _time, _by, message) {
				console.log(message);
				if (message.toLowerCase().includes(' bot') || message.toLowerCase().startsWith('bot')) {
					App.bot.sendTo(room, 'I am a bot.');
				}
			}
		}
	});
};
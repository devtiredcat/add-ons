'use strict';
const execFile = require('child_process').execFile;
exports.setup = function (App) {
	return Tools('add-on').forApp(App).install({
		events: {
			pm(from, message) {
				if (from === '~' && message.startsWith('/nonotify Your friend <username class="username">')) {
					const match = message.match(/<username[^>]*>([^<]+)<\/username>/i);
					const username = match[1];
					App.bot.pm(username, "Battle Bot talks");
				}
				if (!message.startsWith('!') && !message.startsWith('$')) {
					console.log(from, ':', message);
					execFile("./alert.sh", [from, message]);
					App.bot.pm(from, 'Message Received.');
				}
			}
		}
	});
};
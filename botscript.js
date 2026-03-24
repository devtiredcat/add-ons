'use strict';
const execFile = require('child_process').execFile;
exports.setup = function (App) {
	return Tools('add-on').forApp(App).install({
		events: {
			"pm": function (from, message) {
				if (!message.startsWith('/') && !message.startsWith('$')) {
					console.log(from, ':', message);
					execFile("./alert.sh", [from, message]);
					App.bot.pm(from, 'Message Received.');
				}
			},
			"message": function (received_message) {
				if (received_message.includes('has just connected!')) {
					const match = received_message.match(/<username[^>]*>([^<]+)<\/username>/i);
					const username = match[1];
					App.bot.pm(username, "Beep Boop");
				}
			},
		},
	});
};
'use strict';
const execFile = require('child_process').execFile;
exports.setup = function (App) {
	return Tools('add-on').forApp(App).install({
		commands: {
			reboot() {
				this.reply("Sure!");
				execFile("./../RouterCommands/router_reboot.zsh");
			},
		},
	});
};
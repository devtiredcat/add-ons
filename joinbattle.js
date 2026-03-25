'use strict';
function toID(name) {
	return name
		.replace(/^[^a-zA-Z0-9]+/, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '');
}
exports.setup = function (App) {
	const watchedUsers = new Set();
	const joinedBattles = new Set();
	const roomsToLeave = new Set();
	let pollInterval = null;
	return Tools('add-on').forApp(App).install({
		commands: {
			"watchme": function (_App, context) {
				let user;
				if (context.arg) user = context.arg;
				else user = this.byIdent.id;
				if (watchedUsers.has(user)) {
					this.reply(`Already watching ${user}.`);
				} else {
					this.reply(`Started watching ${user}`);
					watchedUsers.add(user);
					if (!pollInterval) {
					    pollInterval = setInterval(() => {
						    for (const u of watchedUsers) {
							    App.bot.sendTo('', `/cmd userdetails ${u}`);
						    }
					    }, 5000);
				    }
				}
			},
			"stopit": function (_App, context) {
				let user;
				if (context.arg) user = context.arg;
				else user = this.byIdent.id;
				if (watchedUsers.has(user)) {
					this.reply(`Stopped watching ${user}`);
					watchedUsers.delete(user);
					if (watchedUsers.size === 0) {
						for (const room of joinedBattles) {
							App.bot.sendTo('', `/leave ${room}`);
						}
						joinedBattles.clear();
						roomsToLeave.clear();
						clearInterval(pollInterval);
						pollInterval = null;
					}
				} else {
					this.reply(`Not watching ${user}.`);
				}
			}
		},
		events: {
			queryresponse(json_response) {
				const data = JSON.parse(json_response.slice(12));
				if (data.autoconfirmed !== true || (data.status && data.status.includes('(Idle)'))) {
					const user = data.userid;
					watchedUsers.delete(user);
					if (watchedUsers.size === 0) {
                    	for (const room of joinedBattles) {
    						roomsToLeave.add(room);
						}
						clearInterval(pollInterval);
						pollInterval = null;
					}
				}
				for (const room of [...roomsToLeave]) {
					if (!(room in data.rooms)) {
						App.bot.sendTo('', `/leave ${room}`);
						joinedBattles.delete(room);
						roomsToLeave.delete(room);
					}
				}
				if (Object.keys(data.rooms).length !== 0) {
					Object.keys(data.rooms).forEach(room => {
						if (room.startsWith('☆')) {
							room = room.slice(1);
						}
						if (room.startsWith('battle') && !joinedBattles.has(room)) {
							App.bot.sendTo('', `/join ${room}`);
							joinedBattles.add(room);
						}
					});
				}
			},
			userleave(room, user) {
				user = toID(user);
				if (watchedUsers.has(user) && joinedBattles.has(room)) {
					roomsToLeave.add(room);
				}
			}
		}
	});
};
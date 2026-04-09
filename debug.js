'use strict';
const debug = false;
if (debug) {
	exports.setup = function (App) {
		return Tools('add-on').forApp(App).install({
			events: {
				error(err) {
					console.error('Debug: ', 'Error:', err);
				},
				connecting() {
					console.log('Debug: ', 'Connecting');
				},
				connect(connection) {
					console.log('Debug: ', 'Connected:', connection);
				},
				connectFailed(error) {
					console.error('Debug: ', 'Connection failed:', error);
				},
				disconnect(error) {
					console.error('Debug: ', 'Disconnected:', error);
				},
				timeout() {
					console.log('Debug: ', 'Connection timed out');
				},
				renamefailure(type, nick, pass) {
					console.error(`Debug: Renamed Failed. type=${type}, nick=${nick}, pass=${pass}`);
				},
				send(msg) {
					if (msg.includes('/cmd userdetails palbot')) return;
					else console.log('Debug: ', 'Message sent:', msg);
				},
				formats(formats_data) {
					console.log('Debug: ', 'Formats received', formats_data);
				},
				challstr(challstr) {
					console.log('Debug: ', 'challstr received:', challstr);
				},
				updateuser(nick, named, avatar) {
					console.log(`Debug: Bot updated. nick=${nick}, named=${named}, avatar=${avatar}`);
				},
				queryresponse(json_response) {
					if (JSON.parse(json_response.slice(12)).id.includes('palbot')) return;
					else console.log('Debug: ', 'queryresponse: ', json_response);
				},
				popup(popup_body) {
					console.log('Debug: ', 'Popup', popup_body);
				},
				roomjoin(room, type) {
					console.log(`Debug: Room joined: ${room} of type ${type}`);
				},
				roomleave(room) {
					console.log('Debug: ', 'Left room:', room);
				},
				roomjoinfailure(room, errcode, reason) {
					console.error(`Debug: Failed to join room: ${room} with errorcode: ${errcode}. Reason: ${reason}`);
				},
				chat(room, time, message) {
					console.log(`Debug: Bot sent "${message}" in ${room} at ${time}`);
				},
				userchat(room, time, by, message) {
					console.log(`Debug: Message: "${message}" sent by ${by} in room ${room} at ${time}`);
				},
				pmsent(to, message) {
					console.log(`Debug: "${message}" sent to ${to}`);
				},
				pm(from, message) {
					console.log(`Debug: "${message}" from ${from}`);
				},
				userrename(room, old_name, new_name) {
					console.log(`Debug: ${old_name} renamed to ${new_name} in ${room}`);
				},
				userjoin(room, user) {
					console.log(`Debug: ${user} joined ${room}`);
				},
				userleave(room, user) {
					console.log(`Debug: ${user} left ${room}`);
				}
			}
		});
	};
}
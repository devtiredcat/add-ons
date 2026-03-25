'use strict';
const execFile = require('child_process').execFile;
const formats = new Set([
	"gen9randombattle",
	"gen9ou",
	"gen9unratedrandombattle",
	"gen9freeforallrandombattle",
	"gen9randombattleblitz",
	"gen9multirandombattle",
	"gen9randomdoublesbattle",
	"gen9balancedhackmons",
	"gen9godlygift",
	"gen6purehackmons",
	"gen9purehackmons",
	"gen7purehackmons",
	"gen9randomroulette",
	"gen9superstaffbrosultimate",
	"gen9monotyperandombattle",
	"gen9randombattlesharedpowerb12p6",
	"gen9randombattlemayhem",
	"gen9battlefactory",
	"gen91v1factory",
	"gen9bssfactory",
	"gen9draftfactory",
	"gen9babyrandombattle",
	"gen9hackmonscup",
	"gen9doubleshackmonscup",
	"gen9brokencup",
	"gen9challengecup1v1",
	"gen9challengecup2v2",
	"gen9challengecup6v6",
	"gen9metronomebattle",
	"gen8randombattle",
	"gen8battlefactory",
	"gen8bssfactory",
	"gen8hackmonscup",
	"gen8cap1v1",
	"gen8bdsprandombattle",
	"gen7randombattle",
	"gen7battlefactory",
	"gen7bssfactory",
	"gen7hackmonscup",
	"gen7letsgorandombattle",
	"gen6randombattle",
	"gen6battlefactory",
	"gen5randombattle",
	"gen4randombattle",
	"gen3randombattle",
	"gen2randombattle",
	"gen1randombattle",
	"gen1challengecup",
	"gen1hackmonscup"
]);
exports.setup = function (App) {
	return Tools('add-on').forApp(App).install({
		commands: {
			battle(_App, context) {
				const format = context.arg;
				console.log(format);
				if (!format) {
					this.reply('Usage: $battle [format]');
					this.reply("Supported Formats:");
			        this.reply('!code gen9randombattle,gen9ou,gen9unratedrandombattle,gen9freeforallrandombattle,gen9randombattleblitz,gen9multirandombattle,gen9randomdoublesbattle,gen9balancedhackmons,gen9godlygift,gen6purehackmons,gen9purehackmons,gen7purehackmons,gen9randomroulette,gen9superstaffbrosultimate,gen9monotyperandombattle,gen9randombattlesharedpowerb12p6,gen9randombattlemayhem,gen9battlefactory,gen91v1factory,gen9bssfactory,gen9draftfactory,gen9babyrandombattle,gen9hackmonscup,gen9doubleshackmonscup,gen9brokencup,gen9challengecup1v1,gen9challengecup2v2,gen9challengecup6v6,gen9metronomebattle,gen8randombattle,gen8battlefactory,gen8bssfactory,gen8hackmonscup,gen8cap1v1,gen8bdsprandombattle,gen7randombattle,gen7battlefactory,gen7bssfactory,gen7hackmonscup,gen7letsgorandombattle,gen6randombattle,gen6battlefactory,gen5randombattle,gen4randombattle,gen3randombattle,gen2randombattle,gen1randombattle,gen1challengecup,gen1hackmonscup');
				}
				if (format && !formats.has(format)) {
 			    this.reply("Unknown format: " + format);
				}
				if (format && formats.has(format)) {
					this.reply("Sending Challenge: ", format);
					execFile("./../foul-play/battle.sh", [this.by, format]);
				}
			},
		},
	});
};
const { CronJob } = require("cron");
const { CronTime } = require("cron-time-generator");
module.exports = {
	name: "scheduler",
	dependencies: ["bots"],
	async created() {
		this.strategies = new Map([
			["everyMinute", CronTime.everyMinute()],
			["everyHour", CronTime.everyHour()],
			["everyDay", CronTime.everyDay()],
		]);
	},
	async started() {
		const timer = this.strategies.get("everyHour");
		new CronJob(
			timer,
			this.actions.publishPost, // onTick
			null, // onComplete
			true, // start
			"America/Los_Angeles" // timeZone
		);
	},
	actions: {
		getStrategies: {
			rest: "GET /strategies",
			handler() {
				const keys = [];
				this.strategies.forEach((value, key, map) => {
					keys.push(key);
				});
				return keys;
			},
		},
		async publishPost(ctx) {
			const parameters = {
				bot_name: "@BisonTeamBot",
				post_id: "b354bc2b-9a1e-4755-becd-8fec50303793",
				database_id: "1df4b075-44a3-419d-9bf8-5cc4c8429216",
				channel_id: "-1002014566944",
			};
			ctx.call("bots.sendMessage", parameters).then(
				(data) => "=> Message Published!"
			);
		},
	},
};

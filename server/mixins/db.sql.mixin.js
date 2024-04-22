const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");

const SequelizeMixin = function () {
	return {
		mixins: [DbService],
		adapter: new SqlAdapter(process.env.DATABASE_URL, {
			dialect: "postgres",
			define: {
				timestamps: false,
			},
			noSync: false,
		}),
	};
};
module.exports = SequelizeMixin;

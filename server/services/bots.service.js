const { Client } = require("pg");
const { v4: uuidv4 } = require("uuid");

module.exports = {
	name: "bots",
	settings: {},
	async started() {
		// PostgreSQL connection configuration
		const pgConfig = {
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false,
			},
		};

		// Create a PostgreSQL client
		const client = new Client(pgConfig);
		this.metadata.client = client;

		// Connect to the PostgreSQL database
		client
			.connect()
			.then(async () => {
				await this.logger.info("Connected to PostgreSQL database");
				await this.createTables();
			})
			.catch((err) =>
				this.logger.error(`Error connecting to PostgreSQL:\n ${err}`)
			);
	},
	methods: {
		async createTables() {
			let created = false;
			try {
				const botsTable = "bots";
				const channelsTable = "channels";

				// Check if the "bots" table exists
				res = await this.metadata.client.query(`
				SELECT EXISTS (
					SELECT FROM information_schema.tables 
					WHERE table_schema = 'public' 
					AND table_name = '${botsTable}'
				);
			`);

				// If the "bots" table doesn't exist, create it
				if (!res.rows[0].exists) {
					await this.metadata.client.query(`
							CREATE TABLE ${botsTable} (
								bot_id UUID PRIMARY KEY,
								bot_name TEXT,
								bot_token TEXT
							);
						    `);
					// Check if the "channels" table exists
					res = await this.metadata.client.query(`
						SELECT EXISTS (
							SELECT FROM information_schema.tables 
							WHERE table_schema = 'public' 
							AND table_name = '${channelsTable}'
						);
					`);

					// If the "channels" table doesn't exist, create it
					if (!res.rows[0].exists) {
						await this.metadata.client.query(`
							CREATE TABLE ${channelsTable} (
								channel_id UUID PRIMARY KEY,
								channel_name TEXT,
								channel_token TEXT
							);
						`);
					}
					return created;
				}
			} catch (err) {
				this.logger.error(
					`Error creating tables in PostgreSQL:\n ${err}`
				);
				return created;
			}
		},
		async getBots() {
			const res = await this.metadata.client.query(`
				SELECT * FROM bots;
			`);
			return res.rows;
		},
		async getBot(bot_id) {
			const res = await this.metadata.client.query(`
				SELECT * FROM bots WHERE bot_id = '${bot_id}';
			`);
			return res.rows;
		},
		async createBot(bot_id, bot_name, bot_token) {
			try {
				const res = await this.metadata.client.query(`
					INSERT INTO bots (bot_id, bot_name, bot_token)
					VALUES ('${bot_id}', '${bot_name}', '${bot_token}');				
				`);
				return await this.getBot(bot_id);
			} catch (err) {
				this.logger.error(`Error creating bot in PostgreSQL:\n ${err}`);
			}
		},
		async deleteBot(bot_id) {
			try {
				const res = await this.metadata.client.query(`
					DELETE FROM bots WHERE bot_id = '${bot_id}';
				`);
				return true;
			} catch (err) {
				this.logger.error(`Error deleting bot in PostgreSQL:\n ${err}`);
				return false;
			}
		},
	},
	actions: {
		getBots: {
			rest: "GET /",
			async handler(ctx) {
				return await this.getBots();
			},
		},
		getBot: {
			rest: "GET /:bot_id",
			params: {
				bot_id: { type: "uuid" },
			},
			async handler(ctx) {
				const { bot_id } = ctx.params;
				return await this.getBot(bot_id);
			},
		},
		createBot: {
			rest: "POST /",
			params: {
				bot_name: { type: "string" },
				bot_token: { type: "string" },
			},
			async handler(ctx) {
				const { bot_name, bot_token } = ctx.params;
				const bot_id = uuidv4();
				const result = await this.createBot(
					bot_id,
					bot_name,
					bot_token
				);
				return result;
			},
		},
		deleteBot: {
			rest: "DELETE /:bot_id",
			params: {
				bot_id: { type: "uuid" },
			},
			async handler(ctx) {
				const { bot_id } = ctx.params;
				const result = await this.deleteBot(bot_id);
				return result;
			},
		},
	},
};

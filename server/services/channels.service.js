const { Client } = require("pg");
const { v4: uuidv4 } = require("uuid");

module.exports = {
	name: "channels",
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
		this.metadata.client
			.connect()
			.then(async () => {
				await this.logger.info("Connected to PostgreSQL database");
				
			})
			.catch((err) =>
				this.logger.error(`Error connecting to PostgreSQL:\n ${err}`)
			);
		await this.createChannelsTable();
	},
	methods: {
		async createChannelsTable() {
			let created = false;
			try {
				const channelsTable = "channels";

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
								channel_chat_id TEXT,
                                                channel_url TEXT
							);
						`);
				}
				return created;
			} catch (err) {
				this.logger.error(
					`Error creating tables in PostgreSQL:\n ${err}`
				);
				return created;
			}
		},
		async getChannels() {
			const res = await this.metadata.client.query(`
				SELECT * FROM channels;
			`);
			return res.rows;
		},
		async getChannel(channel_id) {
			const res = await this.metadata.client.query(`
				SELECT * FROM channels WHERE channel_id = '${channel_id}';
			`);
			return res.rows;
		},
		async createChannel(
			channel_id,
			channel_name,
			channel_chat_id,
			channel_url
		) {
			try {
				const res = await this.metadata.client.query(`
					INSERT INTO channels (channel_id, channel_name, channel_chat_id, channel_url)
					VALUES ('${channel_id}', '${channel_name}', '${channel_chat_id}', '${channel_url}');				
				`);
				return await this.getChannel(channel_id);
			} catch (err) {
				this.logger.error(
					`Error creating channel in PostgreSQL:\n ${err}`
				);
			}
		},
		async deleteChannel(channel_id) {
			try {
				const res = await this.metadata.client.query(`
					DELETE FROM channels WHERE channel_id = '${channel_id}';
				`);
				return true;
			} catch (err) {
				this.logger.error(
					`Error deleting channel in PostgreSQL:\n ${err}`
				);
				return false;
			}
		},
	},
	actions: {
		getChannels: {
			rest: "GET /",
			async handler(ctx) {
				return await this.getChannels();
			},
		},
		getChannel: {
			rest: "GET /:channel_id",
			params: {
				channel_id: { type: "uuid" },
			},
			async handler(ctx) {
				const { channel_id } = ctx.params;
				return await this.getChannel(channel_id);
			},
		},
		createChannel: {
			rest: "POST /",
			params: {
				channel_name: { type: "string" },
				channel_chat_id: { type: "string" },
				channel_url: { type: "string" },
			},
			async handler(ctx) {
				const { channel_name, channel_chat_id, channel_url } =
					ctx.params;
				const channel_id = uuidv4();
				const result = await this.createChannel(
					channel_id,
					channel_name,
					channel_chat_id,
					channel_url
				);
				return result;
			},
		},
		deleteChannel: {
			rest: "DELETE /:channel_id",
			params: {
				channel_id: { type: "uuid" },
			},
			async handler(ctx) {
				const { channel_id } = ctx.params;
				const result = await this.deleteChannel(channel_id);
				return result;
			},
		},
	},
};

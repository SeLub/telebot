const { Client } = require("pg");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

module.exports = {
	name: "publishers",
	settings: {},
	async started() {
		try {
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
				.then(() => {
					this.logger.info("Connected to PostgreSQL database");
				})
				.catch((err) =>
					this.logger.error(
						`Error connecting to PostgreSQL:\n ${err}`
					)
				);
			await this.createTables();
		} catch (err) {
			console.error("Error creating tables:", err);
		}
	},
	methods: {
		async createTables() {
			// Check if the "publishers" table exists
			let res = await this.metadata.client.query(`
			    SELECT EXISTS (
			        SELECT FROM information_schema.tables
			        WHERE table_schema = 'public'
			        AND table_name = 'publishers'
			    );
			`);

			// If the "publishers" table doesn't exist, create it
			if (!res.rows[0].exists) {
				await this.metadata.client.query(`
			        CREATE TABLE publishers (
			            publisher_id UUID PRIMARY KEY,
			            publisher_name TEXT,
			            publisher_bots TEXT,
			            publisher_channels TEXT,
					publisher_database TEXT
			        );
			    `);
				console.log("Created 'publishers' table");
			}

			//Check if the "plans" table exists
			res = await this.metadata.client.query(`
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = 'plans'
                );
            `);

			// If the "plans" table doesn't exist, create it
			if (!res.rows[0].exists) {
				await this.metadata.client.query(`
                    CREATE TABLE plans (
                        id SERIAL PRIMARY KEY,
				publisher_id UUID,
                        post_id UUID,
                        publish_date TIMESTAMP,
                        publish_status TEXT,
				CONSTRAINT FK_plans_publishers
				FOREIGN KEY(publisher_id) REFERENCES publishers(publisher_id)
				ON DELETE SET NULL
				ON UPDATE SET NULL
                    );
                `);
				console.log("Created 'plans' table");
			}
		},
		async getPublishers() {
			const res = await this.metadata.client.query(
				"SELECT * FROM publishers"
			);
			return res.rows;
		},
		async getPublisher(id) {
			const res = await this.metadata.client.query(
				"SELECT * FROM publishers WHERE publisher_id = $1",
				[id]
			);
			return res.rows[0];
		},
		async createPublisher(publisher) {
			let {
				publisher_name,
				publisher_bots,
				publisher_channels,
				publisher_database,
			} = publisher;
			const publisher_id = uuidv4();

			if (!publisher_name) {
				publisher_name = "Publisher " + publisher_id;
			}

			const res = await this.metadata.client.query(
				`
				INSERT INTO publishers (publisher_id, publisher_name, publisher_bots, publisher_channels, publisher_database) 
				VALUES ($1, $2, $3, $4, $5) 
				RETURNING *`,
				[
					publisher_id,
					publisher_name,
					publisher_bots,
					publisher_channels,
					publisher_database,
				]
			);
			return res.rows[0];
		},
		async updatePublisher(publisher) {
			const {
				publisher_id,
				publisher_name,
				publisher_bots,
				publisher_channels,
				publisher_database,
			} = publisher;
			const res = await this.metadata.client.query(
				`
				UPDATE publishers SET publisher_name = $1, publisher_bots = $2, publisher_channels = $3
				WHERE publisher_id = $4, publisher_database = $5
				RETURNING *`,
				[
					publisher_name,
					publisher_bots,
					publisher_channels,
					publisher_id,
				]
			);
			return res.rows[0];
		},
		async deletePublisher(id) {
			const res = await this.metadata.client.query(
				"DELETE FROM publishers WHERE publisher_id = $1",
				[id]
			);
			return res.rows;
		},
		async getInitData() {
			try {
				const publishers = await this.getPublishers();
				const bots = await this.broker.call("bots.getBots");
				const channels = await this.broker.call("channels.getChannels");
				const databases = await this.broker.call("posts.getDatabases");
				return {
					publishers,
					bots,
					channels,
					databases,
				};
			} catch (err) {
				this.logger.error(
					"Error to get init data for Publishers:" + err
				);
			}
		},
	},
	actions: {
		getPublishers: {
			rest: "GET /",
			async handler(ctx) {
				return await this.getPublishers();
			},
		},
		getPublisher: {
			rest: "GET /:id",
			params: {
				id: "string",
			},
			async handler(ctx) {
				const { id } = ctx.params;
				return await this.getPublisher(id);
			},
		},
		createPublisher: {
			rest: "POST /",
			params: {
				publisher_name: { type: "string", optional: true },
				publisher_bots: { type: "string", optional: true },
				publisher_channels: { type: "string", optional: true },
				publisher_database: { type: "string", optional: false },
			},
			async handler(ctx) {
				const {
					publisher_name,
					publisher_bots,
					publisher_channels,
					publisher_database,
				} = ctx.params;
				return await this.createPublisher({
					publisher_name,
					publisher_bots,
					publisher_channels,
					publisher_database,
				});
			},
		},
		updatePublisher: {
			rest: "PUT /:id",
			params: {
				id: { type: "uuid" },
				publisher_name: { type: "string", optional: true },
				publisher_bots: { type: "string", optional: true },
				publisher_channels: { type: "string", optional: true },
				publisher_database: { type: "string", optional: true },
			},
			async handler(ctx) {
				const {
					id,
					publisher_name,
					publisher_bots,
					publisher_channels,
					publisher_database,
				} = ctx.params;

				const newPublisher = {};
				if (publisher_name) {
					newPublisher.publisher_name = publisher_name;
				}
				if (publisher_bots) {
					newPublisher.publisher_bots = publisher_bots;
				}
				if (publisher_channels) {
					newPublisher.publisher_channels = publisher_channels;
				}
				if (publisher_database) {
					newPublisher.publisher_database = publisher_database;
				}
				const currentPublisher = await this.getPublisher(id);

				const publisher = {
					...currentPublisher,
					...newPublisher,
				};

				return await this.updatePublisher(publisher);
			},
		},
		deletePublisher: {
			rest: "DELETE /:id",
			params: {
				id: "string",
			},
			async handler(ctx) {
				const { id } = ctx.params;
				return await this.deletePublisher(id);
			},
		},
		getInitData: {
			rest: "GET /getInitData",
			async handler(ctx) {
				return await this.getInitData();
			},
		},
	},
};

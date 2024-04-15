// posts.service.js
const { Client } = require("pg");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { MoleculerError } = require("moleculer").Errors;

//const notFoundError = (id) => { throw new MoleculerError(`Record with ${id} not found.`, 404, "ERR_NOTFOUND"); }

module.exports = {
	name: "posts",
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

			// Connect to the PostgreSQL database
			client
				.connect()
				.then(() => {
					this.metadata.client = client;
					this.logger.info("Connected to PostgreSQL database");
				})
				.catch((err) =>
					this.logger.error(
						`Error connecting to PostgreSQL:\n ${err}`
					)
				);
		} catch (err) {
			console.error("Error creating tables:", err);
		}
	},
	methods: {
		async createDatabase(dbname) {
			const databaseId = uuidv4();
			const uniqueDatabaseName = dbname; // + "_" + databaseId;
			const postsTable = uniqueDatabaseName + "_posts";
			const attachmentsTable = uniqueDatabaseName + "_attachments";

			let created = false;
			// Check if the "post" table exists
			let res = await this.metadata.client.query(`
				SELECT EXISTS (
					SELECT FROM information_schema.tables 
					WHERE table_schema = 'public' 
					AND table_name = '${postsTable}'
				);
				`);

			// If the "posts" table doesn't exist, create it
			if (!res.rows[0].exists) {
				await this.metadata.client.query(`
					CREATE TABLE ${postsTable} (
						post_id UUID PRIMARY KEY,
						post_text TEXT
					);
                `);
			}

			// Check if the "attachments" table exists
			res = await this.metadata.client.query(`
				SELECT EXISTS (
					SELECT FROM information_schema.tables 
					WHERE table_schema = 'public' 
					AND table_name = '${attachmentsTable}'
				);
            	`);

			// If the "attachments" table doesn't exist, create it
			if (!res.rows[0].exists) {
				created = true;
				await this.metadata.client.query(`
					CREATE TABLE ${attachmentsTable} (
						attachment_id UUID PRIMARY KEY,
						post_id_attachment UUID,
						attachment_filename TEXT,
						FOREIGN KEY (post_id_attachment) REFERENCES ${postsTable}(post_id)
					);
                		`);
				await this.metadata.client.query(`
                		INSERT INTO databases (database_id, database_name)
                		VALUES ('${databaseId}', '${uniqueDatabaseName}');
                	`);
			}
			return databaseId;
		},
		async getDatabases() {
			const res = await this.metadata.client.query(`
                SELECT * FROM databases;
            `);
			return res.rows;
		},
		async getDatabase(id) {
			const res = await this.metadata.client.query(`
                  	SELECT * FROM databases WHERE database_id = '${id}';
            	`);
			return res.rows[0];
		},
		async deleteDatabase(name) {
			try {
				const postsTable = name + "_posts";
				const attachmentsTable = name + "_attachments";
				await this.metadata.client.query(`
					DROP TABLE IF EXISTS ${attachmentsTable};
					`);
				await this.metadata.client.query(`
					DROP TABLE IF EXISTS ${postsTable};
					`);
				await this.metadata.client.query(`
					DELETE FROM databases WHERE database_name = '${name}';
					`);
				return true;
			} catch (err) {
				this.logger.error(
					`Error in method: 'posts.deleteDatabase' :\n ${err}`
				);
				return false;
			}
		},
		async checkPostExists(database_name, post_id) {
			const postsTable = database_name + "_posts";
			const attachmentsTable = database_name + "_attachments";
			const response1 = await this.metadata.client.query(`
				SELECT * FROM INFORMATION_SCHEMA.TABLES 
				WHERE TABLE_NAME LIKE '${postsTable}'`);
			const response2 = await this.metadata.client.query(`
				SELECT * FROM INFORMATION_SCHEMA.TABLES 
				WHERE TABLE_NAME LIKE '${attachmentsTable}'`);
			console.log(response1.rowCount);
			console.log(response2.rowCount);
			if (!response1.rowCount || !response2.rowCount)
				return Promise.reject(
					new MoleculerError("database not found!", 404)
				);
			const res = await this.metadata.client.query(
				`
                		SELECT COUNT(*) FROM ${postsTable} WHERE post_id = $1;`,
				[post_id]
			);
			const postExists = !!Number(res.rows[0].count);
			if (!postExists)
				return Promise.reject(
					new MoleculerError("Post not found!", 404)
				);
		},
		async createPost(database_name, post_text) {
			const postsTable = database_name + "_posts";
			const post_id = uuidv4();
			await this.metadata.client.query(
				`
                		INSERT INTO ${postsTable} (post_id, post_text)
                		VALUES ($1, $2);`,
				[post_id, post_text]
			);
			return await this.getPost(database_name, post_id);
		},
		async getPosts(database_name) {
			const postsTable = database_name + "_posts";
			const res = await this.metadata.client.query(`
                    SELECT * FROM ${postsTable};
                `);
			return res.rows;
		},
		async getPost(database_name, post_id) {
			const postsTable = database_name + "_posts";
			await this.checkPostExists(database_name, post_id);
			const res = await this.metadata.client.query(
				`SELECT * FROM ${postsTable} WHERE post_id = $1;`,
				[post_id]
			);
			return res.rows;
		},
		async editPost(database_name, post_id, post_text) {
			const postsTable = database_name + "_posts";
			await this.metadata.client.query(
				`
				UPDATE ${postsTable} SET post_text = $1 
				WHERE post_id = $2;`,
				[post_text, post_id]
			);
			return await this.getPost(database_name, post_id);
		},
		async deletePost(database_name, post_id) {
			const postsTable = database_name + "_posts";
			const attachmentsTable = database_name + "_attachments";
			try {
				await this.checkPostExists(database_name, post_id);
				await this.metadata.client.query(
					`DELETE FROM ${attachmentsTable} WHERE post_id_attachment = $1;`,
					[post_id]
				);
				await this.metadata.client.query(
					`DELETE FROM ${postsTable} WHERE post_id = $1;`,
					[post_id]
				);
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		async getAttachments(database_name, post_id) {
			const attachmentsTable = database_name + "_attachments";
			const res = await this.metadata.client.query(
				`
				SELECT * FROM ${attachmentsTable} WHERE post_id_attachment = $1;`,
				[post_id]
			);
			return res.rows;
		},
		async addAttachmentToPost(
			database_name,
			attachment_id,
			post_id,
			attachment_filename
		) {
			const attachmentsTable = database_name + "_attachments";
			try {
				await this.metadata.client.query(
					`
				INSERT INTO ${attachmentsTable} (attachment_id, post_id_attachment, attachment_filename)
				VALUES ($1, $2, $3);`,
					[attachment_id, post_id, attachment_filename]
				);
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		authorize(ctx, route, req, res) {
			// Read the token from header
			let auth = req.headers["authorization"];
			if (auth && auth.startsWith("Bearer")) {
				let token = auth.slice(7);

				// Check the token
				if (token == "123456") {
					// Set the authorized user entity to `ctx.meta`
					ctx.meta.user = { id: 1, name: "John Doe" };
					return Promise.resolve(ctx);
				} else {
					// Invalid token
					return Promise.reject(
						new E.UnAuthorizedError(E.ERR_INVALID_TOKEN)
					);
				}
			} else {
				// No token
				return Promise.reject(new E.UnAuthorizedError(E.ERR_NO_TOKEN));
			}
		},
	},
	actions: {
		createPost: {
			rest: "POST /createPost",
			params: {
				database_name: { type: "string" },
				post_text: { type: "string" },
			},
			async handler(ctx) {
				const { database_name, post_text } = ctx.params;
				return await this.createPost(database_name, post_text);
			},
		},
		getPosts: {
			rest: "GET /all",
			params: {
				database_name: { type: "string" },
			},
			async handler(ctx) {
				const { database_name } = ctx.params;
				return await this.getPosts(database_name);
			},
		},
		getPost: {
			rest: "GET /",
			params: {
				post_id: { type: "uuid" },
				database_name: { type: "string" },
			},
			async handler(ctx) {
				const { database_name, post_id } = ctx.params;
				return await this.getPost(database_name, post_id);
			},
		},
		editPost: {
			rest: "PUT /editPost",
			params: {
				database_name: { type: "string" },
				post_id: { type: "uuid" },
				post_text: { type: "string" },
			},
			async handler(ctx) {
				const { database_name, post_id, post_text } = ctx.params;
				await this.checkPostExists(database_name, post_id);
				return await this.editPost(database_name, post_id, post_text);
			},
		},
		deletePost: {
			rest: "DELETE /",
			params: {
				database_name: { type: "string" },
				post_id: { type: "uuid" },
			},
			async handler(ctx) {
				const { database_name, post_id } = ctx.params;
				return await this.deletePost(database_name, post_id);
			},
		},
		getAttachments: {
			rest: "GET /attachments",
			params: {
				post_id: { type: "uuid" },
				database_name: { type: "string" },
			},
			async handler(ctx) {
				const { database_name, post_id } = ctx.params;
				await this.checkPostExists(database_name, post_id);
				return await this.getAttachments(database_name, post_id);
			},
		},
		addAttachmentToPost: {
			rest: "POST /attachments",
			params: {
				database_name: { type: "string" },
				post_id: { type: "string" },
				attachment_id: { type: "string" },
				attachment_filename: { type: "string" },
			},
			async handler(ctx) {
				const {
					database_name,
					attachment_id,
					post_id,
					attachment_filename,
				} = ctx.params;
				await this.checkPostExists(database_name, post_id);
				return await this.addAttachmentToPost(
					database_name,
					attachment_id,
					post_id,
					attachment_filename
				);
			},
		},
		deleteAttachmentFromPost: {
			rest: "DELETE /attachment",
			params: {
				database_name: { type: "string" },
				post_id: { type: "string" },
				attachment_filename: { type: "string" },
			},
			async handler(ctx) {
				const { database_name, post_id, attachment_filename } =
					ctx.params;
				//await this.checkPostExists(database_name, post_id);
				const attachmentsTable = database_name + "_attachments";
				console.log({ database_name, post_id, attachment_filename });
				try {
					await ctx.call("storage.deleteFile", {
						filename: attachment_filename,
					});
					await this.metadata.client.query(
						`
						DELETE FROM ${attachmentsTable} WHERE post_id_attachment = $1 AND attachment_filename = $2;`,
						[post_id, attachment_filename]
					);
					return "Deleted From DB and Storage";
				} catch (error) {
					console.log(error);
					return error;
				}
			},
		},
		publishPost: {
			rest: "POST /publish",
			params: {
				post_id: { type: "uuid" },
				database_name: { type: "string" },
			},
			async handler(ctx) {
				const { database_name, post_id } = ctx.params;
				try {
					const post = await this.getPost(database_name, post_id);
					const { post_text: text } = post[0];
					const attachments = await this.getAttachments(
						database_name,
						post_id
					);
					const mediaArray = attachments.map(
						(element) => element.attachment_filename
					);
					console.log({ text, mediaArray });
					await ctx.call("telegram.sendPost", { text, mediaArray });
					return mediaArray;
				} catch (error) {
					console.log("Error", error);
				}
			},
		},
		createDatabase: {
			rest: "POST /database",
			params: {
				dbname: { type: "string" },
			},
			async handler(ctx) {
				const { dbname } = ctx.params;
				const dbId = await this.createDatabase(dbname);
				return await this.getDatabase(dbId);
			},
		},
		getDatabases: {
			rest: "GET /databases",
			async handler(ctx) {
				const result = await this.getDatabases();
				return result;
			},
		},
		getDatabase: {
			rest: "GET /database/:id",
			params: {
				id: { type: "string" },
			},
			async handler(ctx) {
				const { id } = ctx.params;
				const result = await this.getDatabase(id);
				return result;
			},
		},
		deleteDatabase: {
			rest: "DELETE /database/:name",
			params: {
				name: { type: "string" },
			},
			async handler(ctx) {
				const { name } = ctx.params;
				const result = await this.deleteDatabase(name);
				return result;
			},
		},
	},
};

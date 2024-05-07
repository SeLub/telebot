// posts.service.js
const { Client } = require("pg");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { MoleculerError } = require("moleculer").Errors;
const csvParser = require("csv-parser");
const { Readable } = require("node:stream");

const pgConfig = {
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
};
const client = new Client(pgConfig);

//const notFoundError = (id) => { throw new MoleculerError(`Record with ${id} not found.`, 404, "ERR_NOTFOUND"); }

module.exports = {
	name: "posts",
	settings: {},
	async started() {
		try {
			await client.connect();
			await this.logger.info("Service 'posts' connected to DB");
			await this.createDatabaseTable();
			await this.logger.info("Table 'database' are created or exists.");
		} catch (err) {
			this.logger.error("Error in service 'posts':", err);
		}
	},
	methods: {
		async createDatabaseTable() {
			// Check if the "databases" table exists
			let res = await client.query(`
				SELECT EXISTS (
					SELECT FROM information_schema.tables 
					WHERE table_schema = 'public' 
					AND table_name = 'databases'
					);
				`);
			// If the "databases" table doesn't exist, create it
			if (!res.rows[0].exists) {
				await client.query(`
					CREATE TABLE databases (
						database_id UUID PRIMARY KEY,
						database_name TEXT
					);
			    `);
			}
		},
		async createDatabase(dbname) {
			const databaseId = uuidv4();
			const uniqueDatabaseName = dbname; // + "_" + databaseId;
			const postsTable = uniqueDatabaseName + "_posts";
			const attachmentsTable = uniqueDatabaseName + "_attachments";

			let created = false;

			// Check if the "post" table exists
			res = await client.query(`
				SELECT EXISTS (
					SELECT FROM information_schema.tables 
					WHERE table_schema = 'public' 
					AND table_name = '${postsTable}'
				);
				`);

			// If the "posts" table doesn't exist, create it
			if (!res.rows[0].exists) {
				await client.query(`
					CREATE TABLE ${postsTable} (
						post_id UUID PRIMARY KEY,
						post_text TEXT
					);
                `);
			}

			// Check if the "attachments" table exists
			res = await client.query(`
				SELECT EXISTS (
					SELECT FROM information_schema.tables 
					WHERE table_schema = 'public' 
					AND table_name = '${attachmentsTable}'
				);
            	`);

			// If the "attachments" table doesn't exist, create it
			if (!res.rows[0].exists) {
				created = true;
				await client.query(`
					CREATE TABLE ${attachmentsTable} (
						attachment_id UUID PRIMARY KEY,
						post_id_attachment UUID,
						attachment_filename TEXT,
						FOREIGN KEY (post_id_attachment) REFERENCES ${postsTable}(post_id)
					);
                		`);
				await client.query(`
                		INSERT INTO databases (database_id, database_name)
                		VALUES ('${databaseId}', '${uniqueDatabaseName}');
                	`);
			}
			return databaseId;
		},
		async getDatabases() {
			try {
				const res = await client.query(`
					SELECT * FROM databases;
				`);
				return res.rows;
			} catch (err) {
				return [];
			}
		},
		async getDatabase(database_id) {
			const res = await client.query(`
                  	SELECT * FROM databases WHERE database_id = '${database_id}';
            	`);
			return res.rows[0];
		},
		async deleteDatabase(database_id) {
			try {
				const { database_name } = await this.getDatabase(database_id);
				const postsTable = database_name + "_posts";
				const attachmentsTable = database_name + "_attachments";
				console.log(postsTable, attachmentsTable);
				await client.query(`
					DROP TABLE IF EXISTS ${attachmentsTable};
					`);
				await client.query(`
					DROP TABLE IF EXISTS ${postsTable};
					`);
				await client.query(`
					DELETE FROM databases WHERE database_id = '${database_id}';
					`);
				return true;
			} catch (err) {
				this.logger.error(
					`Error in method: 'posts.deleteDatabase' :\n ${err}`
				);
				return false;
			}
		},
		async checkPostExists(database_id, post_id) {
			const { database_name } = await this.getDatabase(database_id);
			const postsTable = database_name + "_posts";
			const attachmentsTable = database_name + "_attachments";
			const response1 = await client.query(`
				SELECT * FROM INFORMATION_SCHEMA.TABLES 
				WHERE TABLE_NAME LIKE '${postsTable}'`);
			const response2 = await client.query(`
				SELECT * FROM INFORMATION_SCHEMA.TABLES 
				WHERE TABLE_NAME LIKE '${attachmentsTable}'`);
			if (!response1.rowCount || !response2.rowCount)
				return Promise.reject(
					new MoleculerError("database not found!", 404)
				);
			const res = await client.query(
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
		async createPost(database_id, post_text) {
			const { database_name } = await this.getDatabase(database_id);
			const postsTable = database_name + "_posts";
			const post_id = uuidv4();
			await client.query(
				`
                		INSERT INTO ${postsTable} (post_id, post_text)
                		VALUES ($1, $2);`,
				[post_id, post_text]
			);
			return await this.getPost(database_id, post_id);
		},
		async getPosts(database_id) {
			const { database_name } = await this.getDatabase(database_id);
			const postsTable = database_name + "_posts";
			const res = await client.query(`
                    SELECT * FROM ${postsTable};
                `);
			return res.rows;
		},
		async getPost(database_id, post_id) {
			const { database_name } = await this.getDatabase(database_id);
			const postsTable = database_name + "_posts";
			await this.checkPostExists(database_id, post_id);
			const res = await client.query(
				`SELECT * FROM ${postsTable} WHERE post_id = $1;`,
				[post_id]
			);
			return res.rows;
		},
		async getFullPost(database_id, post_id) {
			const { database_name } = await this.getDatabase(database_id);
			const postArray = await this.getPost(database_id, post_id);
			const { post_text } = postArray[0];
			const attachments = await this.getAttachments(database_id, post_id);
			return {
				post_id,
				post_text,
				attachments,
			};
		},
		async editPost(database_id, post_id, post_text) {
			const { database_name } = await this.getDatabase(database_id);
			const postsTable = database_name + "_posts";
			await this.checkPostExists(database_id, post_id);
			await client.query(
				`
				UPDATE ${postsTable} SET post_text = $1 
				WHERE post_id = $2;`,
				[post_text, post_id]
			);
			return await this.getPost(database_id, post_id);
		},
		async deletePost(database_id, post_id) {
			const { database_name } = await this.getDatabase(database_id);
			const postsTable = database_name + "_posts";
			const attachmentsTable = database_name + "_attachments";
			try {
				await this.checkPostExists(database_id, post_id);
				await client.query(
					`DELETE FROM ${attachmentsTable} WHERE post_id_attachment = $1;`,
					[post_id]
				);
				await client.query(
					`DELETE FROM ${postsTable} WHERE post_id = $1;`,
					[post_id]
				);
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		async getAttachments(database_id, post_id) {
			const { database_name } = await this.getDatabase(database_id);
			const attachmentsTable = database_name + "_attachments";
			const res = await client.query(
				`
				SELECT * FROM ${attachmentsTable} WHERE post_id_attachment = $1;`,
				[post_id]
			);
			return res.rows;
		},
		async addAttachmentToPost(
			database_id,
			attachment_id,
			post_id,
			attachment_filename
		) {
			const { database_name } = await this.getDatabase(database_id);
			const attachmentsTable = database_name + "_attachments";
			try {
				await client.query(
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
		async fetchAndParseCSV(url) {
			try {
				// Fetch the CSV file from the server
				const response = await fetch(url);

				// Check if the response is OK
				if (!response.ok) {
					throw new Error(
						`Failed to fetch CSV: ${response.statusText}`
					);
				}

				// Create a readable stream from the response body
				const bodyStream = Readable.from(await response.text());

				// Create a promise to parse the CSV
				const csvData = new Promise((resolve, reject) => {
					const results = [];
					bodyStream
						.pipe(csvParser())
						.on("data", (data) => results.push(data))
						.on("end", () => resolve(results))
						.on("error", (error) => reject(error));
				});

				// Wait for the CSV to be parsed and return the array of objects
				return await csvData;
			} catch (error) {
				console.error("Error fetching or parsing CSV:", error);
				throw error; // You may handle this error according to your application's logic
			}
		},
		// authorize(ctx, route, req, res) {
		// 	// Read the token from header
		// 	let auth = req.headers["authorization"];
		// 	if (auth && auth.startsWith("Bearer")) {
		// 		let token = auth.slice(7);

		// 		// Check the token
		// 		if (token == "123456") {
		// 			// Set the authorized user entity to `ctx.meta`
		// 			ctx.meta.user = { id: 1, name: "John Doe" };
		// 			return Promise.resolve(ctx);
		// 		} else {
		// 			// Invalid token
		// 			return Promise.reject(
		// 				new E.UnAuthorizedError(E.ERR_INVALID_TOKEN)
		// 			);
		// 		}
		// 	} else {
		// 		// No token
		// 		return Promise.reject(new E.UnAuthorizedError(E.ERR_NO_TOKEN));
		// 	}
		// },
	},
	actions: {
		createPost: {
			rest: "POST /createPost",
			params: {
				database_id: { type: "uuid" },
				post_text: { type: "string" },
			},
			async handler(ctx) {
				const { database_id, post_text } = ctx.params;
				return await this.createPost(database_id, post_text);
			},
		},
		getPosts: {
			rest: "GET /:database_id",
			params: {
				database_id: { type: "uuid" },
			},
			async handler(ctx) {
				const { database_id } = ctx.params;
				return await this.getPosts(database_id);
			},
		},
		getPost: {
			rest: "GET /database/:database_id/post/:post_id",
			params: {
				post_id: { type: "uuid" },
				database_id: { type: "uuid" },
			},
			async handler(ctx) {
				const { database_id, post_id } = ctx.params;
				return await this.getPost(database_id, post_id);
			},
		},
		getFullPost: {
			rest: "GET /full",
			params: {
				post_id: { type: "uuid" },
				database_id: { type: "uuid" },
			},
			async handler(ctx) {
				const { database_id, post_id } = ctx.params;
				return await this.getFullPost(database_id, post_id);
			},
		},
		editPost: {
			rest: "PUT /editPost",
			params: {
				database_id: { type: "uuid" },
				post_id: { type: "uuid" },
				post_text: { type: "string" },
			},
			async handler(ctx) {
				const { database_id, post_id, post_text } = ctx.params;
				await this.checkPostExists(database_id, post_id);
				return await this.editPost(database_id, post_id, post_text);
			},
		},
		deletePost: {
			rest: "DELETE /",
			params: {
				database_id: { type: "uuid" },
				post_id: { type: "uuid" },
			},
			auth: false,
			async handler(ctx) {
				const { database_id, post_id } = ctx.params;
				return await this.deletePost(database_id, post_id);
			},
		},
		getAttachments: {
			rest: "GET /attachments",
			params: {
				post_id: { type: "uuid" },
				database_id: { type: "string" },
			},
			async handler(ctx) {
				const { database_id, post_id } = ctx.params;
				await this.checkPostExists(database_id, post_id);
				return await this.getAttachments(database_id, post_id);
			},
		},
		addAttachmentToPost: {
			rest: "POST /attachments",
			params: {
				database_id: { type: "uuid" },
				post_id: { type: "uuid" },
				attachment_id: { type: "string" },
				attachment_filename: { type: "string" },
			},
			async handler(ctx) {
				const {
					database_id,
					attachment_id,
					post_id,
					attachment_filename,
				} = ctx.params;
				await this.checkPostExists(database_id, post_id);
				return await this.addAttachmentToPost(
					database_id,
					attachment_id,
					post_id,
					attachment_filename
				);
			},
		},
		deleteAttachmentFromPost: {
			rest: "DELETE /attachment",
			params: {
				database_id: { type: "uuid" },
				post_id: { type: "uuid" },
				attachment_filename: { type: "string" },
			},
			async handler(ctx) {
				const { database_id, post_id, attachment_filename } =
					ctx.params;
				await this.checkPostExists(database_id, post_id);
				const { database_name } = await this.getDatabase(database_id);
				const attachmentsTable = database_name + "_attachments";
				console.log({ database_name, post_id, attachment_filename });
				try {
					await ctx.call("storage.deleteFile", {
						filename: attachment_filename,
					});
					await client.query(
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
				database_id: { type: "uuid" },
			},
			async handler(ctx) {
				const { database_id, post_id } = ctx.params;
				try {
					const post = await this.getPost(database_id, post_id);
					const { post_text: text } = post[0];
					const attachments = await this.getAttachments(
						database_id,
						post_id
					);
					const mediaArray = attachments.map(
						(element) => element.attachment_filename
					);
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
			rest: "DELETE /database/:database_id",
			params: {
				database_id: { type: "uuid" },
			},
			async handler(ctx) {
				const { database_id } = ctx.params;
				const result = await this.deleteDatabase(database_id);
				return result;
			},
		},
		import: {
			rest: "POST /import",
			params: {
				database_id: { type: "uuid" },
				import_file: { type: "string" },
			},
			async handler(ctx) {
				const { database_id, import_file } = ctx.params;
				const { presignedURL } = await ctx.call("storage.getUrl", {
					file: import_file,
					folder: "import",
				});
				await this.fetchAndParseCSV(presignedURL)
					.then((data) => {
						console.log("Parsed CSV data:", data);
						data.forEach((row) => {
							this.createPost(database_id, row.post_text);
						});
					})
					.catch((error) => {
						console.error("Error:", error);
					});
			},
		},
	},
};

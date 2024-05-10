const { Client } = require("pg");
const { v4: uuidv4 } = require("uuid");
const { Telegraf } = require("telegraf");
require("dotenv").config();

module.exports = {
	name: "bots",
	dependencies: ["posts"],
	settings: {
		authorization: true,
	},
	bots: {},
	async started(ctx) {
		this.storagePath =
			process.env.STORAGE_ENDPOINT +
			"/" +
			process.env.STORAGE_BUCKET_NAME +
			"/" +
			process.env.STORAGE_ATTACHMENTS_FOLDER +
			"/";
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
		await this.createBotsTable();
		const bots = await this.getBots();

		//console.log("BBBBBBOOOOOTS ", bots);

		for (const bot of await bots.rows) {
			const { bot_id: db_id, bot_name: db_name, bot_token } = bot;

			const bot_instance = new Telegraf(bot_token);

			await bot_instance.telegram.getMe().then((bot_info) => {
				const { username, id, first_name } = bot_info;
				const bot = Object.assign(
					{},
					{
						db_name,
						db_id,
						bot_token,
						bot_instance,
						username,
						id,
						first_name,
					}
				);

				this.bots = { ...this.bots, [db_name]: bot };
			});
		}
	},
	methods: {
		isArrayEmpty(arr) {
			return Array.isArray(arr) && arr.length === 0 ? true : false;
		},
		cleanTextFromUnsupportedHTMLtag(text) {
			return (
				text
					.replace(/<code>/gm, "<pre>")
					.replace(/<\/code>/gm, "</pre>")
					// .replace(/<p><\/p>/gm, "\n")
					.replace(/<\/pre>[<p><\/p>n]*<pre>/gm, "\n")
					.replace(/<p>|<ol>|<\/ol>|<\/li>|<ul>|<\/ul>/gm, "")
					.replace(/<\/p>|<br>/gm, "\n")
					.replace(/<\/p>|<li>/gm, "- ")
					.replace(/<strong>/gm, "<b>")
					.replace(/<\/strong>/gm, "</b>")
					.replace(/rel="noopener noreferrer nofollow" /gm, "")
			);
		},
		async createBotsTable() {
			let created = false;
			try {
				const botsTable = "bots";

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
					created = true;
					return created;
				}
			} catch (err) {
				this.logger.error(
					`Error creating tables in PostgreSQL:\n ${err}`
				);
				return created;
			}
		},
		getBots() {
			return this.metadata.client.query(`
				SELECT * FROM bots;
			`);
		},
		getBot(bot_name) {
			return this.metadata.client.query(`
				SELECT * FROM bots WHERE bot_name = '${bot_name}';
			`);
		},
		async createBot(bot_id, bot_name, bot_token) {
			try {
				await this.metadata.client.query(`
					INSERT INTO bots (bot_id, bot_name, bot_token)
					VALUES ('${bot_id}', '${bot_name}', '${bot_token}');				
				`);
				return true;
			} catch (err) {
				this.logger.error(`Error creating bot in PostgreSQL:\n ${err}`);
				return false;
			}
		},
		async deleteBot(bot_name) {
			try {
				const res = await this.getBot(bot_name);
				if (res.rows.length === 0) {
					return false;
				}
				await this.metadata.client.query(`
					DELETE FROM bots WHERE bot_name = '${bot_name}';
				`);
				return true;
			} catch (err) {
				this.logger.error(`Error deleting bot in PostgreSQL:\n ${err}`);
				return false;
			}
		},
		getMediaContentType(fileName) {
			const ext = "." + fileName.toLowerCase().split(".").pop();
			switch (ext) {
				case ".jpg":
				case ".jpeg":
				case ".png":
				case ".webp":
				case ".gif":
					return "photo";
				case ".csv":
				case ".txt":
				case ".doc":
				case ".pdf":
				case ".xls":
				case ".xlsx":
					return "document";
				//case ".avi":
				case ".mp4":
				//case ".mpeg":
				case ".webm":
					return "video";
				case ".mp3":
					return "audio";
				default:
					throw new Error("Unsupported file type");
			}
		},
		composeMediaGroup(text, mediaArray) {
			let mediaPhotosAndVideos = [];
			let mediaDocuments = [];
			let mediaAudios = [];
			const addTextToMediaGroup = (text) => {
				let capthionAdded = false;

				if (mediaPhotosAndVideos[0] !== undefined) {
					mediaPhotosAndVideos[0]["caption"] = text;
					capthionAdded = true;
				}

				if (mediaDocuments[0] !== undefined && !capthionAdded) {
					mediaDocuments[0]["caption"] = text;
					capthionAdded = true;
				}

				if (mediaAudios[0] !== undefined && !capthionAdded) {
					mediaAudios[0]["caption"] = text;
					capthionAdded = true;
				}
			};

			mediaArray.forEach((fileName) => {
				const type = this.getMediaContentType(fileName);
				switch (type) {
					case "photo":
						mediaPhotosAndVideos.push({
							type: "photo",
							media: this.storagePath + fileName,
							parse_mode: "HTML",
						});
						return;
					case "video":
						mediaPhotosAndVideos.push({
							type: "video",
							media: this.storagePath + fileName,
							parse_mode: "HTML",
						});
						return;
					case "document":
						mediaDocuments.push({
							type: "document",
							media: this.storagePath + fileName,
							parse_mode: "HTML",
						});
						return;
					case "audio":
						mediaAudios.push({
							type: "audio",
							media: this.storagePath + fileName,
							parse_mode: "HTML",
						});
						return;
					default:
						return;
				}
			});

			addTextToMediaGroup(text);
			const mediaGroup = [];
			if (mediaPhotosAndVideos.length > 0)
				mediaGroup.push(mediaPhotosAndVideos);
			if (mediaDocuments.length > 0) mediaGroup.push(mediaDocuments);
			if (mediaAudios.length > 0) mediaGroup.push(mediaAudios);
			return mediaGroup;
		},
	},
	actions: {
		getBots: {
			rest: "GET /",
			auth: true,
			async handler(ctx) {
				const res = await this.getBots();
				return res.rows;
			},
		},
		getBot: {
			rest: "GET /:bot_name",
			params: {
				bot_name: { type: "string" },
			},
			async handler(ctx) {
				const { bot_name } = ctx.params;
				const res = await this.getBot(bot_name);
				return res.rows;
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
				let message = "Bot already exists.";
				// Check bot already exists
				const bot = await this.getBot(bot_name);
				const data = bot["rows"][0];

				const alreadyExists = bot.rows.length !== 0;

				if (alreadyExists) {
					ctx.meta.$statusCode = 403;
					return { message, data };
				}
				// Create bot
				const res = await this.createBot(bot_id, bot_name, bot_token);
				if (res) {
					ctx.meta.$statusCode = 201;
					const bot = await this.getBot(bot_name);
					const data = bot["rows"][0];
					message = "Bot created successfully.";
					return { message, data };
				} else {
					ctx.meta.$statusCode = 500;
					message = "Error creating bot.";
					return { message };
				}
			},
		},
		deleteBot: {
			rest: "DELETE /:bot_name",
			params: {
				bot_name: { type: "string" },
			},
			async handler(ctx) {
				const { bot_name } = ctx.params;
				let message = "Bot not found.";
				// Check bot already exists
				const bot = await this.getBot(bot_name);
				const alreadyExists = bot.rows.length !== 0;

				if (!alreadyExists) {
					ctx.meta.$statusCode = 404;
					return { message };
				}

				const res = await this.deleteBot(bot_name);

				if (res) {
					ctx.meta.$statusCode = 200;
					message = "Bot deleted successfully";
				} else {
					ctx.meta.$statusCode = 500;
					message = "Error deleting bot.";
				}
				return { message };
			},
		},
		getMe: {
			rest: "GET /getMe",
			params: {
				bot_name: { type: "string" },
			},
			async handler(ctx) {
				const { bot_name } = ctx.params;
				if (!this.bots.hasOwnProperty([bot_name])) {
					ctx.meta.$statusCode = 404;
					return { message: "Bot not found." };
				} else {
					ctx.meta.$statusCode = 200;
					return {
						...this.bots[bot_name],
						bot_instance: "<<...hidden...>>",
					};
				}
			},
		},
		sendMessage: {
			rest: "POST /sendMessage",
			params: {
				bot_name: { type: "string" },
				post_id: { type: "uuid" },
				database_id: { type: "string" },
				channel_id: { type: "string" },
			},
			async handler(ctx) {
				const { bot_name, post_id, database_id, channel_id } =
					ctx.params;

				const bot = this.bots[bot_name]?.bot_instance;
				if (!bot) {
					ctx.meta.$statusCode = 404;
					return { message: "Bot not found." };
				}

				const { post_text, attachments } = await ctx.call(
					"posts.getFullPost",
					{
						database_id,
						post_id,
					}
				);

				const cleanText =
					this.cleanTextFromUnsupportedHTMLtag(post_text);

				const sendJustText = this.isArrayEmpty(attachments);

				if (sendJustText) {
					const result = bot.telegram.sendMessage(
						channel_id,
						cleanText,
						{ parse_mode: "HTML" }
					);
					return result;
				} else {
					const media = attachments.map(
						(attachment) => attachment.attachment_filename
					);
					const mediaGroup = await this.composeMediaGroup(
						cleanText,
						media
					);
					console.log("mediaGroep ", mediaGroup);
					const res = await mediaGroup.map((media) => {
						return bot.telegram.sendMediaGroup(channel_id, media);
					});
					return res;
				}
			},
		},
	},
};

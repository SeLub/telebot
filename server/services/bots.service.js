const { Client } = require("pg");
const { v4: uuidv4 } = require("uuid");
const { Telegraf } = require("telegraf");
require("dotenv").config();
const Sequelize = require("sequelize");

const DbService = require("../mixins/db.sql.mixin");
const CacheCleaner = require("../mixins/cache.cleaner.mixin");

module.exports = {
	name: "bots",
	settings: {
		authorization: false,
	},
	mixins: [DbService(), CacheCleaner(["bots"])],
	model: {
		name: "bots",
		define: {
			bot_id: {
				primaryKey: true,
				type: Sequelize.UUID,
			},
			bot_name: Sequelize.STRING,
			bot_token: Sequelize.STRING,
		},
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
			authorization: false,
			async handler(ctx) {
				return this.adapter.find();
			},
		},
		getById: {
			rest: "GET /:id",
			authorization: true,
			params: {
				id: { type: "string" },
			},
			async handler(ctx) {
				const { id } = ctx.params;
				const res = [];
				const bot = await this.adapter.findOne({
					where: { bot_id: id },
				});
				if (bot !== null) {
					res.push(bot);
				}
				return res;
			},
		},
		getByName: {
			rest: "GET /",
			params: {
				bot_name: { type: "string" },
			},
			async handler(ctx) {
				const { bot_name } = ctx.params;
				const res = [];
				const bot = await this.adapter.find({
					where: { bot_name },
				});
				if (!bot) {
					res.push(bot);
				}
				return res;
			},
		},
		create: {
			rest: "POST /",
			params: {
				bot_name: { type: "string" },
				bot_token: { type: "string" },
			},
			async handler(ctx) {
				const { bot_name, bot_token } = ctx.params;

				// Check bot already exists
				const exists = await this.adapter.findOne({
					where: { bot_name },
				});

				let message = "Bot already exists.";

				if (!!exists) {
					ctx.meta.$statusCode = 403;
					return { message, data: exists };
				}
				// Create bot
				const bot_id = uuidv4();
				const res = await this.adapter.insert({
					bot_id,
					bot_name,
					bot_token,
				});

				if (res) {
					ctx.meta.$statusCode = 201;
					message = "Bot created successfully.";
					const newBot = await this.adapter.find({ bot_name });
					return { message, data: newBot };
				} else {
					ctx.meta.$statusCode = 500;
					message = "Error creating bot.";
					return { message };
				}
			},
		},
		// delete: {
		// 	rest: "DELETE /:bot_name",
		// 	params: {
		// 		bot_name: { type: "string" },
		// 	},
		// 	async handler(ctx) {
		// 		const { bot_name } = ctx.params;
		// 		let message = "Bot not found.";
		// 		// Check bot already exists
		// 		const bot = await this.getBot(bot_name);
		// 		const alreadyExists = bot.rows.length !== 0;

		// 		if (!alreadyExists) {
		// 			ctx.meta.$statusCode = 404;
		// 			return { message };
		// 		}

		// 		const res = await this.deleteBot(bot_name);

		// 		if (res) {
		// 			ctx.meta.$statusCode = 200;
		// 			message = "Bot deleted successfully";
		// 		} else {
		// 			ctx.meta.$statusCode = 500;
		// 			message = "Error deleting bot.";
		// 		}
		// 		return { message };
		// 	},
		// },
		// getMe: {
		// 	rest: "GET /getMe",
		// 	params: {
		// 		bot_name: { type: "string" },
		// 	},
		// 	async handler(ctx) {
		// 		const { bot_name } = ctx.params;
		// 		if (!this.bots.hasOwnProperty([bot_name])) {
		// 			ctx.meta.$statusCode = 404;
		// 			return { message: "Bot not found." };
		// 		} else {
		// 			ctx.meta.$statusCode = 200;
		// 			return {
		// 				...this.bots[bot_name],
		// 				bot_instance: "<<...hidden...>>",
		// 			};
		// 		}
		// 	},
		// },
		// sendMessage: {
		// 	rest: "POST /sendMessage",
		// 	params: {
		// 		bot_name: { type: "string" },
		// 		post_id: { type: "uuid" },
		// 		database_name: { type: "string" },
		// 		channel_id: { type: "string" },
		// 	},
		// 	async handler(ctx) {
		// 		const { bot_name, post_id, database_name, channel_id } =
		// 			ctx.params;

		// 		const bot = this.bots[bot_name]?.bot_instance;
		// 		if (!bot) {
		// 			ctx.meta.$statusCode = 404;
		// 			return { message: "Bot not found." };
		// 		}

		// 		const { post_text, attachments } = await ctx.call(
		// 			"posts.getFullPost",
		// 			{
		// 				database_name,
		// 				post_id,
		// 			}
		// 		);

		// 		const cleanText =
		// 			this.cleanTextFromUnsupportedHTMLtag(post_text);

		// 		const sendJustText = this.isArrayEmpty(attachments);

		// 		if (sendJustText) {
		// 			const result = bot.telegram.sendMessage(
		// 				channel_id,
		// 				cleanText,
		// 				{ parse_mode: "HTML" }
		// 			);
		// 			return result;
		// 		} else {
		// 			const media = attachments.map(
		// 				(attachment) => attachment.attachment_filename
		// 			);
		// 			const mediaGroup = await this.composeMediaGroup(
		// 				cleanText,
		// 				media
		// 			);
		// 			console.log("mediaGroep ", mediaGroup);
		// 			const res = await mediaGroup.map((media) => {
		// 				return bot.telegram.sendMediaGroup(channel_id, media);
		// 			});
		// 			return res;
		// 		}
		// 	},
		// },
	},
};

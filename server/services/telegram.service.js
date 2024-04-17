const { Telegraf } = require("telegraf");
require("dotenv").config();

module.exports = {
	name: "telegram",
	async started() {
		const token = process.env.TELEGRAM_BOT_TOKEN;
		this.metadata.chatId = process.env.TELEGRAM_CHAT_ID;
		this.storagePath =
			process.env.STORAGE_ENDPOINT +
			"/" +
			process.env.STORAGE_BUCKET_NAME +
			"/" +
			process.env.STORAGE_ATTACHMENTS_FOLDER +
			"/";
		this.bot = new Telegraf(token);
		this.bot.launch();

		// Enable graceful stop
		process.once("SIGINT", () => this.bot.stop("SIGINT"));
		process.once("SIGTERM", () => this.bot.stop("SIGTERM"));
	},
	methods: {
		isArrayEmpty(arr) {
			return Array.isArray(arr) && arr.length === 0 ? true : false;
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
			this.metadata.mediaPhotosAndVideos = [];
			this.metadata.mediaDocuments = [];
			this.metadata.mediaAudios = [];

			mediaArray.forEach((fileName) => {
				const type = this.getMediaContentType(fileName);
				switch (type) {
					case "photo":
						this.metadata.mediaPhotosAndVideos.push({
							type: "photo",
							media: this.storagePath + fileName,
							parse_mode: "HTML",
						});
						return;
					case "video":
						this.metadata.mediaPhotosAndVideos.push({
							type: "video",
							media: this.storagePath + fileName,
							parse_mode: "HTML",
						});
						return;
					case "document":
						this.metadata.mediaDocuments.push({
							type: "document",
							media: this.storagePath + fileName,
							parse_mode: "HTML",
						});
						return;
					case "audio":
						this.metadata.mediaAudios.push({
							type: "audio",
							media: this.storagePath + fileName,
							parse_mode: "HTML",
						});
						return;
					default:
						return;
				}
			});

			this.addTextToMediaGroup(text);
			const mediaGroup = [];
			if (this.metadata.mediaPhotosAndVideos.length > 0)
				mediaGroup.push(this.metadata.mediaPhotosAndVideos);
			if (this.metadata.mediaDocuments.length > 0)
				mediaGroup.push(this.metadata.mediaDocuments);
			if (this.metadata.mediaAudios.length > 0)
				mediaGroup.push(this.metadata.mediaAudios);
			return mediaGroup;
		},
		addTextToMediaGroup(text) {
			let capthionAdded = false;
			if (this.metadata.mediaPhotosAndVideos[0] !== undefined) {
				this.metadata.mediaPhotosAndVideos[0]["caption"] = text;
				capthionAdded = true;
			}

			if (
				this.metadata.mediaDocuments[0] !== undefined &&
				!capthionAdded
			) {
				this.metadata.mediaDocuments[0]["caption"] = text;
				capthionAdded = true;
			}

			if (this.metadata.mediaAudios[0] !== undefined && !capthionAdded) {
				this.metadata.mediaAudios[0]["caption"] = text;
				capthionAdded = true;
			}
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
	},
	actions: {
		getMe() {
			return this.bot.telegram.getMe();
		},
		async sendPost(ctx) {
			const { text, mediaArray } = ctx.params;
			console.log("mediaArray ", Array.isArray(mediaArray));
			this.metadata.text = this.cleanTextFromUnsupportedHTMLtag(text);

			const sendJustText = this.isArrayEmpty(mediaArray);

			let status = "",
				message = "";

			if (sendJustText) {
				this.bot.telegram
					.sendMessage(this.metadata.chatId, this.metadata.text, {
						parse_mode: "HTML",
					})
					.then((result) => {
						console.log("result ", result);
						status = 200;
						message = "OK";
					})
					.catch((err) => {
						if (!err.response.ok) {
							status = 500;
							message = err.response.description;
						}
					})
					.finally(() => {
						console.log("status ", status);
						console.log("message ", message);
						return { status, message };
					});
			} else {
				this.metadata.mediaArray = mediaArray;

				this.metadata.mediaGroup = await this.composeMediaGroup(
					this.metadata.text,
					this.metadata.mediaArray
				);

				this.metadata.mediaGroup.map((media) => {
					this.bot.telegram.sendMediaGroup(
						this.metadata.chatId,
						media
					);
					// .then((result) => {
					// 	//console.log("result ", result);
					// 	status = 200;
					// 	message = "OK";
					// })
					// .catch((err) => {
					// 	if (!err.response.ok) {
					// 		status = 500;
					// 		message = err.response.description;
					// 	}
					// })
					// .finally(() => {
					// 	//console.log("status ", status);
					// 	//console.log("message ", message);
					// 	return { status, message };
					// });
				});

				return { status, message };
			}
		},
	},
};

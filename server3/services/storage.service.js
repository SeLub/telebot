const {
	S3Client,
	ListBucketsCommand,
	PutObjectCommand,
	DeleteObjectCommand,
	ListObjectsV2Command,
	GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();

const credentials = {
	accessKeyId: process.env.STORAGE_ACCESS_KEY_ID,
	secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY,
};

const Bucket = process.env.STORAGE_BUCKET_NAME;

// Create an S3 service client object.
const s3Client = new S3Client({
	endpoint: process.env.STORAGE_ENDPOINT,
	credentials: credentials,
	region: "global",
});

module.exports = {
	name: "storage",
	settings: {},
	methods: {
		// Function to get the content type of the file
		getImageContentType(filePath) {
			const ext = "." + filePath.toLowerCase().split(".").pop();
			switch (ext) {
				case ".jpg":
				case ".jpeg":
					return "image/jpeg";
				case ".gif":
					return "image/gif";
				case ".png":
					return "image/png";
				case ".csv":
					return "text/csv";
				case ".txt":
					return "text/plain";
				case ".doc":
					return "application/msword";
				case ".pdf":
					return "application/pdf";
				case ".avi":
					return "video/x-msvideo";
				case ".mp3":
					return "audio/mp3";
				case ".mp4":
					return "video/mp4";
				case ".mpeg":
					return "video/mpeg";
				case ".webp":
					return "image/webp";
				case ".webm":
					return "video/webm";
				case ".xls":
				case ".xlsx":
					return "application/vnd.ms-excel";
				default:
					throw new Error("Unsupported file type");
			}
		},
	},
	actions: {
		async listBuckets() {
			// List buckets
			const buckets_data = await s3Client.send(
				new ListBucketsCommand({})
			);
			console.log(buckets_data?.Buckets);
		},
		async listFiles() {
			const command = new ListObjectsV2Command({
				Bucket,
				MaxKeys: 2,
			});

			try {
				let isTruncated = true;

				console.log("Your bucket contains the following objects:\n");
				let contents = [];

				const { Contents } = await s3Client.send(command);
				console.log(Contents);
				return Contents;
			} catch (err) {
				console.error(err);
			}
		},
		getUrl: {
			rest: "GET /geturl",
			params: {
				file: { type: "string" },
			},
			async handler(ctx) {
				const { file } = ctx.params;

				const fileNameWithPath = `images/${decodeURIComponent(file)}`;
				const ContentType = this.getImageContentType(fileNameWithPath);

				const commandParams = {
					Bucket,
					Key: fileNameWithPath,
					//ContentType, // Set the content type here
					ACL: "public-read",
				};

				const putCommand = new PutObjectCommand(commandParams);

				try {
					const presignedURL = await getSignedUrl(
						s3Client,
						putCommand,
						{ expiresIn: 3600 }
					);
					return { presignedURL };
				} catch (error) {
					console.log("Error during presigned URL", error);
				}
			},
		},
		deleteFile: {
			rest: "DELETE /file/",
			params: {
				filename: { type: "string" },
			},
			async handler(ctx) {
				const { filename } = ctx.params;

				const fileNameWithPath = `images/${decodeURIComponent(
					filename
				)}`;

				const commandParams = {
					Bucket,
					Key: fileNameWithPath,
					Condition: {
						StringEquals: {
							"x-amz-acl": "bucket-owner-full-control",
						},
					},
				};
				try {
					const deleteCommand = new DeleteObjectCommand(
						commandParams
					);
					const data = await s3Client.send(deleteCommand);
					return data; // For unit tests.
				} catch (error) {
					console.log("Error:", error);
				}
			},
		},
	},
};

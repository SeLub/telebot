const mediaSchema = {
    type: "object",
    required: ["type", "url"],
    properties: {
        type: { type: "string", enum: ["image", "video", "document", "audio"] },
        url: { type: "string" },
    },
};
export const postSchema = {
    getAll: {
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        post_id: { type: "string" },
                        postline_id: { type: "string" },
                        text: { type: "string" },
                        media: { type: "array", items: mediaSchema },
                        created_at: { type: "string", format: "date-time" },
                        updated_at: { type: "string", format: "date-time" },
                    },
                },
            },
        },
    },
    create: {
        body: {
            type: "object",
            required: ["postline_id"],
            properties: {
                postline_id: { type: "string" },
                text: { type: "string" },
                media: { type: "array", items: mediaSchema },
            },
        },
    },
};

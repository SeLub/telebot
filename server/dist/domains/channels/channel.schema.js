export const channelSchema = {
    getAll: {
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        channel_id: { type: "string" },
                        name: { type: "string" },
                        logo_image: { type: "string", nullable: true },
                        description: { type: "string", nullable: true },
                        members_count: { type: "number" },
                        language: { type: "string" },
                        user_id: { type: "string" },
                    },
                },
            },
        },
    },
    create: {
        body: {
            type: "object",
            required: ["name", "user_id"],
            properties: {
                name: { type: "string" },
                logo_image: { type: "string" },
                description: { type: "string" },
                language: { type: "string" },
                user_id: { type: "string" },
            },
        },
    },
};

export const botSchema = {
  getAll: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            bot_id: { type: "string" },
            name: { type: "string" },
            logo_image: { type: "string", nullable: true },
            description: { type: "string", nullable: true },
            bot_token: { type: "string" },
            user_id: { type: "string" },
          },
        },
      },
    },
  },
  create: {
    body: {
      type: "object",
      required: ["name", "bot_token", "user_id"],
      properties: {
        name: { type: "string" },
        logo_image: { type: "string" },
        description: { type: "string" },
        bot_token: { type: "string" },
        user_id: { type: "string" },
      },
    },
  },
};

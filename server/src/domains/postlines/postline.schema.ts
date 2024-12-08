export const postlineSchema = {
  getAll: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            postline_id: { type: "string" },
            name: { type: "string" },
            description: { type: "string", nullable: true },
            status: { type: "string", enum: ["active", "inactive", "deleted"] },
            last_updated: { type: "string", format: "date-time" },
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
        description: { type: "string" },
        status: { type: "string", enum: ["active", "inactive", "deleted"] },
        user_id: { type: "string" },
      },
    },
  },
};

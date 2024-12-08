export const subscriptionSchema = {
  getAll: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            subscription_id: { type: "string" },
            user_id: { type: "string" },
            plan: { type: "string", enum: ["free", "premium"] },
            start_date: { type: "string", format: "date-time" },
            end_date: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  // Add other validation schemas
};

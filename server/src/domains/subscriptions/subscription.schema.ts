export const subscriptionSchema = {
  // GET /subscriptions
  getAll: {
    tags: ['Subscriptions'],
    summary: 'Get all subscriptions',
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            subscription_id: { type: 'string' },
            user_id: { type: 'string' },
            plan: { type: 'string', enum: ['free', 'premium'] },
            start_date: { type: 'string', format: 'date-time' },
            end_date: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  },

  // GET /subscriptions/:id
  getOne: {
    tags: ['Subscriptions'],
    summary: 'Get subscription by ID',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Subscription ID' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          subscription_id: { type: 'string' },
          user_id: { type: 'string' },
          plan: { type: 'string', enum: ['free', 'premium'] },
          start_date: { type: 'string', format: 'date-time' },
          end_date: { type: 'string', format: 'date-time' }
        }
      }
    }
  },

  // POST /subscriptions
  create: {
    tags: ['Subscriptions'],
    summary: 'Create new subscription',
    body: {
      type: 'object',
      required: ['user_id', 'plan', 'start_date', 'end_date'],
      properties: {
        user_id: { type: 'string' },
        plan: { type: 'string', enum: ['free', 'premium'] },
        start_date: { type: 'string', format: 'date-time' },
        end_date: { type: 'string', format: 'date-time' }
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          subscription_id: { type: 'string' },
          user_id: { type: 'string' },
          plan: { type: 'string', enum: ['free', 'premium'] },
          start_date: { type: 'string', format: 'date-time' },
          end_date: { type: 'string', format: 'date-time' }
        }
      }
    }
  },

  // PUT /subscriptions/:id
  update: {
    tags: ['Subscriptions'],
    summary: 'Update subscription',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Subscription ID' }
      }
    },
    body: {
      type: 'object',
      properties: {
        user_id: { type: 'string' },
        plan: { type: 'string', enum: ['free', 'premium'] },
        start_date: { type: 'string', format: 'date-time' },
        end_date: { type: 'string', format: 'date-time' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          subscription_id: { type: 'string' },
          user_id: { type: 'string' },
          plan: { type: 'string', enum: ['free', 'premium'] },
          start_date: { type: 'string', format: 'date-time' },
          end_date: { type: 'string', format: 'date-time' }
        }
      }
    }
  },

  // DELETE /subscriptions/:id
  delete: {
    tags: ['Subscriptions'],
    summary: 'Delete subscription',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Subscription ID' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  }
};

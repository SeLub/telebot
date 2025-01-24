export const botSchema = {
  // Common properties schema
  botProperties: {
    type: 'object',
    properties: {
      bot_id: { type: 'string' },
      name: { type: 'string' },
      logo_image: { type: 'string', nullable: true },
      description: { type: 'string', nullable: true },
      bot_token: { type: 'string' },
      user_id: { type: 'string' }
    }
  },

  // GET /bots
  getAll: {
    tags: ['Bots'],
    summary: 'Get all bots',
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            bot_id: { type: 'string' },
            name: { type: 'string' },
            logo_image: { type: 'string', nullable: true },
            description: { type: 'string', nullable: true },
            bot_token: { type: 'string' },
            user_id: { type: 'string' }
          }
        }
      }
    }
  },

  // GET /bots/:id
  getOne: {
    tags: ['Bots'],
    summary: 'Get bot by ID',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Bot ID' }
      }
    },
    response: {
      200: {
        $ref: '#/botProperties'
      }
    }
  },

  // POST /bots
  create: {
    tags: ['Bots'],
    summary: 'Create new bot',
    body: {
      type: 'object',
      required: ['name', 'bot_token', 'user_id'],
      properties: {
        name: { type: 'string' },
        logo_image: { type: 'string' },
        description: { type: 'string' },
        bot_token: { type: 'string' },
        user_id: { type: 'string' }
      }
    },
    response: {
      201: {
        $ref: '#/botProperties'
      }
    }
  },

  // PUT /bots/:id
  update: {
    tags: ['Bots'],
    summary: 'Update bot',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Bot ID' }
      }
    },
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        logo_image: { type: 'string' },
        description: { type: 'string' },
        bot_token: { type: 'string' },
        user_id: { type: 'string' }
      }
    },
    response: {
      200: {
        $ref: '#/botProperties'
      }
    }
  },

  // DELETE /bots/:id
  delete: {
    tags: ['Bots'],
    summary: 'Delete bot',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Bot ID' }
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

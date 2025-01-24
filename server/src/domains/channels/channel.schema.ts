export const channelSchema = {
  // Common properties schema
  channelProperties: {
    type: 'object',
    properties: {
      channel_id: { type: 'string' },
      name: { type: 'string' },
      logo_image: { type: 'string', nullable: true },
      description: { type: 'string', nullable: true },
      members_count: { type: 'number' },
      language: { type: 'string' },
      user_id: { type: 'string' }
    }
  },

  // GET /channels
  getAll: {
    tags: ['Channels'],
    summary: 'Get all channels',
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            channel_id: { type: 'string' },
            name: { type: 'string' },
            logo_image: { type: 'string', nullable: true },
            description: { type: 'string', nullable: true },
            members_count: { type: 'number' },
            language: { type: 'string' },
            user_id: { type: 'string' }
          }
        }
      }
    }
  },

  // GET /channels/:id
  getOne: {
    tags: ['Channels'],
    summary: 'Get channel by ID',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Channel ID' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          channel_id: { type: 'string' },
          name: { type: 'string' },
          logo_image: { type: 'string', nullable: true },
          description: { type: 'string', nullable: true },
          members_count: { type: 'number' },
          language: { type: 'string' },
          user_id: { type: 'string' }
        }
      }
    }
  },

  // POST /channels
  create: {
    tags: ['Channels'],
    summary: 'Create new channel',
    body: {
      type: 'object',
      required: ['name', 'user_id'],
      properties: {
        name: { type: 'string' },
        logo_image: { type: 'string' },
        description: { type: 'string' },
        language: { type: 'string' },
        user_id: { type: 'string' }
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          channel_id: { type: 'string' },
          name: { type: 'string' },
          logo_image: { type: 'string', nullable: true },
          description: { type: 'string', nullable: true },
          members_count: { type: 'number' },
          language: { type: 'string' },
          user_id: { type: 'string' }
        }
      }
    }
  },

  // PUT /channels/:id
  update: {
    tags: ['Channels'],
    summary: 'Update channel',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Channel ID' }
      }
    },
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        logo_image: { type: 'string' },
        description: { type: 'string' },
        language: { type: 'string' },
        user_id: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          channel_id: { type: 'string' },
          name: { type: 'string' },
          logo_image: { type: 'string', nullable: true },
          description: { type: 'string', nullable: true },
          members_count: { type: 'number' },
          language: { type: 'string' },
          user_id: { type: 'string' }
        }
      }
    }
  },

  // DELETE /channels/:id
  delete: {
    tags: ['Channels'],
    summary: 'Delete channel',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Channel ID' }
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

export const postlineSchema = {
  // Common properties schema
  postlineProperties: {
    type: 'object',
    properties: {
      postline_id: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string', nullable: true },
      status: { type: 'string', enum: ['active', 'inactive', 'deleted'] },
      last_updated: { type: 'string', format: 'date-time' },
      user_id: { type: 'string' }
    }
  },

  // GET /postlines
  getAll: {
    tags: ['Postlines'],
    summary: 'Get all postlines',
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            postline_id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string', nullable: true },
            status: { type: 'string', enum: ['active', 'inactive', 'deleted'] },
            last_updated: { type: 'string', format: 'date-time' },
            user_id: { type: 'string' }
          }
        }
      }
    }
  },

  // GET /postlines/:id
  getOne: {
    tags: ['Postlines'],
    summary: 'Get postline by ID',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Postline ID' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          postline_id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string', nullable: true },
          status: { type: 'string', enum: ['active', 'inactive', 'deleted'] },
          last_updated: { type: 'string', format: 'date-time' },
          user_id: { type: 'string' }
        }
      }
    }
  },

  // POST /postlines
  create: {
    tags: ['Postlines'],
    summary: 'Create new postline',
    body: {
      type: 'object',
      required: ['name', 'user_id'],
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        status: { type: 'string', enum: ['active', 'inactive', 'deleted'] },
        user_id: { type: 'string' }
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          postline_id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string', nullable: true },
          status: { type: 'string', enum: ['active', 'inactive', 'deleted'] },
          last_updated: { type: 'string', format: 'date-time' },
          user_id: { type: 'string' }
        }
      }
    }
  },

  // PUT /postlines/:id
  update: {
    tags: ['Postlines'],
    summary: 'Update postline',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Postline ID' }
      }
    },
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        status: { type: 'string', enum: ['active', 'inactive', 'deleted'] },
        user_id: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          postline_id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string', nullable: true },
          status: { type: 'string', enum: ['active', 'inactive', 'deleted'] },
          last_updated: { type: 'string', format: 'date-time' },
          user_id: { type: 'string' }
        }
      }
    }
  },

  // DELETE /postlines/:id
  delete: {
    tags: ['Postlines'],
    summary: 'Delete postline',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Postline ID' }
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

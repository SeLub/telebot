export const planSchema = {
  getAll: {
    tags: ['Plans'],
    summary: 'Get all plans',
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            code: { 
              type: 'string',
              enum: ['free', 'personal', 'teams']
            },
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            max_users: { type: ['number', 'null'] },
            features: { 
              type: 'array',
              items: { type: 'string' }
            },
            allowed_roles: {
              type: 'array',
              items: { type: 'string' }
            },
            is_active: { type: 'boolean' }
          }
        }
      }
    }
  },

  getOne: {
    tags: ['Plans'],
    summary: 'Get plan by ID',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Plan ID' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          code: { 
            type: 'string',
            enum: ['free', 'personal', 'teams']
          },
          max_users: { type: ['number', 'null'] },
          features: { 
            type: 'array',
            items: { type: 'string' }
          },
          description: { type: 'string' },
          is_active: { type: 'boolean' }
        }
      }
    }
  },

  create: {
    tags: ['Plans'],
    summary: 'Create new plan',
    body: {
      type: 'object',
      required: ['code', 'name', 'description', 'price', 'features', 'allowed_roles'],
      properties: {
        code: { 
          type: 'string',
          enum: ['free', 'personal', 'teams']
        },
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        max_users: { type: ['number', 'null'] },
        features: { 
          type: 'array',
          items: { type: 'string' }
        },
        allowed_roles: {
          type: 'array',
          items: { type: 'string' }
        },
        is_active: { type: 'boolean' }
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          code: { type: 'string' },
          max_users: { type: ['number', 'null'] },
          features: { 
            type: 'array',
            items: { type: 'string' }
          },
          description: { type: 'string' },
          is_active: { type: 'boolean' }
        }
      }
    }
  },

  update: {
    tags: ['Plans'],
    summary: 'Update plan',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Plan ID' }
      }
    },
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        code: { 
          type: 'string',
          enum: ['free', 'personal', 'teams']
        },
        max_users: { type: ['number', 'null'] },
        features: { 
          type: 'array',
          items: { type: 'string' }
        },
        description: { type: 'string' },
        is_active: { type: 'boolean' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          code: { type: 'string' },
          max_users: { type: ['number', 'null'] },
          features: { 
            type: 'array',
            items: { type: 'string' }
          },
          description: { type: 'string' },
          is_active: { type: 'boolean' }
        }
      }
    }
  },

  delete: {
    tags: ['Plans'],
    summary: 'Delete plan',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Plan ID' }
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

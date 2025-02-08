export const roleSchema = {
  getAll: {
    tags: ['Roles'],
    summary: 'Get all roles',
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            permissions: { 
              type: 'array',
              items: { type: 'string' }
            },
            subscription_type: { 
              type: 'string',
              enum: ['free', 'personal', 'teams']
            }
          }
        }
      }
    }
  },

  getOne: {
    tags: ['Roles'],
    summary: 'Get role by ID',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Role ID' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          permissions: { 
            type: 'array',
            items: { type: 'string' }
          },
          subscription_type: { 
            type: 'string',
            enum: ['free', 'personal', 'teams']
          }
        }
      }
    }
  },

  create: {
    tags: ['Roles'],
    summary: 'Create new role',
    body: {
      type: 'object',
      required: ['name', 'permissions', 'subscription_type'],
      properties: {
        name: { type: 'string' },
        permissions: { 
          type: 'array',
          items: { type: 'string' }
        },
        subscription_type: { 
          type: 'string',
          enum: ['free', 'personal', 'teams']
        }
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          permissions: { 
            type: 'array',
            items: { type: 'string' }
          },
          subscription_type: { 
            type: 'string',
            enum: ['free', 'personal', 'teams']
          }
        }
      }
    }
  },

  update: {
    tags: ['Roles'],
    summary: 'Update role',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Role ID' }
      }
    },
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        permissions: { 
          type: 'array',
          items: { type: 'string' }
        },
        subscription_type: { 
          type: 'string',
          enum: ['free', 'personal', 'teams']
        }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          permissions: { 
            type: 'array',
            items: { type: 'string' }
          },
          subscription_type: { 
            type: 'string',
            enum: ['free', 'personal', 'teams']
          }
        }
      }
    }
  },

  delete: {
    tags: ['Roles'],
    summary: 'Delete role',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Role ID' }
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

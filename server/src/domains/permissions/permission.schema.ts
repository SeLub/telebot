export const permissionSchema = {
  getAll: {
    tags: ['Permissions'],
    summary: 'Get all permissions',
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            code: { type: 'string' },
            description: { type: 'string' },
            resource: { 
              type: 'string',
              enum: ['postline', 'bot', 'channel', 'user', 'system']
            },
            action: {
              type: 'string',
              enum: ['create', 'read', 'update', 'delete', 'manage', 'approve']
            }
          }
        }
      }
    }
  },

  getOne: {
    tags: ['Permissions'],
    summary: 'Get permission by ID',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Permission ID' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          code: { type: 'string' },
          description: { type: 'string' },
          resource: { 
            type: 'string',
            enum: ['postline', 'bot', 'channel', 'user', 'system']
          },
          action: {
            type: 'string',
            enum: ['create', 'read', 'update', 'delete', 'manage', 'approve']
          }
        }
      }
    }
  },

  create: {
    tags: ['Permissions'],
    summary: 'Create new permission',
    body: {
      type: 'object',
      required: ['name', 'code', 'description', 'resource', 'action'],
      properties: {
        name: { type: 'string' },
        code: { type: 'string' },
        description: { type: 'string' },
        resource: { 
          type: 'string',
          enum: ['postline', 'bot', 'channel', 'user', 'system']
        },
        action: {
          type: 'string',
          enum: ['create', 'read', 'update', 'delete', 'manage', 'approve']
        }
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          code: { type: 'string' },
          description: { type: 'string' },
          resource: { 
            type: 'string',
            enum: ['postline', 'bot', 'channel', 'user', 'system']
          },
          action: {
            type: 'string',
            enum: ['create', 'read', 'update', 'delete', 'manage', 'approve']
          }
        }
      }
    }
  },

  update: {
    tags: ['Permissions'],
    summary: 'Update permission',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Permission ID' }
      }
    },
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        code: { type: 'string' },
        description: { type: 'string' },
        resource: { 
          type: 'string',
          enum: ['postline', 'bot', 'channel', 'user', 'system']
        },
        action: {
          type: 'string',
          enum: ['create', 'read', 'update', 'delete', 'manage', 'approve']
        }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          code: { type: 'string' },
          description: { type: 'string' },
          resource: { 
            type: 'string',
            enum: ['postline', 'bot', 'channel', 'user', 'system']
          },
          action: {
            type: 'string',
            enum: ['create', 'read', 'update', 'delete', 'manage', 'approve']
          }
        }
      }
    }
  },

  delete: {
    tags: ['Permissions'],
    summary: 'Delete permission',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Permission ID' }
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

export const userSchema = {
  // GET /users
  getAll: {
    tags: ['Users'],
    summary: 'Get all users',
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            email: { type: 'string' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            role_ids: { 
              type: 'array',
              items: { type: 'string' }
            },
            is_active: { type: 'boolean' },
            last_login: { type: 'string', format: 'date-time' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  },

  // GET /users/:id
  getOne: {
    tags: ['Users'],
    summary: 'Get user by ID',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'User ID' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          email: { type: 'string' },
          first_name: { type: 'string' },
          last_name: { type: 'string' },
          role_ids: { 
            type: 'array',
            items: { type: 'string' }
          },
          is_active: { type: 'boolean' },
          last_login: { type: 'string', format: 'date-time' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' }
        }
      }
    }
  },

  // POST /users
  create: {
    tags: ['Users'],
    summary: 'Create new user',
    body: {
      type: 'object',
      required: ['email', 'password_hash', 'first_name', 'last_name'],
      properties: {
        email: { type: 'string' },
        password_hash: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        role_ids: { 
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
          email: { type: 'string' },
          first_name: { type: 'string' },
          last_name: { type: 'string' },
          role_ids: { 
            type: 'array',
            items: { type: 'string' }
          },
          is_active: { type: 'boolean' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' }
        }
      }
    }
  },

  // PUT /users/:id
  update: {
    tags: ['Users'],
    summary: 'Update user',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'User ID' }
      }
    },
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password_hash: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        role_ids: { 
          type: 'array',
          items: { type: 'string' }
        },
        is_active: { type: 'boolean' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          email: { type: 'string' },
          first_name: { type: 'string' },
          last_name: { type: 'string' },
          role_ids: { 
            type: 'array',
            items: { type: 'string' }
          },
          is_active: { type: 'boolean' },
          updated_at: { type: 'string', format: 'date-time' }
        }
      }
    }
  },

  // DELETE /users/:id
  delete: {
    tags: ['Users'],
    summary: 'Delete user',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'User ID' }
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

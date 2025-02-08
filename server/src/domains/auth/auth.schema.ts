export const authSchema = {
  register: {
    tags: ['Auth'],
    summary: 'Register new user',
    body: {
      type: 'object',
      required: ['email', 'password', 'name'],
      properties: {
        email: { 
          type: 'string',
          format: 'email'
        },
        password: { 
          type: 'string',
          minLength: 6 
        },
        name: { 
          type: 'string',
          minLength: 2 
        }
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              email: { type: 'string' },
              name: { type: 'string' }
            }
          },
          subscription: {
            type: 'object',
            properties: {
              subscription_id: { type: 'string' },
              plan: { type: 'string' },
              start_date: { type: 'string', format: 'date-time' },
              end_date: { type: 'string', format: 'date-time' }
            }
          },
          token: { type: 'string' }
        }
      }
    }
  },
  login: {
    tags: ['Auth'],
    summary: 'Login user',
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          format: 'email'
        },
        password: {
          type: 'string',
          minLength: 6
        }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              email: { type: 'string' },
              first_name: { type: 'string' },
              last_name: { type: 'string' }
            }
          },
          subscription: {
            type: 'object',
            properties: {
              subscription_id: { type: 'string' },
              plan: { type: 'string' },
              features: { 
                type: 'array',
                items: { type: 'string' }
              }
            }
          },
          token: { type: 'string' },
          refreshToken: { type: 'string' }
        }
      }
    }
  }
};

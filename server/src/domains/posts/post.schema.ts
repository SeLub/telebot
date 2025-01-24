export const postSchema = {
  // Common properties schema
  postProperties: {
    type: 'object',
    properties: {
      post_id: { type: 'string' },
      postline_id: { type: 'string' },
      text: { type: 'string' },
      media: { 
        type: 'array', 
        items: {
          type: 'object',
          required: ['type', 'url'],
          properties: {
            type: { type: 'string', enum: ['image', 'video', 'document', 'audio'] },
            url: { type: 'string' }
          }
        }
      },
      created_at: { type: 'string', format: 'date-time' },
      updated_at: { type: 'string', format: 'date-time' }
    }
  },

  // GET /posts
  getAll: {
    tags: ['Posts'],
    summary: 'Get all posts',
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            post_id: { type: 'string' },
            postline_id: { type: 'string' },
            text: { type: 'string' },
            media: { 
              type: 'array', 
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string', enum: ['image', 'video', 'document', 'audio'] },
                  url: { type: 'string' }
                }
              }
            },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  },

  // GET /posts/:id
    // GET /posts/:id
    getOne: {
      tags: ['Posts'],
      summary: 'Get post by ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', description: 'Post ID' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            post_id: { type: 'string' },
            postline_id: { type: 'string' },
            text: { type: 'string' },
            media: { 
              type: 'array', 
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string', enum: ['image', 'video', 'document', 'audio'] },
                  url: { type: 'string' }
                }
              }
            },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        }
      }
    },

  // GET /posts/postline/:postlineId
    // GET /posts/postline/:postlineId
    getByPostline: {
      tags: ['Posts'],
      summary: 'Get posts by postline ID',
      params: {
        type: 'object',
        required: ['postlineId'],
        properties: {
          postlineId: { type: 'string', description: 'Postline ID' }
        }
      },
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              post_id: { type: 'string' },
              postline_id: { type: 'string' },
              text: { type: 'string' },
              media: { 
                type: 'array', 
                items: {
                  type: 'object',
                  properties: {
                    type: { type: 'string', enum: ['image', 'video', 'document', 'audio'] },
                    url: { type: 'string' }
                  }
                }
              },
              created_at: { type: 'string', format: 'date-time' },
              updated_at: { type: 'string', format: 'date-time' }
            }
          }
        }
      }
    },

  // POST /posts
    // POST /posts
    create: {
      tags: ['Posts'],
      summary: 'Create new post',
      body: {
        type: 'object',
        required: ['postline_id'],
        properties: {
          postline_id: { type: 'string' },
          text: { type: 'string' },
          media: { 
            type: 'array', 
            items: {
              type: 'object',
              required: ['type', 'url'],
              properties: {
                type: { type: 'string', enum: ['image', 'video', 'document', 'audio'] },
                url: { type: 'string' }
              }
            }
          }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            post_id: { type: 'string' },
            postline_id: { type: 'string' },
            text: { type: 'string' },
            media: { 
              type: 'array', 
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string', enum: ['image', 'video', 'document', 'audio'] },
                  url: { type: 'string' }
                }
              }
            },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        }
      }
    },

  // PUT /posts/:id
    // PUT /posts/:id
    update: {
      tags: ['Posts'],
      summary: 'Update post',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', description: 'Post ID' }
        }
      },
      body: {
        type: 'object',
        properties: {
          text: { type: 'string' },
          media: { 
            type: 'array', 
            items: {
              type: 'object',
              required: ['type', 'url'],
              properties: {
                type: { type: 'string', enum: ['image', 'video', 'document', 'audio'] },
                url: { type: 'string' }
              }
            }
          }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            post_id: { type: 'string' },
            postline_id: { type: 'string' },
            text: { type: 'string' },
            media: { 
              type: 'array', 
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string', enum: ['image', 'video', 'document', 'audio'] },
                  url: { type: 'string' }
                }
              }
            },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' }
          }
        }
      }
    },

  // DELETE /posts/:id
  delete: {
    tags: ['Posts'],
    summary: 'Delete post',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'Post ID' }
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

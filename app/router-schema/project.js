module.exports = {
  '/api/project/list': {
    GET: {
      query: {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
        // required: ['id'],
        additionalProperties: false
      }
    }
  }
}
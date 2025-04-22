export const errorResponseSchema = {
	type: 'object',
  properties: {
    message: { type: 'string' }
  },
  required: ['message']
};

export const idParamsSchema = {
		type: 'object',
		required: ['id'],
		properties: {
			id: { type: 'integer', minimum: 1 }
		},
		additionalProperties: false
};
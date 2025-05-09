import { errorResponseSchema, idParamsSchema } from "./templates.schema.js";

export const registerSchema = {
    body: {
        type: 'object',
        required: ['username', 'password', 'email'],
        properties: {
            username: {
                type: 'string',
                minLength: 3,
                maxLength: 15
            },
            password: {
                type: 'string',
                minLength: 5,
				// Requires 1 uppercase, 1 number  and cannot contain the word password
                // pattern: '^(?!.*password)(?=.*[A-Z])(?=.*\\d).{5,}$'
				pattern: '^[A-Za-z0-9]+$'
            },
            email: { 
                type: 'string',
                format: 'email'
            }
        },
        additionalProperties: false
    },
	response: {
		201: {
			type: 'object',
			required: ['id', 'username', 'email', 'picture'],
			properties: {
				id: { type: 'integer' },
				username: { type: 'string'},
				email: { type: 'string', format: 'email' },
				picture: { type: 'string' },
			}
		},
		400: errorResponseSchema,
		401: errorResponseSchema,
		404: errorResponseSchema,
		409: errorResponseSchema,
		500: errorResponseSchema,

	}
};
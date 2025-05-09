import { errorResponseSchema, idParamsSchema } from "./templates.schema.js";


export const createGameSchema = {
	body: {
		type: 'object',
		required: ['player1Id', 'player2Id'],
		properties: {
			player1Id: {
				type: 'integer',
				minimum: 1
			},
			player2Id: {
				type: 'integer',
				minimum: 1
			}
		},
		additionalProperties: false
	},
	response: {
		201: {
			type: 'object',
			required: ['gameId', 'time'],
			properties: {
				gameId: {
					type: 'integer',
					minimum: 1,
				},
				time: {
					type: 'string',
					format: 'date-time'
				}
			}
		},
		400: errorResponseSchema,
		401: errorResponseSchema,
		404: errorResponseSchema,
		409: errorResponseSchema,
		500: errorResponseSchema,
	},
}

export const finishGameSchema = {
	param: idParamsSchema,
	body: {
		type: 'object',
		required: ['p1score', 'p2score', 'winnerId'],
		properties: {
			p1score: { type: 'integer' },
			p2score: { type: 'integer' },
			winnerId: { type: ['integer', 'null'] , minimum: 1 }
		},
		additionalProperties: false
	},
	response: {
		201: {
			type: 'object',
			required: ['id'],
			properties: {
				id: { type: 'integer', minimum: 1 }
			}
		},
		400: errorResponseSchema,
		401: errorResponseSchema,
		404: errorResponseSchema,
		409: errorResponseSchema,
		500: errorResponseSchema,
		502: errorResponseSchema
	}
}

export const getUserGamesSchema = {
	params: idParamsSchema,
	response: {
		200: {
			type: 'object',
			required: ['id', 'userGames'],
			properties: {
				userId: { type: 'integer', minimum: 1 },
				userGames: { 
					type: 'array',
					items: {
						type: 'object',
						properties: {
							player1Id: {
									type: 'integer', 
									minimum: 1 
								},
									player2Id: { 
									type: 'integer', 
									minimum: 1 
								},
								id: { 
									type: 'integer', 
									minimum: 1 
								},
									winnerId: { 
									type: ['integer', 'null'],
									minimum: 1 
								},
									player1Score: { 
									type: 'integer',
									minimum: 0
								},
									player2Score: { 
									type: 'integer',
									minimum: 0
								},
									createdAt: { 
									type: 'string',
									format: 'date-time'
								}
						},
					required: ['player1Id', 'player2Id', 'id', 'winnerId', 'player1Score', 'player2Score', 'createdAt']
					}
				}
			}
		},
		400: errorResponseSchema,
		401: errorResponseSchema,
		404: errorResponseSchema,
		409: errorResponseSchema,
		500: errorResponseSchema,
		502: errorResponseSchema
	}
}
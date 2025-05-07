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
	respose: {
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
		}
	}
}
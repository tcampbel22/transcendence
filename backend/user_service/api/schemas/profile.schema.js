import { errorResponseSchema, idParamsSchema } from "./templates.schema.js";


export const validateUserSchema = {
	params: idParamsSchema,
	additionalProperties: false,
	response: {
		200: {
			type: 'object',
			required: ['id'],
			properties: {
				id: { type: 'integer' }
			}
		},
		400: errorResponseSchema,
		401: errorResponseSchema,
		404: errorResponseSchema,
		500: errorResponseSchema,
	}
};

export const getUserProfileSchema = {
	params: idParamsSchema,
	response: {
		200: {
			type: 'object',
			required: ['id', 'username', 'email'],
			properties: {
				id: { type: 'integer'},
				username: { type: 'string' },
				email: { type: 'string' },
				picture: { type: 'string' },
				isOnline: { type: 'boolean' }
			}
		},
		400: errorResponseSchema,
		401: errorResponseSchema,
		404: errorResponseSchema,
		500: errorResponseSchema,
	}
};

export const getUserListSchema = {
	response: {
		200: {
			type: 'object',
			required: ['users'],
			properties: {
				users: {
					type: 'array',
					items: {
						type: 'object',
						required: ['id', 'username'],
						properties: {
							id: { type: 'integer' },
							username: { type: 'string' }
						},
						additionalProperties: false,
					}
				}
			},
		},
		400: errorResponseSchema,
		401: errorResponseSchema,
		404: errorResponseSchema,
		500: errorResponseSchema,
	}
};


export const updateUsernameSchema = {
	params: idParamsSchema,
	body: {
		type: 'object',
		required: ['newUsername'],
		properties: {
			newUsername: {
				type: 'string',
				minLength: 3,
            	maxLength: 15
			}
		},
		additionalProperties: false
	},
	response: {
		201: {
			type: 'object',
			required: ['id', 'newUsername'],
			properties: {
				id: { type: 'integer'},
				newUsername: { type: 'string' },
			}
		},
		400: errorResponseSchema,
		401: errorResponseSchema,
		409: errorResponseSchema,
		404: errorResponseSchema,
		500: errorResponseSchema,
		502: errorResponseSchema,
	}
};

export const updatePictureSchema = {
	params: idParamsSchema,
	consumes: ['multipart/form-data'],
	response: {
		201: {
		  type: 'object',
		  required: ['message', 'id', 'newPicture'],
		  properties: {
			message: { type: 'string' },
			id: { type: 'integer' },
			newPicture: { type: 'string' }
		  }
		},
		400: errorResponseSchema,
		401: errorResponseSchema,
		409: errorResponseSchema,
		404: errorResponseSchema,
		500: errorResponseSchema,
		502: errorResponseSchema,
	}
};

export const updatePasswordSchema = {
	params: idParamsSchema,
	body: {
		type: 'object',
		required: ['newPassword'],
		properties: {
			newPassword: {
				type: 'string',
				minLength: 5,
                // Requires 1 uppercase, 1 number and cannot contain the word password
                // pattern: '^(?!.*password)(?=.*[A-Z])(?=.*\\d).{5,}$'
				pattern: '^[A-Za-z0-9]+$'
			}
		},
		additionalProperties: false
	},
	response: {
		201: {
			type: 'object',
			required: ['id'],
			properties: {
				id: { type: 'integer'},
			}
		},
		400: errorResponseSchema,
		401: errorResponseSchema,
		409: errorResponseSchema,
		404: errorResponseSchema,
		500: errorResponseSchema,
		502: errorResponseSchema,
	}
};

export const validatePasswordSchema = {
	body: {
		type: 'object',
		required: ['id', 'password'],
		properties: {
			id: { type: 'integer' },
			password: {
				type: 'string',
				minLength: 5,
				// Requires 1 uppercase, 1 number and cannot contain the word password
                // pattern: '^(?!.*password)(?=.*[A-Z])(?=.*\\d).{5,}$'
				pattern: '^[A-Za-z0-9]+$'
			}
		},
		additionalProperties: false
	},
	response: {
		200: {
			type: 'object',
			required: ['id'],
			properties: {
				id: { type: 'integer' },
			}
		},
		400: errorResponseSchema,
		401: errorResponseSchema,
		404: errorResponseSchema,
		500: errorResponseSchema,
		502: errorResponseSchema,
	}
}

export const getStatsSchema = {
	params: idParamsSchema,
	response: {
		200: {
			type: 'object',
			required: ['id', 'wins', 'losses', 'matchesPlayed'],
			properties: {
				id: { type: 'integer'},
				wins: { type: 'integer' },
				losses: { type: 'integer' },
				matchesPlayed: { type: 'integer' },
			}
		},
		400: errorResponseSchema,
		401: errorResponseSchema,
		404: errorResponseSchema,
		500: errorResponseSchema,
	}
};

export const matchHistorySchema = {
  params: idParamsSchema,
  response: {
		200: {
			type: 'object',
			required: ['id', 'username', 'picture', 'matchHistory'],
			properties: {
				id: { type: 'integer', minimum: 1 },
				username: { type: 'string' },
				picture: { type: 'string' },
				matchHistory: {
					type: 'array',
					items: {
						type: 'object',
						required: ['gameId', 'date', 'score', 'result', 'opponentId', 'opponentName', 'opponentPicture'],
						properties: {
							gameId: { type: 'integer' },
							date: { type: 'string', format: 'date-time' },
							score: { type: 'string' },
							result: { type: 'string' },
							opponentId: { type: 'integer' },
							opponentName: { type: 'string' },
							opponentPicture: { type: 'string' },
						},
						additionalProperties: false
					}
				}
			}
		},
    400: errorResponseSchema,
    401: errorResponseSchema,
    403: errorResponseSchema,
    404: errorResponseSchema,
    500: errorResponseSchema,
    502: errorResponseSchema,
  }
};

export const deleteUserSchema = {
	params: idParamsSchema,
	response: {
	  204: {
		type: 'object',
		properties: {
		  message: { type: 'string' }
		}
	  },
	  401: errorResponseSchema,
	  403: errorResponseSchema,
	  404: errorResponseSchema,
	  500: errorResponseSchema
	}
  };

  export const getFriendsListSchema = {
	params: idParamsSchema,
	response: {
	  200: {
		type: 'object',
		required: ['message', 'friendList'],
		properties: {
		  message: { type: 'string' },
		  friendList: { 
			type: 'array',
			items: {
			  type: 'object',
			  required: ['id', 'username', 'picture', 'status'],
			  properties: {
				id: { type: 'integer' },
				username: { type: 'string' },
				picture: { type: 'string' },
				status: { type: 'string', enum: ['Online', 'Offline'] }
			  }
			}
		  }
		}
	  },
	  400: errorResponseSchema,
	  401: errorResponseSchema,
	  404: errorResponseSchema,
	  500: errorResponseSchema
	}
  };

  export const addFriendSchema = {
	params: idParamsSchema,
	body: {
	  type: 'object',
	  required: ['friendUsername'],
	  properties: {
		friendUsername: { type: 'string' }
	  },
	  additionalProperties: false
	},
	response: {
	  201: {
		type: 'object',
		required: ['message', 'friendId', 'friendUsername'],
		properties: {
		  message: { type: 'string' },
		  friendId: { type: 'integer', minimum: 1 },
		  friendUsername: { type: 'string' }
		}
	  },
	  400: errorResponseSchema,
	  401: errorResponseSchema,
	  404: errorResponseSchema,
	  409: errorResponseSchema,
	  500: errorResponseSchema
	}
  };
  
  export const deleteFriendSchema = {
	params: idParamsSchema,
	body: {
	  type: 'object',
	  required: ['friendUsername'],
	  properties: {
		friendUsername: { type: 'string' }
	  },
	  additionalProperties: false
	},
	response: {
	  201: {
		type: 'object',
		properties: {
		  message: { type: 'string' }
		}
	  },
	  400: errorResponseSchema,
	  401: errorResponseSchema,
	  404: errorResponseSchema,
	  500: errorResponseSchema
	}
  };

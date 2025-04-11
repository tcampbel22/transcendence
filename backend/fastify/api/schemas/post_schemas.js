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
                pattern: '^(?!.*password).*'
            },
            email: { 
                type: 'string',
                format: 'email'
            },
        },
        additionalProperties: false
    }
};